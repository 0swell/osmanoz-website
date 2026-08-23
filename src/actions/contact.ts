"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";

export type ContactState = {
  ok: boolean;
  message: string;
  /** Alan bazlı hatalar — hata mesajı ilgili alanın yanında gösterilir. */
  errors?: Partial<Record<"ad" | "telefon" | "mesaj", string>>;
  /**
   * Başarısız gönderimde form alanlarına geri yazılacak değerler.
   * Olmazsa kullanıcının yazdığı mesaj kaybolur ve baştan yazması gerekir.
   */
  gonderilen?: { ad: string; telefon: string; eposta: string; mesaj: string };
};

/** Sunucu mesajları — ziyaretçinin dilinde döner. */
const M = {
  tr: {
    alindi: "Mesajınız alındı.",
    adEksik: "Adınızı yazın.",
    telEksik: "Telefon numaranızı eksiksiz yazın.",
    mesajEksik: "Ne yaptırmak istediğinizi birkaç cümleyle yazın.",
    duzeltin: "Lütfen işaretli alanları düzeltin.",
    cokHizli: "Mesajınız az önce gönderildi. Birazdan dönüş yapacağım.",
    kapali:
      "Form şu an gönderilemiyor. WhatsApp'tan yazarsanız hemen dönerim.",
    basarili:
      "Mesajınız ulaştı. En kısa sürede dönüş yapacağım. (Yeni mesaj için 1 dakika beklemeniz gerekiyor.)",
    hata: "Mesaj gönderilemedi. WhatsApp'tan yazarsanız hemen dönüş yaparım.",
    konu: "Yeni teklif talebi",
    belirtilmedi: "(belirtilmedi)",
  },
  en: {
    alindi: "Your message has been received.",
    adEksik: "Please enter your name.",
    telEksik: "Please enter your full phone number.",
    mesajEksik: "Please describe what you need in a few sentences.",
    duzeltin: "Please correct the highlighted fields.",
    cokHizli: "Your message was just sent. I will get back to you shortly.",
    kapali:
      "The form cannot be sent right now. Message me on WhatsApp and I will reply immediately.",
    basarili:
      "Your message arrived. I will get back to you as soon as I can. (Please wait one minute before sending another.)",
    hata: "The message could not be sent. Message me on WhatsApp and I will reply immediately.",
    konu: "New enquiry",
    belirtilmedi: "(not provided)",
  },
} as const;

/**
 * Basit hız sınırı — 1 dakikada bir gönderim.
 *
 * Anahtar hem IP hem telefon: numarayı değiştiren kişi IP'ye, VPN değiştiren
 * kişi numaraya takılır. İkisi de değişirse geçer — kararlı bir saldırgan
 * için Vercel Firewall veya görünmez captcha gerekir, bu katman sıradan
 * spam'i durdurmak içindir.
 *
 * SINIR: Map süreç belleğinde. Vercel sunucusuz çalıştığı için soğuk
 * başlangıçta sıfırlanabiliyor; kalıcı sayaç Vercel KV / Upstash ister.
 */
const sonGonderim = new Map<string, number>();
const BEKLEME_MS = 60_000;

/** Map sınırsız büyümesin: süresi geçmiş kayıtlar atılır. */
function temizle(simdi: number) {
  for (const [k, t] of sonGonderim) {
    if (simdi - t > BEKLEME_MS) sonGonderim.delete(k);
  }
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const dil = formData.get("dil") === "en" ? "en" : "tr";
  const m = M[dil];

  // Honeypot: gerçek kullanıcı bu alanı görmez, bot doldurur.
  if (formData.get("website")) {
    return { ok: true, message: m.alindi };
  }

  const ad = String(formData.get("ad") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const eposta = String(formData.get("eposta") ?? "").trim();
  const mesaj = String(formData.get("mesaj") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (ad.length < 2) errors.ad = m.adEksik;
  if (telefon.replace(/\D/g, "").length < 10)
    errors.telefon = m.telEksik;
  if (mesaj.length < 10)
    errors.mesaj = m.mesajEksik;

  const gonderilen = { ad, telefon, eposta, mesaj };

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: m.duzeltin,
      errors,
      gonderilen,
    };
  }

  // Vercel gerçek istemci IP'sini bu başlıklarda gönderiyor.
  const basliklar = await headers();
  const ip =
    basliklar.get("x-forwarded-for")?.split(",")[0].trim() ||
    basliklar.get("x-real-ip") ||
    "bilinmeyen";
  const anahtar = `${ip}|${telefon.replace(/\D/g, "")}`;
  const simdi = Date.now();
  temizle(simdi);
  const oncekiZaman = sonGonderim.get(anahtar);
  if (oncekiZaman && simdi - oncekiZaman < BEKLEME_MS) {
    return {
      ok: false,
      message: m.cokHizli,
      gonderilen,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const alici = process.env.CONTACT_TO_EMAIL ?? siteConfig.nap.email;

  if (!apiKey) {
    // Anahtar tanımlı değilse sessizce "başarılı" deme — yanlış bilgi olur.
    console.error("RESEND_API_KEY tanımlı değil, form gönderilemedi.");
    return {
      ok: false,
      message: m.kapali,
      gonderilen,
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      // Doğrulanmış alan adından gönderiliyor (Resend > Domains).
      // Ortak resend.dev adresi spam'e düşüyordu ve yalnız hesap sahibinin
      // e-postasına gönderebiliyordu.
      from: "osmanoz.website <iletisim@osmanoz.website>",
      to: [alici],
      replyTo: eposta || undefined,
      subject: `${m.konu} — ${ad}`,
      text: [
        `Ad: ${ad}`,
        `Telefon: ${telefon}`,
        `E-posta: ${eposta || m.belirtilmedi}`,
        "",
        mesaj,
      ].join("\n"),
    });

    sonGonderim.set(anahtar, simdi);
    return {
      ok: true,
      message: m.basarili,
    };
  } catch (error) {
    console.error("Resend gönderim hatası:", error);
    return {
      ok: false,
      message: m.hata,
      gonderilen,
    };
  }
}

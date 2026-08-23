import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { siteConfig } from "@/config/site";

export type NavItem = { label: string; href: string };

/** Ana navigasyon — 5 öğeyi geçmez (UX: aşırı yüklü menü). */
export function navItems(dil: Dil): NavItem[] {
  const t = s(dil).nav;
  return [
    { label: t.hizmetler, href: `${yol("anasayfa", dil)}#hizmetler` },
    { label: t.ornekler, href: yol("ornekler", dil) },
    { label: t.fiyatlar, href: yol("fiyatlar", dil) },
    { label: t.hakkimda, href: yol("hakkimda", dil) },
    { label: t.iletisim, href: yol("iletisim", dil) },
  ];
}

/**
 * WhatsApp bağlantısı. Ön-doldurulmuş mesaj sayfaya göre değişir
 * (CLAUDE.md §5.4) — ziyaretçi ne yazacağını düşünmek zorunda kalmaz.
 */
export function whatsappUrl(message?: string): string {
  const { number, defaultMessage } = siteConfig.whatsapp;
  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Ön-doldurulmuş mesajlar. İngilizce sayfadan gelen ziyaretçi İngilizce
 * yazsın diye dil başına ayrı tutuluyor.
 */
const mesajlar = {
  tr: {
    default: siteConfig.whatsapp.defaultMessage,
    website: "Merhaba, işletmem için web sitesi yaptırmak istiyorum.",
    mobile: "Merhaba, mobil uygulama hakkında bilgi almak istiyorum.",
    business:
      "Merhaba, QR menü / randevu sistemi hakkında bilgi almak istiyorum.",
    pricing: "Merhaba, fiyatlar hakkında bilgi almak istiyorum.",
  },
  en: {
    default: "Hello, I would like to ask about a website for my business.",
    website: "Hello, I would like to have a website built for my business.",
    mobile: "Hello, I would like to ask about a mobile app.",
    business: "Hello, I would like to ask about a QR menu / booking system.",
    pricing: "Hello, I would like to ask about your pricing.",
  },
} as const;

export function whatsappMesaj(
  dil: Dil,
  anahtar: keyof (typeof mesajlar)["tr"] = "default",
): string {
  return mesajlar[dil][anahtar];
}

/** Hizmet slug'ından o hizmete uygun ön-doldurulmuş mesaj. */
export function hizmetWaMesaji(slug: string, dil: Dil): string {
  if (slug === "burdur-mobil-uygulama") return whatsappMesaj(dil, "mobile");
  if (slug === "burdur-isletme-yazilimi") return whatsappMesaj(dil, "business");
  return whatsappMesaj(dil, "website");
}

/**
 * content/ altındaki JSON verisinin tiplenmiş okuyucusu.
 *
 * Bu dosyalar ileride `/admin` panelinden (Sveltia CMS) düzenlenecek —
 * bu yüzden veri TypeScript içine gömülmez, JSON'da durur (CLAUDE.md §6.1).
 * Build-time'da import edilir, çalışma anında dosya okuma yoktur.
 *
 * Her metin alanı çift dilli: `{ "tr": "...", "en": "..." }`. Buradaki
 * `getX(dil)` fonksiyonları o dili çözüp bileşene düz string verir; bileşenler
 * dil yapısını hiç görmez.
 */

import type { Dil } from "@/i18n/diller";

import hizmetlerData from "../../content/settings/hizmetler.json";
import paketlerData from "../../content/settings/paketler.json";
import sssData from "../../content/settings/sss.json";
import surecData from "../../content/settings/surec.json";

/** JSON'daki çift dilli alan. */
export type CiftDil = { tr: string; en: string };

/** Çift dilli alandan istenen dili çeker. */
function c(alan: CiftDil, dil: Dil): string {
  return alan[dil];
}

// ---- SSS -------------------------------------------------------------------
export type SssItem = { soru: string; cevap: string };

export function getSss(dil: Dil): SssItem[] {
  return (sssData as Array<{ soru: CiftDil; cevap: CiftDil }>).map((x) => ({
    soru: c(x.soru, dil),
    cevap: c(x.cevap, dil),
  }));
}

/**
 * Hizmet sayfalarının gösterdiği soruları indeksle seçer.
 * İndeks kullanılıyor çünkü soru metni dile göre değişiyor; metinle
 * eşleştirme İngilizce tarafta koparıyordu.
 */
export function getSssByIndeks(indeksler: number[], dil: Dil): SssItem[] {
  const hepsi = getSss(dil);
  return indeksler.map((i) => hepsi[i]).filter(Boolean);
}

// ---- Süreç -----------------------------------------------------------------
export type SurecAdimi = { adim: string; baslik: string; aciklama: string };

export function getSurec(dil: Dil): SurecAdimi[] {
  return (
    surecData as Array<{ adim: string; baslik: CiftDil; aciklama: CiftDil }>
  ).map((x) => ({
    adim: x.adim,
    baslik: c(x.baslik, dil),
    aciklama: c(x.aciklama, dil),
  }));
}

// ---- Paketler --------------------------------------------------------------
export type Paket = {
  ad: string;
  ozet: string;
  fiyat: number | null;
  fiyatNot: string;
  one_cikan: boolean;
  /** Kartın üstünde gösterilecek serbest etiket ("Birleşik Paketler" gibi). */
  rozet?: string;
  kapsam: string[];
  /** Henüz sunulmayan paket — soluk gösterilir, "Yakında" rozeti alır. */
  yakinda?: boolean;
};

type PaketHam = {
  ad: CiftDil;
  ozet: CiftDil;
  fiyat: number | null;
  fiyatNot: CiftDil;
  one_cikan: boolean;
  rozet?: CiftDil;
  kapsam: CiftDil[];
  yakinda?: boolean;
};

export function getPaketler(dil: Dil): Paket[] {
  return (paketlerData as PaketHam[]).map((p) => ({
    ad: c(p.ad, dil),
    ozet: c(p.ozet, dil),
    fiyat: p.fiyat,
    fiyatNot: c(p.fiyatNot, dil),
    one_cikan: p.one_cikan,
    rozet: p.rozet ? c(p.rozet, dil) : undefined,
    kapsam: p.kapsam.map((x) => c(x, dil)),
    yakinda: p.yakinda,
  }));
}

/**
 * Paket–hizmet eşleşmesi sıra indeksiyle kurulur; paket adı dile göre
 * değiştiği için metinle eşleştirme İngilizce tarafta koparıyordu.
 */
export const paketIndeksi: Record<string, number> = {
  "burdur-web-sitesi": 0,
  "burdur-isletme-yazilimi": 1,
  "burdur-mobil-uygulama": 2,
};

// ---- Hizmet sayfaları ------------------------------------------------------
export type HizmetIcerigi = {
  h1: string;
  title: string;
  description: string;
  giris: string;
  bolumler: Array<{ baslik: string; metin: string }>;
  /** Bu sayfada gösterilecek SSS kayıtları. */
  sss: SssItem[];
};

type HizmetHam = {
  h1: CiftDil;
  title: CiftDil;
  description: CiftDil;
  giris: CiftDil;
  bolumler: Array<{ baslik: CiftDil; metin: CiftDil }>;
  sssIndeks: number[];
};

export function getHizmetIcerigi(slug: string, dil: Dil): HizmetIcerigi {
  const h = (hizmetlerData as Record<string, HizmetHam>)[slug];
  return {
    h1: c(h.h1, dil),
    title: c(h.title, dil),
    description: c(h.description, dil),
    giris: c(h.giris, dil),
    bolumler: h.bolumler.map((b) => ({
      baslik: c(b.baslik, dil),
      metin: c(b.metin, dil),
    })),
    sss: getSssByIndeks(h.sssIndeks, dil),
  };
}

/** Metadata üretirken bileşen kurmadan başlık/açıklama gerekiyor. */
export function getHizmetMeta(slug: string, dil: Dil) {
  const h = (hizmetlerData as Record<string, HizmetHam>)[slug];
  return { title: c(h.title, dil), description: c(h.description, dil) };
}

// ---- Yardımcılar -----------------------------------------------------------
/** 10000 → "10.000" (tr) / "10,000" (en) */
export function formatTL(value: number, dil: Dil = "tr"): string {
  return new Intl.NumberFormat(dil === "tr" ? "tr-TR" : "en-US").format(value);
}

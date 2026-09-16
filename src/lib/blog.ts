/**
 * Blog yazılarının tiplenmiş okuyucusu.
 *
 * İçerik `content/blog/yazilar.json` içinde, sitenin geri kalanıyla aynı
 * çift dilli biçimde tutulur (`{ tr, en }`). MDX yerine JSON seçildi çünkü
 * yazı gövdesi §5.3'teki akordiyon düzeni için zaten "bölüm" listesi olmak
 * zorunda; serbest markdown bu yapıyı taşımıyor ve iki dili tek dosyada
 * hizalamayı zorlaştırıyordu.
 *
 * Build-time'da import edilir; çalışma anında dosya okuma yoktur.
 */

import type { Dil } from "@/i18n/diller";
import { yaziYollari } from "@/i18n/diller";

import yazilarData from "../../content/blog/yazilar.json";

type CiftDil = { tr: string; en: string };

type YaziHam = {
  slug: CiftDil;
  /** ISO tarih — schema `datePublished` ve sitemap `lastmod` buradan gelir. */
  tarih: string;
  guncelleme?: string;
  etiket: CiftDil;
  /** İlgili hizmet sayfasının slug'ı — iç linkleme için (§4.3). */
  ilgiliHizmet: string;
  title: CiftDil;
  description: CiftDil;
  baslik: CiftDil;
  /** Snippet adayı doğrudan cevap: 40-60 kelime, sayfada hep açık (§5.3). */
  ozet: CiftDil;
  bolumler: Array<{ baslik: CiftDil; metin: CiftDil }>;
};

export type Yazi = {
  slug: string;
  sluglar: CiftDil;
  yollar: CiftDil;
  tarih: string;
  guncelleme: string;
  etiket: string;
  ilgiliHizmet: string;
  title: string;
  description: string;
  baslik: string;
  ozet: string;
  bolumler: Array<{ baslik: string; metin: string }>;
};

const ham = yazilarData as YaziHam[];

function coz(y: YaziHam, dil: Dil): Yazi {
  return {
    slug: y.slug[dil],
    sluglar: y.slug,
    yollar: yaziYollari(y.slug),
    tarih: y.tarih,
    guncelleme: y.guncelleme ?? y.tarih,
    etiket: y.etiket[dil],
    ilgiliHizmet: y.ilgiliHizmet,
    title: y.title[dil],
    description: y.description[dil],
    baslik: y.baslik[dil],
    ozet: y.ozet[dil],
    bolumler: y.bolumler.map((b) => ({
      baslik: b.baslik[dil],
      metin: b.metin[dil],
    })),
  };
}

/** Tüm yazılar — en yeni önce. */
export function getYazilar(dil: Dil): Yazi[] {
  return ham
    .map((y) => coz(y, dil))
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}

export function getYazi(slug: string, dil: Dil): Yazi | undefined {
  const bulunan = ham.find((y) => y.slug[dil] === slug);
  return bulunan ? coz(bulunan, dil) : undefined;
}

/** `generateStaticParams` için o dildeki slug listesi. */
export function yaziSluglari(dil: Dil): string[] {
  return ham.map((y) => y.slug[dil]);
}

/** Sitemap yazıları iki dilde birden listeler. */
export function tumYaziKayitlari() {
  return ham.map((y) => ({
    yollar: yaziYollari(y.slug),
    guncelleme: y.guncelleme ?? y.tarih,
  }));
}

/** Tarihi okunur biçime çevirir: "16 Eylül 2026" / "16 September 2026". */
export function tarihMetni(iso: string, dil: Dil): string {
  return new Intl.DateTimeFormat(dil === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

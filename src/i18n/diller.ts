/**
 * Dil altyapısı — Türkçe kökte (`/`), İngilizce `/en/` altında (CLAUDE.md §5.1).
 *
 * Slug'lar iki dilde BİLEREK farklıdır: aynı slug'ı iki dilde kullanmak
 * duplicate content riski doğurur ve İngilizce sayfa Türkçe anahtar kelimeyle
 * yarışır. Eşleşme aşağıdaki tabloda tutulur; hreflang, dil değiştirici ve
 * sitemap üçü de bu tek kaynaktan beslenir.
 */

export const DILLER = ["tr", "en"] as const;
export type Dil = (typeof DILLER)[number];

export const VARSAYILAN_DIL: Dil = "tr";

/** HTML `lang` ve Open Graph `locale` karşılıkları. */
export const htmlLang: Record<Dil, string> = { tr: "tr", en: "en" };
export const ogLocale: Record<Dil, string> = { tr: "tr_TR", en: "en_US" };

/**
 * Sayfa anahtarı → dil başına yol.
 * Yeni sayfa eklenince BURAYA da eklenmeli; aksi halde dil tuşu o sayfada
 * ana sayfaya düşer ve hreflang eksik kalır.
 */
export const rotalar = {
  anasayfa: { tr: "/", en: "/en" },
  webSitesi: { tr: "/burdur-web-sitesi", en: "/en/website-design-burdur" },
  mobil: { tr: "/burdur-mobil-uygulama", en: "/en/mobile-app-burdur" },
  isletme: { tr: "/burdur-isletme-yazilimi", en: "/en/business-software" },
  ornekler: { tr: "/ornekler", en: "/en/examples" },
  fiyatlar: { tr: "/fiyatlar", en: "/en/pricing" },
  hakkimda: { tr: "/hakkimda", en: "/en/about" },
  iletisim: { tr: "/iletisim", en: "/en/contact" },
  gizlilik: { tr: "/gizlilik", en: "/en/privacy" },
} as const;

export type RotaAnahtari = keyof typeof rotalar;

/** Sayfa anahtarından o dildeki yolu verir. */
export function yol(anahtar: RotaAnahtari, dil: Dil): string {
  return rotalar[anahtar][dil];
}

/** Hizmet slug'ından rota anahtarı — hizmet sayfaları tek bileşenden üretiliyor. */
export const hizmetRotaAnahtari: Record<string, RotaAnahtari> = {
  "burdur-web-sitesi": "webSitesi",
  "burdur-mobil-uygulama": "mobil",
  "burdur-isletme-yazilimi": "isletme",
};

/**
 * Metadata `alternates` bloğu — canonical + hreflang üçlüsü.
 * `x-default` Türkçeye işaret eder: birincil hedef kitle Türkçe arıyor.
 */
export function alternatifler(anahtar: RotaAnahtari, dil: Dil) {
  return {
    canonical: rotalar[anahtar][dil],
    languages: {
      tr: rotalar[anahtar].tr,
      en: rotalar[anahtar].en,
      "x-default": rotalar[anahtar].tr,
    },
  };
}

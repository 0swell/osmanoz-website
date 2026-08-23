import type { MetadataRoute } from "next";

import { SON_GUNCELLEME } from "@/config/guncelleme";
import { siteConfig } from "@/config/site";
import { rotalar, type RotaAnahtari } from "@/i18n/diller";

/**
 * Sitemap — Google Search Console'a gönderilecek.
 *
 * Her sayfanın iki dili de listelenir ve `alternates.languages` ile karşılıklı
 * bağlanır (CLAUDE.md §4.3). `/admin` bilinçli olarak dışarıda.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  /**
   * Sabit yayın tarihi. `new Date()` her derlemede değişir; Google sürekli
   * değişen lastmod'u güvenilmez sayıp yok sayıyor. İçerik güncellendikçe
   * bu tarih elle ilerletilir.
   */
  const guncelleme = new Date(SON_GUNCELLEME);

  const oncelik: Record<RotaAnahtari, number> = {
    anasayfa: 1,
    webSitesi: 0.9,
    mobil: 0.9,
    isletme: 0.9,
    fiyatlar: 0.8,
    ornekler: 0.7,
    iletisim: 0.7,
    hakkimda: 0.6,
    gizlilik: 0.2,
  };

  const anahtarlar = Object.keys(rotalar) as RotaAnahtari[];

  return anahtarlar.flatMap((k) => {
    const languages = {
      tr: `${base}${rotalar[k].tr}`,
      en: `${base}${rotalar[k].en}`,
      "x-default": `${base}${rotalar[k].tr}`,
    };

    return (["tr", "en"] as const).map((dil) => ({
      url: `${base}${rotalar[k][dil]}`,
      lastModified: guncelleme,
      changeFrequency: "monthly" as const,
      // İngilizce sürüm SEO hedefi değil; önceliği bilinçli olarak düşük.
      priority: dil === "tr" ? oncelik[k] : Math.max(0.1, oncelik[k] - 0.3),
      alternates: { languages },
    }));
  });
}

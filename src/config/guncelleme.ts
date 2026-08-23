import type { Dil } from "@/i18n/diller";

/**
 * Site içeriğinin son güncellenme tarihi — tek doğruluk kaynağı.
 *
 * Üç yerde birden kullanılır ve üçü de aynı değeri göstermek zorunda:
 *   1. Sayfa altındaki görünür "Son güncelleme" satırı
 *   2. JSON-LD `WebPage.dateModified`
 *   3. `sitemap.xml` içindeki `lastmod`
 *
 * Neden elle tutuluyor: `new Date()` her derlemede değişir, Google hiç
 * değişmeyen bir sayfada sürekli değişen lastmod görünce alanı bütünüyle
 * yok sayar. Metin veya fiyat değiştiğinde bu tarih elle ilerletilir.
 *
 * Tazelik sinyali fiyat yayınlayan bir sitede ayrıca güven meselesi:
 * ziyaretçi rakamın ne zamanki olduğunu bilmek ister (denetim 1.D.8 / 2.D.6).
 */
export const SON_GUNCELLEME = "2026-08-23";

/** ISO tarihi ziyaretçinin dilinde okunur biçime çevirir. */
export function guncellemeMetni(dil: Dil): string {
  return new Intl.DateTimeFormat(dil === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(SON_GUNCELLEME));
}

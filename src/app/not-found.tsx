import type { Metadata } from "next";

import { BulunamadiGovde } from "@/components/sayfalar/BulunamadiGovde";
import { KokGovde } from "@/components/sayfalar/KokGovde";
import { siteConfig } from "@/config/site";
import { s } from "@/i18n/sozluk";

import "./globals.css";

/**
 * Kök 404.
 *
 * Site iki kök layout kullanıyor ((tr) ve (en)); eşleşmeyen bir yol hangi
 * köke ait olduğu bilinemediği için buraya düşer ve bu dosya kendi <html>
 * etiketini basmak zorundadır. Varsayılan dil Türkçe (CLAUDE.md §1).
 *
 * BİLİNEN SINIR: Next 16'da birden çok kök layout varken eşleşmeyen her yol
 * bu tek dosyaya düşüyor; `/en/...` altındaki hatalı bir adres de Türkçe 404
 * gösteriyor. Denendi: (en) grubuna ayrı not-found ve /en altına catch-all
 * yakalayıcı — ikisi de kök dosyayı geçemedi. Etki küçük: sayfa yine HTTP 404
 * döndürüyor, navbar'daki TR|EN tuşu görünür durumda ve indekslenmiyor.
 */
export const metadata: Metadata = {
  // Kök layout olmadığı için metadataBase burada da tanımlanmalı.
  metadataBase: new URL(siteConfig.url),
  title: s("tr").bulunamadi.metaTitle,
  robots: { index: false, follow: true },
};

export default function KokBulunamadi() {
  return (
    <KokGovde dil="tr">
      <BulunamadiGovde dil="tr" />
    </KokGovde>
  );
}

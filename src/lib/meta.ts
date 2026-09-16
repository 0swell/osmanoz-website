import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Dil, RotaAnahtari } from "@/i18n/diller";
import { ogLocale, rotalar } from "@/i18n/diller";

/**
 * Sayfa metadata'sının tek üreticisi.
 *
 * NEDEN VAR: her sayfa kendi `openGraph` bloğunu elle yazıyordu ve Next.js
 * metadata'yı sığ birleştirdiği için layout'taki `og:image` ile `twitter`
 * alanları eziliyordu — derleme çıktısında paylaşım görseli yalnızca ana
 * sayfada kalmıştı. Artık canonical, hreflang, Open Graph ve Twitter kartı
 * tek yerden üretiliyor; bir alan unutulamıyor.
 */

/** Paylaşım kartı adresleri — route handler ile üretiliyor (app/**\/og.png). */
export const ogGorselYolu: Record<Dil, string> = {
  tr: "/og.png",
  en: "/en/og.png",
};

/** Paylaşım kartının `alt` metni. Görsel üreticisi de buradan okur. */
export const ogAlt: Record<Dil, string> = {
  tr: "Osman Öz — Burdur'da web sitesi, mobil uygulama ve işletme yazılımı",
  en: "Osman Öz — websites, mobile apps and business software in Burdur",
};

type Yollar = { tr: string; en: string };

export type MetaSecenek = {
  dil: Dil;
  title: string;
  description: string;
  /** Sayfanın iki dildeki yolu — canonical ve hreflang bundan kurulur. */
  yollar: Yollar;
  /** Blog yazılarında "article"; diğer her yerde "website". */
  tur?: "website" | "article";
  /** Yalnızca blog yazılarında: ISO tarih. */
  yayinTarihi?: string;
  guncellemeTarihi?: string;
};

export function metaOlustur({
  dil,
  title,
  description,
  yollar,
  tur = "website",
  yayinTarihi,
  guncellemeTarihi,
}: MetaSecenek): Metadata {
  const canonical = yollar[dil];
  const gorsel = {
    url: ogGorselYolu[dil],
    width: 1200,
    height: 630,
    alt: ogAlt[dil],
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { tr: yollar.tr, en: yollar.en, "x-default": yollar.tr },
    },
    openGraph: {
      type: tur,
      locale: ogLocale[dil],
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.siteName,
      title,
      description,
      images: [gorsel],
      ...(tur === "article" && yayinTarihi
        ? {
            publishedTime: yayinTarihi,
            modifiedTime: guncellemeTarihi ?? yayinTarihi,
            authors: [siteConfig.personalSiteUrl],
          }
        : {}),
    },
    twitter: {
      // Görsel 1200×630 — küçük "summary" kartı bu oranı kırpıyordu.
      card: "summary_large_image",
      title,
      description,
      images: [gorsel.url],
    },
  };
}

/** `rotalar` tablosundaki sabit sayfalar için kısayol. */
export function sayfaMeta(
  anahtar: RotaAnahtari,
  dil: Dil,
  title: string,
  description: string,
): Metadata {
  return metaOlustur({ dil, title, description, yollar: rotalar[anahtar] });
}

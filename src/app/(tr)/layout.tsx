import type { Metadata, Viewport } from "next";

import { KokGovde } from "@/components/sayfalar/KokGovde";
import { siteConfig } from "@/config/site";
import { rotalar } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { metaOlustur } from "@/lib/meta";

import "../globals.css";

/**
 * Türkçe kök layout. Next.js "multiple root layouts" desenidir:
 * `src/app/layout.tsx` yoktur, `(tr)` ve `(en)` grupları kendi <html>
 * etiketini basar. Tek layout'la `lang` özniteliği dile göre değişemezdi.
 */
/**
 * Varsayılan metadata. Sayfalar kendi başlığını `sayfaMeta()` ile üretir
 * (bkz. src/lib/meta.ts); buradaki blok layout'a doğrudan bağlı sayfalar
 * (404) ve eksik alanlar için taban görevi görür.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...metaOlustur({
    dil: "tr",
    title: sayfa("tr").anasayfa.metaTitle,
    description: siteConfig.description,
    yollar: rotalar.anasayfa,
  }),
  title: {
    default: sayfa("tr").anasayfa.metaTitle,
    // Sayfa başlıkları markayı kendisi taşır; şablon yalnızca eksikse ekler.
    template: "%s",
  },
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.personName, url: siteConfig.personalSiteUrl }],
  creator: siteConfig.personName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d11" },
  ],
};

export default function TrRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KokGovde dil="tr">{children}</KokGovde>;
}

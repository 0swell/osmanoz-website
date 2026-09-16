import type { Metadata, Viewport } from "next";

import { KokGovde } from "@/components/sayfalar/KokGovde";
import { siteConfig } from "@/config/site";
import { rotalar } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { metaOlustur } from "@/lib/meta";

import "../globals.css";

/**
 * İngilizce kök layout — `lang="en"`. Türkçe kökle aynı gövdeyi kullanır,
 * yalnızca dil ve varsayılan metadata değişir.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...metaOlustur({
    dil: "en",
    title: sayfa("en").anasayfa.metaTitle,
    description: sayfa("en").anasayfa.metaDesc,
    yollar: rotalar.anasayfa,
  }),
  title: {
    default: sayfa("en").anasayfa.metaTitle,
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

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KokGovde dil="en">{children}</KokGovde>;
}

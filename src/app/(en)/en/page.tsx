import type { Metadata } from "next";

import { AnaSayfaGovde } from "@/components/sayfalar/AnaSayfaGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("en").anasayfa;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("anasayfa", "en"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("anasayfa", "en").canonical,
  },
};

export default function Sayfa() {
  return <AnaSayfaGovde dil="en" />;
}

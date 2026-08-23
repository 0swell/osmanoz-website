import type { Metadata } from "next";

import { AnaSayfaGovde } from "@/components/sayfalar/AnaSayfaGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("tr").anasayfa;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("anasayfa", "tr"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("anasayfa", "tr").canonical,
  },
};

export default function Sayfa() {
  return <AnaSayfaGovde dil="tr" />;
}

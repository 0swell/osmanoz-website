import type { Metadata } from "next";

import { IletisimGovde } from "@/components/sayfalar/IletisimGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("tr").iletisim;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("iletisim", "tr"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("iletisim", "tr").canonical,
  },
};

export default function Sayfa() {
  return <IletisimGovde dil="tr" />;
}

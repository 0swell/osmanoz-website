import type { Metadata } from "next";

import { IletisimGovde } from "@/components/sayfalar/IletisimGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("en").iletisim;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("iletisim", "en"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("iletisim", "en").canonical,
  },
};

export default function Sayfa() {
  return <IletisimGovde dil="en" />;
}

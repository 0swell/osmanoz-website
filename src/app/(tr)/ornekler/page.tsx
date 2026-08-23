import type { Metadata } from "next";

import { OrneklerGovde } from "@/components/sayfalar/OrneklerGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("tr").ornekler;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("ornekler", "tr"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("ornekler", "tr").canonical,
  },
};

export default function Sayfa() {
  return <OrneklerGovde dil="tr" />;
}

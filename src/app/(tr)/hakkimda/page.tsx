import type { Metadata } from "next";

import { HakkimdaGovde } from "@/components/sayfalar/HakkimdaGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("tr").hakkimda;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("hakkimda", "tr"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("hakkimda", "tr").canonical,
  },
};

export default function Sayfa() {
  return <HakkimdaGovde dil="tr" />;
}

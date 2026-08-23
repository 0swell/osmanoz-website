import type { Metadata } from "next";

import { HakkimdaGovde } from "@/components/sayfalar/HakkimdaGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("en").hakkimda;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("hakkimda", "en"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("hakkimda", "en").canonical,
  },
};

export default function Sayfa() {
  return <HakkimdaGovde dil="en" />;
}

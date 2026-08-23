import type { Metadata } from "next";

import { OrneklerGovde } from "@/components/sayfalar/OrneklerGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("en").ornekler;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("ornekler", "en"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("ornekler", "en").canonical,
  },
};

export default function Sayfa() {
  return <OrneklerGovde dil="en" />;
}

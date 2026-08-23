import type { Metadata } from "next";

import { FiyatlarGovde } from "@/components/sayfalar/FiyatlarGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("en").fiyatlar;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("fiyatlar", "en"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("fiyatlar", "en").canonical,
  },
};

export default function Sayfa() {
  return <FiyatlarGovde dil="en" />;
}

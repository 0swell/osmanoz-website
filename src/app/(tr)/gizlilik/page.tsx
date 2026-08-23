import type { Metadata } from "next";

import { GizlilikGovde } from "@/components/sayfalar/GizlilikGovde";
import { alternatifler } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";

const t = sayfa("tr").gizlilik;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: alternatifler("gizlilik", "tr"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDesc,
    url: alternatifler("gizlilik", "tr").canonical,
  },
};

export default function Sayfa() {
  return <GizlilikGovde dil="tr" />;
}

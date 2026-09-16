import type { Metadata } from "next";

import { FiyatlarGovde } from "@/components/sayfalar/FiyatlarGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("tr").fiyatlar;

export const metadata: Metadata = sayfaMeta("fiyatlar", "tr", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <FiyatlarGovde dil="tr" />;
}

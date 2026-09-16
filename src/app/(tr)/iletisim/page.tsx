import type { Metadata } from "next";

import { IletisimGovde } from "@/components/sayfalar/IletisimGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("tr").iletisim;

export const metadata: Metadata = sayfaMeta("iletisim", "tr", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <IletisimGovde dil="tr" />;
}

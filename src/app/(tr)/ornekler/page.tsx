import type { Metadata } from "next";

import { OrneklerGovde } from "@/components/sayfalar/OrneklerGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("tr").ornekler;

export const metadata: Metadata = sayfaMeta("ornekler", "tr", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <OrneklerGovde dil="tr" />;
}

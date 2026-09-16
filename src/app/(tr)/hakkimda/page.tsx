import type { Metadata } from "next";

import { HakkimdaGovde } from "@/components/sayfalar/HakkimdaGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("tr").hakkimda;

export const metadata: Metadata = sayfaMeta("hakkimda", "tr", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <HakkimdaGovde dil="tr" />;
}

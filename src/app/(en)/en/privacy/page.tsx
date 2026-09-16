import type { Metadata } from "next";

import { GizlilikGovde } from "@/components/sayfalar/GizlilikGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("en").gizlilik;

export const metadata: Metadata = sayfaMeta("gizlilik", "en", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <GizlilikGovde dil="en" />;
}

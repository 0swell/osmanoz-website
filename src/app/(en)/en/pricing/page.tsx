import type { Metadata } from "next";

import { FiyatlarGovde } from "@/components/sayfalar/FiyatlarGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("en").fiyatlar;

export const metadata: Metadata = sayfaMeta("fiyatlar", "en", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <FiyatlarGovde dil="en" />;
}

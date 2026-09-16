import type { Metadata } from "next";

import { HakkimdaGovde } from "@/components/sayfalar/HakkimdaGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("en").hakkimda;

export const metadata: Metadata = sayfaMeta("hakkimda", "en", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <HakkimdaGovde dil="en" />;
}

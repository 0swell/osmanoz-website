import type { Metadata } from "next";

import { AnaSayfaGovde } from "@/components/sayfalar/AnaSayfaGovde";
import { sayfa } from "@/i18n/sayfalar";
import { sayfaMeta } from "@/lib/meta";

const t = sayfa("tr").anasayfa;

export const metadata: Metadata = sayfaMeta("anasayfa", "tr", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <AnaSayfaGovde dil="tr" />;
}

import type { Metadata } from "next";

import { BlogListeGovde } from "@/components/sayfalar/BlogListeGovde";
import { s } from "@/i18n/sozluk";
import { sayfaMeta } from "@/lib/meta";

const t = s("tr").blog;

export const metadata: Metadata = sayfaMeta("blog", "tr", t.metaTitle, t.metaDesc);

export default function Sayfa() {
  return <BlogListeGovde dil="tr" />;
}

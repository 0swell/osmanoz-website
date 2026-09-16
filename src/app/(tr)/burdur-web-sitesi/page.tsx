import type { Metadata } from "next";

import { ServicePage } from "@/components/organisms/ServicePage";
import { getHizmetMeta } from "@/lib/content";
import { sayfaMeta } from "@/lib/meta";

const SLUG = "burdur-web-sitesi";
const meta = getHizmetMeta(SLUG, "tr");

export const metadata: Metadata = sayfaMeta("webSitesi", "tr", meta.title, meta.description);

export default function Sayfa() {
  return <ServicePage slug={SLUG} dil="tr" />;
}

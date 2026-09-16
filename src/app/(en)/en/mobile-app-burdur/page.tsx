import type { Metadata } from "next";

import { ServicePage } from "@/components/organisms/ServicePage";
import { getHizmetMeta } from "@/lib/content";
import { sayfaMeta } from "@/lib/meta";

const SLUG = "burdur-mobil-uygulama";
const meta = getHizmetMeta(SLUG, "en");

export const metadata: Metadata = sayfaMeta("mobil", "en", meta.title, meta.description);

export default function Sayfa() {
  return <ServicePage slug={SLUG} dil="en" />;
}

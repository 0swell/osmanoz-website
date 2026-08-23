import type { Metadata } from "next";

import { ServicePage } from "@/components/organisms/ServicePage";
import { alternatifler } from "@/i18n/diller";
import { getHizmetMeta } from "@/lib/content";

const SLUG = "burdur-web-sitesi";
const meta = getHizmetMeta(SLUG, "en");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: alternatifler("webSitesi", "en"),
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: alternatifler("webSitesi", "en").canonical,
  },
};

export default function Sayfa() {
  return <ServicePage slug={SLUG} dil="en" />;
}

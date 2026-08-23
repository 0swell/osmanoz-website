import type { Metadata } from "next";

import { ServicePage } from "@/components/organisms/ServicePage";
import { alternatifler } from "@/i18n/diller";
import { getHizmetMeta } from "@/lib/content";

const SLUG = "burdur-isletme-yazilimi";
const meta = getHizmetMeta(SLUG, "tr");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: alternatifler("isletme", "tr"),
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: alternatifler("isletme", "tr").canonical,
  },
};

export default function Sayfa() {
  return <ServicePage slug={SLUG} dil="tr" />;
}

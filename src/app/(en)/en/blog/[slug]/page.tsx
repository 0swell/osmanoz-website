import type { Metadata } from "next";

import { BlogYaziGovde } from "@/components/sayfalar/BlogYaziGovde";
import { getYazi, yaziSluglari } from "@/lib/blog";
import { metaOlustur } from "@/lib/meta";

type Props = { params: Promise<{ slug: string }> };

/** Yazılar build-time'da üretilir — site %100 statik (CLAUDE.md §3). */
export function generateStaticParams() {
  return yaziSluglari("en").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const yazi = getYazi(slug, "en");
  if (!yazi) return {};

  return metaOlustur({
    dil: "en",
    title: yazi.title,
    description: yazi.description,
    yollar: yazi.yollar,
    tur: "article",
    yayinTarihi: yazi.tarih,
    guncellemeTarihi: yazi.guncelleme,
  });
}

export default async function Sayfa({ params }: Props) {
  const { slug } = await params;
  return <BlogYaziGovde slug={slug} dil="en" />;
}

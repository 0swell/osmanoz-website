import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/atoms/Section";
import type { Dil } from "@/i18n/diller";
import { hizmetRotaAnahtari, yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { formatTL, getPaketler } from "@/lib/content";

/**
 * Üç paketin yan yana karşılaştırması — gerçek `<table>`.
 *
 * Kartlar zaten var ama YZ ve cevap motorları tabloyu çok daha güvenilir
 * çözümlüyor (denetim 2.B.3 / 3.D.2). Ayrıca her satır ilgili hizmet
 * sayfasına link verdiği için gövde içi iç linkleme de burada kuruluyor
 * (denetim 1.B.9).
 *
 * Paket sırası `paketler.json` ile aynı: web → işletme → mobil.
 */
const slugSirasi = [
  "burdur-web-sitesi",
  "burdur-isletme-yazilimi",
  "burdur-mobil-uygulama",
];

export function PaketKarsilastirma({ dil }: { dil: Dil }) {
  const t = sayfa(dil).fiyatlar;
  const genel = s(dil);
  const paketler = getPaketler(dil);

  const satirlar = paketler.map((p, i) => ({
    paket: p,
    slug: slugSirasi[i],
    sure: t.satirlar[i].sure,
    kime: t.satirlar[i].kime,
  }));

  return (
    <Section
      eyebrow={t.karsilastirmaEyebrow}
      title={t.karsilastirmaBaslik}
      lead={t.karsilastirmaGiris}
      className="border-t border-border"
    >
      {/* Mobilde tablo 375px'e sığmıyor; kendi içinde yatay kayar,
          sayfa gövdesi kaymaz. */}
      <div className="overflow-x-auto rounded-(--radius) border border-border">
        <table className="w-full min-w-[46rem] border-collapse bg-surface text-left">
          <thead>
            <tr className="border-b border-border bg-surface-2/70">
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                {t.kolonPaket}
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                {t.kolonFiyat}
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                {t.kolonSure}
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                {t.kolonKime}
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                {t.kolonDetay}
              </th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map(({ paket, slug, sure, kime }) => (
              <tr
                key={slug}
                className="border-b border-border last:border-0 align-top"
              >
                <th
                  scope="row"
                  className="px-4 py-3.5 text-sm font-medium text-ink"
                >
                  {paket.ad}
                  {paket.yakinda && (
                    <span className="ml-2 rounded-full border border-border-strong px-1.5 py-0.5 text-xs font-normal text-ink-muted">
                      {genel.genel.yakinda}
                    </span>
                  )}
                </th>
                <td className="px-4 py-3.5 text-sm font-medium text-ink">
                  {paket.fiyat
                    ? `${formatTL(paket.fiyat, dil)} ${genel.fiyat.paraBirimi}`
                    : paket.fiyatNot}
                </td>
                <td className="px-4 py-3.5 text-sm text-ink-soft">{sure}</td>
                <td className="px-4 py-3.5 text-sm text-ink-soft">{kime}</td>
                <td className="px-4 py-3.5 text-sm">
                  <Link
                    href={yol(hizmetRotaAnahtari[slug], dil)}
                    className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                  >
                    {t.detayGor}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

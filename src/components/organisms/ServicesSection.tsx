import { ArrowRight, Globe, Smartphone, Store } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/atoms/Section";
import { getServices } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { hizmetRotaAnahtari, yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { cn } from "@/utils/cn";

const ikonlar = {
  "burdur-web-sitesi": Globe,
  "burdur-mobil-uygulama": Smartphone,
  "burdur-isletme-yazilimi": Store,
} as const;

export function ServicesSection({ dil }: { dil: Dil }) {
  const t = s(dil).hizmetler;
  const genel = s(dil).genel;

  /** Henüz sunulmayan hizmetler listenin SONUNDA durur. */
  const siraliHizmetler = [...getServices(dil)].sort(
    (a, b) => Number(Boolean(a.yakinda)) - Number(Boolean(b.yakinda)),
  );

  return (
    <Section
      id="hizmetler"
      eyebrow={t.eyebrow}
      title={t.baslik}
      lead={t.giris}
    >
      <div className="stagger grid gap-4 md:grid-cols-3">
        {siraliHizmetler.map((h) => {
          const Icon = ikonlar[h.slug as keyof typeof ikonlar] ?? Globe;
          return (
            <Link
              key={h.slug}
              href={yol(hizmetRotaAnahtari[h.slug], dil)}
              className={cn(
                "card card-hover card-sheen press reveal group flex flex-col p-6",
                // Henüz sunulmayan hizmet: renkli vurgular griye çekilir.
                // Opaklık düşürülmez — metin kontrastı bozulmasın (a11y).
                h.yakinda && "card-yakinda",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "icon-box",
                    h.yakinda && "bg-surface-3 text-ink-muted",
                  )}
                >
                  <Icon aria-hidden />
                </span>
                {h.yakinda && (
                  <span className="rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-muted">
                    {genel.yakinda}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg">{h.name}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">
                {h.description}
              </p>
              {h.yakinda && (
                <p className="mt-3 text-xs text-ink-muted">{t.yakindaNot}</p>
              )}
              <span
                className={cn(
                  "mt-5 inline-flex items-center gap-1.5 text-sm font-medium",
                  h.yakinda ? "text-ink-muted" : "text-accent",
                )}
              >
                {/* Anchor text hedef kelimeyi taşır; "Detaylar" hiçbir
                    arama sinyali vermiyordu (denetim 1.B.9). */}
                {h.linkAdi}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

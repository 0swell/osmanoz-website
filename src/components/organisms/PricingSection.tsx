import { Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal } from "@/components/atoms/Button";
import { Section } from "@/components/atoms/Section";
import { whatsappMesaj, whatsappUrl } from "@/config/nav";
import type { Dil } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { formatTL, getPaketler } from "@/lib/content";
import { cn } from "@/utils/cn";

export function PricingSection({ dil }: { dil: Dil }) {
  const t = s(dil).fiyat;
  const genel = s(dil).genel;

  /** Henüz sunulmayan paket en sonda durur. */
  const siraliPaketler = [...getPaketler(dil)].sort(
    (a, b) => Number(Boolean(a.yakinda)) - Number(Boolean(b.yakinda)),
  );

  return (
    <Section
      id="fiyatlar"
      eyebrow={t.eyebrow}
      title={t.baslik}
      lead={t.giris}
      className="section-glow border-y border-border bg-surface-2"
    >
      <div className="stagger grid gap-4 lg:grid-cols-3">
        {siraliPaketler.map((p) => (
          <div
            key={p.ad}
            className={cn(
              "card-glass card-sheen reveal flex flex-col p-6",
              p.one_cikan
                ? "border-accent/40 shadow-deep lg:-translate-y-4"
                : "card-hover",
              // Henüz sunulmayan paket: kesikli kenar + gri vurgu.
              // Opaklık düşürülmez, metin okunur kalır.
              p.yakinda && "card-yakinda",
            )}
          >
            {p.one_cikan && (
              <span className="mb-3 self-start rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                {t.encokTercih}
              </span>
            )}
            {!p.one_cikan && p.rozet && (
              <span className="mb-3 self-start rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-muted">
                {p.rozet}
              </span>
            )}
            {p.yakinda && (
              <span className="mb-3 self-start rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-muted">
                {genel.yakinda}
              </span>
            )}

            <h3 className="text-lg">{p.ad}</h3>
            <p className="mt-1 text-sm text-ink-muted">{p.ozet}</p>

            <p className="mt-5 flex items-baseline gap-1.5">
              {p.fiyat ? (
                <>
                  <span
                    className={cn(
                      "font-display text-3xl font-semibold",
                      p.yakinda ? "text-ink-muted" : "text-ink",
                    )}
                  >
                    {formatTL(p.fiyat, dil)} {t.paraBirimi}
                  </span>
                  <span className="text-xs text-ink-muted">{p.fiyatNot}</span>
                </>
              ) : (
                <span className="font-display text-2xl font-semibold text-ink-muted">
                  {p.fiyatNot}
                </span>
              )}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {p.kapsam.map((k) => (
                <li key={k} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      p.yakinda ? "text-ink-muted" : "text-accent",
                    )}
                    aria-hidden
                  />
                  {k}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {p.yakinda ? (
                /* Sunulmayan paket: buton görünümünde ama edilgen.
                   Tıklanamaz ve hover tepkisi vermez — okuyucuya "bu henüz
                   yok" bilgisini vermek dışında bir işlevi yok. */
                <span
                  aria-disabled="true"
                  className="flex w-full items-center justify-center rounded-(--radius) border border-border-strong bg-surface-3 px-5 py-2.5 text-sm font-medium text-ink-muted select-none"
                >
                  {genel.yakinda}
                </span>
              ) : (
                <ButtonExternal
                  href={whatsappUrl(whatsappMesaj(dil, "pricing"))}
                  className="w-full"
                >
                  <FaWhatsapp className="size-4" aria-hidden />
                  {t.teklifAlin}
                </ButtonExternal>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-muted">{t.dipnot}</p>
    </Section>
  );
}

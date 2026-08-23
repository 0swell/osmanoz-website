import { ArrowRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal, ButtonLink } from "@/components/atoms/Button";
import { Section } from "@/components/atoms/Section";
import { whatsappUrl } from "@/config/nav";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { formatTL, getPaketler, paketIndeksi } from "@/lib/content";
import { cn } from "@/utils/cn";

/**
 * Hizmet sayfasının kapanışı: solda karar metni, sağda o hizmete ait TEK
 * fiyat kartı.
 *
 * Tüm paket tablosu yerine yalnızca ilgili paket gösteriliyor — ziyaretçi
 * zaten o hizmetin sayfasında, üç paketi tekrar taratmak kararı zorlaştırır.
 * Tam liste `/fiyatlar` sayfasında.
 */
export function ServicePricing({
  slug,
  dil,
  waMesaj,
}: {
  slug: string;
  dil: Dil;
  waMesaj: string;
}) {
  const t = s(dil);
  const paket = getPaketler(dil)[paketIndeksi[slug]];
  if (!paket) return null;

  return (
    <Section className="border-t border-border">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
        {/* Sol: karar metni */}
        <div className="reveal">
          <p className="eyebrow">{t.kapanis.eyebrow}</p>
          <h2 className="mt-2.5 text-2xl sm:text-[2rem]">{t.kapanis.baslik}</h2>
          <p className="mt-3 max-w-xl text-ink-soft">{t.kapanis.giris}</p>

          <ul className="mt-6 space-y-2.5">
            {t.kapanis.maddeler.map((m) => (
              <li key={m} className="flex gap-2.5 text-sm text-ink-soft">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  aria-hidden
                />
                {m}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonExternal href={whatsappUrl(waMesaj)} size="lg">
              <FaWhatsapp className="size-5" aria-hidden />
              {t.genel.whatsapptanYazin}
            </ButtonExternal>
            <ButtonLink
              href={yol("iletisim", dil)}
              variant="secondary"
              size="lg"
            >
              {t.kapanis.iletisimBilgileri}
            </ButtonLink>
          </div>
        </div>

        {/* Sağ: bu hizmete ait tek paket */}
        <div
          className={cn(
            "card-glass card-sheen reveal flex flex-col p-6",
            paket.yakinda && "card-yakinda",
          )}
        >
          {paket.yakinda && (
            <span className="mb-3 self-start rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-muted">
              {t.genel.yakinda}
            </span>
          )}

          <h3 className="text-lg">{paket.ad}</h3>
          <p className="mt-1 text-sm text-ink-muted">{paket.ozet}</p>

          {paket.fiyat && (
            <p className="mt-5 flex items-baseline gap-1.5">
              <span
                className={cn(
                  "font-display text-3xl font-semibold",
                  paket.yakinda ? "text-ink-muted" : "text-ink",
                )}
              >
                {formatTL(paket.fiyat, dil)} {t.fiyat.paraBirimi}
              </span>
              <span className="text-xs text-ink-muted">{paket.fiyatNot}</span>
            </p>
          )}

          <ul className="mt-5 flex-1 space-y-2.5">
            {paket.kapsam.map((k) => (
              <li key={k} className="flex gap-2.5 text-sm text-ink-soft">
                <Check
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    paket.yakinda ? "text-ink-muted" : "text-accent",
                  )}
                  aria-hidden
                />
                {k}
              </li>
            ))}
          </ul>

          <ButtonLink
            href={yol("fiyatlar", dil)}
            variant="secondary"
            className="mt-6 w-full"
          >
            {t.fiyat.tumPaketler}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

import { Section } from "@/components/atoms/Section";
import type { Dil } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { getSss } from "@/lib/content";
import { vurgula } from "@/utils/vurgu";

/**
 * SSS — <details>/<summary> ile açılır-kapanır.
 *
 * Neden JS'siz: içerik HTML'de hazır gelir, Google ve YZ botları kapalı
 * bölümleri de okur (CLAUDE.md §5.3). Klavye ile açılır, ek erişilebilirlik
 * kodu gerekmez. FAQPage schema'sı bu listeden üretilir — schema'daki her
 * soru sayfada görünür olmak zorunda.
 */
export function FaqSection({ dil }: { dil: Dil }) {
  const t = s(dil).sss;
  const sorular = getSss(dil);

  return (
    <Section id="sss" eyebrow={t.eyebrow} title={t.baslik} lead={t.giris}>
      <div className="card reveal mx-auto max-w-3xl divide-y divide-border overflow-hidden shadow-card">
        {sorular.map((item, i) => (
          <details
            key={item.soru}
            name="sss"
            open={i === 0}
            className="group px-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-medium">{item.soru}</h3>
              <span
                aria-hidden
                className="relative grid size-6 shrink-0 place-items-center text-accent"
              >
                <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                <span className="absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="pb-5 text-sm text-ink-soft sm:text-base">
              {vurgula(item.cevap)}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

import { Search, Trophy, TrendingUp } from "lucide-react";

import { Section } from "@/components/atoms/Section";
import type { Dil } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { vurgula } from "@/utils/vurgu";

/**
 * Görünürlük bölümü — hedefe giden üç adım.
 *
 * Not: Bölüm önce "sorun" çerçevesindeydi ("Google sizi göstermiyor").
 * Ziyaretçiyi eksiğiyle karşılamak yerine hedefiyle karşılamak üzere
 * çözüm diline çevrildi; ilk kart (arama anı) bilinçli olarak korundu,
 * çünkü satın alma kararının verildiği an orası.
 */
const ikonlar = [Search, TrendingUp, Trophy];

export function ProblemSection({ dil }: { dil: Dil }) {
  const t = s(dil).gorunurluk;

  return (
    <Section
      eyebrow={t.eyebrow}
      title={t.baslik}
      lead={t.giris}
      className="section-glow border-y border-border bg-surface-2"
    >
      <ol className="stagger grid gap-4 sm:grid-cols-3">
        {t.adimlar.map((adim, i) => {
          const Icon = ikonlar[i] ?? Search;
          return (
            <li
              key={adim.baslik}
              className="card-glass card-hover card-sheen reveal relative p-6"
            >
              <span
                aria-hidden
                className="absolute top-4 right-5 font-display text-5xl leading-none font-semibold text-surface-3"
              >
                {i + 1}
              </span>
              <span className="icon-box">
                <Icon aria-hidden />
              </span>
              <h3 className="mt-3.5 text-base font-semibold">{adim.baslik}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                {vurgula(adim.metin, "text-accent")}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

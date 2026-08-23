import { MapPin } from "lucide-react";

import { Section } from "@/components/atoms/Section";
import type { Dil } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

/**
 * Hizmet bölgesi — şehir başına ayrı sayfa açılmaz (CLAUDE.md §4.2).
 * Isparta ve Antalya yalnızca burada, schema'da ve iletişim sayfasında geçer.
 * Bu bölüm kaldırılmaz: schema'daki `areaServed` "yalnızca görünen bilgi"
 * kuralına buradan dayanıyor (CLAUDE.md §12).
 */
export function AreaSection({ dil }: { dil: Dil }) {
  const t = s(dil).bolge;

  return (
    <Section eyebrow={t.eyebrow} title={t.baslik} lead={t.giris}>
      <ul className="stagger grid gap-4 sm:grid-cols-3">
        {t.kartlar.map((b, i) => {
          const ana = i === 0;
          return (
            <li
              key={b.sehir}
              className={
                ana
                  ? "card card-hover card-sheen reveal border-accent/35 bg-accent-soft p-6"
                  : "card card-hover card-sheen reveal p-6"
              }
            >
              <span
                className={
                  ana ? "icon-box" : "icon-box bg-surface-3 text-ink-muted"
                }
              >
                <MapPin aria-hidden />
              </span>
              <h3 className="mt-3.5 text-lg">{b.sehir}</h3>
              <p className="mt-1 text-sm text-ink-soft">{b.detay}</p>
              <p className="mt-2.5 text-xs font-medium text-ink-muted">
                {b.yakin}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

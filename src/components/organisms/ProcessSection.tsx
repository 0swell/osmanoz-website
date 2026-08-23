import { Section } from "@/components/atoms/Section";
import type { Dil } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { getSurec } from "@/lib/content";

export function ProcessSection({ dil }: { dil: Dil }) {
  const t = s(dil).surec;
  const adimlar = getSurec(dil);

  return (
    <Section eyebrow={t.eyebrow} title={t.baslik} lead={t.giris}>
      <ol className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adimlar.map((a) => (
          <li key={a.adim} className="card card-hover card-sheen reveal p-6">
            {/* Numara kartın İÇİNDE durur. Daha önce `-top-3.5` ile dışarı
                taşıyordu ve card-sheen'in overflow:hidden'ı rakamı kesiyordu. */}
            <span
              aria-hidden
              className="mb-3.5 grid size-9 place-items-center rounded-full bg-accent font-display text-sm leading-none font-semibold text-on-accent shadow-(--shadow-accent)"
            >
              {a.adim}
            </span>
            <h3 className="text-base font-semibold">{a.baslik}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{a.aciklama}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

import { vurgula } from "@/utils/vurgu";

/**
 * Açılır-kapanır bölüm listesi (CLAUDE.md §5.3).
 *
 * `<details>`/`<summary>` ile kurulur — JavaScript yok, klavye ile açılır.
 * Kapalı bölümlerin metni DOM'da durduğu için Google ve YZ botları hepsini
 * okur; ziyaretçi ise duvar gibi bir metinle karşılaşmaz.
 *
 * `name` aynı olduğunda tarayıcı aynı anda tek bölüm açık tutar (exclusive
 * accordion). İlk bölüm açık gelir: snippet adayı cevap görünür olsun.
 */
export function Akordiyon({
  bolumler,
  ad,
  baslikSeviyesi = "h2",
}: {
  bolumler: readonly { baslik: string; metin: string }[];
  /** Aynı sayfadaki başka bir akordiyonla çakışmasın diye benzersiz ad. */
  ad: string;
  baslikSeviyesi?: "h2" | "h3";
}) {
  const Baslik = baslikSeviyesi;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-(--radius) border border-border bg-surface shadow-card">
      {bolumler.map((b, i) => (
        <details key={b.baslik} name={ad} open={i === 0} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <Baslik className="text-base font-medium text-ink sm:text-lg">
              {b.baslik}
            </Baslik>
            <span
              aria-hidden
              className="relative grid size-6 shrink-0 place-items-center text-accent"
            >
              <span className="absolute h-0.5 w-3.5 rounded bg-current" />
              <span className="absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="pb-5 text-sm text-ink-soft sm:text-base">
            {vurgula(b.metin)}
          </p>
        </details>
      ))}
    </div>
  );
}

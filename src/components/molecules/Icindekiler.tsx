"use client";

/**
 * Blog yazısının içindekiler listesi (CLAUDE.md §5.3).
 *
 * Bölümler `<details name=...>` ile kurulu bir akordiyon; tarayıcı aynı anda
 * tek bölüm açık tutuyor. Bu yüzden düz bir `#bağlantı` kapalı bölüme gidince
 * hiçbir şey açılmıyordu. Buradaki tıklama hedef `<details>` etiketini açıp
 * oraya kaydırıyor — bu yüzden bileşen istemci tarafında çalışıyor.
 *
 * Bağlantılar gerçek `<a href="#...">` olarak basılır: JavaScript çalışmasa
 * da (ve tarayıcısız botlarda) liste yine gezinilebilir kalır.
 */
export function Icindekiler({
  baslik,
  bolumler,
  idOnEki,
}: {
  baslik: string;
  bolumler: readonly { baslik: string }[];
  idOnEki: string;
}) {
  function ac(olay: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const hedef = document.getElementById(id);
    if (!(hedef instanceof HTMLDetailsElement)) return;

    olay.preventDefault();
    hedef.open = true;

    // Hareket azaltma tercihi olan kullanıcıda yumuşak kaydırma yapılmaz.
    const azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    hedef.scrollIntoView({ behavior: azalt ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav aria-label={baslik} className="card p-5">
      <h2 className="text-sm font-semibold text-ink">{baslik}</h2>
      <ol className="mt-3 space-y-1 text-sm">
        {bolumler.map((b, i) => (
          <li key={b.baslik} className="flex gap-2.5">
            <span aria-hidden className="text-ink-muted tabular-nums">
              {i + 1}.
            </span>
            <a
              href={`#${idOnEki}-${i}`}
              onClick={(e) => ac(e, `${idOnEki}-${i}`)}
              className="text-ink-soft transition-colors hover:text-accent"
            >
              {b.baslik}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

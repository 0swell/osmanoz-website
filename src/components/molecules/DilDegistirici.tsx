"use client";

import Link from "next/link";
import { useEffect } from "react";

import type { Dil, RotaAnahtari } from "@/i18n/diller";
import { rotalar } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

/**
 * TR | EN — bulunduğu sayfanın diğer dildeki karşılığına gider, ana sayfaya
 * atmaz (CLAUDE.md §5.4).
 *
 * Bayrak KULLANILMAZ: bayrak dili değil ülkeyi temsil eder; Almanya'daki
 * Türkçe konuşan ziyaretçi için yanıltıcı olur.
 *
 * Renk `ink-soft`: navbar sayfa başındayken saydam, altındaki turuncu
 * ışımanın üzerinde `ink-muted` yeterli kontrast vermiyordu.
 *
 * Seçim `localStorage`'a yazılır. Otomatik yönlendirme YAPILMAZ — arama
 * motoru botunu yanlış dile atmak indekslemeyi bozar; kayıt yalnızca ileride
 * bir tercih hatırlatması gerekirse diye tutuluyor.
 */
export function DilDegistirici({
  dil,
  rota,
}: {
  dil: Dil;
  rota: RotaAnahtari;
}) {
  const hedefDil: Dil = dil === "tr" ? "en" : "tr";
  const hedefYol = rotalar[rota][hedefDil];

  useEffect(() => {
    try {
      window.localStorage.setItem("dil", dil);
    } catch {
      // Gizli sekmede localStorage kapalı olabilir — sessiz geç.
    }
  }, [dil]);

  return (
    <Link
      href={hedefYol}
      hrefLang={hedefDil}
      aria-label={s(dil).genel.dilDegistir}
      className="press flex min-h-11 items-center gap-1 rounded-(--radius) px-2 text-[0.9rem] font-medium text-ink-soft hover:bg-surface-2"
    >
      <span className={dil === "tr" ? "text-ink" : undefined}>TR</span>
      <span aria-hidden className="text-border-strong">
        |
      </span>
      <span className={dil === "en" ? "text-ink" : undefined}>EN</span>
    </Link>
  );
}

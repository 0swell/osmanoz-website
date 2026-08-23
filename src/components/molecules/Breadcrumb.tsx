import Link from "next/link";

import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

/**
 * Görünür breadcrumb.
 *
 * Neden zorunlu: sayfalarda `BreadcrumbList` JSON-LD basılıyor ve Google'ın
 * yapısal veri kuralı "schema görünür içeriği temsil etmeli" diyor. Şema var
 * ama görünürü yoksa madde ihlal sayılıyor (denetim 1.B.8 / 3.B.4b).
 * Ayrıca SERP'te URL yerine breadcrumb gösterildiği için tıklama oranını
 * yükseltir.
 */
export function Breadcrumb({
  dil,
  simdiki,
}: {
  dil: Dil;
  /** Bulunduğunuz sayfanın adı — link değil, son eleman. */
  simdiki: string;
}) {
  const t = s(dil);

  return (
    <nav aria-label={t.hizmetSayfa.konum} className="text-sm text-ink-muted">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            href={yol("anasayfa", dil)}
            className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
          >
            {t.hizmetSayfa.anaSayfa}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="text-ink-soft">{simdiki}</li>
      </ol>
    </nav>
  );
}

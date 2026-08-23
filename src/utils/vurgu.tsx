import { Fragment, type ReactNode } from "react";

/**
 * İçerik dosyalarındaki `**vurgu**` işaretlerini `<strong>` olarak basar.
 *
 * Neden: önemli tanımların kalın olması hem okumayı kolaylaştırıyor hem de
 * cevap motorlarının hangi kısmın çekirdek bilgi olduğunu ayırmasına yarıyor
 * (CLAUDE.md §10, AEO 4). Tam bir markdown çözümleyici gerekmiyor —
 * içerikte yalnızca bu tek işaret kullanılıyor.
 */
export function vurgula(metin: string, renk = "text-ink"): ReactNode {
  const parcalar = metin.split(/\*\*(.+?)\*\*/g);
  return parcalar.map((p, i) =>
    // Tek indeksler yakalanan gruptur → vurgulanacak kısım
    i % 2 === 1 ? (
      <strong key={i} className={`font-semibold ${renk}`}>
        {p}
      </strong>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

/** Schema ve `alt` gibi düz metin gereken yerler için işaretleri temizler. */
export function duzMetin(metin: string): string {
  return metin.replace(/\*\*(.+?)\*\*/g, "$1");
}

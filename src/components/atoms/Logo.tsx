import { cn } from "@/utils/cn";

/**
 * Marka işareti — şimdilik monogram.
 *
 * TODO: Gerçek logo hazırlanınca burası değişecek; tek yerden güncellensin
 * diye ayrı bileşen yapıldı. Yerine `next/image` ile SVG konulacak,
 * çağıran taraflarda değişiklik gerekmez.
 *
 * Kömür zemin bilinçli: turuncu vurgu rengi CTA'lara ayrıldı, logo da
 * turuncu olsaydı sayfadaki eylem çağrılarıyla yarışırdı.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-[0.6rem] bg-brand",
        "font-display text-[0.95rem] leading-none font-semibold text-on-brand",
        "shadow-soft transition-transform duration-300 group-hover:-rotate-3",
        className,
      )}
    >
      OÖ
    </span>
  );
}

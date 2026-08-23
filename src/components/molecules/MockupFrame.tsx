import type { ReactNode } from "react";

/**
 * Laptop + telefon çerçevesi. İçerik gerçek DOM olarak çizilir — ekran
 * görüntüsü kullanılmaz, böylece her boyutta net görünür ve dosya indirmez.
 */
export function MockupFrame({
  ekran,
  telefon,
}: {
  ekran: ReactNode;
  telefon: ReactNode;
}) {
  return (
    <div className="relative [perspective:1400px]">
      {/* Laptop */}
      <div className="overflow-hidden rounded-t-xl border-4 border-b-0 border-ink bg-ink shadow-deep">
        {/* Tarayıcı çubuğu */}
        <div className="flex items-center gap-1.5 px-3 py-2">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="ml-2 h-4 flex-1 rounded bg-white/10" />
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-white">{ekran}</div>
      </div>
      {/* Laptop alt gövdesi */}
      <div className="mx-auto h-2.5 w-[108%] -translate-x-[3.7%] rounded-b-lg bg-ink shadow-lift" />

      {/* Telefon — laptopun sağ altına taşar, düz ızgarayı kırar */}
      <div className="absolute -right-2 -bottom-6 w-[26%] max-w-[7.5rem] overflow-hidden rounded-[1.1rem] border-4 border-ink bg-ink shadow-deep sm:-right-5">
        <div className="flex justify-center py-1">
          <span className="h-1 w-8 rounded-full bg-white/25" />
        </div>
        <div className="aspect-[9/17] overflow-hidden bg-white">{telefon}</div>
      </div>
    </div>
  );
}

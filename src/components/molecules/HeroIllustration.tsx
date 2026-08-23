import type { Dil } from "@/i18n/diller";
import { s as sozluk } from "@/i18n/sozluk";

/**
 * Hero'nun sağındaki üç hizmeti tasvir eden çizim.
 *
 * Kod ile çizildi; görsel dosyası indirilmez, tema değişince renkler de
 * değişir ve LCP'ye yük binmez. Mobil uygulama katmanı bilinçli olarak gri —
 * başlıktaki "mobil uygulama" ve kartlardaki "Yakında" ile aynı ton.
 *
 * Metin akışının dışında, mutlak konumda durur — grid kolonu olarak
 * eklendiğinde başlığı daraltıp satır sayısını artırıyordu. Metin bloğu
 * `z-10` ile üstte kaldığı için çizim onun arkasında görünür.
 */
export function HeroIllustration({ dil }: { dil: Dil }) {
  const yakinda = sozluk(dil).genel.yakinda;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-24 right-0 z-0 hidden h-[24rem] w-[17rem] select-none xl:block 2xl:right-8"
    >
      {/* --- Web sitesi: tarayıcı penceresi --- */}
      <div className="animate-[yuz_7s_ease-in-out_infinite] absolute top-0 right-4 w-[13.5rem] rotate-[-4deg]">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-lift">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-3 py-2">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="size-1.5 rounded-full bg-border-strong" />
            <span className="size-1.5 rounded-full bg-border-strong" />
            <span className="ml-1.5 h-2 flex-1 rounded-full bg-surface-3" />
          </div>
          <div className="space-y-2 p-3.5">
            <div className="h-2.5 w-2/3 rounded bg-accent/70" />
            <div className="h-1.5 w-full rounded bg-surface-3" />
            <div className="h-1.5 w-4/5 rounded bg-surface-3" />
            <div className="mt-3 flex gap-1.5">
              <div className="h-5 w-16 rounded-md bg-accent" />
              <div className="h-5 w-12 rounded-md border border-border bg-surface-2" />
            </div>
          </div>
        </div>
      </div>

      {/* --- İşletme yazılımı: mini panel + sütun grafik --- */}
      <div className="animate-[yuz_9s_ease-in-out_infinite_0.8s] absolute top-[8rem] left-0 w-[12rem] rotate-[3deg]">
        <div className="rounded-xl border border-border bg-surface p-3.5 shadow-lift">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="h-1.5 w-14 rounded bg-surface-3" />
            <div className="rounded-full bg-accent-soft px-1.5 py-0.5">
              <div className="h-1 w-6 rounded bg-accent/70" />
            </div>
          </div>
          <div className="flex h-16 items-end gap-1.5">
            {[38, 62, 45, 78, 92, 70].map((h, i) => (
              <div
                key={i}
                className={
                  "flex-1 rounded-t " + (i === 4 ? "bg-accent" : "bg-accent/25")
                }
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 border-t border-border pt-2.5">
            <span className="size-1.5 rounded-full bg-success" />
            <div className="h-1.5 w-20 rounded bg-surface-3" />
          </div>
        </div>
      </div>

      {/* --- Mobil uygulama: telefon (gri — henüz sunulmuyor) --- */}
      <div className="animate-[yuz_8s_ease-in-out_infinite_0.4s] absolute right-1 bottom-4 w-[4.75rem] rotate-[7deg]">
        {/* Telefon oranı: dar gövde, yüksek ekran (9:19), kalın yuvarlak köşe */}
        <div className="rounded-[1.35rem] border-2 border-dashed border-border-strong bg-surface p-[3px] shadow-card">
          <div className="flex h-[9.5rem] flex-col overflow-hidden rounded-[1.15rem] bg-surface-2 px-1.5 py-2">
            {/* Çentik */}
            <div className="mx-auto mb-2 h-[3px] w-6 rounded-full bg-border-strong" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-surface-3" />
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 rounded border border-border bg-surface p-1"
                >
                  <span className="size-2 rounded-sm bg-surface-3" />
                  <div className="h-1 flex-1 rounded bg-surface-3" />
                </div>
              ))}
            </div>
            <div className="mt-auto space-y-2 pt-2">
              <div className="h-3.5 rounded bg-ink-muted/35" />
              {/* Ana ekran çizgisi */}
              <div className="mx-auto h-[3px] w-8 rounded-full bg-border-strong" />
            </div>
          </div>
        </div>
        {/* "Yakında" işareti */}
        <div className="mt-1.5 text-center">
          <span className="rounded-full border border-border-strong bg-surface px-2 py-0.5 text-[0.6rem] font-medium text-ink-muted">
            {yakinda}
          </span>
        </div>
      </div>
    </div>
  );
}

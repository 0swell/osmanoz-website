import { Section } from "@/components/atoms/Section";
import type { Dil } from "@/i18n/diller";
import { vitrin } from "@/i18n/vitrin";
import { MockupFrame } from "@/components/molecules/MockupFrame";
import {
  PanelRandevu,
  PanelRapor,
  PanelStok,
} from "@/components/molecules/MockupPanels";
import {
  EkranKafe,
  EkranKuafor,
  TelefonKafe,
  TelefonKuafor,
  TelefonMarket,
} from "@/components/molecules/MockupScreens";

/**
 * Hizmet sayfasındaki görsel bölüm.
 *
 * Sayfalar düz metin duvarıydı; her hizmet kendi ekranıyla anlatılıyor.
 * Ekranlar kod ile çizilir — görsel dosyası indirilmez, her boyutta net kalır
 * ve LCP'ye yük bindirmez.
 */

/** Telefon çerçevesi — tek başına, laptop olmadan. */
function TelefonCerceve({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[8.5rem] overflow-hidden rounded-[1.4rem] border-4 border-ink bg-ink shadow-deep sm:w-[9.5rem]">
      <div className="flex justify-center py-1">
        <span className="h-1 w-9 rounded-full bg-white/25" aria-hidden />
      </div>
      <div className="aspect-[9/17] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

/** Panel çerçevesi — masaüstü uygulama ekranı. */
function PanelCerceve({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-(--radius) border border-border bg-surface shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-3 py-2">
        <span className="size-2 rounded-full bg-border-strong" aria-hidden />
        <span className="size-2 rounded-full bg-border-strong" aria-hidden />
        <span className="size-2 rounded-full bg-border-strong" aria-hidden />
      </div>
      <div className="aspect-[4/3]">{children}</div>
    </div>
  );
}

export function ServiceShowcase({
  slug,
  dil,
}: {
  slug: string;
  dil: Dil;
}) {
  const t = vitrin(dil);
  if (slug === "burdur-web-sitesi") {
    return (
      <Section
        eyebrow={t.eyebrow}
        title={t.web.baslik}
        lead={t.web.giris}
        className="section-glow border-y border-border bg-surface-2"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <figure className="reveal pb-8">
            <MockupFrame ekran={<EkranKafe />} telefon={<TelefonKafe />} />
            <figcaption className="mt-8 text-sm text-ink-muted">
              {t.web.kafe}
            </figcaption>
          </figure>
          <figure className="reveal pb-8">
            <MockupFrame ekran={<EkranKuafor />} telefon={<TelefonKuafor />} />
            <figcaption className="mt-8 text-sm text-ink-muted">
              {t.web.kuafor}
            </figcaption>
          </figure>
        </div>
      </Section>
    );
  }

  if (slug === "burdur-isletme-yazilimi") {
    return (
      <Section
        eyebrow={t.eyebrow}
        title={t.isletme.baslik}
        lead={t.isletme.giris}
        className="section-glow border-y border-border bg-surface-2"
      >
        <div className="stagger grid gap-5 md:grid-cols-3">
          <figure className="reveal">
            <PanelCerceve>
              <PanelRandevu />
            </PanelCerceve>
            <figcaption className="mt-3 text-sm text-ink-muted">
              {t.isletme.randevu}
            </figcaption>
          </figure>
          <figure className="reveal">
            <PanelCerceve>
              <PanelStok />
            </PanelCerceve>
            <figcaption className="mt-3 text-sm text-ink-muted">
              {t.isletme.stok}
            </figcaption>
          </figure>
          <figure className="reveal">
            <PanelCerceve>
              <PanelRapor />
            </PanelCerceve>
            <figcaption className="mt-3 text-sm text-ink-muted">
              {t.isletme.rapor}
            </figcaption>
          </figure>
        </div>
      </Section>
    );
  }

  if (slug === "burdur-mobil-uygulama") {
    return (
      <Section
        eyebrow={t.eyebrow}
        title={t.mobil.baslik}
        lead={t.mobil.giris}
        className="section-glow border-y border-border bg-surface-2"
      >
        <div className="reveal mx-auto max-w-md">
          <TelefonCerceve>
            <TelefonMarket />
          </TelefonCerceve>
          <p className="mt-6 text-center text-sm text-ink-muted">
            {t.mobil.market}
          </p>
        </div>
      </Section>
    );
  }

  return null;
}

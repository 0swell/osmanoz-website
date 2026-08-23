"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import type { Dil } from "@/i18n/diller";
import { s as sozluk } from "@/i18n/sozluk";

/**
 * Başa dön butonu (CLAUDE.md §5.4).
 * WhatsApp butonunun hemen üstünde durur; ikisi çakışmasın diye
 * konumu ona göre hesaplanmıştır.
 */
export function ScrollToTop({ dil }: { dil: Dil }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label={sozluk(dil).genel.yukariCik}
      className={
        "press fixed right-4 bottom-21 z-50 grid size-11 animate-[rise_0.3s_cubic-bezier(0.22,1,0.36,1)_both] " +
        "place-items-center rounded-full border border-border bg-surface text-ink-soft shadow-lift " +
        "hover:text-accent sm:right-6 sm:bottom-23"
      }
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}

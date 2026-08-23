"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { Logo } from "@/components/atoms/Logo";
import { DilDegistirici } from "@/components/molecules/DilDegistirici";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { navItems, whatsappUrl, whatsappMesaj } from "@/config/nav";
import { siteConfig } from "@/config/site";
import type { Dil, RotaAnahtari } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { cn } from "@/utils/cn";

/**
 * Sağ blok sırası (kullanıcı kararı): iletişim → turuncu ayraç →
 * dil tuşu → tema tuşu → WhatsApp.
 */
export function Navbar({ dil, rota }: { dil: Dil; rota: RotaAnahtari }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = s(dil);
  const menu = navItems(dil);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);
  const acmaTusuRef = useRef<HTMLButtonElement>(null);

  // Menü açıkken arka plan kaymasın
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Menü açıkken Escape kapatır ve odak menü içinde döner.
   * Arka plan kaydırma kilitliyken odağın menü dışına çıkması,
   * klavye kullanıcısını göremediği bir alana hapsediyordu.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        acmaTusuRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;

      const odaklanabilir = menuRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (odaklanabilir.length === 0) return;

      const ilk = odaklanabilir[0];
      const son = odaklanabilir[odaklanabilir.length - 1];

      if (e.shiftKey && document.activeElement === ilk) {
        e.preventDefault();
        son.focus();
      } else if (!e.shiftKey && document.activeElement === son) {
        e.preventDefault();
        ilk.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "glass border-border shadow-soft"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label={t.genel.anaMenu}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Marka */}
        <Link
          href={yol("anasayfa", dil)}
          className="group flex items-center gap-2.5 text-ink"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">
              {siteConfig.personName}
            </span>
            <span className="hidden text-[0.78rem] font-normal text-ink-muted sm:inline">
              {t.nav.unvan}
            </span>
          </span>
        </Link>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-1 md:flex">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="press rounded-(--radius) px-3 py-2 text-[0.95rem] text-ink-soft hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {/* İletişim ile dil tuşu arasındaki turuncu dikey ayraç */}
          <span
            aria-hidden
            className="mr-1 hidden h-5 w-px bg-accent md:block"
          />

          <DilDegistirici dil={dil} rota={rota} />
          <ThemeToggle dil={dil} />

          <a
            href={whatsappUrl(whatsappMesaj(dil))}
            target="_blank"
            rel="noopener noreferrer"
            className="press hidden min-h-11 items-center gap-2 rounded-(--radius) bg-accent px-4 py-2.5 text-[0.95rem] font-medium text-on-accent shadow-(--shadow-accent) hover:bg-wa sm:inline-flex"
          >
            <FaWhatsapp className="size-4" aria-hidden />
            {t.genel.whatsapp}
          </a>

          {/* Mobil menü tuşu */}
          <button
            ref={acmaTusuRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? t.genel.menuKapat : t.genel.menuAc}
            className="press grid size-11 cursor-pointer place-items-center rounded-(--radius) text-ink-soft hover:bg-surface-2 hover:text-ink md:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobil menü */}
      {open && (
        <div
          ref={menuRef}
          id="mobil-menu"
          className="glass border-t border-border shadow-lift md:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-5 py-3 sm:px-8">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-border/60 text-[1.05rem] text-ink-soft transition-colors last:border-0 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={whatsappUrl(whatsappMesaj(dil))}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex min-h-12 w-full items-center justify-center gap-2 rounded-(--radius) bg-accent text-[1.05rem] font-medium text-on-accent shadow-(--shadow-accent) hover:bg-wa"
              >
                <FaWhatsapp className="size-5" aria-hidden />
                {t.genel.whatsapptanYazin}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

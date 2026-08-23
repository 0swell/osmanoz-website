"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { whatsappUrl } from "@/config/nav";
import type { Dil } from "@/i18n/diller";

/**
 * Sabit WhatsApp butonu — tüm sayfalarda sağ altta (CLAUDE.md §5.4).
 * Mobilde başparmak erişiminde durması için alt kenara yakın konumlanır.
 *
 * İlk ekranda görünmez; kısa bir kaydırmadan sonra belirir, böylece hero'nun
 * kendi CTA'sıyla yarışmaz. Görünmezken DOM'dan çıkarılır — sadece opaklık
 * düşürülseydi klavye kullanıcısı görünmeyen bir butona odaklanırdı.
 */
export function WhatsAppFab({
  dil,
  message,
}: {
  dil: Dil;
  message?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        dil === "tr" ? "WhatsApp'tan mesaj gönder" : "Send a message on WhatsApp"
      }
      className={
        "fixed right-4 bottom-4 z-50 flex size-14 animate-[rise_0.3s_cubic-bezier(0.22,1,0.36,1)_both] " +
        "items-center justify-center rounded-full bg-wa text-white shadow-deep hover:bg-wa-hover " +
        "transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
      }
    >
      <FaWhatsapp className="size-7" aria-hidden />
    </a>
  );
}

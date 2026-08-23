"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { Dil } from "@/i18n/diller";
import { s as sozluk } from "@/i18n/sozluk";

export function ThemeToggle({ dil }: { dil: Dil }) {
  const t = sozluk(dil).genel;
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Tema sunucuda bilinmez. İlk boyamada hem ikon hem etiket nötr kalır;
  // aksi halde sunucu/istemci HTML'i uyuşmaz (hydration mismatch).
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const label = !mounted
    ? dil === "tr"
      ? "Temayı değiştir"
      : "Change theme"
    : isDark
      ? t.temaAc
      : t.temaKoyu;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="press grid size-11 cursor-pointer place-items-center rounded-(--radius) text-ink-soft hover:bg-surface-2 hover:text-ink"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[18px]" aria-hidden />
        ) : (
          <Moon className="size-[18px]" aria-hidden />
        )
      ) : (
        // Yer tutucu: aynı boyut → tema çözülünce kayma olmaz (CLS = 0)
        <span className="size-[18px]" aria-hidden />
      )}
    </button>
  );
}

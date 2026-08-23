import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/utils/cn";

type Variant = "primary" | "accent" | "whatsapp" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "press inline-flex items-center justify-center gap-2 rounded-(--radius) font-medium " +
  "min-h-11 cursor-pointer select-none " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Kömür — sayfanın ana eylemi
  primary:
    "bg-brand text-on-brand shadow-card hover:bg-brand-deep hover:shadow-lift active:shadow-soft",
  // Turuncu — dönüşüm noktaları (WhatsApp, teklif)
  accent:
    "bg-accent text-on-accent shadow-(--shadow-accent) hover:bg-accent-warm active:shadow-soft",
  // WhatsApp bağlantıları: turuncu durur, üzerine gelince WhatsApp yeşiline döner
  whatsapp:
    "bg-accent text-on-accent shadow-(--shadow-accent) hover:bg-wa hover:shadow-soft active:shadow-soft",
  // Beyaz kart üstünde ikincil
  secondary:
    "border border-border bg-surface text-ink shadow-xs hover:border-border-strong hover:shadow-soft active:shadow-none",
  ghost: "text-ink-soft hover:bg-surface-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Dahili yönlendirme. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Dış bağlantı — WhatsApp, LinkedIn, GitHub. */
export function ButtonExternal({
  href,
  variant = "whatsapp",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"a">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

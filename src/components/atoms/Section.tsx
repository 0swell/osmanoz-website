import type { ReactNode } from "react";

import { Container } from "@/components/atoms/Container";
import { cn } from "@/utils/cn";

/**
 * Bölüm kabuğu. Başlık hiyerarşisini tek yerden yönetir:
 * her bölüm <section> + <h2>, sayfadaki tek <h1> hero'da kalır.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {(eyebrow || title || lead) && (
          <div className={cn("reveal mb-10", align === "center" && "text-center")}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="mt-2.5 text-2xl sm:text-[2rem]">{title}</h2>
            )}
            {lead && (
              <p
                className={cn(
                  "mt-3 max-w-2xl text-base text-ink-soft sm:text-lg",
                  align === "center" && "mx-auto",
                )}
              >
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

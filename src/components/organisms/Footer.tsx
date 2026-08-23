import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

import { Container } from "@/components/atoms/Container";
import { SON_GUNCELLEME, guncellemeMetni } from "@/config/guncelleme";
import { whatsappMesaj, whatsappUrl } from "@/config/nav";
import { getServices, siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { hizmetRotaAnahtari, yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

/**
 * Footer — iki sütun.
 *
 * "Sayfalar" sütunu bilinçli olarak yok: navbar'ın birebir kopyası oluyor ve
 * footer'ı gereksiz uzatıyordu. Gizlilik ve osmanoz.com alt şeride taşındı;
 * hizmet linkleri iç linkleme için (CLAUDE.md §4.3) burada kaldı.
 */
export function Footer({ dil }: { dil: Dil }) {
  const { nap, social, personName, personalSiteUrl, areaServed } = siteConfig;
  const t = s(dil);
  const yil = new Date().getFullYear();

  /** Henüz sunulmayan hizmet listenin en altında durur. */
  const siraliHizmetler = [...getServices(dil)].sort(
    (a, b) => Number(Boolean(a.yakinda)) - Number(Boolean(b.yakinda)),
  );

  return (
    <footer className="mt-auto border-t border-border bg-surface-2">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-16">
          {/* Kimlik + NAP */}
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              {nap.name}
            </p>
            <p className="mt-1.5 max-w-sm text-sm text-ink-soft">
              {areaServed.join(", ")} {t.footer.ozet}
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <a
                href={`tel:${nap.phone}`}
                className="flex min-h-11 items-center gap-2 text-ink-soft transition-colors hover:text-accent"
              >
                <Phone className="size-4" aria-hidden />
                {nap.phone}
              </a>
              <a
                href={`mailto:${nap.email}`}
                className="flex min-h-11 items-center gap-2 text-ink-soft transition-colors hover:text-accent"
              >
                <Mail className="size-4" aria-hidden />
                {nap.email}
              </a>
            </div>

            <div className="mt-3 flex items-center gap-1">
              <a
                href={whatsappUrl(whatsappMesaj(dil))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="press grid size-11 place-items-center rounded-(--radius) text-ink-muted hover:bg-surface hover:text-accent"
              >
                <FaWhatsapp className="size-[18px]" aria-hidden />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="press grid size-11 place-items-center rounded-(--radius) text-ink-muted hover:bg-surface hover:text-accent"
              >
                <FaLinkedin className="size-[18px]" aria-hidden />
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="press grid size-11 place-items-center rounded-(--radius) text-ink-muted hover:bg-surface hover:text-accent"
              >
                <FaGithub className="size-[18px]" aria-hidden />
              </a>
            </div>
          </div>

          {/* Hizmetler — iç linkleme (CLAUDE.md §4.3) */}
          <nav aria-label={t.footer.hizmetler} className="sm:min-w-44">
            <h2 className="text-sm font-semibold text-ink">
              {t.footer.hizmetler}
            </h2>
            <ul className="mt-2">
              {siraliHizmetler.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={yol(hizmetRotaAnahtari[h.slug], dil)}
                    className="flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {h.name}
                    {h.yakinda && (
                      <span className="rounded-full border border-border-strong px-1.5 py-0.5 text-xs text-ink-muted">
                        {t.genel.yakinda}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Alt şerit */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {yil} {personName} — {t.nav.unvan}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={yol("gizlilik", dil)}
              className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
            >
              {t.footer.gizlilik}
            </Link>
            <a
              href={personalSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
            >
              osmanoz.com
            </a>
            <span>{areaServed.join(" · ")}</span>
            {/* Tazelik sinyali — schema dateModified ve sitemap lastmod ile
                aynı tarihi gösterir (bkz. config/guncelleme.ts). */}
            <span>
              {t.footer.sonGuncelleme}:{" "}
              <time dateTime={SON_GUNCELLEME}>{guncellemeMetni(dil)}</time>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

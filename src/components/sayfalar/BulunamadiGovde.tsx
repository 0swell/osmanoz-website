import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal, ButtonLink } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { whatsappMesaj, whatsappUrl } from "@/config/nav";
import { getServices } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { hizmetRotaAnahtari, yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

/**
 * 404 — Next.js'in çıplak varsayılanı yerine marka dilinde bir sayfa.
 * Kaybolan ziyaretçiyi hizmet sayfalarına ve WhatsApp'a yönlendirir; aksi
 * halde geri tuşuna basıp siteden çıkıyor.
 */
export function BulunamadiGovde({ dil }: { dil: Dil }) {
  const t = s(dil);
  const b = t.bulunamadi;

  const linkler = [
    ...getServices(dil).map((h) => ({
      ad: h.name,
      href: yol(hizmetRotaAnahtari[h.slug], dil),
    })),
    { ad: t.nav.fiyatlar, href: yol("fiyatlar", dil) },
    { ad: t.nav.ornekler, href: yol("ornekler", dil) },
    { ad: t.nav.iletisim, href: yol("iletisim", dil) },
  ];

  return (
    <>
      <Navbar dil={dil} rota="anasayfa" />

      <main id="icerik" className="flex flex-1 items-center py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-6xl font-semibold text-accent sm:text-7xl">
              {b.kod}
            </p>
            <h1 className="mt-4 text-[1.9rem] sm:text-[2.5rem]">{b.baslik}</h1>
            <p className="mx-auto mt-3.5 max-w-xl text-base text-ink-soft sm:text-lg">
              {b.metin}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <ButtonLink href={yol("anasayfa", dil)} size="lg">
                <Home className="size-4" aria-hidden />
                {b.anaSayfa}
              </ButtonLink>
              <ButtonExternal
                href={whatsappUrl(whatsappMesaj(dil))}
                variant="secondary"
                size="lg"
              >
                <FaWhatsapp className="size-5" aria-hidden />
                {t.genel.whatsapptanYazin}
              </ButtonExternal>
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <h2 className="text-sm font-semibold text-ink">
                {b.nereyeGidilir}
              </h2>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {linkler.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="press inline-flex min-h-11 items-center gap-1.5 rounded-(--radius) border border-border bg-surface px-3.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
                    >
                      {l.ad}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </main>

      <Footer dil={dil} />
    </>
  );
}

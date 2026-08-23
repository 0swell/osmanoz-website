import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { ContactForm } from "@/components/organisms/ContactForm";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { whatsappMesaj, whatsappUrl } from "@/config/nav";
import { siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { breadcrumbNode, pageGraph, webPageNode } from "@/lib/schema";

export function IletisimGovde({ dil }: { dil: Dil }) {
  const { nap, areaServed } = siteConfig;
  const t = sayfa(dil).iletisim;
  const genel = s(dil);
  const path = yol("iletisim", dil);

  return (
    <>
      <JsonLd
        data={pageGraph([
          webPageNode({
            path,
            name: t.schemaAd,
            description: t.schemaAciklama,
          }),
          breadcrumbNode(path, [
            { name: genel.hizmetSayfa.anaSayfa, path: yol("anasayfa", dil) },
            { name: genel.nav.iletisim, path },
          ]),
        ])}
      />

      <Navbar dil={dil} rota="iletisim" />

      <main id="icerik">
        <section className="border-b border-border pt-10 pb-12 sm:pt-14">
          <Container>
            <h1 className="text-[1.9rem] sm:text-[2.5rem]">{t.h1}</h1>
            <p className="mt-3 max-w-2xl text-base text-ink-soft sm:text-lg">
              {t.giris}
            </p>
          </Container>
        </section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            {/* Form */}
            <div>
              <h2 className="text-xl">{t.formBaslik}</h2>
              <p className="mt-1.5 mb-6 text-sm text-ink-soft">{t.formGiris}</p>
              <ContactForm dil={dil} />
            </div>

            {/* Doğrudan iletişim */}
            <aside className="space-y-4">
              <div className="card card-sheen rounded-(--radius) border-accent/35 bg-accent-soft p-5">
                <h2 className="text-lg">{t.hemenBaslik}</h2>
                <p className="mt-1.5 text-sm text-ink-soft">{t.hemenMetin}</p>
                <ButtonExternal
                  href={whatsappUrl(whatsappMesaj(dil))}
                  size="lg"
                  className="mt-4 w-full"
                >
                  <FaWhatsapp className="size-5" aria-hidden />
                  {genel.genel.whatsapptanYazin}
                </ButtonExternal>
              </div>

              <div className="card card-hover card-sheen p-5">
                <h2 className="text-base font-semibold">{t.bilgilerBaslik}</h2>
                <ul className="mt-3 space-y-3 text-sm">
                  <li>
                    <a
                      href={`tel:${nap.phone}`}
                      className="flex items-center gap-2.5 text-ink-soft transition-colors hover:text-accent"
                    >
                      <Phone className="size-4 shrink-0" aria-hidden />
                      {nap.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${nap.email}`}
                      className="flex items-center gap-2.5 text-ink-soft transition-colors hover:text-accent"
                    >
                      <Mail className="size-4 shrink-0" aria-hidden />
                      {nap.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5 text-ink-soft">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span>
                      {nap.city} {t.merkezli}
                      <br />
                      <span className="text-ink-muted">
                        {areaServed.join(" · ")}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="card card-hover card-sheen p-5">
                <h2 className="text-base font-semibold">{t.saatlerBaslik}</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  {t.gunler}
                  <br />
                  {siteConfig.openingHours.opens} –{" "}
                  {siteConfig.openingHours.closes}
                </p>
                <p className="mt-2.5 text-xs text-ink-muted">
                  {t.saatlerDipnot}
                </p>
              </div>
            </aside>
          </div>
        </Section>
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} />
      <ScrollToTop dil={dil} />
    </>
  );
}

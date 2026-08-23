import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal, ButtonLink } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { whatsappMesaj, whatsappUrl } from "@/config/nav";
import { getEducation, siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { breadcrumbNode, pageGraph, webPageNode } from "@/lib/schema";

/**
 * Teknik derinliğin yer aldığı tek sayfa (CLAUDE.md §1).
 * Diğer sayfalarda teknik terim kullanılmaz; burada yetkinlik kanıtı olarak
 * yer alır — E-E-A-T'nin "uzmanlık" ayağını bu sayfa taşır.
 */
export function HakkimdaGovde({ dil }: { dil: Dil }) {
  const { personName, profileImage, profileImageAlt, social, personalSiteUrl } =
    siteConfig;
  const t = sayfa(dil).hakkimda;
  const genel = s(dil);
  const education = getEducation(dil);
  const path = yol("hakkimda", dil);

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
            { name: genel.nav.hakkimda, path },
          ]),
        ])}
      />

      <Navbar dil={dil} rota="hakkimda" />

      <main id="icerik">
        <section className="border-b border-border pt-10 pb-12 sm:pt-14">
          <Container>
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
              {/* Hero'daki kimlik kartıyla aynı eşmerkezli turuncu halka */}
              <div className="shrink-0 self-start rounded-full p-1 ring-2 ring-accent/45 sm:self-auto">
                <Image
                  src={profileImage}
                  alt={profileImageAlt}
                  width={160}
                  height={160}
                  priority
                  sizes="160px"
                  className="size-32 rounded-full object-cover shadow-soft sm:size-40"
                />
              </div>
              <div>
                <h1 className="text-[1.9rem] sm:text-[2.5rem]">
                  {t.h1Once} {personName}
                </h1>
                <p className="mt-1.5 text-lg text-ink-soft">
                  {genel.nav.unvan}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-(--radius) border border-border px-3.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    <FaLinkedin className="size-4" aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-(--radius) border border-border px-3.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    <FaGithub className="size-4" aria-hidden />
                    GitHub
                  </a>
                  <a
                    href={personalSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-(--radius) border border-border px-3.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    osmanoz.com
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
            <div className="space-y-5 text-base text-ink-soft sm:text-lg">
              <h2 className="text-xl text-ink">{t.nedenBaslik}</h2>
              {t.paragraflar.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}

              <h2 className="pt-3 text-xl text-ink">{t.egitimBaslik}</h2>
              <div className="card card-hover card-sheen not-prose p-5">
                <div className="flex gap-3.5">
                  <GraduationCap
                    className="mt-0.5 size-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <p className="font-medium text-ink">{education.degree}</p>
                    <p className="text-sm text-ink-muted">
                      {education.university}
                    </p>
                    <p className="mt-2.5 text-sm text-ink-soft">
                      {education.ongoing}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="card card-hover card-sheen p-5">
                <h2 className="text-base font-semibold">
                  {t.yetkinlikBaslik}
                </h2>
                <ul className="mt-3.5 space-y-3.5">
                  {t.yetkinlikler.map((y) => (
                    <li key={y.baslik}>
                      <p className="text-sm font-medium text-ink">{y.baslik}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{y.detay}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card card-hover card-sheen p-5">
                <h2 className="flex items-center gap-2 text-base font-semibold">
                  <MapPin className="size-4 text-accent" aria-hidden />
                  {t.bolgeBaslik}
                </h2>
                <p className="mt-2 text-sm text-ink-soft">
                  {siteConfig.areaServed.join(", ")}. {t.bolgeMetin}
                </p>
              </div>

              <div className="card card-sheen rounded-(--radius) border-accent/35 bg-accent-soft p-5">
                <h2 className="text-base font-semibold">
                  {t.konusalimBaslik}
                </h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  {t.konusalimMetin}
                </p>
                <ButtonExternal
                  href={whatsappUrl(whatsappMesaj(dil))}
                  className="mt-4 w-full"
                >
                  <FaWhatsapp className="size-4" aria-hidden />
                  {genel.genel.whatsapp}
                </ButtonExternal>
                <ButtonLink
                  href={yol("iletisim", dil)}
                  variant="secondary"
                  className="mt-2 w-full"
                >
                  {genel.nav.iletisim}
                </ButtonLink>
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

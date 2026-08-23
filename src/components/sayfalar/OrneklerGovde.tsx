import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { MockupFrame } from "@/components/molecules/MockupFrame";
import {
  EkranKafe,
  EkranKuafor,
  EkranMarket,
  TelefonKafe,
  TelefonKuafor,
  TelefonMarket,
} from "@/components/molecules/MockupScreens";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { whatsappUrl } from "@/config/nav";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { breadcrumbNode, pageGraph, webPageNode } from "@/lib/schema";

/** Ekranlar dilden bağımsız; sıra sözlükteki kart sırasıyla aynı. */
const ekranlar = [
  { Ekran: EkranKafe, Telefon: TelefonKafe },
  { Ekran: EkranKuafor, Telefon: TelefonKuafor },
  { Ekran: EkranMarket, Telefon: TelefonMarket },
];

export function OrneklerGovde({ dil }: { dil: Dil }) {
  const t = sayfa(dil).ornekler;
  const genel = s(dil);
  const path = yol("ornekler", dil);

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
            { name: genel.nav.ornekler, path },
          ]),
        ])}
      />

      <Navbar dil={dil} rota="ornekler" />

      <main id="icerik">
        <section className="border-b border-border pt-10 pb-12 sm:pt-14">
          <Container>
            <h1 className="text-[1.9rem] sm:text-[2.5rem]">{t.h1}</h1>
            <p className="mt-3 max-w-2xl text-base text-ink-soft sm:text-lg">
              {t.giris}
            </p>
          </Container>
        </section>

        {t.kartlar.map((o, i) => {
          const { Ekran, Telefon } = ekranlar[i];
          return (
            <Section
              key={o.sektor}
              className={
                i % 2 === 1 ? "border-y border-border bg-surface-2/60" : ""
              }
            >
              <div
                className={
                  "grid items-center gap-12 lg:grid-cols-2 lg:gap-16 " +
                  (i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "")
                }
              >
                <div>
                  <p className="eyebrow">{o.sektor}</p>
                  <h2 className="mt-2.5 text-2xl">{o.baslik}</h2>
                  <p className="mt-3 text-ink-soft">{o.aciklama}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {o.ozellikler.map((oz) => (
                      <li
                        key={oz}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink-soft"
                      >
                        {oz}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pb-8 lg:pb-4">
                  <MockupFrame ekran={<Ekran />} telefon={<Telefon />} />
                </div>
              </div>
            </Section>
          );
        })}

        <Section className="border-t border-border">
          <div className="card card-sheen rounded-(--radius) border-accent/35 bg-accent-soft p-7 text-center sm:p-10">
            <h2 className="text-2xl">{t.ctaBaslik}</h2>
            <p className="mx-auto mt-2.5 max-w-xl text-ink-soft">
              {t.ctaMetin}
            </p>
            <ButtonExternal
              href={whatsappUrl(t.ctaWaMesaj)}
              size="lg"
              className="mt-6"
            >
              <FaWhatsapp className="size-5" aria-hidden />
              {genel.genel.whatsapptanYazin}
            </ButtonExternal>
          </div>
        </Section>
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} />
      <ScrollToTop dil={dil} />
    </>
  );
}

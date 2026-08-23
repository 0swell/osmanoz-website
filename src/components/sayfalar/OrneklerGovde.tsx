import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { MockupFrame } from "@/components/molecules/MockupFrame";
import {
  EkranKafe,
  EkranKuafor,
  EkranSpor,
  TelefonKafe,
  TelefonKuafor,
  TelefonSpor,
} from "@/components/molecules/MockupScreens";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { whatsappUrl } from "@/config/nav";
import { siteConfig } from "@/config/site";
import type { Dil, RotaAnahtari } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { breadcrumbNode, pageGraph, webPageNode } from "@/lib/schema";
import { cn } from "@/utils/cn";
import { vurgula } from "@/utils/vurgu";

/**
 * Örnek bölümleri hizmet bazlı: her biri bir hizmeti anlatır ve o hizmetin
 * sayfasına + fiyat sayfasına bağlanır. Ekranlar ve rota anahtarı dilden
 * bağımsız olduğu için burada, metinler sözlükte durur.
 */
const bolumler: Array<{
  Ekran: () => React.ReactElement;
  Telefon: () => React.ReactElement;
  rota: RotaAnahtari;
}> = [
  { Ekran: EkranKafe, Telefon: TelefonKafe, rota: "webSitesi" },
  { Ekran: EkranKuafor, Telefon: TelefonKuafor, rota: "isletme" },
  { Ekran: EkranSpor, Telefon: TelefonSpor, rota: "mobil" },
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
            dil,
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
            <Breadcrumb dil={dil} simdiki={genel.nav.ornekler} />
            <h1 className="mt-4 text-[1.9rem] sm:text-[2.5rem]">{t.h1}</h1>
            <p className="mt-3 max-w-2xl text-base text-ink-soft sm:text-lg">
              {t.giris}
            </p>
          </Container>
        </section>

        {t.kartlar.map((o, i) => {
          const { Ekran, Telefon, rota } = bolumler[i];
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
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="eyebrow">{o.sektor}</p>
                    {o.yakinda && (
                      <span className="rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-muted">
                        {genel.genel.yakinda}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2.5 text-2xl">{o.baslik}</h2>
                  <p className="mt-3 text-ink-soft">{vurgula(o.aciklama)}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {o.ozellikler.map((oz) => (
                      <li
                        key={oz}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-sm",
                          o.yakinda
                            ? "border-border bg-surface-2 text-ink-muted"
                            : "border-border bg-surface text-ink-soft",
                        )}
                      >
                        {oz}
                      </li>
                    ))}
                  </ul>

                  {/* İki geçiş: hizmetin kendi sayfası ve fiyat sayfası */}
                  <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <Link
                      href={yol(rota, dil)}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 font-medium hover:underline",
                        o.yakinda ? "text-ink-muted" : "text-accent",
                      )}
                    >
                      {t.hizmeteGit}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                    <Link
                      href={yol("fiyatlar", dil)}
                      className="inline-flex min-h-11 items-center text-ink-soft hover:text-accent"
                    >
                      {t.fiyatlariGor}
                    </Link>
                  </p>
                </div>

                {/* Sunulmayan hizmetin ekranı soluk gösterilir; metin
                    kontrastı bozulmasın diye yalnız görsel katman soluyor. */}
                <div
                  className={cn(
                    "pb-8 lg:pb-4",
                    o.yakinda && "opacity-55 grayscale",
                  )}
                >
                  <MockupFrame ekran={<Ekran />} telefon={<Telefon />} />
                </div>
              </div>
            </Section>
          );
        })}

        {/* Canlı örnek — mockup değil, yayında olan gerçek site */}
        <Section className="border-t border-border">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{t.canliEyebrow}</p>
            <h2 className="mt-2.5 text-2xl">
              osmanoz<span className="text-accent">.com</span>
              {t.canliBaslikSonek}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">
              {vurgula(t.canliMetin)}
            </p>
            <p className="mt-6">
              <a
                href={siteConfig.personalSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex min-h-11 items-center gap-2 rounded-(--radius) border border-border bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {t.canliButon}
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </p>
          </div>
        </Section>

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

import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { breadcrumbNode, pageGraph, webPageNode } from "@/lib/schema";

/**
 * KVKK aydınlatma metni — iletişim formu kişisel veri (ad, telefon, e-posta)
 * topladığı için yasal zorunluluk. Metin sade tutuldu; hedef kitle hukukçu
 * değil, işletme sahibi.
 *
 * NOT: Bu metin genel bir çerçevedir, hukuki danışmanlık yerine geçmez.
 * Yayın öncesi bir mali müşavir/hukukçuya okutulması önerilir.
 */
export function GizlilikGovde({ dil }: { dil: Dil }) {
  const { nap, personName } = siteConfig;
  const t = sayfa(dil).gizlilik;
  const genel = s(dil);
  const path = yol("gizlilik", dil);

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
            { name: genel.footer.gizlilik, path },
          ]),
        ])}
      />

      <Navbar dil={dil} rota="gizlilik" />

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
          <div className="mx-auto max-w-3xl">
            <div className="card card-sheen p-5 sm:p-6">
              <p className="text-sm text-ink-soft">
                <strong className="font-semibold text-ink">
                  {t.veriSorumlusu}
                </strong>{" "}
                {personName} — {nap.city}
                <br />
                <strong className="font-semibold text-ink">
                  {t.iletisimEtiket}
                </strong>{" "}
                <a
                  href={`mailto:${nap.email}`}
                  className="text-accent underline underline-offset-2"
                >
                  {nap.email}
                </a>{" "}
                ·{" "}
                <a
                  href={`tel:${nap.phone}`}
                  className="text-accent underline underline-offset-2"
                >
                  {nap.phone}
                </a>
              </p>
            </div>

            <div className="mt-8 space-y-7">
              {t.bolumler.map((b) => (
                <article key={b.baslik}>
                  <h2 className="text-xl">{b.baslik}</h2>
                  <p className="mt-2.5 text-ink-soft">{b.icerik}</p>
                </article>
              ))}
            </div>

            <p className="mt-9 border-t border-border pt-5 text-sm text-ink-muted">
              {t.dipnot}
            </p>
          </div>
        </Section>
      </main>

      <Footer dil={dil} />
    </>
  );
}

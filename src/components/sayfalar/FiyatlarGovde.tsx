import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { FaqSection } from "@/components/organisms/FaqSection";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { PaketKarsilastirma } from "@/components/organisms/PaketKarsilastirma";
import { PricingSection } from "@/components/organisms/PricingSection";
import { whatsappMesaj } from "@/config/nav";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { s } from "@/i18n/sozluk";
import { getSss } from "@/lib/content";
import { breadcrumbNode, faqNode, pageGraph, webPageNode } from "@/lib/schema";
import { duzMetin } from "@/utils/vurgu";

export function FiyatlarGovde({ dil }: { dil: Dil }) {
  const t = sayfa(dil).fiyatlar;
  const genel = s(dil);
  const path = yol("fiyatlar", dil);

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
            {
              name: genel.hizmetSayfa.anaSayfa,
              path: yol("anasayfa", dil),
            },
            { name: genel.nav.fiyatlar, path },
          ]),
          faqNode(
            path,
            getSss(dil).map((q) => ({
              question: q.soru,
              answer: duzMetin(q.cevap),
            })),
          ),
        ])}
      />

      <Navbar dil={dil} rota="fiyatlar" />

      <main id="icerik">
        <section className="border-b border-border pt-10 pb-12 sm:pt-14">
          <Container>
            <Breadcrumb dil={dil} simdiki={genel.nav.fiyatlar} />
            <h1 className="mt-4 text-[1.9rem] sm:text-[2.5rem]">{t.h1}</h1>
            <p className="mt-3 max-w-2xl text-base text-ink-soft sm:text-lg">
              {t.giris}
            </p>
          </Container>
        </section>

        <PricingSection dil={dil} />

        {/* Yıllık giderler */}
        <Section
          eyebrow={t.yillikEyebrow}
          title={t.yillikBaslik}
          lead={t.yillikGiris}
        >
          {/* Mobil: kart listesi. Tablo 375px'e sığmıyordu ve fiyat sütunu
              ekran dışında kalıyordu — rakam bu bölümün asıl cevabı. */}
          <ul className="space-y-3 sm:hidden">
            {t.kalemler.map((k) => (
              <li key={k.kalem} className="card card-sheen p-4">
                <p className="font-medium text-ink">{k.kalem}</p>
                <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
                  <div>
                    <dt className="text-ink-muted">{t.ilkYil}</dt>
                    <dd className="mt-0.5 font-medium text-success">
                      {t.dahil}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">{t.sonrakiYillar}</dt>
                    <dd className="mt-0.5 font-medium text-ink">{k.sonraki}</dd>
                  </div>
                </dl>
              </li>
            ))}
            <li className="card card-sheen border-accent/35 bg-accent-soft p-4">
              <p className="font-semibold text-ink">{t.toplam}</p>
              <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
                <div>
                  <dt className="text-ink-muted">{t.ilkYil}</dt>
                  <dd className="mt-0.5 font-semibold text-success">
                    {t.ekOdemeYok}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t.sonrakiYillar}</dt>
                  <dd className="mt-0.5 font-semibold text-ink">
                    {t.toplamSonraki}
                  </dd>
                </div>
              </dl>
            </li>
          </ul>

          {/* Masaüstü: tablo */}
          <div className="hidden overflow-x-auto rounded-(--radius) border border-border sm:block">
            <table className="w-full border-collapse bg-surface text-left">
              <thead>
                <tr className="border-b border-border bg-surface-2/70">
                  <th className="px-4 py-3 text-sm font-semibold">{t.kalem}</th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t.ilkYil}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t.sonrakiYillar}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.kalemler.map((k) => (
                  <tr
                    key={k.kalem}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3.5 text-sm text-ink-soft">
                      {k.kalem}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-success">
                      {t.dahil}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-ink">
                      {k.sonraki}
                    </td>
                  </tr>
                ))}
                <tr className="bg-surface-2/50">
                  <td className="px-4 py-3.5 text-sm font-semibold">
                    {t.toplam}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-success">
                    {t.ekOdemeYok}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold">
                    {t.toplamSonraki}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-ink-muted">{t.dipnot}</p>
        </Section>

        <PaketKarsilastirma dil={dil} />

        <FaqSection dil={dil} />
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} message={whatsappMesaj(dil, "pricing")} />
      <ScrollToTop dil={dil} />
    </>
  );
}

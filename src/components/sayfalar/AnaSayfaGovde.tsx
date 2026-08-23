import { JsonLd } from "@/components/atoms/JsonLd";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { AreaSection } from "@/components/organisms/AreaSection";
import { FaqSection } from "@/components/organisms/FaqSection";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { PricingSection } from "@/components/organisms/PricingSection";
import { ProblemSection } from "@/components/organisms/ProblemSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { ServicesSection } from "@/components/organisms/ServicesSection";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { sayfa } from "@/i18n/sayfalar";
import { getSss } from "@/lib/content";
import { faqNode, pageGraph, webPageNode } from "@/lib/schema";
import { duzMetin } from "@/utils/vurgu";

/**
 * Ana sayfa gövdesi — iki dil de aynı bileşeni kullanır.
 * Rota dosyaları (`(tr)/page.tsx`, `(en)/en/page.tsx`) yalnızca metadata
 * tanımlar ve buraya dili geçer.
 */
/**
 * Ana sayfada SSS'nin tamamı değil ilk beşi gösterilir: sekiz maddenin tamamı
 * hem burada hem /fiyatlar'da olunca iki URL büyük ölçüde aynı metni taşıyordu
 * (denetim 1.D.7). Tam liste /fiyatlar'da; schema da burada aynı beş soruyu
 * basar, görünmeyen soru schema'ya girmez.
 */
const ANA_SAYFA_SSS = 5;

export function AnaSayfaGovde({ dil }: { dil: Dil }) {
  const t = sayfa(dil).anasayfa;

  return (
    <>
      <JsonLd
        data={pageGraph([
          webPageNode({
            path: yol("anasayfa", dil),
            name: t.schemaAd,
            description: t.schemaAciklama,
            dil,
          }),
          // Schema'daki sorular sayfada görünür halde — gizli schema yok.
          faqNode(
            yol("anasayfa", dil),
            getSss(dil)
              .slice(0, ANA_SAYFA_SSS)
              .map((q) => ({
              question: q.soru,
                answer: duzMetin(q.cevap),
              })),
          ),
        ])}
      />

      <Navbar dil={dil} rota="anasayfa" />

      <main id="icerik">
        <Hero dil={dil} />
        <ProblemSection dil={dil} />
        <ServicesSection dil={dil} />
        <ProcessSection dil={dil} />
        <PricingSection dil={dil} />
        <AreaSection dil={dil} />
        <FaqSection
          dil={dil}
          limit={ANA_SAYFA_SSS}
          tumSorularLinki={{
            href: yol("fiyatlar", dil),
            metin: t.tumSorular,
          }}
        />
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} />
      <ScrollToTop dil={dil} />
    </>
  );
}

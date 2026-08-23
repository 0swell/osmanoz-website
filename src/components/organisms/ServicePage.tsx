import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal, ButtonLink } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { ServicePricing } from "@/components/organisms/ServicePricing";
import { ServiceShowcase } from "@/components/organisms/ServiceShowcase";
import { hizmetWaMesaji, whatsappUrl } from "@/config/nav";
import { getServices } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { hizmetRotaAnahtari, yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { getHizmetIcerigi } from "@/lib/content";
import { duzMetin, vurgula } from "@/utils/vurgu";
import {
  breadcrumbNode,
  faqNode,
  pageGraph,
  serviceNode,
  webPageNode,
} from "@/lib/schema";

/**
 * Üç hizmet sayfası için ortak gövde. İçerik content/settings/hizmetler.json
 * dosyasından gelir — metin JSX içine gömülmez (CLAUDE.md §6.2).
 */
export function ServicePage({ slug, dil }: { slug: string; dil: Dil }) {
  const icerik = getHizmetIcerigi(slug, dil);
  const hizmetler = getServices(dil);
  const service = hizmetler.find((h) => h.slug === slug);

  if (!icerik || !service) {
    throw new Error(`Hizmet içeriği bulunamadı: ${slug}`);
  }

  const t = s(dil);
  const rota = hizmetRotaAnahtari[slug];
  const path = yol(rota, dil);
  // Ön-doldurulmuş mesaj müşterinin ağzından yazılır; sayfanın satış
  // başlığı ("Burdur'da Web Sitesi Yaptırın") müşterinin yazacağı cümle değil.
  const waMesaj = hizmetWaMesaji(slug, dil);
  const sorular = icerik.sss;
  const digerHizmetler = hizmetler.filter((h) => h.slug !== slug);

  return (
    <>
      <JsonLd
        data={pageGraph([
          webPageNode({
            path,
            name: icerik.h1,
            description: icerik.description,
          }),
          breadcrumbNode(path, [
            { name: t.hizmetSayfa.anaSayfa, path: yol("anasayfa", dil) },
            { name: service.name, path },
          ]),
          serviceNode(service),
          faqNode(
            path,
            // Schema düz metin ister — vurgu işaretleri temizlenir.
            sorular.map((q) => ({
              question: q.soru,
              answer: duzMetin(q.cevap),
            })),
          ),
        ])}
      />

      <Navbar dil={dil} rota={rota} />

      <main id="icerik">
        {/* Başlık bloğu */}
        <section className="border-b border-border pt-10 pb-12 sm:pt-14 sm:pb-16">
          <Container>
            <nav aria-label={t.hizmetSayfa.konum} className="text-sm text-ink-muted">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link
                    href={yol("anasayfa", dil)}
                    className="transition-colors hover:text-accent"
                  >
                    {t.hizmetSayfa.anaSayfa}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-ink-soft">{service.name}</li>
              </ol>
            </nav>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="max-w-3xl text-[1.9rem] sm:text-[2.5rem]">
                {icerik.h1}
              </h1>
              {service.yakinda && (
                <span className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-sm font-medium text-ink-muted">
                  {t.genel.yakinda}
                </span>
              )}
            </div>

            <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
              {icerik.giris}
            </p>

            {/* Henüz sunulmayan hizmet: ziyaretçiyi baştan bilgilendir.
                Olmayan bir hizmeti varmış gibi göstermiyoruz. */}
            {service.yakinda && (
              <div className="card-yakinda mt-6 max-w-2xl rounded-(--radius) p-4">
                <p className="text-sm text-ink-soft">
                  <strong className="font-semibold text-ink">
                    {t.hizmetSayfa.yakindaBaslik}
                  </strong>{" "}
                  {t.hizmetSayfa.yakindaMetin}
                </p>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonExternal href={whatsappUrl(waMesaj)} size="lg">
                <FaWhatsapp className="size-5" aria-hidden />
                {t.genel.whatsapptanYazin}
              </ButtonExternal>
              <ButtonLink
                href={yol("fiyatlar", dil)}
                variant="secondary"
                size="lg"
              >
                {t.hizmetSayfa.fiyatlariGor}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* Anlatım bölümleri — her başlık gerçek bir soru (AEO) */}
        <Section>
          <div className="grid gap-8 md:grid-cols-2">
            {icerik.bolumler.map((b) => (
              <article key={b.baslik}>
                <h2 className="text-xl">{b.baslik}</h2>
                <p className="mt-2.5 text-ink-soft">{vurgula(b.metin)}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Görsel bölüm — sayfa düz metin duvarı olmasın */}
        <ServiceShowcase slug={slug} dil={dil} />

        {/* Sayfaya özel SSS */}
        {sorular.length > 0 && (
          <Section
            eyebrow={t.hizmetSayfa.sssEyebrow}
            title={t.hizmetSayfa.sssBaslik}
            className="border-y border-border bg-surface-2/60"
          >
            <div className="mx-auto max-w-3xl divide-y divide-border rounded-(--radius) border border-border bg-surface">
              {sorular.map((item, i) => (
                <details
                  key={item.soru}
                  name="hizmet-sss"
                  open={i === 0}
                  className="group px-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-medium">{item.soru}</h3>
                    <span
                      aria-hidden
                      className="relative grid size-6 shrink-0 place-items-center text-accent"
                    >
                      <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                      <span className="absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-200 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="pb-5 text-sm text-ink-soft sm:text-base">
                    {vurgula(item.cevap)}
                  </p>
                </details>
              ))}
            </div>
          </Section>
        )}

        {/* Diğer hizmetler — iç linkleme (CLAUDE.md §4.3) */}
        <Section
          eyebrow={t.hizmetSayfa.digerEyebrow}
          title={t.hizmetSayfa.digerBaslik}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {digerHizmetler.map((h) => (
              <Link
                key={h.slug}
                href={yol(hizmetRotaAnahtari[h.slug], dil)}
                className="group card card-hover card-sheen p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent"
              >
                <h3 className="text-lg">{h.name}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{h.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {t.genel.detaylar}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* Kapanış: karar metni + bu hizmete ait fiyat kartı */}
        <ServicePricing slug={slug} dil={dil} waMesaj={waMesaj} />
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} message={waMesaj} />
      <ScrollToTop dil={dil} />
    </>
  );
}

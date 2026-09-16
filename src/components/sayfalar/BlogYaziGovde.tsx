import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal, ButtonLink } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { Akordiyon } from "@/components/molecules/Akordiyon";
import { Icindekiler } from "@/components/molecules/Icindekiler";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { hizmetWaMesaji, whatsappUrl } from "@/config/nav";
import { getServices, siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { hizmetRotaAnahtari, yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { getYazi, getYazilar, tarihMetni } from "@/lib/blog";
import {
  articleNode,
  breadcrumbNode,
  pageGraph,
  SCHEMA_ID,
  webPageNode,
} from "@/lib/schema";
import { duzMetin, vurgula } from "@/utils/vurgu";

const ID_ON_EKI = "bolum";

/**
 * Blog yazısı sayfası — CLAUDE.md §5.3'teki akordiyon düzeni.
 *
 * Sabit kalanlar:
 * - `<h1>` doğrudan soru başlığı, hemen altında **hep açık** kısa cevap
 *   kutusu (40-60 kelime). Öne çıkan snippet ve YZ alıntısı oradan gider.
 * - Bölümler akordiyon ama metinleri HTML'de hazır basılır; kapalı bölüm de
 *   taranır.
 * - Masaüstünde yanda içindekiler; tıklanınca bölüm açılır ve oraya kayar.
 * - Başlık hiyerarşisi bozulmaz: tek `<h1>`, bölümler `<h2>`.
 */
export function BlogYaziGovde({ slug, dil }: { slug: string; dil: Dil }) {
  const yazi = getYazi(slug, dil);
  if (!yazi) notFound();

  const t = s(dil);
  const path = yazi.yollar[dil];
  const hizmet = getServices(dil).find((h) => h.slug === yazi.ilgiliHizmet);
  const hizmetYolu = yol(hizmetRotaAnahtari[yazi.ilgiliHizmet], dil);
  const waMesaj = hizmetWaMesaji(yazi.ilgiliHizmet, dil);
  const digerYazilar = getYazilar(dil)
    .filter((y) => y.slug !== yazi.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={pageGraph([
          webPageNode({
            path,
            name: yazi.baslik,
            description: yazi.description,
            dil,
            dateModified: yazi.guncelleme,
            partOfIds: [SCHEMA_ID.article(path)],
          }),
          breadcrumbNode(path, [
            { name: t.hizmetSayfa.anaSayfa, path: yol("anasayfa", dil) },
            { name: t.nav.blog, path: yol("blog", dil) },
            { name: yazi.baslik, path },
          ]),
          articleNode({
            path,
            title: yazi.baslik,
            // Schema düz metin ister — `**` vurgu işaretleri temizlenir.
            description: duzMetin(yazi.ozet),
            datePublished: yazi.tarih,
            dateModified: yazi.guncelleme,
            dil,
            blogId: SCHEMA_ID.blog(yol("blog", dil)),
          }),
        ])}
      />

      <Navbar dil={dil} rota="blog" yollar={yazi.yollar} />

      <main id="icerik">
        <section className="border-b border-border pt-10 pb-12 sm:pt-14">
          <Container>
            <nav aria-label={t.hizmetSayfa.konum} className="text-sm">
              <Link
                href={yol("blog", dil)}
                className="inline-flex min-h-11 items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t.blog.bloguGor}
              </Link>
            </nav>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
              <span className="rounded-full border border-border px-2.5 py-1 font-medium">
                {yazi.etiket}
              </span>
              <span>
                {t.blog.yayinTarihi}:{" "}
                <time dateTime={yazi.tarih}>{tarihMetni(yazi.tarih, dil)}</time>
              </span>
              {yazi.guncelleme !== yazi.tarih && (
                <span>
                  {t.blog.guncellemeTarihi}:{" "}
                  <time dateTime={yazi.guncelleme}>
                    {tarihMetni(yazi.guncelleme, dil)}
                  </time>
                </span>
              )}
            </div>

            <h1 className="mt-4 max-w-3xl text-[1.9rem] sm:text-[2.5rem]">
              {yazi.baslik}
            </h1>

            {/* Kısa cevap kutusu — ASLA kapalı olmaz (CLAUDE.md §5.3). */}
            <div className="mt-6 max-w-3xl rounded-(--radius) border border-accent/35 bg-accent-soft p-5 sm:p-6">
              <p className="eyebrow">{t.blog.kisaCevap}</p>
              <p className="mt-2 text-base text-ink-soft sm:text-lg">
                {vurgula(yazi.ozet)}
              </p>
            </div>

            {/* Yazar kimliği — schema `author` düğümünün görünen karşılığı */}
            <p className="mt-5 text-sm text-ink-muted">
              {t.blog.yazan}:{" "}
              <Link
                href={yol("hakkimda", dil)}
                className="font-medium text-ink-soft transition-colors hover:text-accent"
              >
                {siteConfig.personName}
              </Link>
              {" — "}
              {t.nav.unvan}
            </p>
          </Container>
        </section>

        <Section>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-12">
            <Akordiyon
              bolumler={yazi.bolumler}
              ad="yazi-bolum"
              idOnEki={ID_ON_EKI}
              genis
            />

            {/* Masaüstünde yanda sabit durur; mobilde akordiyonun altına iner
                (küçük ekranda içindekiler, içeriğin önüne geçmemeli). */}
            <aside className="lg:sticky lg:top-24">
              <Icindekiler
                baslik={t.blog.icindekiler}
                bolumler={yazi.bolumler}
                idOnEki={ID_ON_EKI}
              />
            </aside>
          </div>
        </Section>

        {/* İlgili hizmet — blog gövdesinden hizmet sayfasına iç link (§4.3) */}
        {hizmet && (
          <Section className="border-y border-border bg-surface-2/60">
            <div className="card card-sheen rounded-(--radius) border-accent/35 bg-accent-soft p-7 sm:p-10">
              <h2 className="text-2xl">{t.blog.ilgiliHizmetBaslik}</h2>
              <p className="mt-2.5 max-w-2xl text-ink-soft">
                {t.blog.ilgiliHizmetMetin}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonExternal href={whatsappUrl(waMesaj)} size="lg">
                  <FaWhatsapp className="size-5" aria-hidden />
                  {t.genel.whatsapptanYazin}
                </ButtonExternal>
                <ButtonLink href={hizmetYolu} variant="secondary" size="lg">
                  {hizmet.linkAdi}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </Section>
        )}

        {digerYazilar.length > 0 && (
          <Section title={t.blog.digerYazilar}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {digerYazilar.map((y) => (
                <li key={y.slug}>
                  <Link
                    href={y.yollar[dil]}
                    className="group card card-hover block h-full p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent"
                  >
                    <p className="text-xs text-ink-muted">{y.etiket}</p>
                    <h3 className="mt-2 text-base">{y.baslik}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      {t.blog.yaziOku}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} message={waMesaj} />
      <ScrollToTop dil={dil} />
    </>
  );
}

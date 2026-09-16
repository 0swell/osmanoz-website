import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Section } from "@/components/atoms/Section";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { ScrollToTop } from "@/components/molecules/ScrollToTop";
import { WhatsAppFab } from "@/components/molecules/WhatsAppFab";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { getYazilar, tarihMetni } from "@/lib/blog";
import {
  blogNode,
  breadcrumbNode,
  pageGraph,
  SCHEMA_ID,
  webPageNode,
} from "@/lib/schema";

/**
 * Blog liste sayfası.
 *
 * Kartlar yazının **kısa cevabını** gösterir, uydurma bir spot metni değil —
 * ziyaretçi yazıyı açmadan cevabı görür, açması gerekiyorsa da ne bulacağını
 * bilir. Aynı metin yazı sayfasının cevap kutusunda ve schema `description`
 * alanında kullanılıyor; tek kaynaktan gelir (CLAUDE.md §6.2).
 */
export function BlogListeGovde({ dil }: { dil: Dil }) {
  const t = s(dil);
  const path = yol("blog", dil);
  const yazilar = getYazilar(dil);

  return (
    <>
      <JsonLd
        data={pageGraph([
          webPageNode({
            path,
            name: t.blog.schemaAd,
            description: t.blog.schemaAciklama,
            dil,
            partOfIds: [SCHEMA_ID.blog(path)],
          }),
          breadcrumbNode(path, [
            { name: t.hizmetSayfa.anaSayfa, path: yol("anasayfa", dil) },
            { name: t.nav.blog, path },
          ]),
          blogNode({
            path,
            name: t.blog.schemaAd,
            description: t.blog.schemaAciklama,
            dil,
            yaziIdleri: yazilar.map((y) => SCHEMA_ID.article(y.yollar[dil])),
          }),
        ])}
      />

      <Navbar dil={dil} rota="blog" />

      <main id="icerik">
        <section className="border-b border-border pt-10 pb-12 sm:pt-14">
          <Container>
            <Breadcrumb dil={dil} simdiki={t.nav.blog} />
            <h1 className="mt-4 max-w-3xl text-[1.9rem] sm:text-[2.5rem]">
              {t.blog.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-ink-soft sm:text-lg">
              {t.blog.giris}
            </p>
          </Container>
        </section>

        <Section>
          <ul className="grid gap-5 md:grid-cols-2">
            {yazilar.map((y) => (
              <li key={y.slug}>
                <article className="group card card-hover card-sheen h-full p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                    <span className="rounded-full border border-border px-2.5 py-1 font-medium">
                      {y.etiket}
                    </span>
                    <time dateTime={y.tarih}>{tarihMetni(y.tarih, dil)}</time>
                  </div>

                  {/* Başlık listede <h2>; sayfadaki tek <h1> yukarıda. */}
                  <h2 className="mt-3 text-xl">
                    <Link href={y.yollar[dil]} className="after:absolute">
                      {y.baslik}
                    </Link>
                  </h2>

                  <p className="mt-2.5 text-sm text-ink-soft">{y.ozet}</p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {t.blog.yaziOku}
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <Footer dil={dil} />
      <WhatsAppFab dil={dil} />
      <ScrollToTop dil={dil} />
    </>
  );
}

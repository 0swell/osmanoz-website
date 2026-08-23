import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

import { ButtonExternal, ButtonLink } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { HeroIllustration } from "@/components/molecules/HeroIllustration";
import { whatsappMesaj, whatsappUrl } from "@/config/nav";
import { siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

/**
 * Hero — iki kolon (CLAUDE.md §5.2).
 *   Sol : cam kimlik kartı (yüz + isim + profiller) — güven sinyali
 *   Sağ : <h1> hizmet + şehir, ardından CTA
 *
 * <h1> isim değil hizmet+şehir içerir; isim <p> içinde durur (SEO kuralı).
 * Server Component — hero'da istemci JS'i yok, LCP korunur.
 *
 * Derinlik: arkada iki yumuşak ışıma lekesi, üstünde cam kart. Beyaz zeminde
 * cam etkisinin görünmesi için arkada renk olması şart.
 */
export function Hero({ dil }: { dil: Dil }) {
  const { personName, profileImage, profileImageAlt, social } = siteConfig;
  const t = s(dil).hero;
  const genel = s(dil).genel;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Zemin ışımaları — cam yüzeye derinlik veren renk kaynağı */}
      <div
        aria-hidden
        className="glow -top-28 -left-24 size-[28rem] bg-accent/20 sm:size-[36rem]"
      />
      <div
        aria-hidden
        className="glow top-10 -right-28 size-[26rem] bg-brand/10 sm:size-[32rem]"
      />

      {/* Çizim, metin akışının dışında ve arkasında durur: grid kolonu
          olduğunda başlığı daraltıp satır sayısını artırıyordu.
          Yalnızca kapsayıcının sağında yer kalan çok geniş ekranlarda açılır. */}
      <HeroIllustration dil={dil} />
      {/* Geniş ekranda içerik hafifçe sola çekilir; `translate` kullanıldığı
          için ölçüler ve satır sayıları değişmez, yalnızca konum kayar. */}
      <Container className="xl:-translate-x-14 2xl:-translate-x-20">
        <div className="relative z-10 grid items-center gap-10 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:items-start md:gap-14">
          {/* --- Sol: cam kimlik kartı --- */}
          {/* Masaüstünde kart, sağ kolonla iki noktadan hizalanır:
              üstü <h1> ile aynı çizgide başlar, tabanı da güven şeridinin
              üst çizgisine oturur. Aradaki yükseklik içerik ölçüsüyle
              ayarlandığı için kart içeriği değişirse hiza gözden geçirilmeli. */}
          <div className="rise glass card-sheen rounded-(--radius-lg) p-8 shadow-lift md:mt-[2.05rem]">
            <div className="flex flex-col items-center text-center">
              {/* Eşmerkezli halka: fotoğrafı saran ince turuncu çember. */}
              <div className="relative rounded-full p-1 ring-2 ring-accent/45">
                <Image
                  src={profileImage}
                  alt={profileImageAlt}
                  width={176}
                  height={176}
                  priority
                  sizes="176px"
                  className="size-[9.3rem] rounded-full object-cover shadow-card"
                />
              </div>

              <p className="mt-6 font-display text-xl font-semibold text-ink">
                {personName}
              </p>
              <p className="text-[0.95rem] text-ink-muted">{s(dil).nav.unvan}</p>

              <div className="mt-5 flex items-center gap-1 border-t border-border pt-3.5">
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.linkedinEtiket}
                  className="press grid size-11 place-items-center rounded-(--radius) text-ink-muted hover:bg-surface-2 hover:text-accent"
                >
                  <FaLinkedin className="size-[18px]" aria-hidden />
                </a>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.githubEtiket}
                  className="press grid size-11 place-items-center rounded-(--radius) text-ink-muted hover:bg-surface-2 hover:text-accent"
                >
                  <FaGithub className="size-[18px]" aria-hidden />
                </a>
                <a
                  href={siteConfig.personalSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press rounded-(--radius) px-2.5 py-2 text-sm text-ink-muted underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent"
                >
                  osmanoz.com
                </a>
              </div>
            </div>
          </div>

          {/* --- Sağ: vaat + CTA --- */}
          <div className="rise [animation-delay:130ms]">
            <p className="eyebrow flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden />
              {t.bolge}
            </p>

            {/* Sunulan iki hizmet turuncu ile öne çıkar; mobil uygulama
                normal metin renginde kalır. */}
            <h1 className="mt-3.5 text-[2.1rem] leading-[1.08] sm:text-[2.9rem] lg:text-[3.4rem]">
              {t.h1Once}
              <span className="text-accent">{t.h1Vurgu1}</span>
              {t.h1Orta}
              <span className="text-accent">{t.h1Vurgu2}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-ink-soft sm:text-lg">
              {t.giris}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <ButtonExternal
                href={whatsappUrl(whatsappMesaj(dil, "website"))}
                size="lg"
              >
                <FaWhatsapp className="size-5" aria-hidden />
                {genel.whatsapptanYazin}
              </ButtonExternal>

              <ButtonLink
                href={yol("ornekler", dil)}
                variant="secondary"
                size="lg"
              >
                {t.ornekleriGor}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            {/* Güven şeridi — somut, doğrulanabilir bilgiler */}
            {/* Mobilde 3 kolon 90px'e düşüyor ve etiketler 3 satıra sarıyordu;
                küçük ekranda değer + etiket yan yana, alt alta sıralanır. */}
            <dl className="mt-9 grid max-w-2xl gap-3 border-t border-border pt-6 sm:grid-cols-3 sm:gap-5">
              {t.guven.map((g) => (
                <div key={g.k} className="flex items-baseline gap-2 sm:block">
                  <dt className="font-display text-base font-semibold whitespace-nowrap text-ink sm:text-lg">
                    {g.k}
                  </dt>
                  <dd className="text-xs text-ink-muted sm:text-sm">{g.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

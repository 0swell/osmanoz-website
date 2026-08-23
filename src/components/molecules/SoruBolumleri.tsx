import { Section } from "@/components/atoms/Section";
import { vurgula } from "@/utils/vurgu";

/**
 * Soru başlıklı bilgi bölümleri.
 *
 * Başlıklar doğal dil sorusu, cevap hemen altında ve ilk cümlede net —
 * öne çıkan snippet ve YZ alıntısı bu kalıptan besleniyor (CLAUDE.md §4.5).
 * `**kalın**` işaretleri `vurgula()` ile basılır; her bölümde çekirdek ifade
 * kalınlaşır (denetim 3.D.5).
 *
 * /hakkimda, /iletisim ve /ornekler sayfaları denetimde "ince içerik"
 * çıkmıştı (1.D.6); bu bölüm o üç sayfada da aynı bileşenle kuruluyor.
 */
export function SoruBolumleri({
  baslik,
  sorular,
  className,
}: {
  baslik: string;
  sorular: readonly { baslik: string; metin: string }[];
  className?: string;
}) {
  return (
    <Section title={baslik} className={className}>
      <div className="grid gap-8 md:grid-cols-2">
        {sorular.map((b) => (
          <article key={b.baslik}>
            {/* Bölüm başlığı Section içinde <h2>; sorular bir alt seviye */}
            <h3 className="text-xl">{b.baslik}</h3>
            <p className="mt-2.5 text-ink-soft">{vurgula(b.metin)}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

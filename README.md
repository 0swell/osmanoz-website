# osmanoz.website

Burdur, Isparta ve Antalya'daki işletmeler için web sitesi, mobil uygulama ve
işletme yazılımı hizmetlerini anlatan tanıtım ve dönüşüm sitesi.
[osmanoz.com](https://osmanoz.com) adresindeki kişisel portfolyonun ticari uzantısıdır.

**Amaç:** yerel aramalarda ("burdur web sitesi", "burdur mobil uygulama") üst
sıralarda çıkmak ve ziyaretçiyi WhatsApp üzerinden teklif talebine dönüştürmek.

## Teknolojiler

| Katman | Seçim |
|--------|-------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Render | %100 statik (SSG) — tüm sayfalar build-time'da üretilir |
| Stil | Tailwind CSS v4, CSS değişkeni tabanlı tasarım sistemi |
| İçerik | `content/settings/*.json` — çift dilli, ileride Sveltia CMS ile düzenlenecek |
| Çok dillilik | Türkçe kökte (`/`), İngilizce `/en/` altında; slug'lar dile göre farklı |
| Form | Server Action → Resend (honeypot + basit hız sınırı) |
| Tema | `next-themes` ile açık/koyu |
| Deploy | Vercel |

## Kurulum

```bash
npm install
cp .env.example .env.local   # RESEND_API_KEY doldurulur
npm run dev
```

`RESEND_API_KEY` tanımlı değilse iletişim formu sessizce başarılı olmaz —
ziyaretçiye "form şu an gönderilemiyor, WhatsApp'tan yazın" uyarısı gösterilir.

## Komutlar

```bash
npm run dev     # geliştirme sunucusu
npm run build   # üretim derlemesi
npm run lint    # ESLint
npx tsc --noEmit
```

## Klasör yapısı

```text
src/
├── app/
│   ├── (tr)/           Türkçe kök layout + sayfalar   → /
│   ├── (en)/en/        İngilizce kök layout + sayfalar → /en
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx
│   └── globals.css     tasarım sistemi (renk, gölge, animasyon tokenleri)
├── components/
│   ├── atoms/ molecules/ organisms/   atomic design
│   └── sayfalar/       iki dilin paylaştığı sayfa gövdeleri
├── config/site.ts      NAP, sosyal profiller, hizmet verisi (tek doğruluk kaynağı)
├── i18n/               dil tanımı, rota eşleşmeleri, metin sözlükleri
├── lib/schema.ts       JSON-LD üreticileri (Person → ProfessionalService → WebSite)
├── actions/contact.ts  Server Action → Resend
└── utils/
content/settings/       SSS, paketler, süreç, hizmet sayfası metinleri (tr + en)
```

## Notlar

- Geliştirme kuralları, SEO/GEO/AEO şartnamesi ve mimari kararlar `CLAUDE.md`
  dosyasındadır. Değişiklik yapmadan önce oradaki ilgili bölüm okunmalıdır.
- Hassas veri repoda tutulmaz; hepsi `.env.local` içindedir.
- Sitedeki tüm rakamlar gerçektir — uydurma istatistik, sahte referans veya
  hayali müşteri yorumu eklenmez (`CLAUDE.md` §4.6).

## Lisans

**Açık kaynak değildir.** Depo, çalışmanın incelenebilmesi için herkese açık
tutulur; kod, metin, tasarım ve görsellerin kopyalanması, dağıtılması veya
başka bir projede kullanılması yazılı izne bağlıdır.

Ayrıntı için [LICENSE](LICENSE) dosyasına bakın.

# Proje Kılavuzu ve Geliştirme Standartları — osmanoz.website

## 1. Proje Özeti

- **Proje Adı:** Burdur Yazılım Hizmetleri Sitesi
- **Canlı Adres:** `osmanoz.website`
- **Ana Site:** `osmanoz.com` (kişisel portfolyo/CV). Bu proje onun **ticari ve yerel uzantısıdır** — ayrı repo, ayrı deploy, karşılıklı link.
- **Repo:** (belirlenecek) — public olacak, hassas veri/secret asla commit edilmeyecek; hepsi `.env`'de tutulup `.gitignore`'a eklenecek.
- **Amaç:** Burdur (birincil), Isparta ve Antalya'daki yerel işletmelerin `burdur web tasarım`, `burdur web sitesi`, `burdur mobil uygulama`, `burdur yazılım` gibi aramalarında ilk sırada çıkmak; gelen ziyaretçiyi **WhatsApp üzerinden teklif talebine** dönüştürmek.
- **Kimlik:** Kişisel marka — *"Osman Öz — Bilgisayar Mühendisi"*. Yüz, isim ve mühendislik yetkinliği önde. Sahte kurumsallık ("ekibimiz", "12 yıllık tecrübe") **kullanılmayacak**.
- **Dil:** **Türkçe birincil + İngilizce.** Her sayfada dil değiştirme tuşu.
  > **Durum (2026-08-22): İngilizce sürüm ERTELENDİ.** Türkçe metinler hâlâ değişiyor; kesinleşmeden çeviri yapılmayacak. Altyapı + 9 sayfa birlikte, tek seferde eklenecek. **Dil tuşu o güne kadar navbar'a konmaz** — arkası boş kalırsa 404 verir. Türkçe kök URL'de (`/`), İngilizce `/en/` altında. Blog dahil tüm site iki dilde.
  > **Not:** SEO hedefi tamamen Türkçe aramalar. İngilizce sürüm sıralamaya katkı vermez; amacı yabancı ziyaretçiye ve profesyonel görünüme hizmet etmek. Bu yüzden Türkçe kökte durur, İngilizce prefix alır — kök URL'ler daha güçlüdür ve o güç Türkçede kalmalı.
- **Hedef Kitle:** 30-55 yaş yerel işletme sahibi (kafe, restoran, kuaför, klinik, market, otel, emlak, oto servis). Teknik terim bilmez; **güven, somut fayda ve fiyat şeffaflığı** arar.

### Hedef Kitle Kuralı (her içerik kararında geçerli)

Bir cümle yazarken *"Bunu kafe sahibi Ahmet Bey anlar mı?"* testini uygula.
`responsive`, `SSR`, `stack`, `deployment` gibi terimler public metinlerde geçmeyecek —
karşılıkları: *"telefonda da düzgün görünür"*, *"Google'da hızlı bulunur"*, *"yayına alırım"*.
Teknik derinlik sadece `/hakkimda` sayfasında, yetkinlik kanıtı olarak yer alır.

## 2. Başarı Kriterleri

| Kriter | Hedef |
|--------|-------|
| `burdur web tasarım` / `burdur web sitesi` organik sıra | İlk sayfa → ilk 3 |
| Lighthouse (mobil) | Performance ≥ 95, SEO 100, A11y ≥ 95 |
| LCP / CLS / INP | < 1.5s / < 0.1 / < 200ms |
| Ana dönüşüm | WhatsApp tıklaması + form gönderimi |
| İlk yayın süresi | Mockup vitrini ile hızlı V1 — SEO saati erken başlasın |

## 3. Teknolojiler (Tech Stack)

- **Framework & Dil:** Next.js (App Router) + TypeScript.
- **Render Stratejisi:** **%100 statik (SSG)**. Tüm public sayfalar build-time'da üretilir. Hiçbir sayfa istemci tarafı veri çekmeye bağlı olmayacak (SEO ve LCP için).
- **Stil & UI:** Tailwind CSS. Renkler CSS variable (token) olarak tanımlanır; component içine hardcoded hex yazılmaz.
- **İçerik:** MDX + JSON — `content/` klasöründe dosya bazlı. Hizmet sayfaları, blog yazıları, SSS ve site ayarları buradan beslenir.
- **Çok dillilik:** `next-intl` ile `tr` (varsayılan, kök URL) + `en` (`/en/` prefix). Statik export'la uyumlu: her dil build-time'da ayrı sayfa olarak üretilir. Çeviri metinleri `content/` altında, dil başına ayrı dosyada.
- **İçerik Yönetimi (`/admin`):** **VAZGEÇİLDİ (24.08.2026).** Sveltia CMS planlanmıştı; tek kişilik projede metin değişikliği doğrudan kodda yapılıyor, CMS aradaki fazladan katman oluyordu. `content/settings/*.json` yapısı korundu — ileride gerekirse CMS bu dosyaların üstüne kurulabilir.
- **İkonlar:** `lucide-react` (UI ikonları); `react-icons` (marka ikonları: WhatsApp, GitHub, LinkedIn, Instagram).
- **Animasyon:** Framer Motion — **seçici ve hafif**. Sadece giriş (fade/slide-up) ve mockup vitrini. Scroll-hijack, parallax, ağır efekt YOK (hedef kitle ve LCP nedeniyle).
- **Form:** Server Action → **Resend** ile e-posta. (Cloudflare'e taşınırsa tek bir Pages Function'a çevrilir.) Spam koruması: honeypot alan + basit rate limit. reCAPTCHA yok (LCP ve UX bedeli).
- **Analitik:** Vercel Analytics + Speed Insights (ücretsiz katman). Google Search Console **zorunlu**.
- **Veritabanı:** **YOK.** Prisma, NextAuth, kendi yazdığımız auth sistemi kullanılmayacak. `/admin` bir CMS arayüzüdür, veritabanına değil dosyaya yazar. (Talep hacmi artarsa V2'de değerlendirilir.)
- **Deploy:** **Vercel.** Domain: `osmanoz.website`.
  > **Müşteri siteleri Vercel'e konmaz** — Vercel Hobby sözleşmesi ticari kullanımı yasaklıyor. Satılan her müşteri projesi **Cloudflare Pages**'te barındırılır (ücretsiz, ticari kullanıma açık, sınırsız site). Bu proje Vercel'de kalır; risk büyürse Vercel Pro'ya ($20/ay) veya Cloudflare'e taşınır.
  > **Sonuç:** Statik export zorunluluğu yok. Server Action ve `next/image` optimizasyonu kullanılabilir. Render stratejisi yine **SSG** — bu bir SEO kararı, platformdan bağımsız. Kod, gerekirse Cloudflare'e taşınabilecek şekilde platforma özel API'lere bağımlı yazılmaz.
- **Fiyatlandırma:** `AAA-BENIM-DOSYALARIM/docs/ic-fiyatlandirma.html` — **iç kullanım, yayınlanmaz** (`.gitignore`'da). Paketler, gerçek maliyetler, mağaza hesabı modeli ve gerekçeler orada.

## 4. SEO Stratejisi — Projenin Kalbi

### 4.1. Anahtar Kelime Haritası

Her sayfanın **tek bir birincil hedefi** vardır. Aynı kelimeyi iki sayfaya verme (keyword cannibalization).

| Sayfa | Birincil Hedef | İkincil |
|-------|----------------|---------|
| `/burdur-web-sitesi` | **burdur web sitesi** | burdur web sitesi yaptırma, burdur internet sitesi, burdur web tasarım |
| `/` | burdur yazılım, burdur bilgisayar mühendisi | burdur web tasarım firması, burdur yazılımcı |
| `/burdur-mobil-uygulama` | burdur mobil uygulama | burdur android / ios uygulama yaptırma |
| `/burdur-isletme-yazilimi` | burdur işletme yazılımı, burdur randevu sistemi | burdur qr menü, burdur stok programı, otomasyon |
| `/fiyatlar` | burdur web sitesi fiyatları | web sitesi ne kadar |
| `/blog/*` | uzun kuyruk bilgi aramaları | — |

**Kelime sırası kararı:** Yerel halk Google'a **"burdur web sitesi"** yazar, "web tasarım" değil.
Bu yüzden `web sitesi` birincil hedef, `web tasarım` ikincil.

**"web tasarım" için ayrı sayfa AÇILMAZ — ama sayfadan da silinmez.** İkisi aynı arama niyetidir
(Burdur'da site yaptırmak); Google bunları aynı sepette değerlendirir. İki sayfaya bölünürse link
gücü ikiye ayrılır ve **iki sayfa da geriye düşer**. Tek güçlü sayfa her iki kelimede de üst sırada çıkar.

Tek sayfanın iki kelimeyi birden taşıma biçimi:

| Yer | İçerik |
|-----|--------|
| `<title>` | Burdur Web Sitesi ve Web Tasarım \| Osman Öz |
| `<h1>` | Burdur'da Web Sitesi Yaptırın |
| Giriş paragrafı (ilk 100 kelime) | "burdur web sitesi" geçer |
| Bir `<h2>` | Burdur'da web tasarım nasıl olmalı? |
| Gövde | "internet sitesi", "web sitesi yaptırma" doğal akışta geçer |

Kelime yığma yapılmaz — her ifade cümlenin doğal parçası olur.

### 4.2. Bölgesel Kapsam Kuralı — ÖNEMLİ

**Her şehir için ayrı sayfa AÇILMAYACAK.** Burdur–Isparta–Antalya birbirine yakın olduğundan tek bir
"Hizmet Bölgesi" anlatımı hem dürüst hem güvenlidir. Şehir başına klonlanmış sayfalar Google
tarafından **doorway page** sayılır ve cezalandırılır.

Isparta ve Antalya şu noktalarda geçer:

- Ana sayfadaki "Hizmet Bölgesi" bölümü (mesafe/ulaşım vurgusu, yerinde görüşme)
- JSON-LD `areaServed` alanı
- `/iletisim` ve `/hakkimda` metinleri
- Blog yazıları

### 4.3. Teknik SEO Zorunlulukları

- **Metadata API:** Her sayfa unique `title` (≤60 karakter) + `description` (≤155 karakter) + `canonical` + Open Graph.
- **JSON-LD (`schema.org`):** `src/lib/schema.ts` içinde kuruldu. Tek `@graph`, düğümler `@id` ile bağlı.
  - **Kalıcı düğümler** (root layout, her sayfa): `Person` → `ProfessionalService` → `WebSite`
  - **Sayfa düğümleri:** `WebPage` · `BreadcrumbList` · `FAQPage` · `Service` · `BlogPosting`
  - `sameAs` ile `osmanoz.com` + LinkedIn bağlanır → Google iki siteyi aynı kişiye eşler, otorite aktarılır.
  - **KURAL:** Schema'ya yalnızca sayfada **görünen** bilgi yazılır. Gizli/sahte schema yok. `aggregateRating` yalnızca sitede görünen gerçek GBP yorumları varsa eklenir.
  > **Placeholder kalan alanlar** (`src/config/site.ts` içinde `TODO`): açık adres ve posta kodu
  > (repo public olacağı için `street` bilinçli boş), gerçek koordinat, GBP linki.
  > Telefon, e-posta, LinkedIn/GitHub, `alumniOf` ve paket fiyatları **gerçek veriyle dolduruldu**.
- **`sitemap.ts` + `robots.ts`:** Otomatik üretim. Sitemap her sayfanın iki dilini de listeler (`xhtml:link` ile).
- **`hreflang` — çok dillilik zorunluluğu:** Her sayfa kendi karşılığına ve kendine işaret eder:
  `tr` · `en` · `x-default` (→ Türkçe). Eksik veya karşılıksız `hreflang` **duplicate content** riskidir.
  Türkçe ve İngilizce sayfaların **slug'ları farklı** olur (`/burdur-web-sitesi` ↔ `/en/website-design-burdur`);
  aynı slug'ı iki dilde kullanma. Her sayfanın `canonical`'ı kendi dilindeki URL'dir.
- **`/admin` indekslenmez:** `robots.ts`'te `disallow`, sayfada `noindex`. Sitemap'e girmez.
- **Başlık hiyerarşisi:** Sayfa başına **tek `<h1>`**, bölümler `<h2>`, alt başlıklar `<h3>`.
- **Semantik DOM:** `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`. Anlamsız `<div>` yığını yok.
- **Görseller:** `next/image`, AVIF/WebP, gerçek `width`/`height` (CLS = 0), betimleyici Türkçe `alt`.
- **Font:** `next/font` ile self-host. En fazla 2 aile. `display: swap`.
- **İç linkleme:** Her hizmet sayfası → `/fiyatlar` ve `/iletisim`'e; blog yazıları → ilgili hizmet sayfasına link verir.

### 4.4. Site Dışı — Bunlar Olmadan İlk Sıra Gelmez

Yerel aramalarda organik sonuçların üstünde **harita paketi (local pack)** çıkar. Site tek başına yetmez:

1. **Google Business Profile** — ücretsiz. Kategori: *"Web Tasarımcısı" / "Yazılım Şirketi"*. Adres + telefon doğrulaması, hizmet listesi, fotoğraflar, düzenli gönderi. **İlk sıranın en büyük tek faktörü budur.**
2. **NAP tutarlılığı** — İsim / Adres / Telefon üçlüsü site, GBP ve tüm dizinlerde **harfi harfine aynı** yazılacak.
3. **Google Search Console** — sitemap gönderimi, indeksleme takibi.
4. **Yerel backlink** — Burdur ticaret odası, yerel haber siteleri, üniversite, esnaf dernekleri.
5. **Müşteri yorumları** — GBP'de gerçek yorum. Sahte yorum **kesinlikle yok**.

### 4.5. GEO & AEO — YZ ve Cevap Motorları

Klasik SEO'nun yanında iki hedef daha var: **GEO** (ChatGPT/Perplexity/Gemini kaynak göstersin) ve
**AEO** (öne çıkan snippet + sesli asistan doğrudan cevap seçsin). Kod tarafındaki karşılıkları:

- **`robots.txt`'te YZ botları engellenmeyecek:** `GPTBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, `CCBot` açık.
- **`public/llms.txt`** — site kökünde; ne yaptığını, hizmetleri ve hizmet bölgesini düz metin özetler.
- **JS olmadan okunabilirlik:** Zaten %100 SSG olduğu için içerik HTML'de hazır gelir — çoğu YZ botu JS render etmez. Bu, statik render kararının ikinci gerekçesi.
- **Soru-cevap formatı (AEO'nun kalbi):** SSS ve blog başlıkları **doğal dil sorusu** olarak yazılır ("Burdur'da web sitesi ne kadar sürede hazır olur?"). Cevap **hemen altında, ilk cümlede, 40-60 kelime**, ters piramit (önce net sonuç, sonra detay).
- **Alıntılanabilirlik:** "binlerce" değil **net rakam/tarih/süre**. Uydurma istatistik yasak (bkz. §4.6) — gerçek olan söylenir: teslim süresi, paket kapsamı, kaç sayfa.
- **Taranabilirlik:** kısa paragraf (2-4 cümle), madde listeleri, karşılaştırmalarda gerçek `<table>`, önemli tanımlar **bold**.
- **E-E-A-T:** `/hakkimda` gerçek bir author bio sayfasıdır; `Person` schema, unvan ve `sameAs` ile desteklenir. Blog yazılarında `author` → `Person` düğümü.

### 4.6. Yasaklar

- Keyword stuffing, gizli metin, doorway page, otomatik üretilmiş sahte içerik.
- Uydurma referans, sahte müşteri yorumu, gerçek olmayan istatistik ("500+ mutlu müşteri").
- Kopyalanmış içerik. Tüm metinler özgün.

## 5. Sayfa Yapısı ve UI Senaryosu

### 5.1. Sayfa Haritası

**Türkçe — kök URL (varsayılan dil):**

```text
/                          Ana sayfa
/burdur-web-sitesi         Hizmet: web sitesi
/burdur-mobil-uygulama     Hizmet: mobil uygulama
/burdur-isletme-yazilimi   Hizmet: QR menü, randevu, stok, otomasyon
/ornekler                  Mockup vitrini
/fiyatlar                  Paketler
/hakkimda                  Kişisel güven sayfası
/iletisim                  Form + WhatsApp + hizmet bölgesi
/blog                      Liste
/blog/[slug]               Yazı
```

**İngilizce — `/en/` prefix, slug'lar farklı (hreflang ile karşılıklı bağlı):**

```text
/en                        Home
/en/website-design-burdur  Service: website
/en/mobile-app-burdur      Service: mobile app
/en/business-software      Service: QR menu, booking, stock
/en/examples  /en/pricing  /en/about  /en/contact  /en/blog  /en/blog/[slug]
```

**Yönetim — indekslenmez:**

```text
/admin                     İçerik yönetimi (Sveltia CMS, GitHub girişi) — noindex + robots disallow
```

### 5.2. Ana Sayfa Akışı (dönüşüm sırasına göre)

1. **Hero** — İki kolonlu. *Statik render; LCP elemanı burada.*
   - **Sol kolon — Kimlik kartı:** Yuvarlak profil fotoğrafı, altında *"Osman Öz — Bilgisayar Mühendisi"*, altında LinkedIn ve `osmanoz.com` linkleri. **Yüzün ilk ekranda görünmesi güvenilirlik sinyalidir** — yerel esnaf "kiminle konuşacağını" görmek ister. Mobilde (< 768px) başlığın üstünde ortalanır, masaüstünde solda sabit kolon.
   - **Sağ kolon:** `<h1>` Burdur odaklı net vaat + somut söz ("48 saatte ilk taslak" gibi). Birincil CTA: WhatsApp. İkincil: "Örnekleri Gör".
   - **SEO kuralı:** `<h1>` **isim değil, hizmet + şehir** olur ("Burdur'da Web Sitesi, Mobil Uygulama ve İşletme Yazılımı"). "Osman Öz — Bilgisayar Mühendisi" ibaresi `<p>`/`<span>` içinde durur, `<h1>`/`<h2>` yapılmaz.
   - Profil fotoğrafı `priority` ile yüklenir; sabit `width`/`height` verilir (CLS = 0).
2. **Problem** — "Müşteriniz sizi Google'da bulamıyor." Kayıp müşteriyi işletme sahibinin dilinde anlat.
3. **Hizmetler** — 3 kart (web sitesi / mobil uygulama / işletme yazılımı) → ilgili hizmet sayfasına link.
4. **Örnek Çalışmalar** — laptop + telefon çerçevesi içinde interaktif mockup önizleme (kafe, kuaför, market). *İkna gücünün ana kaynağı.*
5. **Süreç** — 4 adım: Görüşme → Tasarım → Geliştirme → Teslim + Eğitim. Belirsizliği kaldırır.
6. **Fiyat Paketleri** — 3 paket, "başlayan fiyat" ile. Detay `/fiyatlar`'da.
7. **Hizmet Bölgesi** — Burdur merkez + ilçeler, Isparta, Antalya.
8. **SSS** — `FAQPage` schema ile. En az 6 gerçek soru ("ne kadar sürer", "sonradan kendim güncelleyebilir miyim", "alan adı kimin üstüne kayıtlı olur").
9. **Hakkımda özeti** — Fotoğraf + bilgisayar mühendisliği vurgusu + osmanoz.com linki.
10. **Son CTA** — WhatsApp + form.

### 5.3. Blog Yazısı Sayfası — Akordiyon Düzeni

Blog yazıları **duvar gibi metin olmayacak.** Açılır-kapanır bölümlerden oluşur.

| Bölüm | Durum |
|-------|-------|
| `<h1>` soru başlığı + kısa cevap kutusu (40-60 kelime) | **Her zaman açık** |
| Alt başlıklar (3-5 bölüm) | Açılır-kapanır, ilki açık gelir |
| İçindekiler (masaüstünde yanda sabit) | Tıklanınca ilgili bölüm açılır ve oraya kayar |
| Sonda WhatsApp CTA | Açık |

**SEO şartları — bunlar bozulursa akordiyon zarar verir:**

- Akordiyon içeriği **HTML'de hazır** basılır; tıklayınca fetch edilmez. (%100 statik olduğu için zaten böyle.)
- Kapalı bölümler `hidden`/`display:none` ile değil, yükseklik animasyonuyla gizlenir; içerik DOM'da kalır.
- **İlk cevap kutusu asla kapalı olmaz** — öne çıkan snippet ve YZ alıntısı oradan gider.
- Başlık hiyerarşisi akordiyon yüzünden bozulmaz: `<h1>` tek, bölümler `<h2>`.
- `<details>`/`<summary>` veya erişilebilir bir akordiyon kullanılır — klavye ile açılabilmeli.

### 5.4. Global UI Elemanları

- **Sabit WhatsApp butonu** — tüm sayfalarda, sağ altta. Ön-doldurulmuş mesaj (`?text=`) sayfaya göre değişir. Mobilde başparmak erişiminde.
- **Sticky Navbar** — mobilde sadeleşir, sağda WhatsApp CTA.
- **Dil değiştirici** — Navbar'da, tema tuşunun yanında. `TR | EN` biçiminde sade metin; bayrak kullanılmaz (bayrak dili değil ülkeyi temsil eder, yanıltıcıdır). Tıklanınca **bulunduğu sayfanın** diğer dildeki karşılığına gider, ana sayfaya atmaz. Seçim `localStorage`'da hatırlanır.
- **Dark / Light tema** — `next-themes`. İki temada da kontrast ayrı kontrol edilir.
- **Toast** — `sonner` (form gönderimi, telefon/e-posta kopyalama).
- **Scroll-to-Top**
- **Reduced Motion** — `prefers-reduced-motion` tercihinde tüm animasyonlar devre dışı.

### 5.5. Tasarım Sistemi

- **Yön:** *Güven veren modern* — net, ferah, bol beyaz alan, büyük tipografi, seçici animasyon. "Havalı"lık **düzen ve kalite hissiyle** kurulur, efektle değil.
- **Kontrast:** WCAG AA hedefi (normal metin ~4.5:1). Dark ve light ayrı kontrol edilir.
- **Renk Kuralı (60-30-10):** %60 zemin, %30 kart/yüzey, %10 vurgu (CTA, link).
- **Palet & Tipografi:** (belirlenecek) — `ui-ux-pro-max` skill ile seçilecek, Tailwind config'de token olarak tanımlanacak.
- **Tutarlılık:** Spacing, radius ve gölgelerde Tailwind scale dışına çıkılmaz.
- **Mobile-first:** Hedef kitlenin çoğu telefondan girer. Tasarım kararları önce 375px'te verilir.

### 5.6. Görsel Varlıklar

| Varlık | Mevcut durum | Yapılacak |
|--------|--------------|-----------|
| **Profil fotoğrafı** — `AAA-BENIM-DOSYALARIM/ProfilPhoto.png` | 1792×2390, **8.3 MB**, RGBA PNG | Yüz ortalı **kare kırp** → 512×512 → `public/osman-oz.webp` (+ AVIF). Hedef: **< 60 KB**. Ham 8.3 MB dosya `public/`'e **konulmaz**. |
| Hero arka plan / doku | yok | Gerekirse `nanobanana` ile üretilir. Ağır görsel yok. |
| Mockup ekranları (kafe/kuaför/market) | yok | `nanobanana` ile üretilir veya kod ile çizilir. |
| OG image | `public/og-foto.png` | `opengraph-image.tsx` ile build-time üretilir; profil fotoğrafı + Burdur vurgusu. **Kaynak PNG olmak zorunda** — `next/og` (Satori) WebP çözemez (§12). |

**Kurallar:**

- Profil fotoğrafı 3 yerde kullanılır: Hero kimlik kartı, `/hakkimda`, OG image. Tek kaynaktan (`src/config/site.ts`) referanslanır.
- `alt` metni betimleyici ve Türkçe: *"Osman Öz — Burdur'da web sitesi ve yazılım hizmeti veren bilgisayar mühendisi"*.
- Yuvarlaklık CSS ile (`rounded-full` + `object-cover`) verilir, görselin kendisi kare kalır.
- Tüm görseller `next/image` üzerinden; ham `<img>` kullanılmaz.

## 6. Mimari ve Geliştirme Standartları

### 6.1. İçerik Yönetimi — VAZGEÇİLDİ

`/admin` paneli (Sveltia CMS) planlanmıştı, **24.08.2026'da vazgeçildi.**
Tek kişilik bir projede metin değişikliği doğrudan kodda yapılıyor; panel
aradaki fazladan katman oluyordu. `public/admin/` klasörü kaldırıldı.

Yapıdan kalanlar korundu, ileride gerekirse üstüne CMS kurulabilir:

- `content/settings/*.json` — SSS, paketler, süreç, hizmet metinleri
- Her metin alanı çift dilli: `{ "tr": "...", "en": "..." }`
- `src/lib/content.ts` bu dosyaları okur, dile göre çözer, tiplendirir
- `robots.ts`'teki `Disallow: /admin` bilinçli olarak duruyor

### 6.2. Kod Standartları

- **Atomic Design:**
  - `atoms/` — Button, Input, Badge, Typography, Icon
  - `molecules/` — ServiceCard, PriceCard, FaqItem, WhatsAppButton, MockupFrame, ThemeToggle
  - `organisms/` — Navbar, Footer, Hero, ServicesGrid, ShowcaseSection, ProcessSteps, PricingSection, FaqSection, ContactForm
  - Templates katmanı yok — iskelet işini App Router `layout.tsx` üstlenir.
- **Server / Client ayrımı:** Varsayılan Server Component. `"use client"` sadece state/etkileşim gerektirende (form, tema, akordiyon, mockup) ve **"client kabuk + server içerik (children)"** kalıbıyla.
- **Modülerlik:** Tekrar eden mantık `hooks/` veya `utils/`'e çıkar. Dosya büyüdüyse sorumluluğu bölünmelidir.
- **Tek doğruluk kaynağı:** İletişim bilgileri, hizmet listesi, fiyat paketleri ve SSS `src/config/site.ts` + `content/`'te tutulur. Metin JSX içine gömülmez.
- **Performans:** İlk ekranda görünmeyen ağır bileşenler `next/dynamic` ile lazy yüklenir. **`ssr: false` kullanılmayacak** (SEO'dan düşmemesi için).

## 7. Hedeflenen Dosya Yapısı

```text
osmanoz-website/
├── src/
│   ├── app/
│   │   ├── [locale]/                     # tr (kök) + en
│   │   ├── page.tsx                      # Ana sayfa
│   │   ├── layout.tsx                    # Root layout + JSON-LD
│   │   ├── burdur-web-sitesi/page.tsx
│   │   ├── burdur-mobil-uygulama/page.tsx
│   │   ├── burdur-isletme-yazilimi/page.tsx
│   │   ├── ornekler/page.tsx
│   │   ├── fiyatlar/page.tsx
│   │   ├── hakkimda/page.tsx
│   │   ├── iletisim/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── config/
│   │   └── site.ts                       # NAP, WhatsApp, sosyal, hizmet & paket verisi
│   ├── lib/
│   │   ├── schema.ts                     # JSON-LD üreticileri
│   │   └── mdx.ts
│   ├── actions/
│   │   └── contact.ts                    # Server Action → Resend
│   ├── hooks/
│   ├── types/
│   └── utils/
├── content/
│   ├── settings/*.json                   # CMS'in yazdığı veri (genel · iletisim · paketler · sss)
│   ├── services/*.{tr,en}.mdx
│   └── blog/*.{tr,en}.mdx
├── public/
│   ├── osman-oz.webp                     # 512×512, kare kırpılmış profil (< 60 KB)
│   ├── llms.txt                          # YZ motorları için düz metin özet (GEO)
│   ├── admin/                            # Sveltia CMS — config.yml + index.html
│   ├── uploads/                          # panelden yüklenen görseller
│   └── mockups/                          # kafe · kuaför · market örnek ekranları
├── .claude/agents/                       # gelistirici · test-uzmani · pazarlama-uzmani (bkz. §8.1)
├── SEO-GEO-AEO-Checklists/               # denetim listeleri (bkz. §10)
├── AAA-BENIM-DOSYALARIM/                 # kişisel dosyalar: hatırlatma · fiyat · ham foto
├── .env.local                            # RESEND_API_KEY vb. (gitignore'da)
├── tailwind.config.ts
└── tsconfig.json
```

## 8. Geliştirme Ekibi ve Araçlar

### 8.1. Agent'lar

Proje üç agent ile yürütülür. Tanımlar `.claude/agents/` altında.

| Agent | Rolü | Yetkisi |
|-------|------|---------|
| `gelistirici` | Frontend + backend. Sayfa, bileşen, form, schema, içerik entegrasyonu, hata düzeltme | Kod yazar |
| `test-uzmani` | Build, konsol, kırık link, form davranışı, 375px/masaüstü, light/dark, Lighthouse, a11y | **Kod düzeltmez** — bulur, raporlar |
| `pazarlama-uzmani` | `SEO-GEO-AEO-Checklists/` denetimi, `4.Rapor.txt` + `5.Rapor.html` üretimi | **Kod düzeltmez** — denetler, öneri yazar |

**Akış:** `gelistirici` yazar → `test-uzmani` kırmaya çalışır → `pazarlama-uzmani` denetler →
bulgular `gelistirici`'ye döner. Denetleyenlerin kod yazmaması bilinçli: kendi işini test eden
taraf körleşir.

**Her agent, uzmanlığı gerektirdiğinde §8.2'deki skill ve MCP'leri kullanır.**
Hangisini kullandığını raporunda belirtir. Kotası dar olanlarda (`21st`) kullanıcıya sorar.

### 8.2. Araçlar (MCP / Skill)

Herhangi bir tasarım/UI işine **sıfırdan elle CSS yazarak başlama**. Önce buraya bak:

| Araç | Ne için | Kimin | Kota / Not |
|------|---------|-------|------------|
| `ui-ux-pro-max` skill | **İlk durak.** Renk paleti, font eşleşmesi, stil yönü, UX kuralları, motion presetleri | gelistirici | Ücretsiz |
| `frontend-design` skill | Jenerik "AI görünümü"nden kaçınan, karakterli arayüz üretimi | gelistirici | Ücretsiz |
| `mcp__nanobanana__*` | Görsel / asset üretimi: hero görseli, mockup ekranları, OG image, blog kapakları | gelistirici | Ücretsiz kota |
| `mcp__stitch__*` | Prompt'tan komple ekran / sayfa tasarımı üretimi (yön arayışında) | gelistirici | ~350 üretim/ay |
| `mcp__21st__*` | shadcn/ui + Tailwind component üretimi | gelistirici | 100 kredi/ay — **kullanmadan önce sor** |
| `mcp__Claude_Browser__*` | Local preview, responsive kontrol, console / network denetimi | test-uzmani | Ücretsiz |
| `anthropic-skills:webapp-testing` | Playwright ile davranış testi, ekran görüntüsü | test-uzmani | Ücretsiz |
| `seo-auditor` skill | Meta / okunabilirlik / link / sitemap denetimi — asıl kaynak checklist klasörü | pazarlama-uzmani | Ücretsiz |
| `superpowers:*` | brainstorming → writing-plans → executing-plans → verification akışı | hepsi | Ücretsiz |

**Kural:** Hangi aracı kullanacağını kısaca söyle. Kotası çabuk tükenenlerde (`21st`) kullanmadan önce sor.
Ücretli servis (fal.ai, Gemini Pro image API vb.) gerekiyorsa **kullanmadan önce sor**.

## 9. Kapsam Dışı (YAGNI)

Bunlar bilinçli olarak **yapılmayacak** — istenirse V2'de tartışılır:

- Veritabanı, kendi yazdığımız auth sistemi, sunucu tarafı CMS
- Gerçek çalışan demo siteler (V1'de mockup yeterli; V2'de eklenebilir)
- Şehir başına ayrı landing sayfası (bkz. §4.2)
- Online ödeme / sipariş alma
- Chat widget, canlı destek
- Grafik kütüphanesi, ağır 3D / WebGL

## 10. SEO / GEO / AEO Denetimi

`SEO-GEO-AEO-Checklists/` klasöründe ~200 maddelik kontrol listesi var:
`1.SEO.md` · `2.GEO.md` · `3.AEO.md`, akış `0.instructions.md`'de tanımlı.

**Bu liste sona bırakılan bir sınav değil, geliştirme sırasında uyulacak şartname.**
Her sayfa/bileşen yazılırken ilgili maddeler zaten karşılanır; yayın öncesi denetim
sadece kanıt toplar. Sonda toplu düzeltme yapmak zorunda kalıyorsak, süreç yanlış işlemiştir.

**Geliştirme sırasında sürekli geçerli maddeler** (yazarken uygulanır):

| Kaynak | Madde |
|--------|-------|
| SEO 1-3 | robots/sitemap/canonical, semantik HTML, tek `<h1>`, unique title+description, `alt` metinleri |
| SEO 4 | sayfa başına tek birincil kelime, cannibalization yok, ilk 100 kelimede kelime geçer |
| SEO 5 | LCP/CLS/INP hedefleri, WebP/AVIF, lazy loading, dokunma hedefi boyutu |
| GEO 1-2 | YZ botları açık, `llms.txt`, JS'siz okunabilirlik, bölüm başına tek konu |
| GEO 3-4 | net rakam/tarih, kaynaklı iddia, author kimliği |
| AEO 2-3 | JSON-LD, soru başlıkları, ilk cümlede 40-60 kelimelik doğrudan cevap |
| AEO 4-5 | kısa paragraf, liste, `<table>`, snippet cevapları sayfanın üstünde |

**Yayın öncesi denetim akışı:** `0.instructions.md`'ye göre `4.Rapor.txt` doldurulur
(`[✓]` / `[✗]` / `[~]` / `[97]` / `[98]` / `[99]`), öneriler yazılır, `5.Rapor.html` üretilir.
Orijinal `1/2/3` listeleri **asla** işaretlenmez — boş şablon kalır.

**Kapsam dışı maddeler** (bu projede uygulanamaz, `[97]` ile işaretlenir):
`Course`/`Product`/`Review` schema, Wikipedia/Knowledge Panel (yeni marka).

## 11. Doğrulama Kuralı

"Bitti", "çalışıyor", "hazır" demeden önce **komutu çalıştır ve çıktıyı gör**:

- `next build` temiz geçmeli (uyarı dahil okunmalı)
- Lighthouse **mobil** skorları §2'deki hedefleri karşılamalı
- JSON-LD **Rich Results Test + Schema Validator**'dan hatasız geçmeli
- Sayfalar hem light hem dark temada, hem 375px hem masaüstünde kontrol edilmeli

Kanıt olmadan başarı iddia edilmez.

## 12. Sonradan Yapılan Önemli Eklemeler

Geliştirme sırasında alınan, yukarıdaki bölümlerden türetilemeyen kararlar.

| Konu | Karar |
|------|-------|
| **Tailwind v4 sözdizimi** | `rounded-[--radius]` v4'te kaldırıldı → **`rounded-(--radius)`** kullanılır. Eski biçim hata vermez, sessizce düşer. |
| **`@theme` içinde kendine referans** | `--shadow-xs: var(--shadow-xs)` döngü kurar ve değeri sessizce boşaltır. Kök değişkenler bu yüzden `--sh-*` adını taşır. |
| **Dinamik Tailwind sınıfı** | `vurgula(metin, renk)` gibi sınıf adını dışarıdan alan yerlerde, verilen sınıf kaynak kodda **başka bir yerde de geçmeli**; JIT tarama string birleştirmesini görmez. |
| **`next/og` görsel formatı** | Satori WebP çözemez → OG görselinde **PNG** kullanılır (`public/og-foto.png`). |
| **Paket rozetleri** | `one_cikan` → turuncu "En çok tercih edilen". Serbest etiket için `rozet` alanı var, **nötr** stille basılır (turuncu vurgu yalnızca CTA ve tek bir öne çıkan paket içindir). |
| **Sunulmayan paket** | "Yakında" olan pakette buton yerine **tıklanamayan gri etiket** durur; sahte bir eylem çağrısı verilmez. |
| **Fiyat bilgisi metinlerde** | Paket **başlangıç fiyatları sitede açıkça yazılır** (§1 fiyat şeffaflığı). İstisna: yıllık bakım/güncelleme tutarı yazılmaz, "görüşmede net olarak söylenir" denir. SSS ile fiyat sayfası aynı şeyi söylemeli. |
| **Footer'da "Sayfalar" sütunu yok** | Denendi, geri alındı — navbar'ın kopyasıydı. İç linkleme için hizmet sütunu yeterli; asıl kazanç blog gövdesinden verilecek linklerde. |
| **Hizmet bölgesi bölümü kaldırılmaz** | Isparta/Antalya kelimelerinin siteye girdiği tek yer orası ve schema'daki `areaServed` "yalnızca görünen bilgi" kuralına oradan dayanıyor (§4.2, §4.3). |
| **SSS cevap uzunluğu** | Metin her değiştiğinde **40-60 kelime** aralığı yeniden ölçülür (§4.5). Kısa cevap AEO'da snippet şansını düşürür. |
| **Tarih içeren ifadeler** | "Eylül 2026 itibarıyla mobil uygulama hizmeti aktif değil" gibi cümleler net tarih taşır (GEO 3); hizmet açıldığında bu cümleler taranıp güncellenir. |

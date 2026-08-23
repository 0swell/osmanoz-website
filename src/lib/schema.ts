/**
 * JSON-LD (schema.org) üreticileri.
 *
 * Tasarım kararı: tek bir `@graph` kullanılır, düğümler `@id` ile birbirine
 * bağlanır. Sayfa başına ayrı ayrı kopuk bloklar basmak yerine bağlı graph
 * kullanmak, Google ve YZ motorlarının "bu site = bu kişi = bu işletme"
 * eşlemesini kurmasını sağlar (entity netliği — GEO §4, AEO §2).
 *
 * Kurallar:
 * - Yalnızca sayfada GÖRÜNEN bilgi schema'ya yazılır. Gizli/sahte schema yok.
 * - Boş alan gönderilmez; `prune()` undefined/boş değerleri temizler.
 * - Yayın öncesi Rich Results Test + Schema Validator'dan geçirilir.
 */

import { getServices, getSameAs, siteConfig, type ServiceItem } from "@/config/site";
import { SON_GUNCELLEME } from "@/config/guncelleme";
import { rotalar } from "@/i18n/diller";

const BASE = siteConfig.url;

/** Sabit düğüm kimlikleri — graph içi referanslar bunlarla kurulur. */
export const SCHEMA_ID = {
  person: `${BASE}/#person`,
  business: `${BASE}/#business`,
  website: `${BASE}/#website`,
  page: (path: string) => `${BASE}${path}#webpage`,
  breadcrumb: (path: string) => `${BASE}${path}#breadcrumb`,
  faq: (path: string) => `${BASE}${path}#faq`,
  service: (slug: string) => `${BASE}/${slug}#service`,
  article: (slug: string) => `${BASE}/blog/${slug}#article`,
} as const;

type Json = Record<string, unknown>;

/** undefined / null / "" / [] alanlarını graph'tan düşürür. */
function prune<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

function ref(id: string) {
  return { "@id": id };
}

// ---------------------------------------------------------------------------
// Adres — hizmet alanı işletmesi ise açık adres yayınlanmaz
// ---------------------------------------------------------------------------

function postalAddress(): Json {
  const { nap, isServiceAreaBusiness } = siteConfig;
  return prune({
    "@type": "PostalAddress",
    streetAddress: isServiceAreaBusiness ? undefined : nap.street,
    postalCode: isServiceAreaBusiness ? undefined : nap.postalCode,
    addressLocality: nap.city,
    addressRegion: nap.region,
    addressCountry: nap.country,
  });
}

/** areaServed — şehirler City düğümü olarak verilir (sadece string'den güçlü). */
function areaServed(): Json[] {
  return siteConfig.areaServed.map((city) => ({
    "@type": "City",
    name: city,
    address: {
      "@type": "PostalAddress",
      addressRegion: city,
      addressCountry: "TR",
    },
  }));
}

// ---------------------------------------------------------------------------
// Kalıcı düğümler — her sayfada basılır (root layout)
// ---------------------------------------------------------------------------

/**
 * Person — E-E-A-T'nin taşıyıcısı. "Kim yapıyor?" sorusunun makine cevabı.
 * osmanoz.com ve LinkedIn `sameAs` ile bağlanır; Google iki siteyi aynı
 * kişiye bağlar, otorite osmanoz.com'dan bu siteye taşınır.
 */
export function personNode(): Json {
  return prune({
    "@type": "Person",
    "@id": SCHEMA_ID.person,
    name: siteConfig.personName,
    jobTitle: siteConfig.jobTitle,
    url: BASE,
    image: `${BASE}${siteConfig.profileImage}`,
    sameAs: getSameAs(),
    knowsAbout: [
      "Web sitesi geliştirme",
      "Mobil uygulama geliştirme",
      "İşletme yazılımı",
      "Arama motoru optimizasyonu",
    ],
    worksFor: ref(SCHEMA_ID.business),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.education.university,
      url: siteConfig.education.universityUrl,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "Lisans",
      name: siteConfig.education.degree,
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: siteConfig.education.university,
      },
    },
  });
}

/**
 * ProfessionalService — LocalBusiness alt tipi. Yerel arama ve harita
 * paketinin schema tarafındaki karşılığı.
 *
 * NOT: Bu düğüm tek başına harita paketine sokmaz — asıl belirleyici
 * Google Business Profile'dır (CLAUDE.md §4.4). Schema onu destekler.
 */
export function businessNode(): Json {
  const { nap, openingHours } = siteConfig;

  return prune({
    "@type": "ProfessionalService",
    "@id": SCHEMA_ID.business,
    name: nap.name,
    description: siteConfig.description,
    url: BASE,
    image: `${BASE}${siteConfig.profileImage}`,
    logo: `${BASE}${siteConfig.profileImage}`,
    telephone: nap.phone || undefined,
    email: nap.email || undefined,
    address: postalAddress(),
    geo: prune({
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    }),
    areaServed: areaServed(),
    priceRange: siteConfig.priceRange,
    currenciesAccepted: "TRY",
    founder: ref(SCHEMA_ID.person),
    employee: ref(SCHEMA_ID.person),
    sameAs: getSameAs(),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: openingHours.days,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
    hasOfferCatalog: offerCatalogNode(),
    // Sahte yorum yazılmayacak. Gerçek GBP yorumları gelince:
    // aggregateRating yalnızca sitede GÖRÜNEN yorumlarla eklenir.
  });
}

/** Slug → rota anahtarı; hizmet yolları tek kaynaktan gelsin. */
function hizmetRota(slug: string): "webSitesi" | "mobil" | "isletme" {
  if (slug === "burdur-mobil-uygulama") return "mobil";
  if (slug === "burdur-isletme-yazilimi") return "isletme";
  return "webSitesi";
}

/** Hizmet listesi — "bu işletme neler yapıyor" sorusunun makine cevabı. */
function offerCatalogNode(): Json {
  return {
    "@type": "OfferCatalog",
    name: "Yazılım Hizmetleri",
    // Kalıcı graph her sayfada basılır; hizmet adları Türkçe kökten alınır.
    itemListElement: getServices("tr").map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": SCHEMA_ID.service(s.slug),
        name: s.name,
        description: s.description,
        url: `${BASE}${rotalar[hizmetRota(s.slug)].tr}`,
      },
    })),
  };
}

export function websiteNode(): Json {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_ID.website,
    url: BASE,
    name: siteConfig.siteName,
    description: siteConfig.description,
    inLanguage: "tr-TR",
    publisher: ref(SCHEMA_ID.business),
  };
}

// ---------------------------------------------------------------------------
// Sayfa düğümleri
// ---------------------------------------------------------------------------

export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  /** Sayfada FAQ/breadcrumb varsa bunların @id'leri buraya bağlanır. */
  partOfIds?: string[];
  /** Verilmezse site geneli son güncelleme tarihi kullanılır. */
  dateModified?: string;
  dil?: "tr" | "en";
}): Json {
  return prune({
    "@type": "WebPage",
    "@id": SCHEMA_ID.page(opts.path),
    url: `${BASE}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.dil === "en" ? "en" : "tr-TR",
    isPartOf: ref(SCHEMA_ID.website),
    about: ref(SCHEMA_ID.business),
    primaryImageOfPage: `${BASE}${siteConfig.profileImage}`,
    // Tazelik sinyali — üç yerde aynı tarih (bkz. config/guncelleme.ts)
    dateModified: opts.dateModified ?? SON_GUNCELLEME,
    hasPart: opts.partOfIds?.map(ref),
  });
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbNode(path: string, items: BreadcrumbItem[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_ID.breadcrumb(path),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

export type FaqItem = { question: string; answer: string };

/**
 * FAQPage — AEO'nun en yüksek getirili düğümü.
 * KURAL: buradaki her soru-cevap sayfada GÖRÜNÜR olmak zorunda.
 * Cevaplar 40-60 kelime, ilk cümlede doğrudan cevap (ters piramit).
 */
export function faqNode(path: string, items: FaqItem[]): Json {
  return {
    "@type": "FAQPage",
    "@id": SCHEMA_ID.faq(path),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Hizmet sayfaları için. */
export function serviceNode(service: ServiceItem): Json {
  return prune({
    "@type": "Service",
    "@id": SCHEMA_ID.service(service.slug),
    name: service.name,
    description: service.description,
    url: `${BASE}/${service.slug}`,
    serviceType: service.name,
    provider: ref(SCHEMA_ID.business),
    areaServed: areaServed(),
    offers: service.startingPrice
      ? {
          "@type": "Offer",
          price: service.startingPrice,
          priceCurrency: "TRY",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: service.startingPrice,
            priceCurrency: "TRY",
            valueAddedTaxIncluded: false,
          },
          availability: "https://schema.org/InStock",
        }
      : undefined,
  });
}

/** Blog yazıları için. */
export function articleNode(opts: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): Json {
  return prune({
    "@type": "BlogPosting",
    "@id": SCHEMA_ID.article(opts.slug),
    headline: opts.title,
    description: opts.description,
    url: `${BASE}/blog/${opts.slug}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "tr-TR",
    author: ref(SCHEMA_ID.person),
    publisher: ref(SCHEMA_ID.business),
    image: opts.image ? `${BASE}${opts.image}` : undefined,
    isPartOf: ref(SCHEMA_ID.website),
  });
}

// ---------------------------------------------------------------------------
// Graph birleştirici
// ---------------------------------------------------------------------------

/** Her sayfada basılan kalıcı düğümler. Root layout'ta çağrılır. */
export function rootGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), businessNode(), websiteNode()],
  };
}

/** Sayfaya özel düğümler. Kalıcı düğümler root layout'tan geldiği için tekrarlanmaz. */
export function pageGraph(nodes: Json[]): Json {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

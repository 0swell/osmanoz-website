/**
 * Tek doğruluk kaynağı — NAP, sosyal profiller, hizmet ve paket verisi.
 *
 * NAP KURALI: buradaki `name` / `address` / `phone` üçlüsü, Google Business
 * Profile'da ve tüm dizinlerde **harfi harfine aynı** yazılmak zorundadır.
 * Tek karakter farkı (Öz / Oz, Cad. / Caddesi) yerel sıralamayı zayıflatır.
 *
 * TODO işaretli alanlar gerçek bilgi netleşince doldurulacak.
 */

export const siteConfig = {
  // ---- Kimlik --------------------------------------------------------------
  siteName: "Osman Öz — Bilgisayar Mühendisi",
  personName: "Osman Öz",
  jobTitle: "Bilgisayar Mühendisi",
  url: "https://osmanoz.website",
  personalSiteUrl: "https://osmanoz.com",
  locale: "tr_TR",
  description:
    "Burdur'da işletmenize web sitesi, mobil uygulama ve işletme yazılımı. " +
    "Bilgisayar mühendisi Osman Öz ile doğrudan çalışın.",

  // ---- NAP (İsim · Adres · Telefon) ---------------------------------------
  nap: {
    /** GBP'de kullanılacak işletme adıyla BİREBİR aynı olmalı. */
    name: "Osman Öz — Bilgisayar Mühendisi",
    // Adres bilinçli olarak koda yazılmadı — repo public.
    // Hizmet alanı işletmesi olduğu için schema'da da yayınlanmıyor (bkz. isServiceAreaBusiness).
    // GBP başvurusunda elle girilecek.
    street: "",
    district: "Merkez",
    city: "Burdur",
    region: "Burdur",
    postalCode: "",
    country: "TR",
    phone: "+905012035395",
    email: "z0nams0@gmail.com", // TODO — iletisim@osmanoz.website kurulunca değişecek
  },

  /**
   * true  → "hizmet alanı işletmesi": açık adres yayınlanmaz, sadece şehir/bölge verilir.
   *         (Ev/ofis adresini paylaşmak istemiyorsan bunu true bırak; GBP'de de
   *          "Müşterilerime onların adresinde hizmet veriyorum" seçeneği işaretlenir.)
   * false → Açık adres yayınlanır; nap.street ve nap.postalCode doldurulmak zorundadır.
   */
  isServiceAreaBusiness: true,

  /** Burdur merkez — TODO: gerçek çalışma konumuyla güncelle. */
  geo: { latitude: 37.7203, longitude: 30.2908 },

  /** Hizmet verilen bölgeler. Ayrı sayfa açılmaz (bkz. CLAUDE.md §4.2). */
  areaServed: ["Burdur", "Isparta", "Antalya"],

  /** schema.org priceRange — ₺ ile ₺₺₺₺ arası. */
  priceRange: "₺₺",

  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },

  // ---- Dönüşüm kanalları ---------------------------------------------------
  whatsapp: {
    /** Ülke kodlu, işaretsiz: "905XXXXXXXXX" */
    number: "905012035395",
    defaultMessage:
      "Merhaba, işletmem için web sitesi hakkında bilgi almak istiyorum.",
  },

  // ---- Profiller (schema `sameAs` bu diziden üretilir) ---------------------
  social: {
    linkedin: "https://www.linkedin.com/in/osmanoz15",
    github: "https://github.com/0swell",
    instagram: "", // yok
  },

  // ---- Eğitim (schema `alumniOf` + /hakkimda) ------------------------------
  education: {
    university: "Burdur Mehmet Akif Ersoy Üniversitesi",
    universityUrl: "https://www.mehmetakif.edu.tr",
    degree: "Bilgisayar Mühendisliği",
    /** Devam eden yüksek lisans — /hakkimda sayfasında geçer. */
    ongoing: "Yazılım Mühendisliği Yüksek Lisans (devam ediyor)",
  },

  /** GBP yayına girince buraya işletme profilinin paylaşım linki yazılacak. */
  googleBusinessProfile: "", // TODO

  // ---- Görseller -----------------------------------------------------------
  profileImage: "/osman-oz.webp", // 512×512, kare kırpılmış (bkz. CLAUDE.md §5.6)
  profileImageAlt:
    "Osman Öz — Burdur'da web sitesi ve yazılım hizmeti veren bilgisayar mühendisi",
  ogImage: "/opengraph-image",
} as const;

/** Schema `sameAs` için: dolu olan profil linkleri + kişisel site. */
export function getSameAs(): string[] {
  return [
    siteConfig.personalSiteUrl,
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.instagram,
    siteConfig.googleBusinessProfile,
  ].filter(Boolean);
}


// ---- Hizmetler -------------------------------------------------------------
// Sayfa metinleri content/settings/hizmetler.json içinde. Burada sadece schema
// ve navigasyon için gereken çekirdek veri tutulur.

export type ServiceItem = {
  slug: string;
  /** Link metni — anahtar kelimeyi taşıyan uzun biçim. */
  linkAdi: string;
  /** Menü/kart başlığı — kısa. */
  name: string;
  /** schema.org Service.description — tek cümle, esnafın anlayacağı dilde. */
  description: string;
  /** Bu sayfanın birincil hedef anahtar kelimesi (CLAUDE.md §4.1). */
  primaryKeyword: string;
  /** "başlayan fiyat" — TL, KDV hariç. */
  startingPrice: number | null;
  /**
   * Henüz gösterilecek örnek iş yoksa true. Kart soluk gösterilir ve
   * "Yakında" rozeti alır — olmayan bir hizmeti varmış gibi sunmuyoruz.
   */
  yakinda?: boolean;
};

type ServiceHam = Omit<ServiceItem, "name" | "linkAdi" | "description"> & {
  name: { tr: string; en: string };
  linkAdi: { tr: string; en: string };
  description: { tr: string; en: string };
};

/**
 * Anahtar kelimeler yalnızca Türkçe: SEO hedefi tamamen Türkçe aramalar
 * (CLAUDE.md §1). İngilizce sürüm sıralamaya oynamaz.
 */
const servicesHam: ServiceHam[] = [
  {
    slug: "burdur-web-sitesi",
    name: { tr: "Web Sitesi", en: "Website" },
    linkAdi: { tr: "Burdur Web Sitesi", en: "Website Design in Burdur" },
    description: {
      tr: "İşletmenizin Google'da bulunmasını sağlayan, telefonda da hızlı açılan tanıtım sitesi.",
      en: "A brochure site that gets your business found on Google and opens fast on a phone.",
    },
    primaryKeyword: "burdur web sitesi",
    startingPrice: 10000,
  },
  {
    slug: "burdur-mobil-uygulama",
    name: { tr: "Mobil Uygulama", en: "Mobile App" },
    linkAdi: { tr: "Burdur Mobil Uygulama", en: "Mobile Apps in Burdur" },
    description: {
      tr: "Müşterilerinizin telefonuna kurulan, sipariş ve sadakat özellikli Android/iOS uygulaması.",
      en: "An Android and iOS app on your customers' phones, with ordering and loyalty features.",
    },
    primaryKeyword: "burdur mobil uygulama",
    startingPrice: null,
    yakinda: true,
  },
  {
    slug: "burdur-isletme-yazilimi",
    name: { tr: "İşletme Yazılımı", en: "Business Software" },
    linkAdi: {
      tr: "Burdur İşletme Yazılımı",
      en: "Business Software in Burdur",
    },
    description: {
      tr: "Randevu takibi, stok ve sipariş yönetimi, gelir gider raporlama — işletmenize özel otomasyon.",
      en: "Booking, stock and order management, revenue reporting — automation shaped around your business.",
    },
    primaryKeyword: "burdur işletme yazılımı, burdur randevu sistemi",
    startingPrice: null,
  },
];

/** Hizmet listesi — istenen dilde çözülmüş halde. */
export function getServices(dil: "tr" | "en"): ServiceItem[] {
  return servicesHam.map((s) => ({
    ...s,
    name: s.name[dil],
    linkAdi: s.linkAdi[dil],
    description: s.description[dil],
  }));
}

/** Dilden bağımsız gereken yerler için (sitemap, rota eşleşmesi). */
export const serviceSluglari = servicesHam.map((s) => s.slug);

/**
 * Eğitim bilgisi — /hakkimda ve schema `alumniOf` için. Üniversite adı resmî
 * ad olduğu için çevrilmez; derece ve devam bilgisi çevrilir.
 */
export function getEducation(dil: "tr" | "en") {
  return {
    university: siteConfig.education.university,
    universityUrl: siteConfig.education.universityUrl,
    degree:
      dil === "tr" ? siteConfig.education.degree : "Computer Engineering",
    ongoing:
      dil === "tr"
        ? siteConfig.education.ongoing
        : "MSc in Software Engineering (in progress)",
  };
}

/**
 * Arayüz metinleri — bileşenlerin içine gömülmez, buradan okunur.
 *
 * `content/settings/*.json` işletme verisini (SSS, paketler, süreç, hizmet
 * sayfaları) tutar ve ileride `/admin` panelinden düzenlenir. Bu dosya ise
 * bileşenlerin sabit arayüz metinleridir — buton yazıları, bölüm başlıkları,
 * form etiketleri.
 *
 * İngilizce metinler Türkçenin birebir çevirisi değildir: Türkçe metin yerel
 * esnafa yazılmıştır, İngilizce sürüm yabancı ziyaretçiye ve profesyonel
 * görünüme hizmet eder (CLAUDE.md §1). SEO hedefi tamamen Türkçedir.
 */

import type { Dil } from "./diller";

export type Sozluk = typeof tr;

const tr = {
  genel: {
    icerigeAtla: "İçeriğe atla",
    anaMenu: "Ana menü",
    menuAc: "Menüyü aç",
    menuKapat: "Menüyü kapat",
    whatsapp: "WhatsApp",
    whatsapptanYazin: "WhatsApp'tan Yazın",
    detaylar: "Detaylar",
    yakinda: "Yakında",
    yukariCik: "Başa dön",
    temaAc: "Açık temaya geç",
    temaKoyu: "Koyu temaya geç",
    dilDegistir: "Switch to English",
  },

  nav: {
    hizmetler: "Hizmetler",
    ornekler: "Örnekler",
    fiyatlar: "Fiyatlar",
    hakkimda: "Hakkımda",
    iletisim: "İletişim",
    unvan: "Bilgisayar Mühendisi",
  },

  hero: {
    bolge: "Burdur · Isparta · Antalya",
    h1Once: "Burdur'da ",
    h1Vurgu1: "web sitesi",
    h1Orta: ", mobil uygulama ve ",
    h1Vurgu2: "işletme yazılımı",
    giris:
      "İşletmenizi Google'da arayan müşteriler için ilk sıralara tırmanalım. Hızlı, son teknoloji web sitesi ve işinize uygun hazırlanan yazılım çözümleri için doğrudan bana ulaşabilirsiniz.",
    ornekleriGor: "Örnekleri Gör",
    guven: [
      { k: "10.000 TL", v: "başlayan paket fiyatları" },
      { k: "1-2 hafta", v: "yayına alma" },
      { k: "Burdur ve çevresi", v: "hizmet bölgesi" },
    ],
    linkedinEtiket: "LinkedIn profili",
    githubEtiket: "GitHub profili",
  },

  gorunurluk: {
    eyebrow: "Görünürlük",
    baslik: "Google'da ilk sıralara tırmanmak mı istiyorsunuz?",
    giris:
      "Burdur'da müşteri artık dükkân dükkân gezmiyor; önce telefonundan bakıyor. Google'a “Burdur inşaat mühendisi” yazıyor, “Burdur spor salonu” yazıyor ve sizi bulamıyor.",
    adimlar: [
      {
        baslik: "Müşteri sizi arıyor",
        metin:
          "Telefonunu eline alıp “Burdur kuaför” yazıyor. Çıkan **ilk üç isimden** birini seçiyor.",
      },
      {
        baslik: "Sizi ilk sıralara taşıyalım",
        metin:
          "Google'ın sizi tanıması için gerekenleri kuruyorum: hangi şehirde olduğunuz, ne iş yaptığınız ve size nasıl ulaşılacağı **net biçimde** işleniyor.",
      },
      {
        baslik: "Rakibinizin önünde çıkın",
        metin:
          "O listede **üstte olan talep görüyor.** Hedef, arayan kişi ekrana baktığında ilk gördüğü isimlerden birinin siz olması.",
      },
    ],
  },

  hizmetler: {
    eyebrow: "Hizmetler",
    baslik: "Ne yaptırabilirsiniz?",
    giris:
      "Üç paketi de tek elden yapıyorum. İhtiyacınız olan çözümlere karar verelim, en kısa sürede müşterilerinize ulaşmanızı sağlayayım.",
    yakindaNot:
      "Gösterilecek örnek çalışma hazırlanıyor. Yine de konuşabiliriz.",
  },

  surec: {
    eyebrow: "Nasıl ilerliyor",
    baslik: "Dört adım, sürpriz yok",
    giris: "Ne zaman ne olacağını baştan bilirsiniz.",
  },

  fiyat: {
    eyebrow: "Fiyatlar",
    baslik: "Google'da ilk sıralara yükselin, talebinizi arttırın.",
    giris: "Teknolojik çözümlerle, müşterilerinize sorunsuz bir şekilde ulaşın.",
    encokTercih: "En çok tercih edilen",
    teklifAlin: "Teklif Alın",
    dipnot:
      "İlk yıl alan adı ve barındırma dahildir. İkinci yıldan itibaren güncelleme ve bakım ücreti istenir. Fiyat görüşmede net olarak söylenir.",
    tumPaketler: "Tüm paketleri gör",
    paraBirimi: "TL",
  },

  bolge: {
    eyebrow: "Hizmet bölgesi",
    baslik: "Müşterilerim nerelerde?",
    giris:
      "Burdur ve komşu iller. İşin çoğu telefonla ve görüntülü görüşmeyle, toplantılarla yürür; isterseniz yüz yüze de görüşürüz.",
    kartlar: [
      {
        sehir: "Burdur",
        detay: "Merkez, ilçeler ve komşu iller",
        yakin: "Yaşadığım yer",
      },
      { sehir: "Isparta", detay: "Merkez ve çevresi", yakin: "~1 saat" },
      { sehir: "Antalya", detay: "Merkez ve ilçeler", yakin: "~2 saat" },
    ],
  },

  sss: {
    eyebrow: "Sık sorulanlar",
    baslik: "Aklınıza takılanlar",
    giris:
      "Görüşmelerde en çok sorulan sorular. Cevabı olmayan bir şey varsa yazın, eklerim.",
  },

  footer: {
    ozet: "ve çevre illerde web sitesi, mobil uygulama ve işletme yazılımı.",
    hizmetler: "Hizmetler",
    gizlilik: "Gizlilik ve KVKK",
  },


  hizmetSayfa: {
    konum: "Konum",
    anaSayfa: "Ana Sayfa",
    fiyatlariGor: "Fiyatları Gör",
    yakindaBaslik: "Bu hizmeti henüz sunmuyorum.",
    yakindaMetin:
      "Gösterebileceğim bir örnek çalışma çıkınca yayına alacağım. Yine de ihtiyacınızı konuşabiliriz — durumunuza uygun mu, açıkça söylerim.",
    sssEyebrow: "Sık sorulanlar",
    sssBaslik: "Bu hizmetle ilgili sorular",
    digerEyebrow: "Diğer hizmetler",
    digerBaslik: "Bunlar da ilginizi çekebilir",
  },

  kapanis: {
    eyebrow: "Sırada ne var",
    baslik: "Ne gerektiğini birlikte konuşalım",
    giris:
      "İşletmenizi anlatın, size neyin gerekip neyin gerekmediğini açıkça söyleyeyim. Görüşme için ücret almıyorum, bir yükümlülüğünüz de olmuyor.",
    maddeler: [
      "Aracı yok — kiminle konuştuysanız işi o yapıyor",
      "Gerekmiyorsa gerekmediğini söylerim",
      "Fiyat baştan bellidir, sonradan kalem eklenmez",
    ],
    iletisimBilgileri: "İletişim Bilgileri",
  },

  form: {
    honeypot: "Web siteniz",
    ad: "Adınız",
    telefon: "Telefon",
    telefonOrnek: "05XX XXX XX XX",
    eposta: "E-posta",
    epostaIstege: "(isteğe bağlı)",
    mesaj: "Ne yaptırmak istiyorsunuz?",
    mesajOrnek: "İşletmenizden ve ihtiyacınızdan kısaca bahsedin.",
    gonder: "Gönder",
    gonderiliyor: "Gönderiliyor…",
    kvkkOnce:
      "Bilgileriniz yalnızca size dönüş yapmak için kullanılır, kimseyle paylaşılmaz. Ayrıntı için",
    kvkkLink: "gizlilik metni",
  },
};

const en: Sozluk = {
  genel: {
    icerigeAtla: "Skip to content",
    anaMenu: "Main menu",
    menuAc: "Open menu",
    menuKapat: "Close menu",
    whatsapp: "WhatsApp",
    whatsapptanYazin: "Message on WhatsApp",
    detaylar: "Details",
    yakinda: "Coming soon",
    yukariCik: "Back to top",
    temaAc: "Switch to light theme",
    temaKoyu: "Switch to dark theme",
    dilDegistir: "Türkçeye geç",
  },

  nav: {
    hizmetler: "Services",
    ornekler: "Examples",
    fiyatlar: "Pricing",
    hakkimda: "About",
    iletisim: "Contact",
    unvan: "Computer Engineer",
  },

  hero: {
    bolge: "Burdur · Isparta · Antalya",
    h1Once: "Websites, ",
    h1Vurgu1: "mobile apps",
    h1Orta: " and ",
    h1Vurgu2: "business software in Burdur",
    giris:
      "I build fast, modern websites and custom software for businesses in Burdur and the surrounding region. You work directly with the engineer who writes the code — no agency, no middlemen.",
    ornekleriGor: "See Examples",
    guven: [
      { k: "From 10,000 TL", v: "package pricing" },
      { k: "1-2 weeks", v: "time to launch" },
      { k: "Burdur & region", v: "service area" },
    ],
    linkedinEtiket: "LinkedIn profile",
    githubEtiket: "GitHub profile",
  },

  gorunurluk: {
    eyebrow: "Visibility",
    baslik: "Want to climb to the top of Google?",
    giris:
      "People no longer walk from shop to shop — they check their phone first. They search “construction engineer Burdur” or “gym Burdur”, and your business never shows up.",
    adimlar: [
      {
        baslik: "Customers search for you",
        metin:
          "They pick up the phone and type “hairdresser Burdur”, then choose one of the **first three names** they see.",
      },
      {
        baslik: "We move you up the list",
        metin:
          "I set up everything Google needs to understand your business: where you are, what you do and how to reach you, all **stated clearly**.",
      },
      {
        baslik: "You appear ahead of competitors",
        metin:
          "**Whoever sits at the top gets the enquiries.** The goal is for your name to be among the first ones on that screen.",
      },
    ],
  },

  hizmetler: {
    eyebrow: "Services",
    baslik: "What can I build for you?",
    giris:
      "All three packages are handled by one person. We decide together what your business actually needs, and get you in front of customers quickly.",
    yakindaNot: "A sample project is in preparation. We can still talk about it.",
  },

  surec: {
    eyebrow: "How it works",
    baslik: "Four steps, no surprises",
    giris: "You know what happens and when, from the start.",
  },

  fiyat: {
    eyebrow: "Pricing",
    baslik: "Rise to the top of Google and grow your enquiries.",
    giris: "Reach your customers without friction, with up-to-date technology.",
    encokTercih: "Most popular",
    teklifAlin: "Get a Quote",
    dipnot:
      "Domain and hosting are included for the first year. From the second year on there is an update and maintenance fee; the exact amount is stated during our call.",
    tumPaketler: "See all packages",
    paraBirimi: "TL",
  },

  bolge: {
    eyebrow: "Service area",
    baslik: "Where are my clients?",
    giris:
      "Burdur and the neighbouring provinces. Most of the work runs over phone, video calls and online meetings; we can also meet face to face if you prefer.",
    kartlar: [
      {
        sehir: "Burdur",
        detay: "City centre, districts and nearby provinces",
        yakin: "Where I live",
      },
      { sehir: "Isparta", detay: "Centre and surroundings", yakin: "~1 hour" },
      { sehir: "Antalya", detay: "Centre and districts", yakin: "~2 hours" },
    ],
  },

  sss: {
    eyebrow: "FAQ",
    baslik: "Questions people ask",
    giris:
      "The questions that come up most often. If something is missing, write to me and I will add it.",
  },

  footer: {
    ozet: "and nearby provinces: websites, mobile apps and business software.",
    hizmetler: "Services",
    gizlilik: "Privacy & GDPR",
  },


  hizmetSayfa: {
    konum: "Breadcrumb",
    anaSayfa: "Home",
    fiyatlariGor: "See Pricing",
    yakindaBaslik: "I do not offer this service yet.",
    yakindaMetin:
      "I will open it up once I have a sample project to show. We can still talk about what you need — I will tell you honestly whether it fits your situation.",
    sssEyebrow: "FAQ",
    sssBaslik: "Questions about this service",
    digerEyebrow: "Other services",
    digerBaslik: "You might also need",
  },

  kapanis: {
    eyebrow: "What is next",
    baslik: "Let's work out what you need",
    giris:
      "Tell me about your business and I will tell you plainly what you need and what you do not. The call is free and puts you under no obligation.",
    maddeler: [
      "No middlemen — the person you talk to does the work",
      "If you do not need it, I say so",
      "The price is clear from the start; nothing is added later",
    ],
    iletisimBilgileri: "Contact Details",
  },

  form: {
    honeypot: "Your website",
    ad: "Your name",
    telefon: "Phone",
    telefonOrnek: "+90 5XX XXX XX XX",
    eposta: "Email",
    epostaIstege: "(optional)",
    mesaj: "What would you like built?",
    mesajOrnek: "Tell me briefly about your business and what you need.",
    gonder: "Send",
    gonderiliyor: "Sending…",
    kvkkOnce:
      "Your details are used only to get back to you and are never shared. For more, see the",
    kvkkLink: "privacy notice",
  },
};

const sozlukler: Record<Dil, Sozluk> = { tr, en };

/** Bileşenlerin tek giriş noktası. */
export function s(dil: Dil): Sozluk {
  return sozlukler[dil];
}

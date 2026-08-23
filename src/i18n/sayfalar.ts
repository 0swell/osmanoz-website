/**
 * Sayfa metinleri — `/fiyatlar`, `/ornekler`, `/hakkimda`, `/iletisim`,
 * `/gizlilik` sayfalarının kendi metinleri.
 *
 * `sozluk.ts` bileşenlerin ortak arayüz metinlerini tutar; burada ise sayfaya
 * özel gövde metinleri durur. İkisi ayrı dosyada çünkü tek dosya okunamayacak
 * kadar büyüyordu.
 *
 * Meta başlık/açıklama da burada: `<title>` ve `description` sayfa metniyle
 * aynı yerde dursun ki biri değişince diğeri unutulmasın.
 */

import type { Dil } from "./diller";

export type SayfaSozlugu = typeof tr;

const tr = {
  fiyatlar: {
    metaTitle: "Burdur Web Sitesi Fiyatları | Osman Öz",
    metaDesc:
      "Burdur'da web sitesi fiyatları ve paket kapsamları. Rakam baştan bellidir, görüşmeden fiyat öğrenebilirsiniz. Bilgisayar mühendisi Osman Öz.",
    h1: "Burdur'da web sitesi fiyatları",
    giris:
      "Fiyatı öğrenmek için görüşme ayarlamanız gerekmiyor. Rakamlar aşağıda; işin kapsamı değişirse birlikte konuşuruz.",
    schemaAd: "Burdur Web Sitesi Fiyatları",
    schemaAciklama:
      "Web sitesi, mobil uygulama ve işletme yazılımı paket fiyatları.",
    yillikEyebrow: "Yıllık giderler",
    yillikBaslik: "İlk yıldan sonra ne ödersiniz?",
    yillikGiris:
      "En sık sorulan soru bu. Cevabı baştan yazıyorum ki sonradan sürpriz olmasın.",
    kalem: "Kalem",
    ilkYil: "1. yıl",
    sonrakiYillar: "Sonraki yıllar",
    toplam: "Toplam",
    dahil: "Dahil",
    ekOdemeYok: "Ek ödeme yok",
    kalemler: [
      { kalem: "Alan adı ve barındırma", sonraki: "1.500 TL / yıl" },
      { kalem: "Bakım ve güncelleme", sonraki: "3.500 TL / yıl" },
    ],
    toplamSonraki: "5.000 TL / yıl",
    karsilastirmaEyebrow: "Yan yana",
    karsilastirmaBaslik: "Hangi paket size uygun?",
    karsilastirmaGiris:
      "Üç paketin farkı tek tabloda. Kararsız kalırsanız yazın, işletmenize göre birlikte bakalım.",
    kolonPaket: "Paket",
    kolonFiyat: "Başlangıç fiyatı",
    kolonSure: "Yayına alma",
    kolonKime: "Kime uygun",
    kolonDetay: "Detay",
    detayGor: "Sayfasına git",
    satirlar: [
      { sure: "1 hafta", kime: "Tanıtım, iletişim ve Google'da görünmek yeterliyse" },
      { sure: "2-3 hafta", kime: "Randevu, stok veya QR menü takibi gerekiyorsa" },
      { sure: "Görüşmede", kime: "Sadakat sistemi veya sürekli sipariş varsa" },
    ],
    dipnot:
      "Bakım paketi isteğe bağlıdır; almasanız da siteniz çalışmaya devam eder. Mobil uygulamalarda ise güncelleme zorunludur — mağazalar güncellenmeyen uygulamayı bir süre sonra yayından kaldırıyor.",
  },

  ornekler: {
    metaTitle: "Örnek Çalışmalar | Burdur Web Sitesi | Osman Öz",
    metaDesc:
      "Kafe, kuaför ve market için hazırlanmış örnek site tasarımları. İşletmenizin sitesi nasıl görünebilir, buradan bakın.",
    h1: "İşletmenizin sitesi nasıl görünür?",
    giris:
      "Aşağıdakiler örnek tasarımlardır — gerçek müşteri işi olarak sunulmuyor. Amaç, sizinkinin nasıl olabileceğini somut olarak göstermek.",
    schemaAd: "Örnek Çalışmalar",
    schemaAciklama: "Kafe, kuaför ve market için örnek site tasarımları.",
    kartlar: [
      {
        sektor: "Kafe ve restoran",
        baslik: "Menü, konum ve rezervasyon tek ekranda",
        aciklama:
          "Müşteri menüyü telefonundan görür, yol tarifini alır, masa ayırtmak için tek tuşla yazar. Fiyat değiştiğinde matbaaya gitmeden panelden güncellersiniz.",
        ozellikler: ["QR menü", "Yol tarifi", "WhatsApp rezervasyon"],
      },
      {
        sektor: "Kuaför ve güzellik",
        baslik: "Randevu telefonu meşgul etmeden alınır",
        aciklama:
          "Müşteri boş saatleri görür, kendisi seçer. Randevu yaklaşınca hatırlatma gider; gelmeyen müşteri sayısı düşer, siz de günü tek ekrandan görürsünüz.",
        ozellikler: ["Online randevu", "Hatırlatma", "Hizmet listesi"],
      },
      {
        sektor: "Market ve bakkal",
        baslik: "Sipariş WhatsApp'a düşer, stok ekranda durur",
        aciklama:
          "Müşteri ürünleri görür, sepetini hazırlar, siparişi size ulaşır. Hangi ürün azaldı, hangisi çok satıyor — deftere değil ekrana bakarsınız.",
        ozellikler: ["Ürün listesi", "Sipariş", "Stok takibi"],
      },
    ],
    ctaBaslik: "Sizinki nasıl olsun?",
    ctaMetin:
      "İşletmenizi anlatın, size özel bir taslak hazırlayayım. Beğenmezseniz bir yükümlülüğünüz olmaz.",
    ctaWaMesaj:
      "Merhaba, örnekleri gördüm. İşletmem için bir site istiyorum.",
    ilgiliHizmet: "İlgili hizmet",
    fiyatlariGor: "Fiyatları gör",
  },

  hakkimda: {
    metaTitle: "Hakkımda | Osman Öz, Bilgisayar Mühendisi",
    metaDesc:
      "Bilgisayar mühendisi Osman Öz. Burdur Mehmet Akif Ersoy Üniversitesi mezunu, yüksek lisans öğrencisi. Burdur, Isparta ve Antalya'da yazılım hizmeti.",
    h1: "Burdur'da Web Sitesi ve Yazılım Yapan Bilgisayar Mühendisi",
    h1Alt: "Merhaba, ben Osman Öz.",
    schemaAd: "Hakkımda",
    schemaAciklama:
      "Osman Öz — Bilgisayar mühendisi, Burdur'da web ve yazılım hizmeti veriyor.",
    nedenBaslik: "Neden bu işi yapıyorum?",
    paragraflar: [
      "Burdur'da büyüdüm ve buradaki esnafın çoğunun internette görünmediğini biliyorum. İşini iyi yapan bir usta, sırf Google'da çıkmadığı için müşterisini yan sokaktakine kaptırıyor.",
      "Bu işi ajansa verdiğinizde araya birkaç kişi giriyor; anlattığınız şey size farklı dönüyor. Ben tek kişiyim — kiminle konuştuysanız işi o yapıyor. Anlamadığınız bir şey olursa sorduğunuz kişi de aynı kişi.",
      "İşletmenizi dinler, durumunuza uygun paketi öneririm. Amaç en büyük paketi satmak değil; sizi Google'da arayan müşterinin karşısına en kısa sürede çıkarmak ve dijital markalaşmanıza katkı sağlamak.",
    ],
    egitimBaslik: "Eğitim",
    yetkinlikBaslik: "Neler yapıyorum?",
    yetkinlikler: [
      {
        baslik: "Web geliştirme",
        detay:
          "React, Next.js, TypeScript. Arama motorlarına uygun, hızlı açılan siteler.",
      },
      {
        baslik: "Mobil uygulama",
        detay: "iOS ve Android için uygulama geliştirme, mağaza yayın süreçleri.",
      },
      {
        baslik: "İşletme yazılımı",
        detay:
          "Veritabanı tasarımı, sipariş ve stok sistemleri, yönetim panelleri.",
      },
      {
        baslik: "Arama motoru optimizasyonu",
        detay:
          "Teknik SEO, yapısal veri, sayfa hızı ve yerel arama görünürlüğü.",
      },
    ],
    yetkinlikDipnot: "Başlıklara tıklayarak ilgili hizmet sayfasına gidebilirsiniz.",
    bolgeBaslik: "Hizmet bölgesi",
    bolgeMetin: "Gerektiğinde yerinde görüşmeye gelirim.",
    konusalimBaslik: "Konuşalım",
    konusalimMetin: "İşletmenizi anlatın, ne gerektiğini birlikte bakalım.",
  },

  iletisim: {
    metaTitle: "İletişim | Burdur Yazılım | Osman Öz",
    metaDesc:
      "Burdur, Isparta ve Antalya'da web sitesi ve yazılım hizmeti. WhatsApp'tan yazın veya formu doldurun, size dönüş yapayım.",
    h1: "Burdur'da Yazılım İçin İletişim",
    giris:
      "En hızlı yol WhatsApp. Yazın, işletmenizi anlatın; ne gerektiğini konuşalım. Arayabilir veya mail de atabilirsiniz. Görüşme ücreti yoktur.",
    schemaAd: "İletişim",
    schemaAciklama:
      "Burdur, Isparta ve Antalya'da web sitesi ve yazılım hizmeti için iletişim.",
    formBaslik: "Form doldurun",
    formGiris: "Yazmayı tercih ediyorsanız buradan da ulaşabilirsiniz.",
    hemenBaslik: "Hemen ulaşın",
    hemenMetin:
      "Mesai saatleri içinde genelde kısa sürede dönüş yapıyorum.",
    bilgilerBaslik: "Bilgiler",
    merkezli: "merkezli",
    saatlerBaslik: "Çalışma saatleri",
    gunler: "Pazartesi – Cumartesi",
    saatlerDipnot: "Bu saatlerin dışında yazarsanız ertesi gün dönüş yaparım.",
  },

  gizlilik: {
    metaTitle: "Gizlilik ve KVKK Aydınlatma Metni | Osman Öz",
    metaDesc:
      "İletişim formu ve WhatsApp üzerinden paylaştığınız bilgilerin nasıl kullanıldığı, ne kadar saklandığı ve haklarınız.",
    h1: "Gizlilik ve KVKK aydınlatma metni",
    giris:
      "Formu doldurduğunuzda bilgilerinize ne olduğunu sade bir dille anlatıyorum. Hukuk metni gibi değil, anlaşılsın diye yazıldı.",
    schemaAd: "Gizlilik ve KVKK Aydınlatma Metni",
    schemaAciklama:
      "Kişisel verilerin işlenmesi, saklanması ve haklarınız hakkında bilgilendirme.",
    veriSorumlusu: "Veri sorumlusu:",
    iletisimEtiket: "İletişim:",
    bolumler: [
      {
        baslik: "Hangi bilgileri topluyorum?",
        icerik:
          "Yalnızca iletişim formuna kendi yazdığınız bilgileri: adınız, telefon numaranız, isterseniz e-posta adresiniz ve mesajınız. Bunun dışında form üzerinden bir veri toplanmaz.",
      },
      {
        baslik: "Bu bilgileri ne için kullanıyorum?",
        icerik:
          "Tek bir amaç için: size dönüş yapmak ve talebinizi konuşmak. Pazarlama listesine eklenmezsiniz, size istemediğiniz mesaj gönderilmez.",
      },
      {
        baslik: "Bilgilerim kimseyle paylaşılıyor mu?",
        icerik:
          "Hayır, satılmaz ve üçüncü kişilerle paylaşılmaz. Form mesajının bana ulaşması için e-posta gönderim servisi Resend kullanılır; mesaj bu servis üzerinden iletilir. Bunun dışında bilgileriniz kimseye aktarılmaz.",
      },
      {
        baslik: "Ne kadar süre saklanıyor?",
        icerik:
          "Görüşme tamamlandıktan sonra en fazla bir yıl. Bu süre, sonradan tekrar yazdığınızda konuşmanın devamını hatırlayabilmek içindir. Talep ederseniz hemen silinir.",
      },
      {
        baslik: "Sitede çerez kullanılıyor mu?",
        icerik:
          "Takip ve reklam çerezi kullanılmıyor. Yalnızca seçtiğiniz tema (açık/koyu) tarayıcınızda saklanır; bu bilgi bana gönderilmez, cihazınızda kalır.",
      },
      {
        baslik: "Haklarım neler?",
        icerik:
          "6698 sayılı KVKK kapsamında; hangi bilgilerinizin tutulduğunu öğrenme, düzeltilmesini veya silinmesini isteme haklarınız var. Aşağıdaki adrese yazmanız yeterli, işlem için sizden bir belge veya ücret istenmez.",
      },
    ],
    dipnot:
      "Bu metin bilgilendirme amaçlıdır. Sorunuz olursa yukarıdaki adresten yazabilirsiniz.",
  },

  anasayfa: {
    metaTitle: "Burdur Yazılım ve Bilgisayar Mühendisi | Osman Öz",
    metaDesc:
      "Burdur'da bilgisayar mühendisiyle doğrudan çalışın: web sitesi, mobil uygulama, QR menü ve randevu sistemi. Isparta ve Antalya'ya da hizmet veriyorum.",
    schemaAd: "Burdur Web Sitesi ve Yazılım",
    schemaAciklama:
      "Burdur'da web sitesi, mobil uygulama ve işletme yazılımı hizmetleri.",
    tumSorular: "Tüm soruları fiyatlar sayfasında görün",
  },
};

const en: SayfaSozlugu = {
  fiyatlar: {
    metaTitle: "Website Pricing in Burdur | Osman Öz",
    metaDesc:
      "Website packages and prices for businesses in Burdur. The figures are published up front — you do not need a call to learn the price.",
    h1: "Website pricing",
    giris:
      "You do not need to book a call to find out the price. The figures are below; if the scope changes, we discuss it together.",
    schemaAd: "Website Pricing",
    schemaAciklama:
      "Package pricing for websites, mobile apps and business software.",
    yillikEyebrow: "Yearly costs",
    yillikBaslik: "What do you pay after the first year?",
    yillikGiris:
      "This is the most common question, so the answer is written up front — no surprises later.",
    kalem: "Item",
    ilkYil: "Year 1",
    sonrakiYillar: "Following years",
    toplam: "Total",
    dahil: "Included",
    ekOdemeYok: "Nothing extra",
    kalemler: [
      { kalem: "Domain and hosting", sonraki: "1,500 TL / year" },
      { kalem: "Maintenance and updates", sonraki: "3,500 TL / year" },
    ],
    toplamSonraki: "5,000 TL / year",
    karsilastirmaEyebrow: "Side by side",
    karsilastirmaBaslik: "Which package fits you?",
    karsilastirmaGiris:
      "The difference between the three packages in one table. If you are unsure, write to me and we will work it out together.",
    kolonPaket: "Package",
    kolonFiyat: "Starting price",
    kolonSure: "Time to launch",
    kolonKime: "Who it suits",
    kolonDetay: "More",
    detayGor: "Go to page",
    satirlar: [
      { sure: "1 week", kime: "If being found on Google and reachable is enough" },
      { sure: "2-3 weeks", kime: "If you need bookings, stock or a QR menu" },
      { sure: "On request", kime: "If there is a loyalty scheme or repeat ordering" },
    ],
    dipnot:
      "The maintenance package is optional; your site keeps running without it. For mobile apps, however, updates are mandatory — stores eventually remove apps that are not maintained.",
  },

  ornekler: {
    metaTitle: "Example Work | Website Design in Burdur | Osman Öz",
    metaDesc:
      "Sample site designs for a cafe, a hairdresser and a grocery shop. See how your business could look online.",
    h1: "How could your site look?",
    giris:
      "These are sample designs, not presented as real client work. The point is to show concretely what yours could look like.",
    schemaAd: "Example Work",
    schemaAciklama:
      "Sample site designs for a cafe, a hairdresser and a grocery shop.",
    kartlar: [
      {
        sektor: "Cafe and restaurant",
        baslik: "Menu, location and booking on one screen",
        aciklama:
          "Customers see the menu on their phone, get directions and message you to reserve a table with one tap. When a price changes you update it from the panel instead of reprinting.",
        ozellikler: ["QR menu", "Directions", "WhatsApp booking"],
      },
      {
        sektor: "Hairdresser and beauty",
        baslik: "Appointments without tying up the phone",
        aciklama:
          "Customers see the free slots and pick one themselves. A reminder goes out before the appointment, no-shows drop, and you see the whole day on one screen.",
        ozellikler: ["Online booking", "Reminders", "Service list"],
      },
      {
        sektor: "Grocery and corner shop",
        baslik: "Orders land on WhatsApp, stock stays on screen",
        aciklama:
          "Customers browse products, build a basket and the order reaches you. What is running low, what sells best — you look at a screen instead of a notebook.",
        ozellikler: ["Product list", "Ordering", "Stock tracking"],
      },
    ],
    ctaBaslik: "What should yours look like?",
    ctaMetin:
      "Tell me about your business and I will prepare a draft for you. If you do not like it, you are under no obligation.",
    ctaWaMesaj:
      "Hello, I have seen the examples. I would like a site for my business.",
    ilgiliHizmet: "Related service",
    fiyatlariGor: "See pricing",
  },

  hakkimda: {
    metaTitle: "About | Osman Öz, Computer Engineer",
    metaDesc:
      "Computer engineer Osman Öz — graduate of Burdur Mehmet Akif Ersoy University, now a master's student. Software services in Burdur, Isparta and Antalya.",
    h1: "Computer Engineer Building Websites and Software in Burdur",
    h1Alt: "Hello, I am Osman Öz.",
    schemaAd: "About",
    schemaAciklama:
      "Osman Öz — computer engineer providing web and software services in Burdur.",
    nedenBaslik: "Why I do this work",
    paragraflar: [
      "I grew up in Burdur and I know that most local businesses here are invisible online. A craftsman who does excellent work loses customers to the shop next door simply because they do not appear on Google.",
      "When you hand this work to an agency, several people end up between you and the result, and what you asked for comes back different. I work alone — the person you talk to is the person who does the work.",
      "I listen to your business and recommend the package that fits it. The goal is not to sell you the largest package; it is to put you in front of the customers searching for you and to build up your presence online.",
    ],
    egitimBaslik: "Education",
    yetkinlikBaslik: "What I do",
    yetkinlikler: [
      {
        baslik: "Web development",
        detay:
          "React, Next.js, TypeScript. Fast, search-friendly sites built to rank.",
      },
      {
        baslik: "Mobile apps",
        detay: "iOS and Android development, including store submission.",
      },
      {
        baslik: "Business software",
        detay:
          "Database design, order and stock systems, admin dashboards.",
      },
      {
        baslik: "Search engine optimisation",
        detay:
          "Technical SEO, structured data, page speed and local search visibility.",
      },
    ],
    yetkinlikDipnot: "Tap a heading to open the related service page.",
    bolgeBaslik: "Service area",
    bolgeMetin: "I come in person when it helps.",
    konusalimBaslik: "Let's talk",
    konusalimMetin:
      "Tell me about your business and we will work out what you need.",
  },

  iletisim: {
    metaTitle: "Contact | Software in Burdur | Osman Öz",
    metaDesc:
      "Website and software services in Burdur, Isparta and Antalya. Message me on WhatsApp or fill in the form and I will get back to you.",
    h1: "Get in Touch for Software in Burdur",
    giris:
      "WhatsApp is the fastest route. Write to me, tell me about your business and we will work out what you need. You can also call or send an email. There is no charge for the call.",
    schemaAd: "Contact",
    schemaAciklama:
      "Contact details for website and software services in Burdur, Isparta and Antalya.",
    formBaslik: "Fill in the form",
    formGiris: "If you would rather write, you can reach me here as well.",
    hemenBaslik: "Reach me now",
    hemenMetin: "During working hours I usually reply quickly.",
    bilgilerBaslik: "Details",
    merkezli: "based",
    saatlerBaslik: "Working hours",
    gunler: "Monday – Saturday",
    saatlerDipnot:
      "If you write outside these hours, I reply the following day.",
  },

  gizlilik: {
    metaTitle: "Privacy Notice | Osman Öz",
    metaDesc:
      "How the information you share through the contact form and WhatsApp is used, how long it is kept and what your rights are.",
    h1: "Privacy notice",
    giris:
      "This explains in plain language what happens to your details when you fill in the form. It is written to be understood, not to read like a legal document.",
    schemaAd: "Privacy Notice",
    schemaAciklama:
      "Information about how personal data is processed, stored and what your rights are.",
    veriSorumlusu: "Data controller:",
    iletisimEtiket: "Contact:",
    bolumler: [
      {
        baslik: "What information do I collect?",
        icerik:
          "Only what you type into the contact form: your name, phone number, optionally your email address and your message. Nothing else is collected through the form.",
      },
      {
        baslik: "What do I use it for?",
        icerik:
          "One purpose only: getting back to you and discussing your request. You are not added to any marketing list and you will not receive messages you did not ask for.",
      },
      {
        baslik: "Is my information shared with anyone?",
        icerik:
          "No. It is never sold or shared with third parties. The email delivery service Resend is used so that the form message reaches me; the message travels through that service. Beyond that, your details go nowhere.",
      },
      {
        baslik: "How long is it kept?",
        icerik:
          "At most one year after our conversation ends, so that if you write again I can pick up where we left off. It is deleted immediately on request.",
      },
      {
        baslik: "Does the site use cookies?",
        icerik:
          "No tracking or advertising cookies are used. Only your theme choice (light or dark) is stored in your browser; that stays on your device and is never sent to me.",
      },
      {
        baslik: "What are my rights?",
        icerik:
          "Under Turkish data protection law (KVKK, no. 6698) you may ask what information is held about you and request that it be corrected or deleted. Writing to the address below is enough — no document or fee is required.",
      },
    ],
    dipnot:
      "This notice is for information only. If you have a question, write to the address above.",
  },

  anasayfa: {
    metaTitle: "Websites and Software in Burdur | Osman Öz",
    metaDesc:
      "Work directly with a computer engineer in Burdur: websites, mobile apps, QR menus and booking systems. Isparta and Antalya are covered too.",
    schemaAd: "Websites and Software in Burdur",
    schemaAciklama:
      "Website, mobile app and business software services in Burdur.",
    tumSorular: "See all questions on the pricing page",
  },
};

const hepsi: Record<Dil, SayfaSozlugu> = { tr, en };

export function sayfa(dil: Dil): SayfaSozlugu {
  return hepsi[dil];
}

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
        sektor: "Web sitesi örneği",
        baslik: "Müşteriniz sizi Google'da bulsun, aradığını hemen görsün",
        aciklama:
          "Tanıtım sitesinin işi tek: ne yaptığınızı, nerede olduğunuzu ve size nasıl ulaşılacağını **saniyeler içinde** göstermek. Aşağıdaki kafe örneğinde menü, konum ve WhatsApp rezervasyon aynı ekranda duruyor. Fiyat değiştiğinde matbaaya gitmiyorsunuz, panelden yazıyorsunuz.",
        ozellikler: ["Telefona uygun tasarım", "Google'a kayıt", "WhatsApp butonu"],
        yakinda: false,
      },
      {
        sektor: "İşletme yazılımı örneği",
        baslik: "Defterle yürüyen işi ekrana taşıyın",
        aciklama:
          "Randevu, stok, sipariş ve gelir takibi — elle tuttuğunuz ne varsa tek sisteme giriyor. Aşağıdaki kuaför örneğinde müşteri boş saatleri kendisi görüp seçiyor, **telefonunuz boşuna çalmıyor**. Randevu yaklaşınca hatırlatma gidiyor, gelmeyen müşteri sayısı düşüyor.",
        ozellikler: ["Online randevu", "Stok takibi", "Gelir raporu"],
        yakinda: false,
      },
      {
        sektor: "Mobil uygulama örneği",
        baslik: "Üyeler cepte, kasa ekranda",
        aciklama:
          "Spor salonu gibi **üyelikle çalışan** işletmelerde uygulama gerçekten işe yarıyor: üye giriş yapar, kalan gün sayısını görür, antrenman programını takip eder, antrenman videolarını izler. Siz de kimin üyeliği bitiyor, ay sonunda kaç üyeniz var, hangi aylar düştü — hepsini tek ekrandan takip edersiniz. **Eylül 2026 itibarıyla bu hizmet aktif değil**; ileride eklenecektir.",
        ozellikler: [
          "iOS ve Android",
          "Üyelik takibi",
          "Antrenman programı",
          "Antrenman videoları",
        ],
        yakinda: true,
      },
    ],
    hizmeteGit: "Hizmete git",
    canliEyebrow: "Canlı örnek",
    canliBaslikSonek: " — kişisel web sitesi",
    canliMetin:
      "Yukarıdakiler örnek tasarım; bu ise **yayında olan gerçek bir site**. Kendi kişisel sitem: hakkımda, projelerim ve iletişim tek sayfada. Telefonda da bilgisayarda da nasıl açıldığına doğrudan bakabilirsiniz.",
    canliButon: "Siteyi aç",
    ctaBaslik: "Sizinki nasıl olsun?",
    ctaMetin:
      "İşletmenizi anlatın, size özel bir taslak hazırlayayım. Beğenmezseniz bir yükümlülüğünüz olmaz.",
    ctaWaMesaj:
      "Merhaba, örnekleri gördüm. İşletmem için bir site istiyorum.",
    sorularBaslik: "Bu örnekler hakkında",
    sorular: [
      {
        baslik: "Bu örnekler gerçek müşteri işi mi?",
        metin:
          "Hayır. Yukarıdakiler **örnek tasarımlardır**, gerçek müşteri işi olarak sunulmuyor. Yeni başlayan bir işte olmayan referansı varmış gibi göstermek istemedim. Amaç, sizinkinin nasıl olabileceğini somut olarak anlatmak. İlk gerçek işler tamamlandığında, müşterinin izniyle onları da buraya ekleyeceğim.",
      },
      {
        baslik: "Benim işletmem için ne yapılabilir?",
        metin:
          "Sektörünüz burada yoksa sorun değil; **ekranlar işletmenin çalışma şekline göre** kuruluyor. Randevuyla çalışıyorsanız takvim, ürün satıyorsanız stok ve sipariş, masada hizmet veriyorsanız QR menü öne çıkar. Hangisinin size zaman kazandıracağını önce birlikte konuşuyoruz.",
      },
      {
        baslik: "Tasarımı ben seçebiliyor muyum?",
        metin:
          "Evet. İlk taslağı ben hazırlıyorum, sonra **beğenmediğiniz her yeri** söylüyorsunuz — renk, yazı tipi, sıralama, hangi bölüm önce gelsin. Oturana kadar değiştiriyoruz. Beğendiğiniz başka bir site varsa gösterin, oradan yola çıkalım.",
      },
    ],
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
    sorularBaslik: "Sık merak edilenler",
    sorular: [
      {
        baslik: "Kimlerle çalışıyorum?",
        metin:
          "Burdur, Isparta ve Antalya'daki **küçük ve orta ölçekli işletmelerle**: kafe, restoran, kuaför, klinik, market, otel, emlak ofisi, oto servis. Tek kişilik bir esnaf da olabilirsiniz, on kişilik bir ekip de. Kurumsal ihalelere ve büyük ölçekli projelere girmiyorum — o işler ekip ister, ben tek kişiyim ve bunu baştan söylüyorum.",
      },
      {
        baslik: "Nasıl çalışıyoruz?",
        metin:
          "Önce işletmenizi dinliyorum, sonra **ne gerekip ne gerekmediğini** açıkça söylüyorum. Anlaştıktan sonra ilk taslağı birkaç gün içinde görüyorsunuz; beğenmediğiniz yerleri söylüyorsunuz, birlikte oturtana kadar değiştiriyoruz. Görüşmeler telefon, WhatsApp veya görüntülü toplantıyla yürüyor; isterseniz yüz yüze de buluşuyoruz.",
      },
      {
        baslik: "Teslimden sonra ne oluyor?",
        metin:
          "Yayına aldıktan sonra paneli nasıl kullanacağınızı adım adım gösteriyorum. Yazıları, fiyatları ve fotoğrafları **kendiniz güncelleyebiliyorsunuz**. Takıldığınız bir yer olursa arayabilirsiniz; bunun için ayrıca ücret istemiyorum. Site sizin, alan adı sizin adınıza kayıtlı — ileride başka biriyle çalışsanız da her şey sizde kalıyor.",
      },
    ],
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
    sorularBaslik: "Yazmadan önce",
    sorular: [
      {
        baslik: "Ne kadar sürede dönüş yapıyorsunuz?",
        metin:
          "Mesai saatleri içinde genelde **aynı gün** dönüş yapıyorum, çoğu zaman birkaç saat içinde. Akşam veya hafta sonu yazarsanız ertesi iş günü dönüyorum. WhatsApp en hızlı yol; telefon açabilir veya mail de atabilirsiniz. Formu doldurursanız da aynı adrese düşüyor.",
      },
      {
        baslik: "İlk görüşmede ne konuşuyoruz?",
        metin:
          "Ne iş yaptığınızı, müşterinizin sizi nasıl bulduğunu ve neye ihtiyaç duyduğunuzu konuşuyoruz. Sonunda size **hangi paketin uygun olduğunu ve ne kadar tutacağını** söylüyorum. Görüşme ücretsiz ve bir yükümlülük doğurmuyor; gerekmiyorsa gerekmediğini de açıkça söylerim.",
      },
      {
        baslik: "Ne hazırlamam gerekiyor?",
        metin:
          "Hiçbir şey hazırlamadan da yazabilirsiniz. İşi hızlandırmak isterseniz **işletme adınız, hizmet listeniz, çalışma saatleriniz ve birkaç fotoğraf** yeterli. Elinizde yoksa fotoğrafları birlikte planlarız, metinleri ben yazarım; süreyi belirleyen asıl şey bu malzemenin hazır olması.",
      },
    ],
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
          "Hayır, satılmaz ve üçüncü kişilerle paylaşılmaz. İki servis kullanılıyor: form mesajının bana ulaşması için **Resend**, ziyaretçi sayısını görmek için **Google Analytics**. Analytics'e formda yazdıklarınız gitmez — yalnızca hangi sayfanın kaç kez açıldığı gibi isimsiz veriler işlenir.",
      },
      {
        baslik: "Ne kadar süre saklanıyor?",
        icerik:
          "Görüşme tamamlandıktan sonra en fazla bir yıl. Bu süre, sonradan tekrar yazdığınızda konuşmanın devamını hatırlayabilmek içindir. Talep ederseniz hemen silinir.",
      },
      {
        baslik: "Sitede çerez kullanılıyor mu?",
        icerik:
          "İki şey için: seçtiğiniz tema (açık/koyu) tarayıcınızda saklanır, bu bilgi bana gönderilmez. Bir de **Google Analytics** kullanılıyor; kaç kişinin hangi sayfayı ziyaret ettiğini görmek için. Reklam çerezi yoktur, size reklam gösterilmez ve kim olduğunuzu belirleyen bir bilgi toplanmaz.",
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
        sektor: "Website example",
        baslik: "Be found on Google, and answer the question at once",
        aciklama:
          "A brochure site has one job: showing what you do, where you are and how to reach you **within seconds**. In the cafe example below, the menu, the location and WhatsApp booking sit on one screen. When a price changes you type it into the panel instead of reprinting.",
        ozellikler: ["Mobile-first design", "Google setup", "WhatsApp button"],
        yakinda: false,
      },
      {
        sektor: "Business software example",
        baslik: "Move the notebook onto a screen",
        aciklama:
          "Bookings, stock, orders and revenue — whatever you track by hand moves into one system. In the hairdresser example below, customers see the free slots and book themselves, so **your phone stops ringing for nothing**. Reminders go out before the appointment and no-shows drop.",
        ozellikler: ["Online booking", "Stock tracking", "Revenue report"],
        yakinda: false,
      },
      {
        sektor: "Mobile app example",
        baslik: "Members in their pocket, the books on your screen",
        aciklama:
          "Apps genuinely pay off where the business runs on **memberships** — a gym, for example: members sign in, see how many days they have left, follow their training plan and watch the exercise videos. You see whose membership is ending, how many members you have at month end and which months dropped, all on one screen. **As of September 2026 this service is not active yet**; it will be added later.",
        ozellikler: [
          "iOS and Android",
          "Membership tracking",
          "Training plan",
          "Exercise videos",
        ],
        yakinda: true,
      },
    ],
    hizmeteGit: "Go to service",
    canliEyebrow: "Live example",
    canliBaslikSonek: " — personal website",
    canliMetin:
      "The examples above are sample designs; this one is **a real site that is live**. It is my own personal site: about me, my projects and contact details on a single page. You can see for yourself how it opens on a phone and on a desktop.",
    canliButon: "Open the site",
    ctaBaslik: "What should yours look like?",
    ctaMetin:
      "Tell me about your business and I will prepare a draft for you. If you do not like it, you are under no obligation.",
    ctaWaMesaj:
      "Hello, I have seen the examples. I would like a site for my business.",
    sorularBaslik: "About these examples",
    sorular: [
      {
        baslik: "Is this real client work?",
        metin:
          "No. These are **sample designs**, not presented as real client work. Starting out, I did not want to show references I do not have. The point is to show concretely what yours could look like. Once the first real projects are done, I will add them here with the client's permission.",
      },
      {
        baslik: "What could be built for my business?",
        metin:
          "If your sector is not shown here, that is fine — **the screens are built around how the business runs**. If you work by appointment, a calendar comes first; if you sell products, stock and orders; if you serve at tables, a QR menu. We work out together which one actually saves you time.",
      },
      {
        baslik: "Can I choose the design?",
        metin:
          "Yes. I prepare the first draft, then you tell me **everything you do not like** — colours, typeface, ordering, which section comes first. We keep adjusting until it fits. If there is another site you like, show me and we start from there.",
      },
    ],
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
    sorularBaslik: "Common questions",
    sorular: [
      {
        baslik: "Who do I work with?",
        metin:
          "**Small and medium businesses** in Burdur, Isparta and Antalya: cafes, restaurants, hairdressers, clinics, grocery shops, hotels, estate agents, garages. You might be a one-person trader or a team of ten. I do not take on corporate tenders or large-scale projects — those need a team, and I work alone. I say so up front.",
      },
      {
        baslik: "How do we work together?",
        metin:
          "First I listen to your business, then I tell you plainly **what you need and what you do not**. Once we agree, you see the first draft within a few days; you tell me what to change and we refine it together. We talk by phone, WhatsApp or video call, and meet face to face if you prefer.",
      },
      {
        baslik: "What happens after launch?",
        metin:
          "Once the site is live I walk you through the admin panel step by step. You can **update the texts, prices and photos yourself**. If you get stuck you can call me — there is no extra charge for that. The site is yours and the domain is registered in your name, so everything stays with you.",
      },
    ],
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
    sorularBaslik: "Before you write",
    sorular: [
      {
        baslik: "How quickly do you reply?",
        metin:
          "During working hours I usually reply **the same day**, often within a couple of hours. If you write in the evening or at the weekend, I get back to you the next working day. WhatsApp is the fastest route; you can also call or send an email. The form reaches the same inbox.",
      },
      {
        baslik: "What do we cover in the first call?",
        metin:
          "We talk about what you do, how customers currently find you and what you actually need. By the end I tell you **which package fits and what it will cost**. The call is free and puts you under no obligation; if you do not need something, I say so plainly.",
      },
      {
        baslik: "What do I need to prepare?",
        metin:
          "Nothing — you can write to me as you are. If you want to move faster, **your business name, service list, opening hours and a few photos** are enough. If you do not have photos we plan them together and I write the copy; what really sets the pace is having this material ready.",
      },
    ],
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
          "No. It is never sold or shared with third parties. Two services are involved: **Resend**, so the form message reaches me, and **Google Analytics**, to see visitor numbers. Nothing you type into the form goes to Analytics — only anonymous data such as how often a page was opened.",
      },
      {
        baslik: "How long is it kept?",
        icerik:
          "At most one year after our conversation ends, so that if you write again I can pick up where we left off. It is deleted immediately on request.",
      },
      {
        baslik: "Does the site use cookies?",
        icerik:
          "For two things: your theme choice (light or dark) is stored in your browser and never sent to me, and **Google Analytics** is used to see how many people visit which page. There are no advertising cookies, you are not shown ads, and nothing that identifies you personally is collected.",
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

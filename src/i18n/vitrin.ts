/** Hizmet sayfalarındaki görsel vitrin bölümünün metinleri. */

import type { Dil } from "./diller";

export type VitrinSozlugu = typeof tr;

const tr = {
  eyebrow: "Nasıl görünüyor",
  web: {
    baslik: "Örnek çalışmalar",
    giris:
      "Aşağıdakiler örnek tasarımlardır, gerçek müşteri işi olarak sunulmuyor. Sizinkinin nasıl olabileceğini göstermek için hazırlandı.",
    kafe: "Kafe — menü, konum ve WhatsApp rezervasyon tek ekranda.",
    kuafor: "Kuaför — hizmet listesi ve online randevu.",
  },
  isletme: {
    baslik: "Örnek ekranlar",
    giris:
      "İşletmenizin ihtiyacına göre değişir; bunlar sık kullanılan üç ekranın örneği.",
    randevu: "Randevu takibi — boş saatler, onay durumu, günün programı.",
    stok: "Stok — kritik seviyeye düşen ürün uyarı verir.",
    rapor: "Gelir özeti — hangi ay ne kazandığınız tek bakışta.",
  },
  mobil: {
    baslik: "Örnek ekran",
    giris:
      "Uygulama tarafında henüz yayınlanmış bir işim yok. Aşağıdaki ekran, sipariş ve sadakat özellikli bir uygulamanın nasıl görünebileceğini anlatmak için hazırlandı.",
    market: "Market — ürün listesi, sepet ve tek tuşla sipariş.",
  },
};

const en: VitrinSozlugu = {
  eyebrow: "How it looks",
  web: {
    baslik: "Example work",
    giris:
      "These are sample designs, not presented as real client work. They are here to show what yours could look like.",
    kafe: "Cafe — menu, location and WhatsApp booking on one screen.",
    kuafor: "Hairdresser — service list and online booking.",
  },
  isletme: {
    baslik: "Example screens",
    giris:
      "The screens depend on what your business needs; these are three of the most common.",
    randevu: "Bookings — free slots, confirmation status, the day's schedule.",
    stok: "Stock — items dropping to a critical level raise a warning.",
    rapor: "Revenue summary — what you earned each month at a glance.",
  },
  mobil: {
    baslik: "Example screen",
    giris:
      "I have no published app work yet. The screen below is here to show how an app with ordering and loyalty features could look.",
    market: "Grocery — product list, basket and one-tap ordering.",
  },
};

const hepsi: Record<Dil, VitrinSozlugu> = { tr, en };

export function vitrin(dil: Dil): VitrinSozlugu {
  return hepsi[dil];
}

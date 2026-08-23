import Script from "next/script";

import { siteConfig } from "@/config/site";

/**
 * Google Analytics 4.
 *
 * `lazyOnload`: tarayıcı boşa çıkana kadar beklenir. `afterInteractive` ile
 * denendi, PageSpeed'de ana iş parçacığında 169 ms ve 164 KiB ek yük
 * gösterdi; ölçüm gecikmeli başlasa da ziyaretçi sayısı doğru kalıyor,
 * performans puanı ise geri geliyor (CLAUDE.md §2).
 *
 * Ölçüm kimliği gizli veri değildir, HTML'de zaten görünür — bu yüzden
 * `.env` yerine site yapılandırmasında durur.
 *
 * NOT: GA4 çerez kullanır. `/gizlilik` sayfasındaki çerez bölümü buna göre
 * yazıldı; ölçüm kaldırılırsa o metin de geri alınmalı.
 */
export function Analytics() {
  const id = siteConfig.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="ga4" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

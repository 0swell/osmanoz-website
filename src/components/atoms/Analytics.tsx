import Script from "next/script";

import { siteConfig } from "@/config/site";

/**
 * Google Analytics 4.
 *
 * `afterInteractive`: sayfa etkileşime hazır olduktan sonra yüklenir, LCP'yi
 * geciktirmez (CLAUDE.md §2 performans hedefleri).
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
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

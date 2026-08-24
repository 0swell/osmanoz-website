import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { siteConfig } from "@/config/site";

/**
 * Ölçüm katmanı — Vercel Analytics + Speed Insights + Google Analytics 4.
 *
 * Vercel Analytics çerez kullanmıyor ve isteklerini kendi alan adımızdan
 * (`/_vercel/insights/*`) yapıyor; CSP'de `'self'` zaten kapsıyor, ek izin
 * gerekmiyor. Speed Insights gerçek ziyaretçilerden LCP/CLS/INP topluyor —
 * tek seferlik Lighthouse ölçümünden daha güvenilir (CLAUDE.md §2).
 *
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

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {id && (
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
      )}
    </>
  );
}

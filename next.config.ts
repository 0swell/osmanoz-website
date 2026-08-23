import type { NextConfig } from "next";

/**
 * Güvenlik başlıkları (CyberSecurity-Checklist §5).
 *
 * Site tamamen statik: veritabanı, oturum ve üçüncü taraf script yok.
 * Bu yüzden CSP oldukça dar tutulabiliyor — tek istisna Next.js'in ürettiği
 * satır içi stiller ve tema betiği (`next-themes`, hydration öncesi çalışır).
 *
 * `frame-ancestors 'none'` clickjacking'i kapatır; X-Frame-Options eski
 * tarayıcılar için aynı işi yapar.
 */
const gelistirme = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // next/script ve next-themes satır içi betik üretiyor; hash'lemek her
  // derlemede değişeceği için 'unsafe-inline' bilinçli kabul edildi.
  // googletagmanager: GA4 betiği (bkz. components/atoms/Analytics.tsx)
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  // GA4 bazı ölçümleri 1x1 piksel görseliyle gönderiyor.
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self' data:",
  // Form Server Action kendi sunucusuna gider; dış uç yalnız GA4 ölçümü.
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * CSP yalnızca ÜRETİMDE gönderilir.
 *
 * Geliştirme sunucusu eval() (React hata ayıklama) ve ws:// (HMR) kullanıyor;
 * bunları CSP'ye eklemek üretim politikasını da gevşetme riski taşıyor.
 * CSP zaten bir üretim önlemi — dev'de kapalı olması güvenliği etkilemiyor,
 * `next build` çıktısında tam katı haliyle gidiyor.
 */
const guvenlikBasliklari = [
  ...(gelistirme ? [] : [{ key: "Content-Security-Policy", value: csp }]),
  {
    // HTTPS zorunlu — Vercel zaten yönlendiriyor, bu tarayıcıyı da bağlar.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    // Site kamera/mikrofon/konum kullanmıyor; hepsi kapatılır.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // public/osman-oz.avif mevcut ama Next varsayılanı yalnız WebP üretiyordu.
  images: { formats: ["image/avif", "image/webp"] },

  // Üretimde stack trace / kaynak eşlemesi sızmasın.
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: guvenlikBasliklari }];
  },
};

export default nextConfig;

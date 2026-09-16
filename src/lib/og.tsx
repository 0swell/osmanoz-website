import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { siteConfig } from "@/config/site";
import type { Dil } from "@/i18n/diller";

const ogBoyut = { width: 1200, height: 630 };

/**
 * Paylaşım kartı metinleri. Türkçe kart yerel esnafa, İngilizce kart yabancı
 * ziyaretçiye hitap eder — birebir çeviri değil (CLAUDE.md §1).
 * Kartın `alt` metni src/lib/meta.ts içinde (metadata ile aynı yerde dursun).
 */
const ogMetin = {
  tr: {
    bolge: "Burdur · Isparta · Antalya",
    baslik: "Web sitesi, mobil uygulama ve işletme yazılımı",
    altBaslik: "Aracı yok — doğrudan bilgisayar mühendisiyle çalışırsınız.",
  },
  en: {
    bolge: "Burdur · Isparta · Antalya",
    baslik: "Websites, mobile apps and business software",
    altBaslik: "No agency, no middlemen — you work with the engineer directly.",
  },
} as const;

/**
 * WhatsApp/LinkedIn paylaşımlarında çıkan kart görseli.
 * Build-time'da üretilir; ayrı bir tasarım dosyası tutulmaz.
 *
 * Fotoğraf PNG olarak okunur: `next/og` (Satori) WebP çözemiyor,
 * WebP verilince derleme "not iterable" hatasıyla düşüyor (CLAUDE.md §12).
 *
 * Çağrı yeri: app/(tr)/og.png ve app/(en)/en/og.png route handler'ları.
 * `opengraph-image.tsx` dosya kuralı kullanılamıyor — gerekçesi o
 * dosyaların başında yazılı.
 */
export async function ogGorseli(dil: Dil) {
  const t = ogMetin[dil];
  const foto = await readFile(join(process.cwd(), "public", "og-foto.png"));
  const fotoSrc = `data:image/png;base64,${foto.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Üst: konum etiketi */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#c23e08",
            fontWeight: 600,
          }}
        >
          {t.bolge}
        </div>

        {/* Orta: vaat */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#12141a",
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {t.baslik}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#4d535e" }}>
            {t.altBaslik}
          </div>
        </div>

        {/* Alt: kimlik + turuncu şerit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e6e8ee",
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotoSrc}
              width={96}
              height={96}
              alt=""
              style={{ borderRadius: 999, objectFit: "cover" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 700, color: "#12141a" }}>
                {siteConfig.personName}
              </div>
              <div style={{ fontSize: 24, color: "#6b7280" }}>
                {dil === "tr" ? siteConfig.jobTitle : "Computer Engineer"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6b7280" }}>
            osmanoz.website
          </div>
        </div>
      </div>
    ),
    ogBoyut,
  );
}

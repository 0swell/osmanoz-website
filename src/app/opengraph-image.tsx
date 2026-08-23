import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { siteConfig } from "@/config/site";

export const alt =
  "Osman Öz — Burdur'da web sitesi, mobil uygulama ve işletme yazılımı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * WhatsApp/LinkedIn paylaşımlarında çıkan kart görseli.
 * Build-time'da üretilir; ayrı bir tasarım dosyası tutulmaz.
 *
 * Fotoğraf PNG olarak okunur: `next/og` (Satori) WebP çözemiyor,
 * WebP verilince derleme "not iterable" hatasıyla düşüyor.
 */
export default async function Image() {
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
          Burdur · Isparta · Antalya
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
            Web sitesi, mobil uygulama ve işletme yazılımı
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#4d535e" }}>
            Aracı yok — doğrudan bilgisayar mühendisiyle çalışırsınız.
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
              <div
                style={{ fontSize: 34, fontWeight: 700, color: "#12141a" }}
              >
                {siteConfig.personName}
              </div>
              <div style={{ fontSize: 24, color: "#6b7280" }}>
                {siteConfig.jobTitle}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6b7280" }}>
            osmanoz.website
          </div>
        </div>
      </div>
    ),
    size,
  );
}

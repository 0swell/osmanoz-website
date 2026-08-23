import { ImageResponse } from "next/og";

/**
 * Favicon — navbar'daki OÖ monogramının aynısı.
 *
 * Build-time'da üretilir; ayrı .ico dosyası tutulmaz, logo değişince tek
 * yerden güncellenir.
 *
 * Renk globals.css'teki koyu tema turuncusu (#ff7a3d). Favicon tek dosyadır,
 * temaya göre değişemez; açık tondaki turuncu hem açık hem koyu sekme
 * çubuğunda okunuyor, koyu ton (#c23e08) koyu sekmede kayboluyordu.
 *
 * Boyut 96x96: Google arama sonuçlarında favicon göstermek için **48'in katı
 * kare** istiyor. Önceki 32x32 tarayıcı için yeterliydi ama Google'ın
 * şartını karşılamıyordu. Tarayıcı gerekirse kendisi küçültüyor.
 */
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff7a3d",
          borderRadius: 21,
          color: "#ffffff",
          fontSize: 45,
          fontWeight: 700,
          letterSpacing: -1.5,
        }}
      >
        OÖ
      </div>
    ),
    size,
  );
}

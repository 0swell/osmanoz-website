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
 * Küçük boyutta okunabilirlik için köşe yarıçapı ve harf boyutu 32px'e göre
 * ayarlandı; navbar'daki 36px kutunun oranlarıyla aynı değil.
 */
export const size = { width: 32, height: 32 };
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
          borderRadius: 7,
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        OÖ
      </div>
    ),
    size,
  );
}

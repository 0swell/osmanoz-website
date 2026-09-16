import { ogGorseli } from "@/lib/og";

/**
 * Türkçe paylaşım kartı — sabit adres: /og.png
 *
 * `opengraph-image.tsx` dosya kuralı kullanılmıyor: Next.js metadata'yı sığ
 * birleştiriyor, sayfa kendi `openGraph` bloğunu tanımlayınca layout'tan gelen
 * görsel düşüyordu (derleme çıktısında og:image'ın yalnız ana sayfada
 * kalmasının sebebi buydu). Sabit URL'li route ile görsel her sayfanın
 * metadata'sına açıkça yazılıyor (bkz. src/lib/meta.ts).
 */
export const dynamic = "force-static";

export function GET() {
  return ogGorseli("tr");
}

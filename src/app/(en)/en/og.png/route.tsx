import { ogGorseli } from "@/lib/og";

/** İngilizce paylaşım kartı — sabit adres: /en/og.png (bkz. (tr)/og.png). */
export const dynamic = "force-static";

export function GET() {
  return ogGorseli("en");
}

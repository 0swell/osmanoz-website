import { Bricolage_Grotesque, Lexend } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { JsonLd } from "@/components/atoms/JsonLd";
import type { Dil } from "@/i18n/diller";
import { htmlLang } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";
import { rootGraph } from "@/lib/schema";

/** Başlıklar — karakterli grotesk. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"], // latin-ext: ğ ş ı İ ç ö ü
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Gövde — okunabilirlik için tasarlanmış; hedef kitle 30-55 yaş. */
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * İki kök layout da (tr / en) bu gövdeyi kullanır — fark yalnızca `lang`
 * özniteliği ve atla-bağlantısının dili. Font ve tema kurulumu tek yerde
 * kalsın diye ayrı bileşene alındı.
 */
export function KokGovde({
  dil,
  children,
}: {
  dil: Dil;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={htmlLang[dil]}
      suppressHydrationWarning
      className={`${bricolage.variable} ${lexend.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Kimlik graph'ı — her sayfada basılır (CLAUDE.md §4.3) */}
        <JsonLd data={rootGraph()} />

        {/* Klavye kullanıcısı menüyü atlayıp içeriğe gidebilsin (a11y) */}
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-(--radius) focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-brand"
        >
          {s(dil).genel.icerigeAtla}
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-center"
            richColors
            toastOptions={{ className: "font-sans" }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

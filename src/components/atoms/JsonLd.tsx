/**
 * JSON-LD basıcı. Server Component — client'a JS gitmez.
 *
 * `<` karakteri escape edilir: içerikte geçen bir "</script>" dizisinin
 * script etiketini erken kapatmasını engeller.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

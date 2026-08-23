import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt
 *
 * YZ tarayıcıları bilinçli olarak ENGELLENMEZ (CLAUDE.md §4.5) — GPTBot,
 * PerplexityBot, ClaudeBot, Google-Extended, CCBot sitede serbest gezer.
 * Amaç, yapay zekâ motorlarının kaynak olarak siteyi göstermesi.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

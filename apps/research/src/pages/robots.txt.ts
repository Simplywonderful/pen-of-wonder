import type { APIRoute } from "astro";
import { site } from "../data/site";

// Built from the shared config so the sitemap address follows the site's live URL.
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

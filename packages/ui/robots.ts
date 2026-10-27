import type { APIRoute } from "astro";
import { worldOrigin, type WorldId } from "@pow/config/worlds";

// Each world's robots.txt, built from the shared config so the sitemap address follows the live URL.
export const robots =
  (world: WorldId): APIRoute =>
  () =>
    new Response(`User-agent: *\nAllow: /\n\nSitemap: ${worldOrigin(world, "production")}/sitemap-index.xml\n`, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

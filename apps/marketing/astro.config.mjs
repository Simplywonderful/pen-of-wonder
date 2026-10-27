import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { world, worldOrigin } from "@pow/config/worlds";

export default defineConfig({
  site: worldOrigin("marketing", "production"),
  server: { port: world("marketing").port },
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/contact/thanks"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://pen-of-wonder-research.pages.dev",
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

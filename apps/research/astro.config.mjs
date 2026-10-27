import { readFile, writeFile } from "node:fs/promises";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { academicIntegrity } from "@pow/config/legal";
import { world, worldOrigin, worldUrl } from "@pow/config/worlds";

// Redirects to other worlds are added at build time, so no world's address is written into a file here.
const crossWorldRedirects = {
  name: "cross-world-redirects",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const file = new URL("_redirects", dir);
      const own = await readFile(file, "utf8").catch(() => "");
      const target = worldUrl(academicIntegrity.world, academicIntegrity.path, "production");
      await writeFile(file, `${own}/academic-integrity ${target} 301\n`);
    },
  },
};

export default defineConfig({
  site: worldOrigin("research", "production"),
  server: { port: world("research").port },
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/contact/thanks"),
    }),
    crossWorldRedirects,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "@pow/ui/blog";

// The founder's posts. The first three moved from his portfolio (12, 14 and 16 Oct 2026) with their
// original dates; the rest are new. Every figure is checked and logged in
// _source/fact-check-log-marketing.md; the portfolio's copies should point here with rel="canonical".
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

export const collections = { blog };

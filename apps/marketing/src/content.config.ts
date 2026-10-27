import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The founder's posts, moved from his portfolio (16, 14 and 12 Oct 2026) with their original dates.
// First person, with his byline. Every figure is checked and logged in
// _source/fact-check-log-marketing.md; the portfolio's copies should point here with rel="canonical".
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishDate: z.coerce.date(),
    topics: z.array(z.string()),
    draft: z.boolean(),
    questions: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    closing: z.string().optional(),
  }),
});

export const collections = { blog };

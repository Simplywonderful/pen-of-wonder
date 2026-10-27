import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The family's policies: Academic Integrity Policy (canonical for every world), Privacy notice, Terms.
// Write {email} where the contact address goes; it is filled from packages/config/contact.ts.
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { pages };

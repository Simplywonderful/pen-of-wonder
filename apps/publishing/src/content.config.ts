import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "@pow/ui/blog";

// The founder's guides for Publishing. Every figure is checked and logged in _source/fact-check-log-publishing.md.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

export const collections = { blog };

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Blog pieces adapted from Wonderful's LinkedIn posts. See _source/blog-content-plan.md.
// sourcePosts is for the owner's records and is never shown on the site.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    sourceDates: z.object({ first: z.coerce.date(), last: z.coerce.date() }),
    sourcePosts: z.array(z.number().int()),
    // The writer. Defaults to the founder; set it in front matter when someone else writes a piece.
    author: z.string().default("Wonderful Adebagbo"),
    series: z.enum(["guide", "30 Lessons"]),
    serviceLink: z.enum(["/publication-support", "/work-with-us", "/coaching"]),
    serviceLine: z.string(),
    draft: z.boolean(),
    // The date shown on the piece: the last date of the original LinkedIn posts.
    publishDate: z.coerce.date(),
    // Optional: when the piece goes live on this site. Leave it out to publish on the next build.
    // Set a future date to schedule it; the weekly rebuild releases it on that date.
    releaseDate: z.coerce.date().optional(),
  }),
});

// The footer pages: Academic Integrity Policy, Privacy notice, Terms.
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    legalReview: z.boolean(),
  }),
});

export const collections = { blog, pages };

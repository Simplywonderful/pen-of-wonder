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
    // The day the piece goes up on this site: shown on the piece, used to order the blog and RSS.
    // A future date schedules it; the weekly rebuild releases it on that date. The original
    // LinkedIn dates live in sourceDates and appear in the "Adapted from" line.
    publishDate: z.coerce.date(),
    // Search and answer engines. metaTitle is the <title> tag (keep it under 60 characters,
    // with the main search phrase first); description is the meta description.
    metaTitle: z.string().max(60),
    description: z.string().min(70).max(160),
    // The search phrase the piece is written to answer. For the owner's records; not shown.
    keyword: z.string(),
    // A direct answer to the main question, 40 to 60 words, shown in a box under the title.
    answer: z.string(),
    // Three to five common questions, shown at the end and marked up as FAQPage.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(5),
    // Slugs of two or three related pieces for "Read next". Unreleased ones are skipped.
    related: z.array(z.string()).min(2).max(3),
    // Set when a piece is substantially revised after it goes live.
    updated: z.coerce.date().optional(),
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

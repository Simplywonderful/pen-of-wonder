// Each world's blog: its headings, intro, feed text and call to action. Posts live in
// apps/<world>/src/content/blog; the pages and helpers are shared in packages/ui/blog.ts.

export type BlogWorld = "marketing" | "writing" | "publishing";

export interface BlogCopy {
  /** The <title> and meta description of the post list. */
  metaTitle: string;
  metaDescription: string;
  /** The H1 and intro on the post list. */
  heading: string;
  intro: string;
  /** The RSS channel's description. */
  feed: string;
  /** The WhatsApp button under each post, and the service it prefills. */
  cta: { label: string; service: string };
  /** A line under the button, for worlds that aren't open yet. */
  ctaNote?: string;
}

/**
 * A blog on a holding site stays out of the menu, the holding page and the sitemap until it has
 * this many live posts (owner's plan, 30 Oct 2026). Marketing is a full site, so its blog is always on.
 */
export const blogMinPosts = 3;

export const blogs: Record<BlogWorld, BlogCopy> = {
  marketing: {
    metaTitle: "Blog: paid ads, taught in public | Pen of Wonder Marketing",
    metaDescription:
      "Plain guides and notes from real campaigns by our founder: Meta and LinkedIn ads, ad creative, landing pages, copy and tracking for coaches and small businesses.",
    heading: "Paid ads, taught in public.",
    intro: "Guides and notes from real campaigns by our founder, Wonderful Adebagbo: the setups, the mistakes and the fixes.",
    feed: "Paid ads, taught in public, by Wonderful Adebagbo, founder of Pen of Wonder.",
    cta: { label: "Chat about your ads", service: "paid ads" },
  },
  writing: {
    metaTitle: "CV, LinkedIn and Grant Writing Guides | Pen of Wonder",
    metaDescription:
      "Plain guides from our founder on the documents that get people hired and funded: CVs, cover letters, LinkedIn profiles, grant proposals and business plans.",
    heading: "The documents that open doors, explained.",
    intro:
      "Plain guides by our founder, Wonderful Adebagbo, on CVs, cover letters, LinkedIn profiles, grant proposals and business plans. Professional documents only: we don't write academic or assessed work.",
    feed: "Guides to CVs, LinkedIn profiles, grant proposals and business writing, by Wonderful Adebagbo, founder of Pen of Wonder.",
    cta: { label: "Ask about your document on WhatsApp", service: "a writing job" },
  },
  publishing: {
    metaTitle: "Writing and Self-Publishing Guides | Pen of Wonder",
    metaDescription:
      "Plain guides from the author of the Hidden Treasures readers: writing children's books, self-publishing, ISBNs, printing, distribution and book marketing.",
    heading: "Making a book, from first page to first reader.",
    intro:
      "Plain guides by our founder, Wonderful Adebagbo, who wrote the six Hidden Treasures Companion Readers: writing for children, self-publishing, printing and getting a book to readers.",
    feed: "Guides to writing, publishing and selling a book, by Wonderful Adebagbo, founder of Pen of Wonder.",
    cta: { label: "Ask about your book on WhatsApp", service: "a book" },
    ctaNote: "Pen of Wonder Publishing opens soon. Message us and we'll tell you honestly whether we can take your book on yet.",
  },
};

/**
 * The line after the author's name at the foot of every post. Facts only from the approved About
 * page (apps/main/src/pages/about.astro): no postgraduate study, no CV percentages.
 */
export const authorBio =
  "founded Pen of Wonder in 2021. He studied biochemistry at McPherson University, graduating top of his class, department and faculty, and is a co-author of two peer-reviewed papers. He also wrote the six Hidden Treasures Companion Readers for Nigerian primary classes.";

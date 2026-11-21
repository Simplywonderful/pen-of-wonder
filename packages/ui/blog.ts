// The blog every world shares: the post schema, which posts are live, the structured data for a
// post, the RSS feed and llms.txt. Each world's copy is in packages/config/blogs.ts.
import { getCollection, type CollectionEntry } from "astro:content";
import { z } from "astro/zod";
import rss from "@astrojs/rss";
import { blogs, blogMinPosts, type BlogWorld } from "@pow/config/blogs";
import { legal } from "@pow/config/legal";
import { world, worldOrigin, worldUrl } from "@pow/config/worlds";
import { faqLd } from "./faq-ld";
import { showTodos } from "./todos";

export const blogSchema = z
  .object({
  /** The H1. Contains the main search phrase. */
  title: z.string(),
  /** The title tag, when the H1 is too long for search results (60 characters at most). */
  seoTitle: z.string().max(60).optional(),
  /** The answer in two or three sentences, shown under the H1, in the post list, the feed and llms.txt. */
  summary: z.string(),
  /** The meta description for search results: 120 to 155 characters, with the main phrase. */
  description: z.string().min(70).max(160).optional(),
  /** The day the post goes up on the site, chosen by the owner. Never back-dated. A draft may wait for it. */
  publishDate: z.coerce.date().optional(),
  /** The last real change to the post's facts or advice, if any. */
  updated: z.coerce.date().optional(),
  topics: z.array(z.string()),
  /** New posts stay drafts until the owner approves them and picks a date. */
  draft: z.boolean(),
  questions: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  closing: z.string().optional(),
  })
  .refine((d) => d.draft || d.publishDate, { message: "A post needs a publishDate before draft is set to false.", path: ["publishDate"] });

export type Post = CollectionEntry<"blog">;
type PostData = z.infer<typeof blogSchema>;

/** Live means approved and dated today or earlier. A future date waits for the next build after it. */
export const isLive = (d: PostData) => !d.draft && !!d.publishDate && d.publishDate.getTime() <= Date.now();

/** Undated drafts sort first, then newest first. */
const when = (p: Post) => (p.data.publishDate as Date | undefined)?.getTime() ?? Infinity;

/** Posts to build, newest first. Development and review builds also show drafts, marked as such. */
export async function getPosts(includeDrafts = showTodos): Promise<Post[]> {
  const posts = await getCollection("blog", (e: Post) => includeDrafts || isLive(e.data as PostData));
  return posts.sort((a: Post, b: Post) => when(b) - when(a));
}

/** Live posts only, whatever the build: for feeds, llms.txt and the rule below. */
export const getLivePosts = () => getPosts(false);

/**
 * Whether a world's blog is switched on: on a live site once it has one live post, on a holding site
 * once it has enough. Development and review builds always show it, with the drafts.
 */
export async function blogIsOn(id: BlogWorld): Promise<boolean> {
  if (showTodos) return true;
  const live = (await getLivePosts()).length;
  return world(id).status === "live" ? live > 0 : live >= blogMinPosts;
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
export const formatDate = (date?: Date) => (date ? longDate.format(date) : "Date not chosen yet");

const day = (d: Date) => d.toISOString().slice(0, 10);

/** The title tag: the SEO title or H1, with the world's name only if it still fits in 60 characters. */
export function postTitle(id: BlogWorld, post: Post): string {
  const base = (post.data.seoTitle ?? post.data.title) as string;
  const full = `${base} | ${world(id).name}`;
  return full.length <= 60 ? full : base;
}

/** The meta description: the post's own, or its summary cut at a sentence. */
export function postDescription(post: Post): string {
  const d = post.data as PostData;
  if (d.description) return d.description;
  const first = d.summary.split(/(?<=\.)\s/)[0];
  return first.length <= 160 ? first : d.summary.slice(0, 157).replace(/\s\S*$/, "") + "...";
}

/** Up to three other posts that share a topic, newest first; else the newest others. */
export function relatedPosts(post: Post, all: Post[], count = 3): Post[] {
  const topics = new Set(post.data.topics as string[]);
  const others = all.filter((p) => p.id !== post.id);
  const shared = (p: Post) => (p.data.topics as string[]).filter((t) => topics.has(t)).length;
  return [...others].sort((a, b) => shared(b) - shared(a)).slice(0, count);
}

/**
 * Links to other posts work only once those posts are built. Until then the link text stays as
 * plain text, so posts can link to each other before they're all approved, with no broken links.
 */
export function linkBuiltPostsOnly(html: string, built: Set<string>): string {
  return html.replace(/<a href="\/blog\/([a-z0-9-]+)(#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g, (link, id: string, _hash, text: string) =>
    built.has(id) ? link : text,
  );
}

/** The H2s, for the "On this page" list. The summary and source sections are left out. */
export function postSections(post: Post): { slug: string; text: string }[] {
  const headings = (post.rendered?.metadata?.headings ?? []) as { depth: number; slug: string; text: string }[];
  return headings.filter((h) => h.depth === 2 && !/^(in short|sources)$/i.test(h.text)).map(({ slug, text }) => ({ slug, text }));
}

const words = (text = "") => text.replace(/^---[\s\S]*?---/, "").split(/\s+/).filter(Boolean).length;

/** BlogPosting, BreadcrumbList and, when the post has them, its questions as FAQPage. */
export function postLd(id: BlogWorld, post: Post): object[] {
  const d = post.data as PostData;
  const origin = worldOrigin(id, "production");
  const url = `${origin}/blog/${post.id}`;
  const name = world(id).name;
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: d.title,
    description: postDescription(post),
    abstract: d.summary,
    wordCount: words(post.body),
    articleSection: d.topics[0],
    datePublished: day(d.publishDate ?? new Date()),
    dateModified: day(d.updated ?? d.publishDate ?? new Date()),
    inLanguage: "en-GB",
    keywords: d.topics.join(", "),
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: legal.founder,
      jobTitle: "Founder",
      url: worldUrl("main", "/about", "production"),
      worksFor: { "@type": "Organization", name: "Pen of Wonder", legalName: legal.company },
    },
    publisher: { "@type": "Organization", name, url: origin, parentOrganization: { "@type": "Organization", name: legal.company } },
    isPartOf: { "@type": "Blog", name: `${name} blog`, url: `${origin}/blog` },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name, item: origin },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
      { "@type": "ListItem", position: 3, name: d.title, item: url },
    ],
  };
  return d.questions.length ? [article, crumbs, faqLd(d.questions)] : [article, crumbs];
}

/** The world's RSS feed of live posts. */
export async function blogFeed(id: BlogWorld, site?: URL) {
  const posts = await getLivePosts();
  return rss({
    title: `${world(id).name}: blog`,
    description: blogs[id].feed,
    site: site ?? worldOrigin(id, "production"),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.publishDate!,
      link: `/blog/${p.id}`,
      categories: p.data.topics,
    })),
    customData: "<language>en-gb</language>",
  });
}

/**
 * llms.txt (llmstxt.org): a plain index of the site for AI tools, with each live post's summary.
 * Holding sites list their posts only once the blog is on.
 */
export async function llmsTxt(id: BlogWorld): Promise<Response> {
  const w = world(id);
  const origin = worldOrigin(id, "production");
  const posts = (await blogIsOn(id)) ? await getLivePosts() : [];
  const lines = [
    `# ${w.name}`,
    "",
    `> ${w.tagline} Part of Pen of Wonder, founded by ${legal.founder} in Ibadan, Nigeria. ${blogs[id].intro}`,
    "",
    "## Pages",
    "",
    `- [Home](${origin}/)`,
    ...(w.status === "live" ? w.menu.map((m) => `- [${m.label}](${origin}${m.path})`) : []),
    `- [About Pen of Wonder and its founder](${worldUrl("main", "/about", "production")})`,
  ];
  if (posts.length) {
    lines.push("", "## Blog", "", ...posts.map((p) => `- [${p.data.title}](${origin}/blog/${p.id}): ${p.data.summary}`));
  }
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

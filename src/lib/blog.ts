import { getCollection, type CollectionEntry } from "astro:content";

// A piece is live when it is not a draft and its publish date has passed at build time.
// The weekly GitHub Action rebuilds the site, so the next scheduled piece appears on its date.
export const isLive = (entry: CollectionEntry<"blog">, now = new Date()) =>
  !entry.data.draft && entry.data.publishDate.getTime() <= now.getTime();

export async function getLivePosts() {
  const posts = await getCollection("blog", (entry) => isLive(entry));
  return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
export const formatDate = (date: Date) => longDate.format(date);

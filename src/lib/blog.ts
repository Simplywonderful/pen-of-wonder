import { getCollection, type CollectionEntry } from "astro:content";

// A piece is live when it is not a draft and its publish date (the day it goes up on this site)
// has passed at build time. The weekly GitHub Action rebuilds the site so a scheduled piece appears
// on its date.
export const isLive = (entry: CollectionEntry<"blog">, now = new Date()) =>
  !entry.data.draft && entry.data.publishDate.getTime() <= now.getTime();

// Newest first. Pieces released on the same day (the launch set) fall back to their LinkedIn dates.
export async function getLivePosts() {
  const posts = await getCollection("blog", (entry) => isLive(entry));
  return posts.sort(
    (a, b) =>
      b.data.publishDate.getTime() - a.data.publishDate.getTime() ||
      b.data.sourceDates.last.getTime() - a.data.sourceDates.last.getTime(),
  );
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
export const formatDate = (date: Date) => longDate.format(date);

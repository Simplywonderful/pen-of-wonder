import { getCollection } from "astro:content";

export async function getLivePosts() {
  const posts = await getCollection("blog", (entry) => !entry.data.draft);
  return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
export const formatDate = (date: Date) => longDate.format(date);

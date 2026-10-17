import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getLivePosts } from "../lib/blog";
import { site } from "../data/site";

export async function GET(context: APIContext) {
  const posts = await getLivePosts();
  return rss({
    title: `${site.name}: blog`,
    description: "Guides on research methods, writing and publishing by Wonderful Adebagbo.",
    site: context.site ?? site.url,
    customData: "<language>en-gb</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}`,
    })),
  });
}

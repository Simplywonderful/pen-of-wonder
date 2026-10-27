import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { worldOrigin } from "@pow/config/worlds";
import { getLivePosts } from "../lib/blog";

export async function GET(context: APIContext) {
  const posts = await getLivePosts();
  return rss({
    title: "Pen of Wonder Marketing: blog",
    description: "Paid ads, taught in public, by Wonderful Adebagbo, founder of Pen of Wonder.",
    site: context.site ?? worldOrigin("marketing", "production"),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.publishDate,
      link: `/blog/${p.id}`,
    })),
    customData: "<language>en-gb</language>",
  });
}

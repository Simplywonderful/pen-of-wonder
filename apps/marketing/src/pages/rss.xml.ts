import type { APIContext } from "astro";
import { blogFeed } from "@pow/ui/blog";

export const GET = (context: APIContext) => blogFeed("marketing", context.site);

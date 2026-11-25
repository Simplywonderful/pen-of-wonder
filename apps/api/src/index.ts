// pow-api: one Worker for every Pen of Wonder world (revamp brief 5.1). R3 serves the forms
// (/submit) and /health, and runs the hourly cron. Later phases add /subscribe, /view, /event and
// /popular here.
import type { Env } from "./env";
import { corsHeaders } from "./cors";
import { handleSubmit } from "./submit";
import { handleHealth } from "./health";
import { runScheduled } from "./jobs";
import { json } from "./util";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const cors = corsHeaders(request.headers.get("Origin"));

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname === "/submit" && request.method === "POST") return handleSubmit(request, env, ctx);
    if (url.pathname === "/health" && request.method === "GET") return handleHealth(env, cors);
    if (url.pathname === "/robots.txt") return new Response("User-agent: *\nDisallow: /\n", { headers: { "Content-Type": "text/plain" } });
    return json({ ok: false, error: "not_found" }, 404, cors);
  },

  async scheduled(_controller, env, ctx): Promise<void> {
    ctx.waitUntil(runScheduled(env).then(() => undefined));
  },
} satisfies ExportedHandler<Env>;

// Only Pen of Wonder's own sites may call the API from a browser: every world's final host, its
// interim pages.dev host, and its local development port, all read from packages/config/worlds.ts.
import { worlds, type WorldId } from "../../../packages/config/worlds.ts";

export const allowedOrigins = new Set(
  worlds.flatMap((w) => [`https://${w.host}`, `https://${w.interimHost}`, `http://localhost:${w.port}`]),
);
// www.penofwonder.com redirects to the bare domain, but a cached page could still post from it.
allowedOrigins.add("https://www.penofwonder.com");

export const worldIds = new Set<string>(worlds.map((w) => w.id));
export const isWorld = (id: unknown): id is WorldId => typeof id === "string" && worldIds.has(id);

/** CORS headers for an allowed origin, or none at all. */
export function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !allowedOrigins.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/** Where a world's thank-you page lives, for form posts sent without JavaScript. */
export function thanksUrl(id: WorldId, origin: string | null): string {
  const w = worlds.find((x) => x.id === id)!;
  const base = origin && allowedOrigins.has(origin) ? origin : `https://${w.interimHost}`;
  return `${base}/contact/thanks`;
}

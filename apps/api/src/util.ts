import type { Env } from "./env";

export const nowIso = () => new Date().toISOString();

/** SHA-256 of a value with the Worker's salt, as hex. Used for IPs, user agents and emails. */
export async function hash(env: Env, value: string): Promise<string> {
  const data = new TextEncoder().encode(`${env.HASH_SALT ?? "pow-api"}:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...headers } });
}

/** Hours in West Africa Time (UTC+1, no daylight saving), for scheduling jobs by local time. */
export const watHour = (date: Date) => (date.getUTCHours() + 1) % 24;

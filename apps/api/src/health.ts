// GET /health (revamp brief 5.1, TIMILEGIT's pattern): which storage, secrets and jobs are in place,
// as booleans and timestamps only. A secret's value never leaves the Worker.
import type { Env } from "./env";
import { json } from "./util";

export async function handleHealth(env: Env, cors: Record<string, string>): Promise<Response> {
  let db = false;
  let jobs: Record<string, { lastRunAt: string; lastResult: string }> = {};
  try {
    const rows = await env.DB.prepare("SELECT name, last_run_at, last_result FROM jobs ORDER BY name").all<{ name: string; last_run_at: string; last_result: string }>();
    db = true;
    jobs = Object.fromEntries(rows.results.map((r) => [r.name, { lastRunAt: r.last_run_at, lastResult: r.last_result }]));
  } catch {
    db = false;
  }
  const has = (v?: string) => Boolean(v);
  return json(
    {
      storage: { db },
      secrets: {
        brevo: has(env.BREVO_API_KEY),
        buffer: has(env.BUFFER_API_KEY),
        admin: has(env.ADMIN_KEY),
        turnstile: has(env.TURNSTILE_SECRET),
        telegram: has(env.TELEGRAM_BOT_TOKEN) && has(env.TELEGRAM_CHAT_ID),
        hashSalt: has(env.HASH_SALT),
        hooks: {
          main: has(env.CF_DEPLOY_HOOK_MAIN),
          marketing: has(env.CF_DEPLOY_HOOK_MARKETING),
          writing: has(env.CF_DEPLOY_HOOK_WRITING),
          publishing: has(env.CF_DEPLOY_HOOK_PUBLISHING),
          dev: has(env.CF_DEPLOY_HOOK_DEV),
          research: has(env.CF_DEPLOY_HOOK_RESEARCH),
        },
      },
      modes: { social: env.SOCIAL_MODE ?? "off", digest: env.DIGEST_MODE ?? "off" },
      jobs,
    },
    db ? 200 : 503,
    { ...cors, "Cache-Control": "no-store" },
  );
}

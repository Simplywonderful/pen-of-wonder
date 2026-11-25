// The one cron trigger (hourly, brief 5.1: the free plan allows five per account) dispatches every
// scheduled job by the hour in West Africa Time. R3 has only housekeeping; later phases add the
// social poster (R5), the digests and scheduled publishing (R4, R6) here.
import type { Env, Fetcher } from "./env";
import { nowIso, watHour } from "./util";

export type Job = { name: string; due: (now: Date) => boolean; run: (env: Env, fetcher: Fetcher) => Promise<string> };

export const jobs: Job[] = [
  {
    // Rate-limit counters older than a day are no use and hold hashed IPs, so they go.
    name: "cleanup",
    due: () => true,
    run: async (env) => {
      const cutoff = new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 13);
      const res = await env.DB.prepare("DELETE FROM rate_limits WHERE window_start < ?1").bind(cutoff).run();
      return `removed ${res.meta.changes ?? 0} rate-limit rows`;
    },
  },
];

/** Runs every job due this hour and records each result in `jobs`, so /health can show it. */
export async function runScheduled(env: Env, now: Date = new Date(), fetcher: Fetcher = fetch): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  for (const job of jobs.filter((j) => j.due(now))) {
    let result: string;
    try {
      result = `ok: ${await job.run(env, fetcher)}`;
    } catch (e) {
      result = `failed: ${e instanceof Error ? e.message : String(e)}`.slice(0, 500);
    }
    results[job.name] = result;
    await env.DB.prepare(
      "INSERT INTO jobs (name, last_run_at, last_result) VALUES (?1, ?2, ?3) ON CONFLICT (name) DO UPDATE SET last_run_at = excluded.last_run_at, last_result = excluded.last_result",
    )
      .bind(job.name, nowIso(), result)
      .run();
  }
  return results;
}

export { watHour };

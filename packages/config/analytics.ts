// Cloudflare Web Analytics: no cookies, no local storage, no fingerprinting. On Pages projects it is
// switched on in the Cloudflare dashboard and injected automatically, so no token is needed. Dev runs
// on Workers, which doesn't inject it, so its beacon token goes here once the site is created (Phase 1C).
// No Meta Pixel at launch (owner decision, 26 Oct 2026).
import type { WorldId } from "./worlds.ts";

export const analyticsTokens: Partial<Record<WorldId, string | null>> = {
  dev: null,
};

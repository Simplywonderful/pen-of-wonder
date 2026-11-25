// The Worker's bindings, variables and secrets (wrangler.jsonc and `wrangler secret put`). Secrets are
// optional: a missing one switches its feature off and shows as false on /health, never as an error.
export interface Env {
  DB: D1Database;
  /** "draft" | "queue" | "publish" | "off" (R5). */
  SOCIAL_MODE?: string;
  /** "draft" | "send" | "off" (R4). */
  DIGEST_MODE?: string;
  /** Salt for hashing IPs and user agents. Without it a fixed fallback is used. */
  HASH_SALT?: string;
  BREVO_API_KEY?: string;
  BUFFER_API_KEY?: string;
  ADMIN_KEY?: string;
  TURNSTILE_SECRET?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  CF_DEPLOY_HOOK_MAIN?: string;
  CF_DEPLOY_HOOK_MARKETING?: string;
  CF_DEPLOY_HOOK_WRITING?: string;
  CF_DEPLOY_HOOK_PUBLISHING?: string;
  CF_DEPLOY_HOOK_DEV?: string;
  CF_DEPLOY_HOOK_RESEARCH?: string;
}

/** Outbound calls go through this, so tests can swap in a fake and never reach a real API. */
export type Fetcher = typeof fetch;

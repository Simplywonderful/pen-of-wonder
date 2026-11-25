// POST /submit: every world's forms (revamp brief 5.2). JSON from the page's script, or a normal form
// post when JavaScript is off. Spam control: a honeypot, the time taken to fill the form, and a
// per-IP hourly limit. A good message is stored in D1, then the owner is alerted.
import type { Env, Fetcher } from "./env";
import { corsHeaders, isWorld, thanksUrl } from "./cors";
import { enquiryAlert, sendTelegram } from "./telegram";
import { hash, json, nowIso } from "./util";

export const FORM_TYPES = ["enquiry", "quote", "notify"] as const;
export type FormType = (typeof FORM_TYPES)[number];
/** Faster than this, a person can't have typed the form (brief 5.2). */
export const MIN_ELAPSED_MS = 3000;
/** Messages one IP may send in an hour. */
export const HOURLY_LIMIT = 5;

type Fields = Record<string, string>;
export type SubmitError = "invalid" | "too_fast" | "rate_limited" | "server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: string | undefined, max: number) => (v ?? "").trim().slice(0, max);

async function readFields(request: Request): Promise<{ fields: Fields; wantsJson: boolean }> {
  const type = request.headers.get("Content-Type") ?? "";
  if (type.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const fields = Object.fromEntries(Object.entries(body).map(([k, v]) => [k, typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? String(v) : ""]));
    return { fields, wantsJson: true };
  }
  const form = await request.formData().catch(() => new FormData());
  const fields: Fields = {};
  for (const [k, v] of form.entries()) if (typeof v === "string") fields[k] = v;
  return { fields, wantsJson: (request.headers.get("Accept") ?? "").includes("application/json") };
}

/** Checks the fields; returns the cleaned record, or which fields are wrong. */
export function validate(f: Fields):
  | { ok: true; value: { world: string; formType: FormType; service: string | null; name: string; email: string; phone: string | null; organisation: string | null; message: string | null; link: string | null } }
  | { ok: false; fields: string[] } {
  const bad: string[] = [];
  const world = clip(f.world, 20);
  const formType = (FORM_TYPES as readonly string[]).includes(f.formType ?? f.intent ?? "") ? ((f.formType ?? f.intent) as FormType) : "enquiry";
  const name = clip(f.name, 200);
  const email = clip(f.email, 254);
  const message = clip(f.message, 5000);
  const link = clip(f.file_link ?? f.link, 500);
  if (!isWorld(world)) bad.push("world");
  if (!name) bad.push("name");
  if (!EMAIL.test(email)) bad.push("email");
  if (formType !== "notify" && !message) bad.push("message");
  if (link && !/^https:\/\/\S+$/.test(link)) bad.push("link");
  if (!["on", "true", "yes", "1"].includes((f.consent ?? "").toLowerCase())) bad.push("consent");
  if (bad.length) return { ok: false, fields: bad };
  return {
    ok: true,
    value: {
      world,
      formType,
      service: clip(f.service, 120) || null,
      name,
      email,
      phone: clip(f.phone, 40) || null,
      organisation: clip(f.organisation, 200) || null,
      message: message || null,
      link: link || null,
    },
  };
}

/** Counts this request against its IP's hourly allowance; false once the limit is reached. */
async function underLimit(env: Env, ip: string): Promise<boolean> {
  const key = await hash(env, `ip:${ip}`);
  const window = nowIso().slice(0, 13); // the hour, e.g. 2026-11-25T14
  const row = await env.DB.prepare(
    "INSERT INTO rate_limits (key, window_start, count) VALUES (?1, ?2, 1) ON CONFLICT (key, window_start) DO UPDATE SET count = count + 1 RETURNING count",
  )
    .bind(key, window)
    .first<{ count: number }>();
  return (row?.count ?? 1) <= HOURLY_LIMIT;
}

export async function handleSubmit(request: Request, env: Env, ctx: ExecutionContext, fetcher: Fetcher = fetch): Promise<Response> {
  const origin = request.headers.get("Origin");
  const cors = corsHeaders(origin);
  const { fields, wantsJson } = await readFields(request);
  const world = isWorld(fields.world) ? fields.world : "main";

  const done = (): Response =>
    wantsJson ? json({ ok: true }, 200, cors) : Response.redirect(thanksUrl(world, origin), 303);
  const fail = (error: SubmitError, status: number, extra: object = {}): Response => {
    if (wantsJson) return json({ ok: false, error, ...extra }, status, cors);
    const back = request.headers.get("Referer") ?? thanksUrl(world, origin).replace("/thanks", "");
    const url = new URL(back);
    url.searchParams.set("sent", "error");
    return Response.redirect(url.toString(), 303);
  };

  // A filled honeypot is a bot. It is told the message went, and nothing is stored.
  if ((fields._gotcha ?? fields.company_website ?? "").trim()) return done();

  const elapsed = Number(fields.elapsedMs);
  if (fields.elapsedMs !== undefined && Number.isFinite(elapsed) && elapsed < MIN_ELAPSED_MS) return fail("too_fast", 400);

  const checked = validate(fields);
  if (!checked.ok) return fail("invalid", 400, { fields: checked.fields });

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (!(await underLimit(env, ip))) return fail("rate_limited", 429);

  const v = checked.value;
  const now = nowIso();
  try {
    const ua = request.headers.get("User-Agent");
    const row = await env.DB.prepare(
      `INSERT INTO submissions (created_at, world, form_type, service, name, email, phone, organisation, message, link, consent_at, user_agent_hash, elapsed_ms)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13) RETURNING id`,
    )
      .bind(now, v.world, v.formType, v.service, v.name, v.email, v.phone, v.organisation, v.message, v.link, now, ua ? await hash(env, `ua:${ua}`) : null, Number.isFinite(elapsed) ? elapsed : null)
      .first<{ id: number }>();

    // The alert runs after the reply, so a slow Telegram never slows the visitor down.
    ctx.waitUntil(
      (async () => {
        const sent = await sendTelegram(env, enquiryAlert(v), fetcher).catch(() => false);
        if (sent && row) await env.DB.prepare("UPDATE submissions SET notified_at = ?1 WHERE id = ?2").bind(nowIso(), row.id).run();
      })(),
    );
  } catch {
    return fail("server", 500);
  }
  return done();
}

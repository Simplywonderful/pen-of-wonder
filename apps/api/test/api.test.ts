import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import worker from "../src/index";
import { handleSubmit, validate, HOURLY_LIMIT } from "../src/submit";
import { handleHealth } from "../src/health";
import { runScheduled } from "../src/jobs";
import { enquiryAlert } from "../src/telegram";

const ORIGIN = "https://penofwondermarketing.pages.dev";

/** A fake for every outbound call: records what was sent and never reaches the internet. */
function fakeFetch() {
  const calls: { url: string; body: unknown }[] = [];
  const fn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), body: init?.body ? JSON.parse(String(init.body)) : undefined });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;
  return { fn, calls };
}

const good = {
  world: "marketing",
  formType: "enquiry",
  name: "Ada Okafor",
  email: "ada@example.com",
  message: "I need help with my Meta ads.",
  consent: "on",
  elapsedMs: "12000",
};

function jsonRequest(body: Record<string, string>, ip = "203.0.113.1", origin = ORIGIN) {
  return new Request("https://pow-api.example/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin, "CF-Connecting-IP": ip, "User-Agent": "test" },
    body: JSON.stringify(body),
  });
}

async function submit(request: Request, testEnv = env) {
  const fake = fakeFetch();
  const ctx = createExecutionContext();
  const res = await handleSubmit(request, testEnv, ctx, fake.fn);
  await waitOnExecutionContext(ctx);
  return { res, calls: fake.calls };
}

const count = async () => (await env.DB.prepare("SELECT COUNT(*) AS n FROM submissions").first<{ n: number }>())?.n ?? 0;

beforeEach(async () => {
  await env.DB.exec("DELETE FROM submissions; DELETE FROM rate_limits; DELETE FROM jobs;");
});

describe("validate", () => {
  it("accepts a complete enquiry", () => {
    expect(validate(good).ok).toBe(true);
  });
  it("names every missing field, consent included", () => {
    const r = validate({ world: "nowhere", name: "", email: "not-an-email", message: "", consent: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fields.sort()).toEqual(["consent", "email", "message", "name", "world"]);
  });
  it("lets a notify-me request leave the message empty", () => {
    expect(validate({ ...good, formType: "notify", message: "" }).ok).toBe(true);
  });
  it("only accepts https links", () => {
    const r = validate({ ...good, file_link: "javascript:alert(1)" });
    expect(r.ok).toBe(false);
  });
  it("reads the older form's intent field as the form type", () => {
    const r = validate({ ...good, formType: undefined as unknown as string, intent: "notify" });
    expect(r.ok && r.value.formType).toBe("notify");
  });
});

describe("POST /submit", () => {
  it("stores a good message, answers with JSON and CORS, and alerts the owner", async () => {
    const { res, calls } = await submit(jsonRequest(good));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);
    expect(await count()).toBe(1);
    // Telegram is skipped without its secrets...
    expect(calls.length).toBe(0);
  });

  it("sends the Telegram alert when the bot is set up, and records when", async () => {
    const withBot = { ...env, TELEGRAM_BOT_TOKEN: "t", TELEGRAM_CHAT_ID: "42" };
    const { calls } = await submit(jsonRequest({ ...good, phone: "0803 123 4567" }), withBot);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain("api.telegram.org/bott/sendMessage");
    const body = calls[0].body as { chat_id: string; text: string };
    expect(body.chat_id).toBe("42");
    expect(body.text).toContain("Ada Okafor");
    expect(body.text).toContain("https://wa.me/2348031234567");
    const row = await env.DB.prepare("SELECT notified_at FROM submissions").first<{ notified_at: string | null }>();
    expect(row?.notified_at).toBeTruthy();
  });

  it("stores a hash of the user agent, never the raw value", async () => {
    await submit(jsonRequest(good));
    const row = await env.DB.prepare("SELECT user_agent_hash FROM submissions").first<{ user_agent_hash: string }>();
    expect(row?.user_agent_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("tells a bot that filled the honeypot it worked, and stores nothing", async () => {
    const { res } = await submit(jsonRequest({ ...good, _gotcha: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(await count()).toBe(0);
  });

  it("refuses a form filled in under three seconds", async () => {
    const { res } = await submit(jsonRequest({ ...good, elapsedMs: "800" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ ok: false, error: "too_fast" });
    expect(await count()).toBe(0);
  });

  it("refuses a message without consent, naming the field", async () => {
    const { res } = await submit(jsonRequest({ ...good, consent: "" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ error: "invalid", fields: ["consent"] });
  });

  it("limits one address to five messages an hour", async () => {
    for (let i = 0; i < HOURLY_LIMIT; i++) expect((await submit(jsonRequest(good, "198.51.100.7"))).res.status).toBe(200);
    const { res } = await submit(jsonRequest(good, "198.51.100.7"));
    expect(res.status).toBe(429);
    // Another visitor is unaffected.
    expect((await submit(jsonRequest(good, "198.51.100.8"))).res.status).toBe(200);
  });

  it("keeps hashed keys only in the rate-limit table", async () => {
    await submit(jsonRequest(good, "192.0.2.55"));
    const row = await env.DB.prepare("SELECT key FROM rate_limits").first<{ key: string }>();
    expect(row?.key).not.toContain("192.0.2.55");
  });

  it("works without JavaScript: a form post is redirected to the world's thank-you page", async () => {
    const form = new FormData();
    for (const [k, v] of Object.entries({ ...good, elapsedMs: "" })) if (k !== "elapsedMs") form.set(k, v);
    const req = new Request("https://pow-api.example/submit", { method: "POST", headers: { Origin: ORIGIN, "CF-Connecting-IP": "203.0.113.9" }, body: form });
    const { res } = await submit(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("Location")).toBe(`${ORIGIN}/contact/thanks`);
    expect(await count()).toBe(1);
  });

  it("sends a form post with errors back to the page it came from", async () => {
    const form = new FormData();
    form.set("world", "writing");
    form.set("name", "");
    const req = new Request("https://pow-api.example/submit", {
      method: "POST",
      headers: { Origin: "https://penofwonderwriting.pages.dev", Referer: "https://penofwonderwriting.pages.dev/contact", "CF-Connecting-IP": "203.0.113.10" },
      body: form,
    });
    const { res } = await submit(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("Location")).toBe("https://penofwonderwriting.pages.dev/contact?sent=error");
  });

  it("gives no CORS permission to a site that isn't ours", async () => {
    const { res } = await submit(jsonRequest(good, "203.0.113.11", "https://example.com"));
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});

describe("routing", () => {
  it("answers a preflight from our sites", async () => {
    const ctx = createExecutionContext();
    const res = await worker.fetch(new Request("https://pow-api.example/submit", { method: "OPTIONS", headers: { Origin: ORIGIN } }), env, ctx);
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });
  it("returns 404 for anything else", async () => {
    const ctx = createExecutionContext();
    const res = await worker.fetch(new Request("https://pow-api.example/nope"), env, ctx);
    expect(res.status).toBe(404);
  });
});

describe("GET /health", () => {
  it("reports storage, secrets and jobs as booleans and times, never values", async () => {
    const res = await handleHealth({ ...env, TELEGRAM_BOT_TOKEN: "secret-token", TELEGRAM_CHAT_ID: "1" }, {});
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).not.toContain("secret-token");
    const body = JSON.parse(text);
    expect(body.storage.db).toBe(true);
    expect(body.secrets.telegram).toBe(true);
    expect(body.secrets.brevo).toBe(false);
    expect(body.secrets.hooks.main).toBe(false);
  });
});

describe("scheduled jobs", () => {
  it("records each run for /health and clears old rate-limit rows", async () => {
    await env.DB.prepare("INSERT INTO rate_limits (key, window_start, count) VALUES ('old', '2020-01-01T00', 3), ('new', ?1, 1)")
      .bind(new Date().toISOString().slice(0, 13))
      .run();
    const results = await runScheduled(env);
    expect(results.cleanup).toMatch(/^ok: removed 1 /);
    const job = await env.DB.prepare("SELECT last_result FROM jobs WHERE name = 'cleanup'").first<{ last_result: string }>();
    expect(job?.last_result).toMatch(/^ok/);
    const left = await env.DB.prepare("SELECT key FROM rate_limits").all<{ key: string }>();
    expect(left.results.map((r) => r.key)).toEqual(["new"]);
  });
});

describe("enquiry alert text", () => {
  it("keeps the excerpt to one short line and gives an international WhatsApp link", () => {
    const text = enquiryAlert({ world: "writing", formType: "quote", service: "a CV", name: "Bisi", email: "b@example.com", phone: "+44 7700 900123", message: "x".repeat(300) });
    expect(text).toContain("New quote on writing, about a CV");
    expect(text).toContain("https://wa.me/447700900123");
    expect(text.split("\n")[2].length).toBeLessThan(170);
  });
});

// Owner alerts through a Telegram bot (revamp brief 5.7): free, official, and independent of the
// domain and of Brevo's daily cap. Plain text only, so nothing a visitor types can be read as markup.
import type { Env, Fetcher } from "./env";

export const telegramReady = (env: Env) => Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);

export async function sendTelegram(env: Env, text: string, fetcher: Fetcher = fetch): Promise<boolean> {
  if (!telegramReady(env)) return false;
  const res = await fetcher(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: text.slice(0, 4000), disable_web_page_preview: true }),
  });
  return res.ok;
}

/** The new-enquiry alert: world, form, service, name, a one-line excerpt, and how to reply. */
export function enquiryAlert(s: {
  world: string;
  formType: string;
  service: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
}): string {
  const excerpt = (s.message ?? "").replace(/\s+/g, " ").trim().slice(0, 160);
  // A Nigerian number typed locally (0803...) becomes international (234803...) for wa.me.
  const raw = (s.phone ?? "").replace(/\D/g, "");
  const digits = /^0\d{10}$/.test(raw) ? `234${raw.slice(1)}` : raw;
  const lines = [
    `New ${s.formType} on ${s.world}${s.service ? `, about ${s.service}` : ""}`,
    `From: ${s.name} <${s.email}>`,
    excerpt ? `"${excerpt}${(s.message ?? "").length > 160 ? "..." : ""}"` : "",
    digits.length >= 8 ? `WhatsApp: https://wa.me/${digits}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

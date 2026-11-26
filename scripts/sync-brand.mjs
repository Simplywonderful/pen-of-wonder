// Copies the shared brand files (fonts, favicon, touch icons, security headers) into an app's public
// folder, so every world serves them from the same paths and the brand keeps one copy in git. The
// copies are gitignored. Runs before each app's dev and build. Usage: node scripts/sync-brand.mjs <app>
// The headers' {API_ORIGIN} becomes pow-api's origin from packages/config/api.ts, so the security
// policy lets the forms reach it (they were blocked on 26 Nov 2026 when the address was only in api.ts).
import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const app = process.argv[2];
const target = new URL(`../apps/${app}/public/`, import.meta.url);
if (!app || !existsSync(new URL(`../apps/${app}/`, import.meta.url))) {
  console.error(`sync-brand: no app called "${app}" in apps/.`);
  process.exit(1);
}
cpSync(new URL("../packages/brand/public/", import.meta.url), target, { recursive: true });

const apiSource = readFileSync(new URL("../packages/config/api.ts", import.meta.url), "utf8");
const origin = apiSource.match(/^\s*origin:\s*"(https:\/\/[^"\s]+)"/m)?.[1] ?? null;
if (!origin && !/^\s*origin:\s*null/m.test(apiSource)) {
  console.error("sync-brand: couldn't read api.origin from packages/config/api.ts.");
  process.exit(1);
}
const headersFile = new URL("_headers", target);
const headers = readFileSync(headersFile, "utf8");
writeFileSync(headersFile, headers.replaceAll(origin ? "{API_ORIGIN}" : "{API_ORIGIN} ", origin ?? ""));

console.log(`sync-brand: brand files copied into apps/${app}/public${origin ? `, headers allow ${origin}` : ""}.`);

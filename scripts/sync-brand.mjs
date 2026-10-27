// Copies the shared brand files (fonts, favicon, touch icons) into an app's public folder, so every
// world serves them from the same paths and the brand keeps one copy in git. The copies are gitignored.
// Runs before each app's dev and build. Usage: node scripts/sync-brand.mjs <app>
import { cpSync, existsSync } from "node:fs";

const app = process.argv[2];
const target = new URL(`../apps/${app}/public/`, import.meta.url);
if (!app || !existsSync(new URL(`../apps/${app}/`, import.meta.url))) {
  console.error(`sync-brand: no app called "${app}" in apps/.`);
  process.exit(1);
}
cpSync(new URL("../packages/brand/public/", import.meta.url), target, { recursive: true });
console.log(`sync-brand: brand files copied into apps/${app}/public.`);

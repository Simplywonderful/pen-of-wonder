// Starts every app's dev server at once, each on its own port from packages/config/worlds.ts,
// so links between worlds work locally. Ctrl+C stops them all.
// Usage: npm run dev   (or node scripts/dev-all.mjs [app ...] for some of them)
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { worlds } from "../packages/config/worlds.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const requested = process.argv.slice(2);
const apps = worlds.filter((w) => (requested.length ? requested.includes(w.id) : true) && existsSync(`${root}apps/${w.id}/package.json`));

const children = apps.map((w) => {
  const child = spawn("npm", ["run", "dev", "-w", `apps/${w.id}`, "--", "--port", String(w.port)], { cwd: root, shell: true });
  const prefix = `[${w.id}]`.padEnd(13);
  const relay = (stream) => (chunk) =>
    chunk
      .toString()
      .split(/\r?\n/)
      .filter(Boolean)
      .forEach((line) => stream.write(`${prefix}${line}\n`));
  child.stdout.on("data", relay(process.stdout));
  child.stderr.on("data", relay(process.stderr));
  return child;
});

console.log(`Starting ${apps.map((w) => `${w.id} on http://localhost:${w.port}`).join(", ")}`);
process.on("SIGINT", () => {
  children.forEach((c) => c.kill());
  process.exit(0);
});

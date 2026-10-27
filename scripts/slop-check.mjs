// Runs the handcrafted-frontend skill's scanner over every app and the shared packages.
// Fails on any HIGH finding; WARNs are fixed or recorded in DESIGN.md section 9.
// Usage: node scripts/slop-check.mjs
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const scanner = join(root, ".claude/skills/handcrafted-frontend/scripts/slop-check.mjs");
const targets = [
  ...readdirSync(join(root, "apps")).filter((a) => existsSync(join(root, "apps", a, "src"))).map((a) => join("apps", a, "src")),
  "packages",
];

let failed = false;
for (const target of targets) {
  const run = spawnSync(process.execPath, [scanner, join(root, target), "--strict"], { encoding: "utf8" });
  process.stdout.write(`\n== ${target}\n${run.stdout}${run.stderr}`);
  if (run.status !== 0) failed = true;
}
process.exit(failed ? 1 : 0);

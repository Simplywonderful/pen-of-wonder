// Builds worlds on this machine and copies each build into _deploy/<cloudflare-project>/, ready to
// drag into Cloudflare's "Upload assets" screen. These are local builds, so every check runs in full,
// including the evidence files in _source/proof/. A world that fails a check is left out and listed.
// Usage: node scripts/prepare-upload.mjs [world ...]   (no world = main, marketing, writing, publishing, dev)
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { world } from "../packages/config/worlds.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const requested = process.argv.slice(2);
const ids = requested.length ? requested : ["main", "marketing", "writing", "publishing", "dev"];

const countFiles = (dir) =>
  readdirSync(dir).reduce((n, name) => {
    const p = join(dir, name);
    return n + (statSync(p).isDirectory() ? countFiles(p) : 1);
  }, 0);

const ready = [];
const failed = [];
for (const id of ids) {
  // The Cloudflare project name is the first part of the world's interim address.
  const project = world(id).interimHost.split(".")[0];
  process.stdout.write(`Building ${id} for ${project}... `);
  const run = spawnSync(`npm run build -w apps/${id}`, { cwd: root, shell: true, encoding: "utf8", env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" } });
  if (run.status !== 0) {
    const reason = `${run.stdout}${run.stderr}`.split("\n").filter((l) => /problem|missing|error|fail/i.test(l)).slice(0, 4).join("\n    ");
    console.log("failed");
    failed.push(`${id}:\n    ${reason}`);
    continue;
  }
  const dist = join(root, "apps", id, "dist");
  const out = join(root, "_deploy", project);
  if (existsSync(out)) rmSync(out, { recursive: true });
  cpSync(dist, out, { recursive: true });
  const files = countFiles(out);
  console.log(`done, ${files} files`);
  ready.push(`${project.padEnd(24)} _deploy/${project}  (${files} files, upload as project "${project}")`);
}

console.log(ready.length ? `\nReady to upload:\n  ${ready.join("\n  ")}` : "\nNothing ready.");
if (failed.length) {
  console.log(`\nNot built:\n  ${failed.join("\n  ")}`);
  process.exit(1);
}

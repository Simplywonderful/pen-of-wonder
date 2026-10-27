// Checks every link and asset reference in each built app (apps/<id>/dist). Internal links must
// resolve to a built file or a _redirects rule, and same-page #anchors to an id. Links to another
// world are checked against that world's build when it exists, and listed as unchecked when not.
// Usage: node scripts/link-check.mjs [app ...]   (run after building)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { worlds, worldOrigin } from "../packages/config/worlds.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = (id) => join(root, "apps", id, "dist");
const requested = process.argv.slice(2);
const built = worlds.map((w) => w.id).filter((id) => existsSync(dist(id)));
const apps = requested.length ? requested : built;

if (!apps.length) {
  console.error("link-check: nothing built yet. Run a build first.");
  process.exit(1);
}

const htmlFiles = (dir) => {
  const out = [];
  (function walk(d) {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name.endsWith(".html")) out.push(p);
    }
  })(dir);
  return out;
};

const redirectSources = (id) => {
  const file = join(dist(id), "_redirects");
  return existsSync(file)
    ? readFileSync(file, "utf8").split("\n").map((l) => l.trim().split(/\s+/)[0]).filter(Boolean)
    : [];
};

// build.format "file": /about is about.html; / is index.html; assets are served as they are.
function resolves(id, pathname) {
  const base = dist(id);
  const clean = decodeURIComponent(pathname).replace(/\/$/, "") || "/";
  if (redirectSources(id).includes(clean)) return true;
  const candidates = clean === "/" ? ["index.html"] : [clean, `${clean}.html`, join(clean, "index.html")];
  return candidates.some((c) => existsSync(join(base, c)) && statSync(join(base, c)).isFile());
}

const origins = worlds.flatMap((w) => [
  [worldOrigin(w.id, "production"), w.id],
  [worldOrigin(w.id, "local"), w.id],
]);

const broken = [];
const unchecked = new Set();
let checked = 0;

for (const id of apps) {
  for (const file of htmlFiles(dist(id))) {
    const html = readFileSync(file, "utf8");
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g), ...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) =>
      m[0].includes("srcset") ? m[1].split(",").map((s) => s.trim().split(/\s+/)[0]) : [m[1]],
    );
    const page = relative(dist(id), file);
    for (const ref of refs) {
      if (/^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
      checked++;
      if (ref.startsWith("#")) {
        if (ref.length > 1 && !ids.has(ref.slice(1))) broken.push(`${id}/${page}: missing anchor ${ref}`);
        continue;
      }
      if (/^https?:/.test(ref)) {
        const match = origins.find(([origin]) => ref === origin || ref.startsWith(`${origin}/`));
        if (!match) continue;
        const target = match[1];
        const url = new URL(ref);
        if (existsSync(dist(target))) {
          if (!resolves(target, url.pathname)) broken.push(`${id}/${page}: ${ref} (not in ${target}'s build)`);
        } else unchecked.add(`${target}${url.pathname}`);
        continue;
      }
      const url = new URL(ref, `http://x/${page.replace(/\\/g, "/")}`);
      if (!resolves(id, url.pathname)) broken.push(`${id}/${page}: ${ref}`);
    }
  }
}

if (unchecked.size) {
  console.log(`link-check: ${unchecked.size} link(s) to worlds not built yet, unchecked:\n  ${[...unchecked].sort().join("\n  ")}`);
}
if (broken.length) {
  console.error(`link-check: ${broken.length} broken link(s)\n  ${[...new Set(broken)].join("\n  ")}`);
  process.exit(1);
}
console.log(`link-check: ${checked} references in ${apps.join(", ")} resolve.`);

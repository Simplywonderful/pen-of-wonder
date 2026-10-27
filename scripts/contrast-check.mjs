// Checks WCAG 2.x contrast for every text, UI and accent pair, for every world, in light and dark.
// Token values are read from packages/brand/tokens.css and each app's src/styles/global.css, with
// var() chains resolved the way the browser would, so this always tests what ships.
// Usage: node scripts/contrast-check.mjs   (exits 1 if any pair fails)
import { existsSync, readFileSync } from "node:fs";
import { worlds } from "../packages/config/worlds.ts";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

// Innermost blocks only: "selector { declarations }". Blocks inside @media keep their own selector.
function blocks(css) {
  const out = [];
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const decls = Object.fromEntries([...m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2].trim()]));
    if (Object.keys(decls).length) out.push({ selector: m[1].trim().split("\n").pop().trim(), decls });
  }
  return out;
}

// Which blocks apply, in cascade order, for a world in a mode. Dark mode is read from the
// [data-theme="dark"] rules, which the stylesheet keeps identical to the prefers-color-scheme ones.
function resolve(cssFiles, world, mode) {
  const all = cssFiles.flatMap(blocks);
  const vars = {};
  const apply = (test) => all.filter((b) => test(b.selector)).forEach((b) => Object.assign(vars, b.decls));
  apply((s) => s === ":root" || s === "@theme");
  apply((s) => s === `:root[data-world="${world}"]`);
  if (mode === "dark") {
    apply((s) => s === `:root[data-theme="dark"]`);
    apply((s) => s === `:root[data-theme="dark"][data-world="${world}"]`);
  }
  const value = (name, depth = 0) => {
    const v = vars[name];
    if (!v || depth > 10) return undefined;
    const ref = v.match(/^var\((--[\w-]+)\)$/);
    return ref ? value(ref[1], depth + 1) : v;
  };
  return (token) => value(`--color-${token}`);
}

function oklchToLinear(str) {
  const [L, C, H] = str.match(/[\d.]+/g).map(Number);
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  // Clamp to the sRGB gamut the way a browser would display it.
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.min(1, Math.max(0, v)));
}
const luminance = (str) => {
  const [r, g, b] = oklchToLinear(str);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (fg, bg) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum ratio, what it is]
const family = [
  ["text", "bg", 4.5, "body text"],
  ["text", "panel", 4.5, "text on panels"],
  ["heading", "bg", 4.5, "headings"],
  ["muted", "bg", 4.5, "secondary text, dates, captions"],
  ["muted", "panel", 4.5, "secondary text on panels"],
  ["accent", "bg", 4.5, "links on hover, labels"],
  ["accent", "bg", 3, "focus ring"],
  ["on-accent", "accent", 4.5, "selected text"],
  ["gold", "bg", 3, "gold marks (graphics and large text only)"],
  ["rule-strong", "bg", 3, "form field borders"],
  ["on-world-accent", "world-accent", 4.5, "button label on the world accent"],
  ["world-accent", "bg", 3, "world accent as a UI colour (buttons, hero band)"],
  ["world-accent", "panel", 3, "world accent on panels"],
  ["world-rule", "bg", 3, "rule under the logo, current menu item"],
  ["world-rule", "panel", 3, "current menu item inside a panel"],
];
const researchOnly = [
  ["accent", "panel", 4.5, "comment labels inside balloons"],
  ["mark-del", "bg", 4.5, "tracked-change marks (del/ins)"],
  ["mark-del", "comment-bg", 4.5, "tracked-change marks beside comments"],
];

let failed = 0;
const rows = [];
for (const w of worlds) {
  const own = `apps/${w.id}/src/styles/global.css`;
  const files = [read("packages/brand/tokens.css"), ...(existsSync(new URL(`../${own}`, import.meta.url)) ? [read(own)] : [])];
  const pairs = w.id === "research" ? [...family, ...researchOnly] : family;
  for (const mode of ["light", "dark"]) {
    const t = resolve(files, w.id, mode);
    for (const [fg, bg, min, use] of pairs) {
      const [f, b] = [t(fg), t(bg)];
      if (!f || !b) {
        failed++;
        rows.push(`${w.id.padEnd(10)} ${mode.padEnd(5)}  ${`${fg} on ${bg}`.padEnd(34)} MISSING TOKEN`);
        continue;
      }
      const r = ratio(f, b);
      if (r < min) failed++;
      rows.push(`${w.id.padEnd(10)} ${mode.padEnd(5)}  ${`${fg} on ${bg}`.padEnd(34)} ${r.toFixed(2).padStart(5)}:1  needs ${min}  ${r >= min ? "pass" : "FAIL"}  ${use}`);
    }
  }
  if (w.id === "research") {
    // The photo mount stays paper-coloured in both modes, so its pair is fixed.
    const t = resolve(files, "research", "light");
    const r = ratio(t("mount-ink"), t("mount"));
    if (r < 4.5) failed++;
    rows.push(`research   both   ${"mount-ink on mount".padEnd(34)} ${r.toFixed(2).padStart(5)}:1  needs 4.5  ${r >= 4.5 ? "pass" : "FAIL"}  photo mount (fixed paper in both modes)`);
  }
}

console.log(rows.join("\n"));
console.log(failed ? `\n${failed} pair(s) fail.` : `\nAll pairs pass across ${worlds.length} worlds.`);
process.exit(failed ? 1 : 0);

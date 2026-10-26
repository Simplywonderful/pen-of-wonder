#!/usr/bin/env node
// slop-check: scans a web project for the design, copy, and code patterns that
// make sites read as AI-generated. Zero dependencies, Node 18+.
//
// Usage:
//   node slop-check.mjs [projectDir] [--json] [--strict] [--max=8]
//
// --strict exits with code 1 when any HIGH finding exists (handy in CI).
// A finding is a prompt to decide, not a verdict. Keep anything intentional
// and record the reason in DESIGN.md under "Intentional exceptions".

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";

const args = process.argv.slice(2);
const root = args.find((a) => !a.startsWith("--")) ?? ".";
const asJson = args.includes("--json");
const strict = args.includes("--strict");
const maxShown = Number((args.find((a) => a.startsWith("--max=")) ?? "--max=8").split("=")[1]);

const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", "dist", "build", "out", ".vercel", ".claude",
  ".agents", ".cursor", ".github", "coverage", ".turbo", ".cache", ".svelte-kit", ".astro",
]);
// Docs that legitimately name the patterns (briefs, agent rules) would only produce noise.
const SKIP_FILES = new Set([
  "DESIGN.md", "README.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md", "SKILL.md", "CHANGELOG.md",
  "package.json", "package-lock.json", "tsconfig.json", "pnpm-lock.yaml", "yarn.lock",
]);
const CODE_EXT = new Set([".html", ".htm", ".css", ".scss", ".sass", ".less", ".js", ".mjs", ".jsx", ".ts", ".tsx", ".vue", ".svelte", ".astro"]);
const TEXT_EXT = new Set([".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".md", ".mdx", ".json", ".yml", ".yaml", ".txt"]);
const MAX_BYTES = 1_000_000;

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(p, out);
    } else if (e.isFile()) {
      const ext = extname(e.name).toLowerCase();
      if (SKIP_FILES.has(e.name)) continue;
      if (CODE_EXT.has(ext) || TEXT_EXT.has(ext)) out.push(p);
    }
  }
  return out;
}

const findings = [];
function add(severity, rule, message, file, line, snippet) {
  findings.push({ severity, rule, message, file: relative(root, file) || basename(file), line, snippet: (snippet ?? "").trim().slice(0, 140) });
}

// ---------- rules ----------

const OVERUSED_FONTS = [
  "Inter", "Roboto", "Open Sans", "Lato", "Poppins", "Montserrat", "Arial",
  "Space Grotesk", "Instrument Serif", "Instrument Sans", "Playfair Display", "DM Sans",
  "Plus Jakarta Sans", "Outfit", "Geist", "Manrope", "Satoshi", "General Sans", "Clash Display", "Cormorant",
];
const FONT_CONTEXT = /font-family|fontFamily|fonts\.googleapis|fonts\.bunny|fontshare|next\/font|--font|@font-face|family=/i;
const fontRegexes = OVERUSED_FONTS.map((name) => ({
  name,
  re: new RegExp(`(^|[^A-Za-z])${name.replace(/ /g, "[ _+]")}(?![A-Za-z])`),
}));

const PURPLE_CLASS = /\b(?:bg|text|from|via|to|border|ring|shadow|fill|stroke|outline|decoration|accent|caret|divide)-(?:indigo|violet|purple|fuchsia)-\d{2,3}\b/;
const PURPLE_HEX = /#(?:6366f1|4f46e5|4338ca|818cf8|8b5cf6|7c3aed|6d28d9|a78bfa|a855f7|9333ea|c084fc|d946ef)\b/i;
const GRADIENT = /bg-gradient-to-|bg-linear-to-|bg-linear-\d|bg-radial|bg-conic|linear-gradient\(|radial-gradient\(|conic-gradient\(/;
const GRADIENT_TEXT = /bg-clip-text|background-clip:\s*text/;
const GLASS = /backdrop-blur|backdrop-filter:\s*blur/;
const GLOW = /shadow-(?:indigo|violet|purple|fuchsia|blue|cyan|sky|pink)-\d{3}|drop-shadow-\[0_0_|box-shadow:\s*0\s+0\s+\d{2,}px/;
const STRIPE = /\bborder-[lt]-(?:[2-9]|\[)|border-(?:left|top)\s*:\s*(?:[3-9]|\d{2,})px\s+solid|border-(?:left|top)-width\s*:\s*(?:[3-9]|\d{2,})px|border(?:Left|Top)\s*:\s*["'`]\s*(?:[3-9]|\d{2,})px/;
const HOVER_LIFT_TW = /(?:group-)?hover:-translate-y/;
const TRANSITION_ALL = /\btransition-all\b|transition:\s*all\b/;
const ROUNDED_BIG = /\brounded-(?:2xl|3xl)\b/g;
const STOCK_NEUTRAL = /\b(?:bg|text|border)-(?:slate|zinc|gray|neutral|stone)-\d{2,3}\b/g;
// Tailwind's slate and gray hex values, often pasted in by hand as "custom" tokens.
const STOCK_NEUTRAL_HEX = /#(?:f8fafc|f1f5f9|e2e8f0|cbd5e1|94a3b8|64748b|475569|334155|1e293b|0f172a|f9fafb|f3f4f6|e5e7eb|d1d5db|9ca3af|6b7280|4b5563|374151|1f2937|111827)\b/gi;
const INLINE_STYLE = /style=\{\{/g;
const EYEBROW = /\buppercase\b[^"'`]*\btracking-(?:wide|wider|widest)\b|\btracking-(?:wide|wider|widest)\b[^"'`]*\buppercase\b/g;
const WHILE_IN_VIEW = /whileInView/g;
const DIV_ONCLICK = /<(?:div|span)\b[^>]*\sonClick=/;
const CONSOLE = /\bconsole\.(?:log|debug)\(/;
const FINGERPRINT = /<meta\s+name=["']generator["']|lovable\.(?:dev|app)|v0\.dev|bolt\.new|gptengineer|made with (?:v0|lovable|bolt)/i;
const SECTION_NAMES = "hero|features?|testimonials?|pricing|cta|call to action|footer|header|about(?: us)?|contact|services|faq|navbar|nav|stats|benefits";
const PREFIX = "(?:[A-Z0-9]{1,2}[.):]\\s*)?";
const SECTION_COMMENT = new RegExp(
  `<!--\\s*${PREFIX}(?:${SECTION_NAMES})(?:\\s+section)?\\b[^>]*-->|\\{\\s*/\\*\\s*${PREFIX}(?:${SECTION_NAMES})(?:\\s+section)?\\b[^*]*\\*/\\s*\\}|//\\s*${PREFIX}(?:${SECTION_NAMES})\\s+section\\b`,
  "i",
);

// Signature-effect libraries, grouped into families (see references/immersive-effects.md).
const EFFECT_FAMILIES = [
  ["3d", /from\s+["'](?:three|@react-three\/fiber|@react-three\/drei)["']|import\(\s*["'](?:three|@react-three\/fiber)["']/],
  ["shader-gradient", /@shadergradient\/react|@paper-design\/shaders|MeshGradient|ShaderGradient\b/],
  ["glass", /html2canvas|liquid-glass/],
  ["raw-webgl", /getContext\(\s*["']webgl2?["']/],
  ["scroll-scrub", /mountScrollWorld|ScrollScrubVideo|from\s+["'](?:lenis|gsap\/ScrollTrigger)["']|ScrollTrigger/],
];
const REDUCED_MOTION = /prefers-reduced-motion|useReducedMotion|useEffectGate|EffectFrame/;
const LAZY_LOAD = /\bdynamic\(\s*\(\)\s*=>\s*import\(|\blazy\(\s*\(\)\s*=>\s*import\(/;
const REMOTE_ENV = /<Environment\b[^>]*\bpreset=|lightType=["']env["']|envPreset=/;
const ROOT_DYNAMIC_IMPORT = /import\(\s*["']@paper-design\/shaders-react["']\s*\)\.then|import\(\s*["']@react-three\/drei["']\s*\)\.then/;
const CDN_SCRIPT = /<script\b[^>]*\bsrc=["']https?:\/\/(?![^"']*(?:googletagmanager|vercel))[^>]*>/i;

const SLOP_WORDS = new RegExp(
  "\\b(?:" + [
    "elevate[sd]?", "elevating", "seamless(?:ly)?", "unlock(?:s|ing)?", "empower(?:s|ing|ment)?",
    "effortless(?:ly)?", "supercharg\\w*", "streamlin\\w*", "leverag\\w*", "harness(?:es|ing)?",
    "unleash\\w*", "cutting[- ]edge", "state[- ]of[- ]the[- ]art", "world[- ]class", "game[- ]chang\\w*",
    "next[- ]level", "revolutioni[sz]\\w*", "delv(?:e|es|ing)", "unparalleled", "nestled", "testament to",
    "tapestry", "look no further", "whether you(?:'|’)re", "in today(?:'|’)s (?:fast[- ]paced|digital)",
    "innovative solutions?", "tailored solutions?", "one[- ]stop[- ]shop", "take your \\w+ to the next",
  ].join("|") + ")\\b",
  "i",
);
const TRIAD = /\b[A-Z][a-z]{2,}\. [A-Z][a-z]{2,}\. [A-Z][a-z]{2,}\./;
const PLACEHOLDER = /lorem ipsum|\byour company\b|\[your |\bjohn doe\b|\bjane doe\b|\bacme(?: inc| corp)?\b|placeholder text|\binsert (?:text|image|here)\b/i;
const TODO_MARK = /\[TODO\b/i;
const EMOJI = /\p{Extended_Pictographic}/u;
const NOT_EMOJI = new Set(["©", "®", "™"]);
const EM_DASH = /\u2014/g;

const agg = { effects: new Map(), reducedMotion: false, lazyLoads: false, gradients: [], rounded: 0, neutrals: 0, neutralHex: 0, inlineStyles: 0, eyebrows: 0, whileInView: [], fonts: new Map(), emDash: new Map() };

function isTextFile(file) {
  const ext = extname(file).toLowerCase();
  // Markdown at the project root is usually notes for the team, not site copy.
  if ((ext === ".md" || ext === ".txt") && relative(root, file) === basename(file)) return false;
  if (ext === ".json" || ext === ".yml" || ext === ".yaml" || ext === ".txt") {
    return /(^|[\\/])(content|data|copy|locales|messages|i18n)[\\/]/i.test(file);
  }
  return TEXT_EXT.has(ext);
}

function scanFile(file) {
  let st;
  try { st = statSync(file); } catch { return; }
  if (st.size > MAX_BYTES) return;
  const src = readFileSync(file, "utf8");
  if (src.includes("\u0000")) return;
  const ext = extname(file).toLowerCase();
  const isCode = CODE_EXT.has(ext);
  const isText = isTextFile(file);
  const lines = src.split(/\r?\n/);
  let cssSelector = "";

  lines.forEach((line, i) => {
    const n = i + 1;

    if (isCode || ext === ".md" || ext === ".mdx") {
      if (FONT_CONTEXT.test(line)) {
        for (const { name, re } of fontRegexes) {
          if (re.test(line)) {
            if (!agg.fonts.has(name)) agg.fonts.set(name, { file, line: n, snippet: line });
          }
        }
      }
      const purple = PURPLE_CLASS.test(line) || PURPLE_HEX.test(line);
      if (purple && GRADIENT.test(line)) add("HIGH", "purple-gradient", "Purple/indigo/violet gradient, the single most recognised AI default.", file, n, line);
      else if (purple) add("WARN", "purple", "Purple/indigo/violet colour. Fine if it is genuinely the brand; otherwise it reads as the AI default.", file, n, line);
      if (GRADIENT_TEXT.test(line)) add("HIGH", "gradient-text", "Gradient text. Use a solid colour.", file, n, line);
      if (GRADIENT.test(line)) agg.gradients.push({ file, line: n, snippet: line });
      if (GLASS.test(line)) add("WARN", "glassmorphism", "Backdrop blur / glass panel.", file, n, line);
      if (GLOW.test(line)) add("WARN", "glow", "Coloured glow shadow.", file, n, line);
      if (STRIPE.test(line)) add("WARN", "stripe-border", "Thick coloured left/top border on a card or callout, a very common AI tell.", file, n, line);
      if (HOVER_LIFT_TW.test(line)) add("WARN", "hover-lift", "Hover lift (translate up). Fine on one special element, a tell on every card.", file, n, line);

      // Plain CSS: remember the current selector so multi-line :hover blocks are caught.
      if (ext === ".css" || ext === ".scss" || ext === ".less" || ext === ".sass") {
        const open = line.indexOf("{");
        if (open !== -1) cssSelector = line.slice(0, open);
        if (/:hover/.test(cssSelector) && /translateY\(\s*-/.test(line)) add("WARN", "hover-lift", "Hover lift (translate up). Fine on one special element, a tell on every card.", file, n, line.includes("{") ? line : `${cssSelector.trim()} { ${line.trim()} }`);
        if (line.includes("}")) cssSelector = "";
      }

      if (TRANSITION_ALL.test(line)) add("INFO", "transition-all", "transition-all. Transition only the properties that change.", file, n, line);
      agg.rounded += (line.match(ROUNDED_BIG) ?? []).length;
      agg.neutrals += (line.match(STOCK_NEUTRAL) ?? []).length;
      agg.neutralHex += (line.match(STOCK_NEUTRAL_HEX) ?? []).length;
      agg.inlineStyles += (line.match(INLINE_STYLE) ?? []).length;
      agg.eyebrows += (line.match(EYEBROW) ?? []).length;
      if (WHILE_IN_VIEW.test(line)) agg.whileInView.push({ file, line: n, snippet: line });
      WHILE_IN_VIEW.lastIndex = 0;
      if (DIV_ONCLICK.test(line)) add("WARN", "div-onclick", "Click handler on a div/span. Use <button> or <a>.", file, n, line);
      if (CONSOLE.test(line) && ext !== ".css") add("INFO", "console-log", "Leftover console.log.", file, n, line);
      if (SECTION_COMMENT.test(line)) add("INFO", "section-comment", "Section-label comment (e.g. <!-- Hero -->). Let semantic markup speak.", file, n, line);
      // EffectFrame only probes for WebGL support; it is not an effect itself.
      if (basename(file) !== "EffectFrame.tsx") for (const [family, re] of EFFECT_FAMILIES) {
        if (re.test(line) && !agg.effects.has(family)) agg.effects.set(family, { file, line: n, snippet: line });
      }
      if (REDUCED_MOTION.test(line)) agg.reducedMotion = true;
      if (LAZY_LOAD.test(line)) agg.lazyLoads = true;
      if (REMOTE_ENV.test(line) && !/envBasePath/.test(line)) add("WARN", "remote-effect-assets", "Effect lighting loads HDR files from a third-party host at runtime. Self-host them (drei: files=, ShaderGradient: lightType=\"3d\" or envBasePath).", file, n, line);
      if (ROOT_DYNAMIC_IMPORT.test(line)) add("WARN", "untreeshaken-effect", "Dynamic import of a whole effect package. Re-export the one component from a local file and import that (Paper: ~80 KB down to ~8 KB gzip).", file, n, line);
      if (/html2canvas/.test(line)) add("WARN", "html2canvas-glass", "html2canvas page snapshots: stale refraction, CORS SecurityErrors, slow on long pages. Use the CSS glass recipe.", file, n, line);
      if (CDN_SCRIPT.test(line) && !/integrity=/.test(line)) add("WARN", "cdn-script-no-sri", "Third-party <script> without an integrity hash. Self-host it or add SRI.", file, n, line);
      if (FINGERPRINT.test(line)) add("WARN", "builder-fingerprint", "Site-builder fingerprint left in the source.", file, n, line);
    }

    if (isText) {
      const isComment = /^\s*(?:\/\/|\/\*|\*|\{\s*\/\*)/.test(line);
      if (!isComment && SLOP_WORDS.test(line)) {
        const w = line.match(SLOP_WORDS)[0];
        add("WARN", "slop-word", "Stock marketing word. Say the specific thing instead.", file, n, `"${w}"  ${line.trim()}`);
      }
      if (TRIAD.test(line)) add("INFO", "triad", 'Three-word triad ("Fast. Simple. Secure."). Replace with one specific claim.', file, n, line);
      if (PLACEHOLDER.test(line)) add("HIGH", "placeholder", "Placeholder or dummy content.", file, n, line);
      if (TODO_MARK.test(line)) add("INFO", "todo", "TODO placeholder for the owner to fill before launch.", file, n, line);
      const emojis = [...line].filter((ch) => EMOJI.test(ch) && !NOT_EMOJI.has(ch));
      if (emojis.length) add("WARN", "emoji", "Emoji in UI or copy. Use a real icon set or words.", file, n, `${emojis.join(" ")}  ${line.trim()}`);
    }

    const dashes = (line.match(EM_DASH) ?? []).length;
    if (dashes) {
      const prev = agg.emDash.get(file) ?? { count: 0, line: n, snippet: line };
      prev.count += dashes;
      agg.emDash.set(file, prev);
    }
  });

  // Whole-file checks
  if (/\.(?:html?|jsx|tsx|vue|svelte|astro)$/.test(file)) {
    const h1s = src.match(/<h1[\s>]/g) ?? [];
    if (h1s.length > 1) add("WARN", "multiple-h1", "More than one <h1> in a file. One per page.", file, 1, `${h1s.length} <h1> elements`);
    const imgRe = /<(img|Image)\b([\s\S]*?)\/?>/g;
    let m;
    while ((m = imgRe.exec(src))) {
      // A bare "<img>" with no attributes is prose in a comment, not markup.
      if (m[2].trim() && !/\balt\s*=/.test(m[2])) {
        const ln = src.slice(0, m.index).split(/\r?\n/).length;
        add("WARN", "img-no-alt", "Image without alt attribute.", file, ln, m[0].replace(/\s+/g, " "));
      }
    }
  }
}

// ---------- run ----------

if (!existsSync(root)) {
  console.error(`slop-check: folder not found: ${root}`);
  process.exit(2);
}
const files = walk(root);
files.forEach(scanFile);

for (const [name, hit] of agg.fonts) {
  add("WARN", "overused-font", "Over-used font. Keep only with a written reason in DESIGN.md.", hit.file, hit.line, `"${name}"  ${hit.snippet.trim()}`);
}
if (agg.gradients.length > 5) {
  const g = agg.gradients[0];
  add("WARN", "many-gradients", `${agg.gradients.length} gradients across the project. Gradients should be the exception.`, g.file, g.line, g.snippet);
} else {
  agg.gradients.forEach((g) => add("INFO", "gradient", "Gradient. Check it depicts something rather than decorating.", g.file, g.line, g.snippet));
}
if (agg.whileInView.length > 4) {
  const w = agg.whileInView[0];
  add("WARN", "scroll-fade-everywhere", `${agg.whileInView.length} whileInView animations. Scroll reveals on every section are a tell.`, w.file, w.line, w.snippet);
}
if (agg.rounded > 10) add("INFO", "rounded-everywhere", `${agg.rounded} uses of rounded-2xl/3xl. Is there a radius policy, or is it the default?`, root, 0, "");
if (agg.neutrals > 15) add("INFO", "stock-neutrals", `${agg.neutrals} uses of Tailwind stock greys (slate/zinc/gray...). Consider tinted neutrals in @theme.`, root, 0, "");
if (agg.effects.size) {
  for (const [family, hit] of agg.effects) {
    add("INFO", "effect-in-use", "Signature-effect library in use. It must be the one effect named in DESIGN.md, with a poster fallback.", hit.file, hit.line, `${family}  ${hit.snippet.trim()}`);
  }
  if (agg.effects.size > 1) add("WARN", "too-many-effects", `${agg.effects.size} effect families (${[...agg.effects.keys()].join(", ")}). Pick one signature effect per site.`, root, 0, "");
  if (!agg.reducedMotion) add("HIGH", "effect-no-reduced-motion", "Effects are used but nothing handles prefers-reduced-motion. Wrap them in EffectFrame or gate them yourself.", root, 0, "");
  if ((agg.effects.has("3d") || agg.effects.has("shader-gradient")) && !agg.lazyLoads) add("WARN", "effect-not-lazy", "WebGL effect code with no dynamic()/lazy() import anywhere. three.js is probably in the first page load (~250 KB gzip).", root, 0, "");
}
if (agg.neutralHex > 5) add("WARN", "stock-neutral-hex", `${agg.neutralHex} Tailwind slate/gray hex values typed in by hand. Renaming the stock palette is not a custom palette.`, root, 0, "");
if (agg.inlineStyles > 30) add("WARN", "inline-styles", `${agg.inlineStyles} inline style={{...}} blocks. Mixing inline styles with classes is a strong generated-code tell; move them to tokens and classes.`, root, 0, "");
if (agg.eyebrows > 5) add("INFO", "eyebrows", `${agg.eyebrows} uppercase tracked labels. Eyebrows above every heading are a template habit.`, root, 0, "");
for (const [file, d] of agg.emDash) {
  const sev = isTextFile(file) && d.count >= 3 ? "WARN" : "INFO";
  add(sev, "em-dash", "Em dashes. Heavy use is a strong AI writing tell; use full stops, commas, or colons.", file, d.line, `${d.count}x, first:  ${d.snippet.trim()}`);
}
for (const boiler of ["public/next.svg", "public/vercel.svg", "public/file.svg", "public/globe.svg", "public/window.svg", "src/assets/react.svg", "public/vite.svg"]) {
  if (existsSync(join(root, boiler))) add("INFO", "boilerplate-asset", "Starter boilerplate file still present. Delete it or replace it.", join(root, boiler), 0, "");
}

const order = { HIGH: 0, WARN: 1, INFO: 2 };
findings.sort((a, b) => order[a.severity] - order[b.severity] || a.rule.localeCompare(b.rule) || a.file.localeCompare(b.file) || a.line - b.line);

if (asJson) {
  console.log(JSON.stringify({ root, filesScanned: files.length, findings }, null, 2));
} else {
  const counts = { HIGH: 0, WARN: 0, INFO: 0 };
  findings.forEach((f) => counts[f.severity]++);
  console.log(`slop-check: scanned ${files.length} files in ${root}`);
  console.log(`HIGH ${counts.HIGH}   WARN ${counts.WARN}   INFO ${counts.INFO}\n`);
  for (const sev of ["HIGH", "WARN", "INFO"]) {
    const group = findings.filter((f) => f.severity === sev);
    if (!group.length) continue;
    console.log(`== ${sev} ==`);
    const byRule = new Map();
    group.forEach((f) => byRule.set(f.rule, [...(byRule.get(f.rule) ?? []), f]));
    for (const [rule, list] of byRule) {
      console.log(`[${rule}] ${list[0].message}${list.length > 1 ? `  (${list.length} hits)` : ""}`);
      list.slice(0, maxShown).forEach((f) => {
        const loc = f.line ? `${f.file}:${f.line}` : f.file;
        console.log(`   ${loc}${f.snippet ? "  " + f.snippet : ""}`);
      });
      if (list.length > maxShown) console.log(`   ... and ${list.length - maxShown} more`);
    }
    console.log("");
  }
  if (!findings.length) console.log("No tells found. Still look at the page with your own eyes.");
  else console.log("Fix every HIGH. For each WARN, fix it or record why it is intentional in DESIGN.md.");
}

process.exit(strict && findings.some((f) => f.severity === "HIGH") ? 1 : 0);

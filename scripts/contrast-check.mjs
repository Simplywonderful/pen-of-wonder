// Checks WCAG 2.x contrast for every text/background pair the site uses, in both modes.
// The token values here must match src/styles/global.css; Phase 1 will read them from there.
// Usage: node scripts/contrast-check.mjs   (exits 1 if any pair fails)

const modes = {
  light: {
    paper: "oklch(0.975 0.008 85)",
    panel: "oklch(0.945 0.012 82)",
    ink: "oklch(0.24 0.015 60)",
    muted: "oklch(0.47 0.016 62)",
    accent: "oklch(0.53 0.19 27)",
    onAccent: "oklch(0.975 0.008 85)",
    ruleStrong: "oklch(0.58 0.014 65)",
  },
  dark: {
    paper: "oklch(0.215 0.012 60)",
    panel: "oklch(0.26 0.014 62)",
    ink: "oklch(0.92 0.022 85)",
    muted: "oklch(0.75 0.02 80)",
    accent: "oklch(0.72 0.15 32)",
    onAccent: "oklch(0.215 0.012 60)",
    ruleStrong: "oklch(0.55 0.016 70)",
  },
};

// The photo mount stays paper-coloured in both modes, so its caption pair is fixed.
const mount = { paper: "oklch(0.975 0.008 85)", ink: "oklch(0.24 0.015 60)" };

// [foreground, background, minimum ratio, what it is]
const pairs = [
  ["ink", "paper", 4.5, "body text"],
  ["ink", "panel", 4.5, "text in comment balloons and the do/don't box"],
  ["muted", "paper", 4.5, "secondary text, dates, captions"],
  ["muted", "panel", 4.5, "secondary text inside panels"],
  ["accent", "paper", 4.5, "edit marks (del/ins), hovered links"],
  ["accent", "panel", 4.5, "edit marks inside comment panels"],
  ["onAccent", "accent", 4.5, "primary button label"],
  ["accent", "paper", 3, "focus ring"],
  ["ruleStrong", "paper", 3, "form field borders"],
];

function oklchToSrgb(str) {
  const [L, C, H] = str.match(/[\d.]+/g).map(Number);
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  // Clamp to the sRGB gamut the way a browser would display it.
  return lin.map((v) => Math.min(1, Math.max(0, v)));
}

function luminance(str) {
  const [r, g, b] = oklchToSrgb(str);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
const rows = [];
for (const [mode, t] of Object.entries(modes)) {
  for (const [fg, bg, min, use] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    rows.push(`${mode.padEnd(5)}  ${`${fg} on ${bg}`.padEnd(22)} ${r.toFixed(2).padStart(5)}:1  needs ${min}  ${ok ? "pass" : "FAIL"}  ${use}`);
  }
}
const m = ratio(mount.ink, mount.paper);
if (m < 4.5) failed++;
rows.push(`both   ink on mount           ${m.toFixed(2).padStart(5)}:1  needs 4.5  ${m >= 4.5 ? "pass" : "FAIL"}  photo mount (fixed paper in both modes)`);

console.log(rows.join("\n"));
console.log(failed ? `\n${failed} pair(s) fail.` : "\nAll pairs pass.");
process.exit(failed ? 1 : 0);

// Checks the proposed world accents (Phase 0) against the family's grounds, in both modes.
// Each accent is a light/dark pair on one hue: no single colour can carry cream button text at 4.5:1
// and also reach 3:1 against Deep Ink, so dark mode lifts the lightness the way research swaps
// Ink Green for Spark Gold. It also prints how far each accent sits from the others (OKLab distance).
// Usage: node scripts/accent-check.mjs [--json]   (exits 1 if any pair fails)

const brand = {
  parchment: "oklch(0.946 0.009 113.2)",
  cream: "oklch(0.955 0.016 91.6)",
  deepInk: "oklch(0.25 0.015 166.3)",
  inkGreen: "oklch(0.347 0.055 180.5)",
  winGold: "oklch(0.587 0.114 72.6)",
  sparkGold: "oklch(0.742 0.12 79.1)",
  markupRed: "oklch(0.504 0.168 28.3)",
};

export const accents = [
  { id: "marketing", name: "Raspberry", light: "oklch(0.5 0.18 350)", dark: "oklch(0.72 0.15 352)" },
  { id: "writing", name: "Olive", light: "oklch(0.47 0.1 112)", dark: "oklch(0.78 0.11 112)" },
  { id: "research", name: "Sage", light: "oklch(0.5 0.065 170)", dark: "oklch(0.76 0.065 170)" },
  { id: "publishing", name: "Terracotta", light: "oklch(0.48 0.115 52)", dark: "oklch(0.75 0.105 56)" },
  { id: "dev", name: "Graphite", light: "oklch(0.43 0.01 80)", dark: "oklch(0.78 0.008 80)" },
];

function toLinear(str) {
  const [L, C, H] = str.match(/[\d.]+/g).map(Number);
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = (str) => toLinear(str).every((v) => v >= -0.001 && v <= 1.001);
const clamp = (v) => Math.min(1, Math.max(0, v));

function hex(str) {
  return (
    "#" +
    toLinear(str)
      .map(clamp)
      .map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055))
      .map((v) => Math.round(v * 255).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function luminance(str) {
  const [r, g, b] = toLinear(str).map(clamp);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function oklab(str) {
  const [L, C, H] = str.match(/[\d.]+/g).map(Number);
  return [L, C * Math.cos((H * Math.PI) / 180), C * Math.sin((H * Math.PI) / 180)];
}
const distance = (x, y) => Math.hypot(...oklab(x).map((v, i) => v - oklab(y)[i]));

// [mode, foreground, background, minimum, what it is]
const checks = (a) => [
  ["light", brand.cream, a.light, 4.5, "button label (Cream) on accent"],
  ["light", a.light, brand.parchment, 3, "accent as UI colour on Parchment"],
  ["light", a.light, brand.cream, 3, "accent as UI colour on Cream panels"],
  ["dark", brand.deepInk, a.dark, 4.5, "button label (Deep Ink) on accent"],
  ["dark", a.dark, brand.deepInk, 3, "accent as UI colour on Deep Ink"],
];

let failed = 0;
const report = [];
for (const a of accents) {
  const rows = checks(a).map(([mode, fg, bg, min, use]) => {
    const r = ratio(fg, bg);
    if (r < min) failed++;
    return { mode, use, ratio: Number(r.toFixed(2)), min, pass: r >= min };
  });
  for (const v of [a.light, a.dark]) if (!inGamut(v)) failed++;
  report.push({ ...a, lightHex: hex(a.light), darkHex: hex(a.dark), gamut: inGamut(a.light) && inGamut(a.dark), rows });
}

const others = { "Ink Green": brand.inkGreen, "Win Gold": brand.winGold, "Spark Gold": brand.sparkGold, "tracked-change red": brand.markupRed };
const nearest = accents.map((a) => {
  const list = [
    ...accents.filter((b) => b !== a).map((b) => [b.name, distance(a.light, b.light)]),
    ...Object.entries(others).map(([n, v]) => [n, distance(a.light, v)]),
  ].sort((x, y) => x[1] - y[1]);
  return { id: a.id, nearest: list.slice(0, 3).map(([n, d]) => `${n} ${d.toFixed(3)}`) };
});

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ report, nearest }, null, 2));
} else {
  for (const r of report) {
    console.log(`\n${r.name} (${r.id})  light ${r.light} ${r.lightHex}  dark ${r.dark} ${r.darkHex}${r.gamut ? "" : "  OUT OF sRGB GAMUT"}`);
    for (const row of r.rows) {
      console.log(`  ${row.mode.padEnd(5)} ${row.ratio.toFixed(2).padStart(5)}:1  needs ${row.min}  ${row.pass ? "pass" : "FAIL"}  ${row.use}`);
    }
  }
  console.log("\nNearest neighbours (OKLab distance, light values; under 0.08 reads as a near match):");
  for (const n of nearest) console.log(`  ${n.id.padEnd(10)} ${n.nearest.join(", ")}`);
  console.log(failed ? `\n${failed} check(s) fail.` : "\nAll accent checks pass.");
}
process.exit(failed ? 1 : 0);

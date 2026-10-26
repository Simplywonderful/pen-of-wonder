// Rasterises the Open Graph image drawn by make-brand-assets.py.
// Usage: node scripts/make-brand-assets.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const svg = readFileSync(new URL("./og.svg", import.meta.url));
const out = fileURLToPath(new URL("../public/og.png", import.meta.url));
await sharp(svg).png({ compressionLevel: 9 }).toFile(out);
console.log("Wrote public/og.png");

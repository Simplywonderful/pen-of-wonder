// Rasterises the Open Graph images drawn by make-og.py into each app's public/og.png.
// Usage: node scripts/make-og.mjs   (after python scripts/make-og.py)
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// sharp is installed with the apps, not at the root.
const require = createRequire(new URL("../apps/main/package.json", import.meta.url));
const sharp = require("sharp");

const dir = new URL("./og/", import.meta.url);
for (const file of readdirSync(dir).filter((f) => f.endsWith(".svg"))) {
  const world = file.replace(".svg", "");
  const out = fileURLToPath(new URL(`../apps/${world}/public/og.png`, import.meta.url));
  await sharp(readFileSync(new URL(file, dir))).png({ compressionLevel: 9 }).toFile(out);
  console.log(`Wrote apps/${world}/public/og.png`);
}

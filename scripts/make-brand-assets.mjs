// Rasterises the SVGs drawn by make-brand-assets.py into the PNG and ICO files browsers and
// social sites expect. Usage: node scripts/make-brand-assets.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const pub = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));

await sharp(readFileSync(new URL("./og.svg", import.meta.url))).png({ compressionLevel: 9 }).toFile(pub("og.png"));

const favicon = readFileSync(pub("favicon.svg"));
await sharp(favicon, { density: 600 }).resize(180, 180).png().toFile(pub("apple-touch-icon.png"));

// A one-image ICO holding a 32 x 32 PNG, which every current browser accepts.
const png32 = await sharp(favicon, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(pub("favicon.ico"), Buffer.concat([header, png32]));

console.log("Wrote og.png, apple-touch-icon.png and favicon.ico");

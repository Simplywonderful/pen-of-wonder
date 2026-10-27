// Full-page screenshots of a running site, at several widths, in light and dark.
// Drives headless Chrome over the DevTools protocol with Node's built-in WebSocket, so it needs
// no dependencies. Emulates prefers-color-scheme rather than setting the theme, so it shows what
// a visitor with that system setting sees.
// Usage: node scripts/screenshot.mjs <base-url> <out-dir> <path> [<path> ...] [--widths=360,1440] [--label=before]
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("=")));
const [base, outDir, ...paths] = args.filter((a) => !a.startsWith("--"));
if (!base || !outDir || !paths.length) {
  console.error("Usage: node scripts/screenshot.mjs <base-url> <out-dir> <path> [...] [--widths=360,1440] [--label=name]");
  process.exit(1);
}
const widths = (flags.widths ?? "360,1440").split(",").map(Number);
const label = flags.label ? `${flags.label}-` : "";
const modes = ["light", "dark"];

const browsers = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];
const browser = process.env.CHROME_PATH ?? browsers.find((b) => existsSync(b));
if (!browser) {
  console.error("No Chrome or Edge found. Set CHROME_PATH.");
  process.exit(1);
}

const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), "pow-shot-"));
const chrome = spawn(browser, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--hide-scrollbars",
  "--no-first-run",
  "about:blank",
]);

async function endpoint() {
  for (let i = 0; i < 150; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Chrome did not start.");
}

const ws = new WebSocket(await endpoint());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const waiters = [];
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) {
    for (const w of waiters.filter((w) => w.method === msg.method)) {
      waiters.splice(waiters.indexOf(w), 1);
      w.resolve(msg.params);
    }
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method) => new Promise((resolve) => waiters.push({ method, resolve }));

await send("Page.enable");
mkdirSync(outDir, { recursive: true });
const written = [];

for (const path of paths) {
  for (const width of widths) {
    for (const mode of modes) {
      await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: mode }] });
      const loaded = once("Page.loadEventFired");
      await send("Page.navigate", { url: new URL(path, base).href });
      await loaded;
      await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
      // Lazy images below the fold only load once scrolled to; load them all before measuring.
      await send("Runtime.evaluate", {
        expression: "Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.decode().catch(() => {}); }))",
        awaitPromise: true,
      });
      const { result } = await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight" });
      const height = result.value;
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
      const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
      const name = `${label}${path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-")}-${width}-${mode}.png`;
      writeFileSync(join(outDir, name), Buffer.from(shot.data, "base64"));
      written.push(`${name} (${width}x${height})`);
    }
  }
}

ws.close();
chrome.kill();
console.log(`Wrote ${written.length} screenshots to ${outDir}:\n  ${written.join("\n  ")}`);

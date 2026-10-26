# Signature effects: 3D, shaders, glass, scroll-scrub

Read this before adding any WebGL, shader, glass, 3D or scroll-driven effect.

## The catch

Effects are where AI-generated sites went next. Once "no purple gradients" became common advice, generated sites moved to animated shader-gradient heroes, liquid glass panels (Apple's Liquid Glass design, announced June 2025, made it the look of the moment), floating 3D objects that depict nothing, and scroll-jacked "storytelling". Used by default, these are the new fingerprint.

So the rules are strict:

1. **At most one signature effect per site.** Name it in DESIGN.md with a one-line reason tied to the concept.
2. **It must show something real:** the product, the place, the process, the logo. If you cannot say what the effect depicts, do not build it.
3. **The page must be complete without it.** The effect is a layer on top of a finished, fast page.

## Pick the technique from what you are showing

| What you want to show | Technique | Use |
|---|---|---|
| A physical product people buy (bottle, shoe, device, building model) | Interactive 3D model | React Three Fiber + drei, `templates/effects/Scene3D.tsx` |
| A place or a process (shop, farm, kitchen, factory, event) | Scroll-scrubbed **real** footage | `templates/effects/ScrollScrubVideo.tsx` (technique from scroll-world) |
| A logo moment (intro, 404 page, loading state) | Pre-rendered loop of the client's own logo | liquid-logo tool or Paper `LiquidMetal`, shipped with `LogoLoop.tsx` |
| Atmosphere behind a hero, only when the concept is light, water, sky, or fabric | Animated gradient in brand colours | Paper `MeshGradient` (default) or ShaderGradient, `GradientBackdrop.tsx` |
| One panel over a photo | Frosted glass | CSS `.glass` in `effects.css` |
| Small reveals as you scroll | CSS scroll-driven animations | `animation-timeline: view()`. Chrome/Edge 115+, Safari 26+, not Firefox, so it must degrade to no animation. Often the right answer is no animation. |

## Non-negotiables for every effect

1. **Poster first.** A real image or styled block renders before anything else and is the LCP element. `EffectFrame` does this.
2. **Gate it.** Reduced motion, Save-Data, no WebGL2, or a runtime error (failed model, lost context) all fall back to the poster. `EffectFrame` handles all four; its error boundary keeps a failed effect from taking the page down.
3. **Give the frame a size in CSS.** A zero-height frame never intersects the viewport, so the effect never mounts (found in testing).
4. **Lazy-load in its own chunk.** In Next.js App Router use `next/dynamic` with `ssr: false`, which only works inside a Client Component. Import a library through a one-line local file (see `PaperMesh.tsx`), not `import("pkg").then(m => m.X)`. Measured: that alone took Paper Shaders from 82 KB to 8 KB gzip.
5. **Stop when unseen.** R3F `frameloop="never"`, Paper `speed={0}`, ShaderGradient `animate="off"`, `video.pause()` when off screen or the tab is hidden.
6. **Cap pixels.** `dpr` 1.5 at most, drop to 1 with drei's `PerformanceMonitor`. Paper: `maxPixelCount`.
7. **Text never sits bare on moving imagery.** Give it a solid or tinted backing, and check contrast against the brightest frame.
8. **Self-host every asset**: models, HDR environment maps, video, fonts. drei's `<Environment preset="...">` downloads HDRs from raw.githack.com at runtime, and ShaderGradient's `lightType="env"` downloads three HDRs from the author's GitHub Pages. Use `files="/hdr/x.hdr"` and `lightType="3d"` instead. drei's `useGLTF` also fetches the Draco decoder from www.gstatic.com for Draco-compressed models, so compress with Meshopt (decoder bundled) or self-host the decoder with `useGLTF.setDecoderPath("/draco/")`. Free CC0 HDRs: Poly Haven.
9. **Respect the budget.** Measured on 6 October 2026 in a Next.js 16.2 production build, gzip, on top of a ~190 KB baseline page:

   | Effect | Extra JS (gzip) |
   |---|---|
   | Paper `MeshGradient` via one-line import | ~8 KB |
   | ShaderGradient (three + R3F + library) | ~290 KB |
   | R3F + drei scene | ~290 KB, plus the model and HDR |
   | Scroll-scrub video / logo loop | 0 KB JS beyond the component; the video file is the cost |

   About 290 KB gzip is close to 1 MB of JavaScript for the phone to parse before anything draws. On mid-range Android over mobile data that is seconds, not milliseconds. Only spend it on a page whose whole point is the object.
10. **Test on a real low-end Android phone** and with reduced motion switched on, before calling it done.

## Supply-chain rules (any new library)

- Pin exact versions (`npm i --save-exact`) and commit the lockfile.
- Avoid versions published in the last 7 days. Several popular npm packages were hijacked in 2025 and the bad versions lived for hours to days. Check with `npm view <pkg> time`; npm's `--before=<date>` installs what existed on that date.
- Install a new library with `--ignore-scripts` first, run `npm audit`, and read any install scripts before allowing them.
- Check the package's `repository` field points at the repo you actually reviewed. Never use canary or pre-release tags in production.
- Self-host scripts. If a CDN `<script>` is unavoidable, add an `integrity` (SRI) hash.
- Read third-party agent skills and plugins in full before installing them. They are instructions that run with your tools, files and paid accounts.

## Library notes (checked 6 October 2026)

**pmndrs/react-three-fiber** (MIT). Use it when 3D is earned. Latest stable `@react-three/fiber` 9.8.1 needs React `>=19 <19.4`, so check before upgrading React. Version 10 is canary only; do not use it. The published package has no install scripts. Pair it with `@react-three/drei` 10.7.9 (MIT, has npm provenance) for `useGLTF`, `Environment` and `PerformanceMonitor`.

**ruucm/shadergradient** (MIT). Use with care; prefer Paper Shaders. The npm package `@shadergradient/react` 2.4.20 (December 2025) lags the repo (2.4.24, unpublished) and does not declare its peer dependencies, so install `three @react-three/fiber three-stdlib camera-controls` yourself. Next.js App Router needs R3F 9 and React 19. The bundle ships an unused socket.io client for Framer live-preview (it targets 127.0.0.1 and is not reachable from the main entry). Harmless, but it shows the package is built for the author's tools first. Its "env" lighting fetches remote HDRs (see rule 8). Do not ship its presets as-is: they are what everyone else ships.

**dashersw/liquid-glass-js** (MIT). Reference only, not for production. It is a single commit from June 2025 and not on npm. Problems found reading the code:
- It refracts a one-off html2canvas screenshot of the page, so glass shows a stale picture: video, animation, lazy images and anything that changes never update.
- `allowTaint: true` followed by `toDataURL()` throws a SecurityError if any cross-origin image lacks CORS headers.
- Every glass element creates its own WebGL context, and browsers cap active contexts (typically around 16).
- Nested buttons redraw every frame forever and call `getBoundingClientRect()` each frame, which drains battery and forces layout.
- Buttons are `div`s with click handlers, so they are not keyboard accessible, and there is no cleanup or destroy method.
- It loads html2canvas from jsDelivr without an SRI hash.

If glass is truly part of the concept, use the CSS `.glass` recipe on one panel over a photo. True refraction needs WebGL (as above) or an SVG displacement filter that only Chromium applies to `backdrop-filter`.

**collidingScopes/liquid-logo** (MIT). Use it as a tool, not a dependency. It is a browser app (last commit March 2025) that turns a logo image into a liquid-metal animation and exports MP4 or PNG. Run it, upload the client's own logo, export, then ship the file with `LogoLoop.tsx`. Notes:
- Images are processed in the browser, but the hosted page loads Umami analytics and dat.GUI from cdnjs.
- The demo logos (Apple, Nike, Pepsi, PlayStation and others) are other companies' trademarks. Never ship them.
- For a live version instead of a video, Paper Shaders' `LiquidMetal` takes an image and is Apache-2.0.

**oso95/scroll-world** (MIT). Take the technique, not the skill. It is an agent skill that generates every scene with paid AI image and video services (Higgsfield and Monid, roughly $27 for a six-scene chain per its README). That contradicts this skill's real-imagery rule, so do not install it. I read its scrub engine in full: no network calls except the clip URLs you pass in, and it escapes copy text. For React it has problems:
- No unmount or destroy, so React Strict Mode's double mount duplicates its DOM and listeners.
- Its animation loop never stops.
- It downloads every clip whole as a Blob.
- It injects global CSS, including `html,body{overflow-x:hidden}`, plus its own template look (eyebrows, pill tags, glass nav).

`ScrollScrubVideo.tsx` was written from scratch with the same seeking approach (coalesced seeks, smoothed playhead), proper cleanup, and listeners only while on screen.

**Added alternatives**
- `@paper-design/shaders-react` 0.0.81 (Apache-2.0): MeshGradient, LiquidMetal, FlutedGlass, GrainGradient and more, with no three.js. It is pre-1.0, so pin the exact version and expect API changes. The npm package has no `repository` field; the source is github.com/paper-design/shaders.
- CSS scroll-driven animations (`animation-timeline`): zero JavaScript, see the table above for support.
- Not added: GSAP (free, but under a proprietary licence, not open source) and smooth-scroll libraries such as Lenis (scroll hijacking hurts accessibility and is itself a template habit).

## Templates (`templates/effects/`)

Copy into `components/effects/` and import `effects.css` once. Install only what the chosen effect needs, pinned to the versions that were tested:

```
# 3D
npm i --save-exact three@0.186.1 @react-three/fiber@9.8.1 @react-three/drei@10.7.9
# Gradient, default engine
npm i --save-exact @paper-design/shaders-react@0.0.81
# Gradient, ShaderGradient engine (heavy)
npm i --save-exact @shadergradient/react@2.4.20 three@0.186.1 @react-three/fiber@9.8.1 three-stdlib camera-controls
# Scroll-scrub video, logo loop, glass: no packages
```

Before installing, re-check each with `npm view <pkg> time` and `npm audit`. Newer versions may exist by the time you read this; only move to one that is at least a week old.

| File | What it is |
|---|---|
| `EffectFrame.tsx` | Poster + gate + error boundary + off-screen pause. Wrap every effect in it. |
| `Scene3D.tsx` + `ProductScene.tsx` | Lazy R3F scene for one self-hosted .glb with a self-hosted HDR. |
| `GradientBackdrop.tsx` + `PaperMesh.tsx` + `ShaderGradientBlock.tsx` | Animated gradient, Paper by default, ShaderGradient optional. |
| `ScrollScrubVideo.tsx` | Scroll-driven playhead for real footage, with ffmpeg encode settings in the header. |
| `LogoLoop.tsx` | Muted looping logo video with poster, reduced-motion still, off-screen pause. |
| `effects.css` | Frame, scrub and glass styles, using the project's tokens. |

All templates were type-checked and built with Next.js 16.2.7 and React 19.2.4, and smoke-tested in Chromium:
- Normal mode: both gradients render in brand colours, and a deliberately missing 3D model falls back to its poster without breaking the page.
- Reduced motion: posters only, no WebGL, no video.
- In both modes, no third-party hosts were contacted.

## Asset preparation

- **Models:** `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt`. Aim under 1.5 MB. Check the licence of any model you did not make.
- **Footage:** shoot it yourself or get it from the client. Encode with the ffmpeg lines in `ScrollScrubVideo.tsx` (short keyframe interval `-g 4` to `-g 8` so seeking is smooth).
- **HDR lighting:** Poly Haven (CC0). Use 1k resolution for the web.
- **Logo loops:** export from liquid-logo, convert to WebM with the ffmpeg line in `LogoLoop.tsx`, keep under 600 KB.

# Code standards

Write code the way a careful senior developer would if they knew someone would read it later. The aim is not to "hide" AI involvement; it is to produce code that is clean, consistent, and easy to maintain, which is what human-reviewed code looks like.

## HTML

- Landmarks: one `header`, one `nav` per navigation, one `main`, one `footer`. Each `section` has a heading (visible or visually hidden). Use `article` for self-contained items like posts or products, `aside` for side content.
- Interactive elements are `button` (actions) or `a` (navigation). Never a `div` or `span` with a click handler.
- One `h1` per page. Headings in order; do not skip levels for styling.
- Lists are `ul`/`ol`. Pairs of label and value can be `dl`. Tables are for tabular data.
- Every `img` has `width`, `height`, and meaningful `alt` (empty `alt=""` only for decorative images). Use `loading="lazy"` below the fold and `fetchpriority="high"` on the main hero image.
- Forms: every input has a `label`, correct `type` and `autocomplete`, and errors are linked with `aria-describedby`.
- Per page: unique `<title>`, meta description, canonical URL, Open Graph and Twitter tags, `lang` on `<html>`, a theme colour.
- No comments that label sections (`<!-- Hero -->`). The element and its class should make that obvious.

## CSS (plain)

```css
/*
  Concept: <one line from DESIGN.md>.
  <Two or three lines on why the type and colour choices fit.>
*/

:root {
  /* palette */
  --clay-50: oklch(0.97 0.01 60);
  --clay-600: oklch(0.52 0.12 45);
  --ink-900: oklch(0.22 0.02 60);

  /* semantic */
  --color-bg: var(--clay-50);
  --color-text: var(--ink-900);
  --color-accent: var(--clay-600);

  /* type */
  --font-display: "Young Serif", Georgia, serif;
  --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-3: clamp(1.9rem, 1.5rem + 2vw, 3rem);

  /* space: one scale, used everywhere */
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;

  --radius: 3px;
  --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

- Class names describe what the thing is (`.price-list`, `.founder-note`), not what it looks like (`.blue-box`) or where it came from (`.section-3`). Pick one convention (for example BEM-ish `.card__title` or plain kebab-case) and keep it.
- Group rules by component. Keep selectors shallow. Avoid `!important` except in reduced-motion and utility overrides.
- Use modern layout: grid with named areas or explicit columns for page structure, flex for one-dimensional alignment, `gap` instead of margins between siblings, logical properties (`margin-inline`, `padding-block`) where it helps.
- Style `:focus-visible` on purpose. Set `::selection`. Use `accent-color` for native checkboxes and radios.
- No inline `style=""` attributes except for truly dynamic values.

## Tailwind CSS v4

Tailwind is not the problem. Tailwind's defaults are. Make the theme yours:

```css
@import "tailwindcss";

@theme {
  --color-*: initial;            /* remove the stock palette */
  --color-paper: oklch(0.97 0.01 80);
  --color-ink: oklch(0.23 0.02 80);
  --color-clay: oklch(0.55 0.13 45);
  --color-line: oklch(0.88 0.01 80);
  --color-white: #fff;           /* white and black live in the same namespace, so re-add them */
  --color-black: #000;

  --font-display: var(--font-young-serif), Georgia, serif;
  --font-sans: var(--font-hanken), system-ui, sans-serif;

  --radius-sm: 2px;
  --radius-md: 4px;
}
```

- With the stock palette removed, `bg-indigo-500` simply will not compile to anything, which stops defaults leaking in.
- Extract repeated class strings into a component, not into `@apply` soup. If the same 15 classes appear three times, that is a component.
- Keep class order consistent (layout, box, type, colour, state). The official Prettier plugin for Tailwind does this automatically if the project uses Prettier.
- Avoid the tell combinations: `rounded-2xl shadow-lg hover:-translate-y-1`, `bg-gradient-to-r from-indigo-500 to-purple-500`, `bg-clip-text text-transparent`, `backdrop-blur`, `border-l-4`, `transition-all`.

## React / Next.js

- Follow the project's `AGENTS.md`. Newer Next.js versions may differ from what you remember; read the local docs it points to.
- One component per job. If `FeatureCard`, `ServiceCard`, and `InfoCard` are 90% the same, merge them.
- Content lives in data (a `content/` folder, MDX, JSON, or a CMS), not hard-coded in JSX across ten files. This also makes it easy for the user to replace TODO placeholders.
- Server components by default; `"use client"` only where there is interaction.
- Use `next/image` with real dimensions and `next/font` for fonts. Remove unused boilerplate (`next.svg`, `vercel.svg`, starter page content).
- No unused imports, no `console.log`, no commented-out code, no `any` without a reason.
- Error handling that helps the user: a form that fails shows a clear message and keeps what they typed.
- Secrets only on the server (route handlers, server actions). Check `.gitignore` covers `.env*`.

## Motion

- Default stance: little motion. One orchestrated entrance on first load at most, plus feedback on real interactions (menu open, form submit, accordion).
- Durations 150 to 300ms for UI feedback, up to 600ms for a page-load sequence. Ease-out for entrances.
- Animate `transform` and `opacity` only.
- If `framer-motion` or `motion` is installed, use it for the few moments that need it. Do not wrap every section in `whileInView` fade-ups.
- Always:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In React with Motion, also check `useReducedMotion()`.

## Comments

Comments say **why**, not **what**.

Bad: `// Map over services and render cards`
Good: `// Prices come from the sheet the client updates monthly, so they are fetched, not hard-coded.`

## Commits (if the project uses git)

Small, plain-English commits that describe one change: "Add price list section", "Fix menu focus trap on mobile". Not "update" or "initial commit" for a whole site.

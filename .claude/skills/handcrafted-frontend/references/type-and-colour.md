# Choosing type and colour

The goal is not "use rare fonts". Any font becomes a cliché once every AI picks it. The goal is that the choice comes from the concept in DESIGN.md and is used with care.

## Type: how to choose

1. Start from the concept. Ask what the client's world is printed in. A law firm's letterhead, a school exercise book, a newspaper, a shop sign, a lab report, a church bulletin, a phone screen. That suggests a category (old-style serif, slab, grotesque, humanist sans, mono, display).
2. Pick **one** face for headings and **one** for body. Add a mono only if the site shows numbers, codes, or data. Two families is normal; three is the maximum.
3. Write the reason in DESIGN.md in one line. Example: "Source Serif 4 for headings because it reads like a textbook; Source Sans 3 for body because it shares the same skeleton."
4. Check the licence (Google Fonts and Fontshare are free for commercial use; check anything else) and that it has the weights and characters the content needs, including the ₦ sign, £ sign, and accented names if relevant.

## Type: over-used right now (needs a written reason)

- Classic defaults: Inter, Roboto, Open Sans, Lato, Arial, Helvetica, Poppins, Montserrat, the plain system stack.
- The "anti-default defaults" AI now picks when told to avoid Inter: Space Grotesk, Instrument Serif, Instrument Sans, Playfair Display, DM Sans, Plus Jakarta Sans, Outfit, Geist, Manrope, Satoshi, General Sans, Clash Display, Cormorant.

These are good typefaces. The problem is picking them on autopilot. Note that the common advice "use Playfair Display with DM Sans" is itself now one of the most recognisable AI pairings.

## Type: a wider pool to consider

Not a whitelist, and not guaranteed to stay fresh. Starting points by feel. Verify availability on Google Fonts or Fontshare before using.

**Serif, bookish or academic:** Source Serif 4, Literata, Newsreader, Spectral, Crimson Pro, EB Garamond, Libre Caslon Text, Alegreya, Petrona, Besley.
**Serif, with character:** Young Serif, Gloock, Bodoni Moda, Brygada 1918, Fraunces (use its optical sizes, not just the default), Erode or Gambetta (Fontshare).
**Slab, sturdy and friendly:** Zilla Slab, Bitter, Roboto Slab (only with care).
**Sans, neutral workhorse:** Source Sans 3, Public Sans, Hanken Grotesk, Schibsted Grotesk, Work Sans, IBM Plex Sans, Red Hat Text, Switzer (Fontshare).
**Sans, warm or humanist:** Karla, Figtree, Atkinson Hyperlegible Next (excellent for accessibility and low-vision readers), Alegreya Sans.
**Sans, loud display:** Bricolage Grotesque, Archivo (wide and condensed widths), Big Shoulders Display, Anybody, Unbounded, Epilogue, Familjen Grotesk, Cabinet Grotesk (Fontshare).
**Mono, for numbers and codes:** IBM Plex Mono, JetBrains Mono, DM Mono, Martian Mono, Space Mono.

## Type: using it well

These details separate a designer's type from a default:

- A real scale. Pick a ratio (1.2 for dense sites, 1.25 to 1.333 for most, 1.5+ for editorial) and generate sizes from it. Use `clamp()` for fluid headings.
- Contrast in weight and size. If headings are only a little bigger and a little bolder than body text, commit harder.
- Tight tracking on large display sizes (around `-0.01em` to `-0.03em`), normal or slightly open on small caps and labels.
- `text-wrap: balance` for headings, `text-wrap: pretty` for paragraphs.
- `font-variant-numeric: tabular-nums` for prices, tables, and anything that lines up.
- `hanging-punctuation: first` where supported, curly quotes (“ ” ‘ ’), and real apostrophes in copy.
- Only load the weights you use. In Next.js use `next/font` (Google or local files) with `display: "swap"`. In plain HTML, self-host WOFF2 files or use a single Google Fonts link with only the needed weights, and preconnect.

## Colour: how to build a palette

1. **Pull colour from the concept and the client's world.** Their existing logo, signage, uniform, product, city, materials. Write down 3 to 5 source colours.
2. **Choose one dominant colour** that will cover most of the brand surface, **one accent** for calls to action and key moments, and **neutrals**. Roughly: neutrals most of the page, dominant for identity, accent under 10%.
3. **Tint the neutrals** toward the dominant hue. Pure `#000` on pure `#FFF` looks harsh and default; a warm or cool near-black and off-white looks considered.
4. **Define colours in OKLCH** (`oklch(L C H)`) so you can build lighter and darker steps by changing lightness while keeping the hue stable. Provide hex fallbacks only if the project must support very old browsers.
5. **Layer tokens.** Raw palette tokens (`--clay-600`) feed semantic tokens (`--color-text`, `--color-surface`, `--color-accent`, `--color-border`). Components only use semantic tokens. This makes dark mode or a rebrand a token change, not a hunt.
6. **Check contrast.** Body text 4.5:1 minimum, large text and UI borders 3:1. Test accent-on-dominant combinations too, not just text on background.
7. **Decide light or dark on purpose.** Dark by default for a bakery or a school is odd. Light by default for a nightlife brand is odd. Offer both only if you can design both properly.

## Colour: avoid unless the concept truly calls for it

- Purple, indigo, and blue-violet as the brand colour when the client has no link to it.
- Tailwind's stock palette used as-is (`indigo-600`, `slate-900`, `emerald-500`).
- Gradients as a default fill. Neon on black. Multiple saturated colours with equal weight.
- Colour used as decoration on every element (coloured icon backgrounds, coloured side stripes, coloured dots). Colour is a limited resource; spend it where attention should go.

## Worked example (the format to follow in DESIGN.md)

> Concept: a night-study desk lamp for exam-season students.
> Colour: deep indigo room (#12172A) as dominant because the audience studies at night; warm amber (#E7A53C) as accent, like a lamp or highlighter; coral (#E2604A) only for urgency (deadlines). Neutrals tinted cool toward the indigo.
> Type: Fraunces for headings (textbook serif, academic); Source Sans 3 for body (plain and legible on cheap phones); IBM Plex Mono for course codes, prices, and the countdown so numbers line up like a timetable.

Note this example uses indigo deliberately, with a reason tied to the audience. That is the difference between a decision and a default.

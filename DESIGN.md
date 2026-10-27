# DESIGN.md

The design brief for the Pen of Wonder family: the main site and its five worlds. Every visual and copy decision traces back to something here. Research keeps its own brief in `apps/research/DESIGN.md`, which wins inside research. `[ASSUMED]` marks a guess the owner should confirm; `[DECIDE]` marks a choice waiting on the owner.

Written 26 October 2026 (Phase 0). Sources, in order of precedence: the build prompt, the brief (`_source/brief.md`, 26 Oct 2026), research's CLAUDE.md and DESIGN.md, the brand (`Pen of Wonder Consults/Brand`), the `handcrafted-frontend` skill.

## 1. The job

- **Client:** Pen of Wonder Consults, a registered business name in Nigeria (CAC Business Name No. 7809965), based in Ibadan. Founder and face of the brand: Wonderful Adebagbo. The company speaks as "we".
- **The family's one job:** hand each visitor to the right world in one click, and make each world feel like it belongs to the same careful company.
- **Main home, the one job:** within 10 seconds a visitor knows what Pen of Wonder does and which world is theirs.
  - Primary action: "Find your service" (scrolls to the worlds).
  - Secondary action: "Chat on WhatsApp", prefilled "Hello, I found Pen of Wonder and I'd like to ask about ".
- **Each world's job:**
  - Marketing: a business owner believes "they treat my ad budget like an experiment, and they'll show me the numbers", then messages on WhatsApp.
  - Research: unchanged from `apps/research/DESIGN.md`.
  - Writing (Phase 2): a job seeker or founder believes "they'll make my document get read", then asks for a quote.
  - Publishing (Phase 3): a school orders the readers; an author asks about a book.
  - Dev: a visitor joins the WhatsApp waitlist.

## 2. Audience and context

- **Who:** Nigerian SMEs, coaches, course creators and online businesses (marketing); researchers, editing firms and UK postgraduates (research); job seekers, professionals, founders, NGOs and funding applicants (writing); school proprietors, head teachers, parents, aspiring authors, churches (publishing).
- **Where and on what device:** mostly Nigeria, mostly mid-range Android phones on mobile data, then UK and US buyers on laptops. Designed for the phone on a slow connection first: static HTML, self-hosted subset fonts, no client framework, images through Astro's pipeline.
- **What they worry about:** being sold to by someone who can't show results; paying for ads that vanish; "is this a real company"; for schools, whether the books are real, printed and in use; for students, anything that looks like contract cheating.
- **Language:** plain British English, warm and direct, short sentences. Naira first on marketing and publishing, pounds on research coaching.

## 3. Concept

**Family concept: one pen, five kinds of paper.** The POW mark's ink drop is the pen. Each world is the document that pen produces for a different reader, so each world takes its layout ideas from a real kind of paper. The shared header and footer are the letterhead: identical on every sheet, with the world named under the mark and its accent ruled beneath.

**Main: a binder with five tab dividers.** The home page is the contents of one binder. "Choose your world" shows each world as a divider: the tab in its accent, then who it is for and three services. The four live-or-soon worlds get full dividers of different heights (their content differs); dev is a narrow tab with "coming soon". Why: the main site's whole job is sorting people into sections, and a tabbed binder is how an office sorts paper.

**Marketing: a lab notebook for ad tests.** Hypothesis, variant, result, decision. The process page is a numbered test log; proof numbers are set like readings in Plex Mono with the evidence date beside them; case studies follow the same four headings. Why: the founder's lab background is the real story behind "run like experiments", and the portfolio already proves that line works.

**Research: a manuscript returned by a careful editor.** Kept exactly as approved (`apps/research/DESIGN.md` section 3).

**Writing (Phase 2): a letter on good paper, ready to send.** Wide margins, a clear signature block, and one signature detail: the before-and-after sample shown as two sheets laid side by side. Why: every writing service ends as a document someone else opens and judges in seconds.

**Publishing (Phase 3): the shelf and the colophon.** The six readers stand on a reading ladder from Basic 1 to Basic 6, spines out; every book page ends with a colophon block (imprint, ISBN, edition, printer) read from `books.ts`. Why: the books are real printed objects, and the colophon is where a book states its facts.

**Dev: graph paper, not yet drawn on.** One page on a faint grid, a sentence and a waitlist button. Why: it is honest about being unbuilt.

## 4. Decisions

Brand v1 tokens are unchanged. Everything below the brand comes from research's tested choices, so the family starts from a system that already scores 100 on PageSpeed.

- **Mode:** light by default (Parchment), following `prefers-color-scheme`, with a manual toggle in the shared footer. Dark is Deep Ink. Theme choice is stored per subdomain in `localStorage` inside try/catch, with no cookie, so a manual choice does not follow a visitor from one world to another. Accepted because most visitors use the system setting, which every world follows.
- **Base colours:** Parchment `#EDEEE7` background, Cream `#F4F0E4` panels, Deep Ink `#1B2420` text, Ink Green `#0F433B` headings, Quill Grey `#5B6661` secondary text. Raw OKLCH values and derived steps are research's, moved into `packages/brand`.
- **Gold:** Win Gold `#A5701F` on light grounds for large text and graphics only (3.6:1); Spark Gold `#D4A24A` on green or dark only. Once per layout, to mark the win. The POW mark's drop is part of the logo and does not count.
- **World accents:** one per world, used for three jobs only: the rule under the logo and the current menu item, the hero band, and buttons. Never for body text. See section 4.1.
- **Heading font:** Fraunces 700, optical size 72 (brand). **Body:** Inter 400 to 600 plus a 400 italic (brand; on the skill's over-used list, kept for brand consistency). **Numbers and proof:** IBM Plex Mono 400. Research's subset WOFF2 files move to `packages/brand/fonts`, split basic and extended Latin with `unicode-range`; they cover ₦, £ and the Yoruba diacritics research tested. No Google Fonts request.
- **Type scale:** research's 1.25 fluid scale, shared. Headings `text-wrap: balance`, paragraphs `text-wrap: pretty`, body measure about 65ch, tabular figures for prices and proof.
- **Spacing:** airy, on a 4px step. Marketing runs slightly denser (its test log and proof tables), publishing slightly looser.
- **Radius:** 0, with 2px on buttons and inputs. Paper has square corners.
- **Borders vs shadows:** hairline rules only. No shadows anywhere.
- **Icons:** none, except a WhatsApp glyph on WhatsApp buttons, the arrow character in text links, and a small chevron on menu disclosure buttons.
- **Marks:** the POW wordmark (ink drop as the O) in every header and the ink-drop icon as favicon; the quill emblem only at 120px or larger (footer of main and research).
- **Imagery:** no stock photos of people, no AI-generated people, nobody posed who could be mistaken for staff. The founder's two studio portraits are the only photos of a person. Each world may use an approved AI-generated or owner-made still life of the work itself, no people, no readable text, approved image by image. Proposed styles: main, a desk with the five kinds of paper; marketing, a printed ad proof beside a phone showing a results screen with no readable numbers; writing, an envelope and a folded CV on good paper; publishing, the printed readers themselves (real photos once supplied); dev, none. Until approved, a sized placeholder box, never a stock image.
- **Motion:** 150 to 250ms colour and transform transitions on buttons, menu panels and FAQs. No scroll animation, no animated counters. Full `prefers-reduced-motion` handling.

### 4.1 World accents (approved 26 Oct 2026)

How it is built: the raw pairs live in `packages/brand/tokens.css`, the only file with brand colour values. Each app sets `data-world` on `<html>`, and the tokens map that to `--color-world-accent`, `--color-on-world-accent` and `--color-world-rule`, in both modes. Research is the exception the owner chose (26 Oct 2026, option B): its buttons and accent stay Ink Green (Spark Gold in dark), and Sage marks only the rule under the logo and the current menu item. Main uses the family green for all three.

Each accent is a light/dark pair on one hue. A single colour cannot do all four jobs asked of it: Cream button text at 4.5:1 needs an accent darker than about 0.154 relative luminance, and 3:1 against Deep Ink needs one lighter than about 0.148, which leaves almost nothing in between. So dark mode lifts the lightness on the same hue, exactly as research already swaps Ink Green for Spark Gold. Light-mode buttons carry Cream text; dark-mode buttons carry Deep Ink text.

Hues avoid blue and purple (about 220 to 320 in OKLCH), stay 20 degrees or more from Ink Green and the golds, and keep away from research's tracked-change red. Output of `node scripts/accent-check.mjs`, 26 Oct 2026:

| World | Name | Light | Dark | Cream on accent | Accent on Parchment | Deep Ink on dark accent | Nearest other colour (OKLab) |
|---|---|---|---|---|---|---|---|
| Marketing | Raspberry | `#A82571` | `#EA7AAE` | 5.84:1 | 5.69:1 | 5.97:1 | tracked-change red 0.115 |
| Writing | Olive | `#5D600A` | `#B9BF69` | 5.89:1 | 5.74:1 | 8.09:1 | Sage 0.091 |
| Research | Sage | `#396F5E` | `#87BFAB` | 5.09:1 | 4.96:1 | 7.63:1 | Olive 0.091 |
| Publishing | Terracotta | `#8F4710` | `#E19C6B` | 5.99:1 | 5.84:1 | 6.96:1 | tracked-change red 0.082 |
| Dev | Graphite | `#534F4A` | `#BAB7B2` | 7.12:1 | 6.94:1 | 7.95:1 | Sage 0.096 |

Every pair passes. The full table, including accent on Cream panels and accent on Deep Ink, is in the script output and on the test page `design/accents.html`.

Why each:
- **Raspberry (marketing):** the loudest of the five, like a sale sticker or a winning-variant mark in a test log. Marketing is the world that sells.
- **Olive (writing):** an office folder, steady and professional. It reads green-gold without being gold.
- **Sage (research):** quiet, low chroma, close in spirit to Ink Green so research stays the calm sibling. Trade-off: on screen it sits nearer Ink Green than the others do (OKLab 0.15). `[DECIDE]` See section 11, question 3, on whether research's buttons change at all.
- **Terracotta (publishing):** the warmest, like book cloth and clay. Its nearest colour is research's tracked-change red (0.082), but that red appears only inside research's edit specimen, so the two never share a page.
- **Graphite (dev):** pencil on graph paper. Neutral on purpose: dev is unbuilt, and when it becomes a full world it can take a real accent.

### 4.2 Contrast check

Research's `scripts/contrast-check.mjs` reads tokens from one CSS file. In Phase 1A it becomes a root script that reads `packages/brand` plus each app's accent and checks every research pair, plus for each world in both modes: on-accent text on accent (4.5), accent on background and on panels (3), focus ring (3). `scripts/accent-check.mjs` is the Phase 0 version of the accent part.

## 5. Content inventory

| Content | Have it? | Source / TODO |
|---|---|---|
| Services per world | Yes | Brief and build prompt; social media marketing unconfirmed |
| Marketing proof numbers (12+, 34%, 3.4×, ₦18M+) | Numbers yes, evidence no | Portfolio; `[EVIDENCE FILES FOR ALL FOUR NUMBERS]`, `[FIRST CAMPAIGN YEAR]` |
| Northern Star case study | Text yes, evidence no | Portfolio case says "Down about 34%", "Roughly 3.4×", 2025, 3 months, "directional". Needs the evidence file |
| Marketing testimonials | Text yes, written permission not on file | Nife, Beulah Fayinka, Yetty: confirmed in the brief; screenshots of each "yes" go in `_source/proof/` |
| Research | Yes | `apps/research` |
| Hidden Treasures facts | Partly | Four ISBNs and blurbs from the printed covers; the rest via `intake.md` |
| Book covers and spreads | No (covers), PDFs only (interiors) | `[FRONT COVERS]`; printed-version PDFs requested |
| Founder portraits | Yes | Two studio portraits in `_source/research/`; `[APPROVE FOUNDER BIO FOR MAIN SITE]` |
| CAC registration | Yes | BN 7809965 |
| Contact | WhatsApp yes, email no | `[BUSINESS EMAIL]` |
| Blog | Research yes; marketing source only | 16 research pieces; portfolio blog (see section 11, question 1) |

## 6. Page structure

### Main home
1. Hero: H1 "Words that make you win.", one line, "Find your service" and "Chat on WhatsApp". Hero band in Ink Green with Cream type (main has no world accent of its own; its accent is the family green, with the five world colours appearing only on the dividers below).
2. Choose your world: the binder dividers. Marketing, Writing, Research, Publishing as full dividers with their accent tab, who it's for and three services; Dev as a narrow tab. A `soon` world says "Opening soon" and its link goes to its holding page.
3. Proof strip: one register entry per world that has one, in Plex Mono, each linked to its case study or evidence page. Marketing (aggregate CPL), research (the fixed sentence). Publishing only once its claim is confirmed. No filler for writing or dev.
4. How we work: an ordered list, the same four steps on every world: message us, free consultation, written quote, delivery and revisions.
5. Hidden Treasures: covers (once supplied) and a link to publishing.
6. Founder: short story, the arms-crossed portrait, P-E-N values (Purpose, Evidence, Nerve).
7. Testimonials: static, approved only; at launch, marketing's three if their written permission is on file.
8. Final call to action, then the shared footer.

The section order is the build prompt's and is kept.

### Marketing home
1. Hero band in Raspberry: "Profitable ads, run like experiments." and "Chat about your ads".
2. The problem and the turn (two short paragraphs, from the lab).
3. Services as a plain list with one line each, linking to service pages.
4. Proof: four readings from the register, with the new label, linked to evidence and the Northern Star case.
5. Featured case: Northern Star, written fresh.
6. Process: the five-step test log (Diagnose, Hypothesise, Build, Test, Scale and report).
7. Pricing line, labelled as ad spend.
8. Testimonials (static, flag-gated), three latest blog posts, FAQ, final call to action.

Full draft copy for both home pages is in `PHASE-0.md`.

### Header and dropdowns
- Left: POW wordmark plus "Pen of Wonder", with the world name beneath on a subdomain, and a 3px rule in the world's accent under the whole logo block. On main, the rule is Ink Green.
- Menu: Marketing · Writing · Research · Publishing · Dev (Soon badge) · About · Contact. About and Contact point to the main site from every world.
- Each world label is a disclosure `<button aria-expanded>` that opens a panel: 3 to 5 services, one line each, then "Go to <World>". Not an ARIA menu. Without JavaScript each world label renders as a plain link to its subdomain. Escape closes the open panel and returns focus to its button; opening one closes the others; a click outside closes it.
- A `soon` world's panel lists its services as plain text plus "Opening soon" and a link to its holding page. Flipping `status` to `live` in `worlds.ts` turns the links on everywhere.
- The current world's label carries a 2px underline in its accent.
- Right: "Chat on WhatsApp", in the world's accent, prefilled with the world.
- Phones (below 64rem): the wordmark, then a "Menu" button that opens one drawer. Worlds are native `<details>` groups (the current world open, marked with an accent bar), About and Contact are plain links, and "Chat on WhatsApp" sits at the end.
- **A world's own pages** (research's Publication support, Coaching, Blog and so on) sit in a second row under the family bar on wide screens, with the current page underlined in the world's rule colour, and first in the drawer on phones. The brief's header doesn't mention them, but without this row a world would lose its own navigation. Added in Phase 1A.
- The family menu sits on the first line from 64rem (1024px), with the world's own pages and "Chat on WhatsApp" on the second; below 64rem, the drawer.
- Built as `packages/ui/Header.astro`. The Phase 0 mock-up (`design/accents.html`) was removed once the accents were approved; it is in the git history.

### Footer (every world)
Links to every world, About, Contact, Academic Integrity Policy (main site), Privacy, Terms, the theme toggle, then "Pen of Wonder Consults, a registered business name in Nigeria, CAC Business Name No. 7809965." Research keeps its business line first ("Pen of Wonder Research is the research service of Pen of Wonder Consults…") followed by the shared line.

## 7. What this family will NOT do

Everything in `apps/research/DESIGN.md` section 7, family-wide, plus:
- No carousels of any kind, rotating testimonials included.
- No animated counters. Proof numbers are static, in Plex Mono, each linked to its case study or evidence.
- No gradient CTA bands, no gradients at all.
- No three identical icon cards. "Choose your world" uses dividers of different content and height, each in its own accent, with a smaller fifth for dev.
- No "trusted by" strips, client logos or star ratings.
- No accent on body text, no more than one accent per world, no world accent on another world's pages (main's dividers excepted).
- No stock photos of people, no AI people.
- No cookie banner except on marketing, and only if the Pixel decision requires it.

## 8. References

- sterling.ng (the brief's reference): taking the idea of one header menu covering several business lines. Not taking its look, its mega-menu density, its colours or its copy.
- Research's own site: taking its whole system (tokens, type, sheet grid, components, checks).
- The concept's own references: office binder dividers (main), a lab notebook's test log (marketing), a book's colophon page (publishing).

## 9. Intentional exceptions

Carried from research (Inter as body face, `console.log` in scripts, en dashes in APA ranges, hex values where CSS variables can't reach, eyebrow labels on research). New:
- **Printed blurbs in `packages/config/books.ts`.** The integrity check bans academic terms outside research. The Last Assembly's printed back cover mentions a "Common Entrance Examination" and "any exam". That's story content, not a service, and the blurb is quoted word for word, so `text:` lines in `books.ts` are exempt. Nothing else is.
- **Hex values** in the `theme-color` meta and `site.webmanifest`, as research already records; they can't read CSS variables.
- **slop-check WARNs in research's blog** (26 Oct 2026): "state-of-the-art review" is the established name of a literature review type, and "streamlined" sits inside the standard definition of a rapid review (`types-of-literature-review.md`). Kept: the guide teaches those terms.
- **`_redirects` to another world** is written at build time from `worlds.ts` (research's `astro.config.mjs`), not typed into `public/_redirects`.

## 10. Open TODOs for the owner

| Placeholder | Where | Notes |
|---|---|---|
| [DOMAIN REGISTERED] | Everything | penofwonder.com at Cloudflare; Phase 1C gate |
| [SECOND DOMAIN] | Redirect | penofwonderconsults.com, if cheap |
| [PENOFWONDERRESEARCH.COM REGISTERED?] | Redirect | |
| [BUSINESS EMAIL] | All worlds | Provider [ZOHO MAIL OR GOOGLE WORKSPACE]; Phase 1C gate |
| [FIRST CAMPAIGN YEAR] | Marketing proof | For "across 12+ client campaigns since …". The portfolio dates Northern Star to 2025, so the year is 2025 or earlier |
| [EVIDENCE FILES FOR ALL FOUR NUMBERS] | `_source/proof/` | Screenshots for 12+, 34%, 3.4×, ₦18M+ |
| [NORTHERN STAR CPL FIGURE + EVIDENCE] | Main proof strip, marketing Work | The portfolio already states "Down about 34%" for Northern Star, labelled "directional". Needs an evidence file to be used as a client figure |
| [TESTIMONIAL PERMISSION SCREENSHOTS] | `_source/proof/` | Nife, Beulah Fayinka, Yetty. The brief says confirmed; the rule needs the written "yes" on file |
| [CONFIRM THIS SERVICE IS OFFERED] | Marketing | Social media marketing; page built, kept out of the menu |
| [META PIXEL ID] | Marketing | Not at launch (decided 26 Oct 2026); needed only when the opt-in is added |
| [APPROVE FOUNDER BIO FOR MAIN SITE] | Main | Draft in `PHASE-0.md`; portraits already exist |
| [RESEARCH PROOF EVIDENCE] | `_source/proof/research/two-manuscripts-2026/` | The acceptance or publication emails behind "two manuscripts through to publication in 2026". The local build fails until it's there |
| [CV EMAIL] | Research `/files/Wonderful-Adebagbo-CV.pdf` | The web CV still shows the Gmail address; rebuild it from `_source/research/cv/` once the business email exists |
| [SOCIAL LINKS] | Footers | None until company accounts exist |
| [BUSINESS PLAN CLIENT PERMISSION] | Writing Samples | Phase 2 |
| [PRICES OR QUOTE ONLY] | Writing | Phase 2 |
| Book facts Q1 to Q27 | `_source/books/intake.md` → `books.ts` | From the owner's mother; section 12 |
| Pixabay page URLs | `_source/books/image-sources.md` | One per Look and Learn photo |
| [FRONT COVERS] | Main, publishing | Clean front-cover files; the scan is evidence, not artwork |
| [CONFIRM THE IMPRINT NAME] | Publishing | "Hidden Treasures" (printed books) vs "Hidden Treasures Publishers" (brief) |
| [TOWN AND STATE PER SCHOOL] | Publishing | Q12 |
| [SELAR/AMAZON LINKS] | Publishing | Only when listings are live |
| Approved testimonials per world | All worlds | `showTestimonials` off until supplied |
| Legal review | Privacy, Terms, cookie notice | Section 13 lists what a lawyer should check |

## 11. Questions for the owner (Phase 0)

**Answered 26 Oct 2026:** (1) the latest three posts only; (2) no Meta Pixel at launch; (3) option B, research's buttons stay Ink Green; (4) dev on Workers static assets; (5) accents as proposed; copy as drafted in `PHASE-0.md`. Still open: whether 34% and 3.4× are Northern Star's figures or averages (needs the evidence files), and the founder bio.

1. **Marketing blog scope.** The brief and build prompt say "the three October 2026 posts". The live portfolio blog has 47 posts, from 9 June to 16 October 2026 (7 of them in October). Move only the latest three (16, 14, 12 Oct) or all 47? Moving all would need each post fact-checked and the portfolio's copies canonicalised.
2. **Meta Pixel.** Recommendation in section 13.3: launch marketing without it.
3. **Research's buttons.** Research must look the same after migration apart from header, footer and accent. Option A: research's buttons and header rule take Sage (the brief's rule, "accent for buttons"). Option B: research's buttons stay Ink Green as today, and Sage appears only in the header rule and menu underline. I recommend B: research is the quiet world, and B is the smallest visible change.
4. **Dev on Workers.** Cloudflare allows five Pages projects per repository (section 13.1). I recommend dev as a Workers static-assets project.
5. **Accents** as proposed in 4.1, or changes.

## 12. Book facts: `packages/config/books.ts`

Every book fact lives here and nowhere else. Fields that depend on the intake answers start as `null`. A filled field carries `source` (the intake question, e.g. `"Q6"`), and a claim also carries `evidence` (a path under `_source/books/` or `_source/proof/`). Planned shape, adjusted from the build prompt's suggestion:

```ts
type Sourced<T> = { value: T; source: string; evidence?: string } | null;

export const imprint = {
  name: Sourced<string>,              // Q7. Until set, pages use the printed books' wording, "Hidden Treasures"
  printedName: "Hidden Treasures",    // what the four scanned covers and the PDFs say today
  ownerLine: Sourced<string>,         // "[IMPRINT NAME] is the trading name of Wonderful Adebagbo."
  registeredWithCac: Sourced<boolean>,// Q11
  registeredOwner: Sourced<string>,   // Q7, Q11
  address: Sourced<string>,           // Q7
};

export const series = [
  { slug: "companion-readers", name: "Hidden Treasures Companion Readers", status: "printed" },
  { slug: "hidden-treasures", name: "Hidden Treasures", status: "in-production", books: 15, isbns: null }, // Q6; no dates, no book pages
];

export const titles: Title[] = [ /* six Companion Readers */ ];
type Title = {
  slug: string; title: string; series: "companion-readers";
  level: string;                      // "Basic 3"
  type: "picture-reader" | "chapter-book";
  format: "A5";
  blurb: { text: string; source: "printed-cover" } | null; // word for word from the printed back cover
  printed: Sourced<boolean>; printRun: Sourced<string>; printDate: Sourced<string>; printer: Sourced<string>; // Q1, Q2, Q4
  isbn: string | null; isbnEvidence: string | null;      // Q6, Q8; build fails on a bad check digit
  coverImage: string | null;                              // Q5
  copyrightPage: string | null;                           // Q3/Q5: printed PDF or photo of the copyright page
  sampleSpreads: string[];                                // from the interiors, Pixabay rules applied
};

export const schools: School[] = [];  // Q12 to Q16
type School = {
  name: string; town: Sourced<string>; state: Sourced<string>;
  titles: Sourced<string[]>; copies: Sourced<string>; date: Sourced<string>;
  evidence: string | null;            // invoice, receipt, transfer, delivery note or written order (Q15)
  canName: boolean;                   // Q16; false until agreed
  quote: { text: string; by: string; permission: string } | null;
};

export const orders = { minimumOrder, leadTime, deliveryStates, paymentTerms, handledBy }; // each Sourced, Q19 to Q22
export const consultant = { name: "Mrs Adebagbo", role: "series consultant", school: "Wellspring Model Academy", canName: Sourced<boolean> }; // Q25
```

Changes from the suggested shape, and why:
- `Sourced<T>` wraps every intake fact, so the source and evidence travel with the value and `books:ready` can list gaps generically.
- `printedName` is separate from `name`: the printed covers are the source of truth until Q7 settles the imprint, and the mismatch stays visible.
- `blurb` records that it came from the printed back cover, not the PDFs.
- `copyrightPage` replaces `printedPdf`, since a photo of the copyright page also meets the launch requirement.
- `copies` and `printRun` are strings, so "about 200" stays "about 200".

Known today:

| Title | Level | Type | ISBN | Evidence |
|---|---|---|---|---|
| Look and Learn: My First Picture Words | Basic 1 to 2 | Picture reader | being checked | |
| Look and Learn: More Picture Words | Basic 1 to 2 | Picture reader | being checked | |
| The Correction Book | Basic 3 | Chapter book | 978-978-63709-0-3 | printed back cover, scan p. 2 |
| A Court Called Class Four | Basic 4 | Chapter book | 978-978-63709-3-4 | printed back cover, scan p. 4 |
| The Weight of the Trophy | Basic 5 to 6 | Chapter book | 978-978-63709-2-7 | printed back cover, scan p. 3 |
| The Last Assembly | Basic 6 | Chapter book | 978-978-63709-1-0 | printed back cover, scan p. 1 |

All four ISBN-13 check digits verified 26 Oct 2026. The hyphenation shows a one-digit title element, so the publisher block holds ten numbers (-0 to -9). Four are used, six remain: enough for the two Look and Learn books if they come from this block, not enough for the 15-book Hidden Treasures series. A new block will be needed before that series goes to print.

What the scan shows (26 Oct 2026): each back cover has "About the book", "About the author" (with the CGPA line and a photo), the phone line "call +2348160498419 0r +2349035722959" and the ISBN. Front covers carry "Hidden Treasures - Companion Readers" or "A Hidden Treasures Reader", and the author's name. No imprint or "Published by" line is visible on any of the four covers. Two covers (The Weight of the Trophy, A Court Called Class Four) name Mrs Adebagbo, proprietor of Wellspring Model Academy, as the series consultant; the other two don't. Schools in the printed blurbs: Oke-Ilewo Primary School (The Correction Book), Ilupeju Model School (A Court Called Class Four), Honesty House at an unnamed school (The Weight of the Trophy), Temidayo Grammar Preparatory School (The Last Assembly). "0r" with a zero is a typo on all four covers: one more reprint fix.

What the 26 Oct PDFs show: all six have the same copyright block, "© Wonderful Adebagbo", "Published by Hidden Treasures", "First published 2026", and "ISBN: [to be assigned]". So the PDFs predate the ISBNs as well as the printed blurbs: one more sign they are not the printer's files. Each chapter book's "Other books by the author" page lists all six as "the Hidden Treasures Companion Readers series", with Look and Learn at Basic 1 to 2.

**Rendering rules** (build prompt section 9, unchanged): a `null` fact shows as `[TODO: Qn]` in development and is left out in production; the sales line counts only schools with `evidence`, says "a school" or "schools", and names one only when `canName` is true; ISBNs render and enter the Book schema only with `isbnEvidence`; order terms appear only once Q21 and Q22 are answered.

**`npm run books:ready`** lists every `null`, every claim without evidence, and every contradiction with the printed covers, and fails if a launch-required field is missing: imprint name (Q7), each title's cover image and copyright page (Q3/Q5), order handling (Q22), consultant naming (Q25).

## 13. Platform facts (checked 26 Oct 2026)

### 13.1 Cloudflare

- **Five Pages projects per repository.** "You can configure a maximum of 5 Pages projects per repository." We have six apps. ([Monorepos](https://developers.cloudflare.com/pages/configuration/monorepos/), last updated 21 Apr 2026.) Options: (a) dev as a Workers static-assets project built by Workers Builds from the same repo, which has no stated per-repo limit; (b) ask Cloudflare for a limit increase. Recommended: (a). Dev is one static page, and static asset requests on Workers are "free and unlimited" ([Billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), last updated 23 Apr 2026).
- **Free plan (Pages):** 500 builds a month, one build at a time per account, 20-minute timeout, 20,000 files per site, 25 MiB per file, 100 custom domains per project, 100 projects per account ([Limits](https://developers.cloudflare.com/pages/platform/limits/), last updated 5 Sep 2026). **Workers Builds:** 3,000 build minutes a month, one at a time, 20 minutes, deploy hooks 10 requests a minute ([Limits and pricing](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/), last updated 29 May 2026).
- **Watch paths:** excludes are checked first, then includes; `*` matches across `/`. Path matching is bypassed, and every project builds, when a push has 0 file changes, 3,000 or more file changes, or 20 or more commits ([Build watch paths](https://developers.cloudflare.com/pages/configuration/build-watch-paths/), last updated 21 Apr 2026; Workers the same, [Workers watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/), 29 May 2026). So: never push empty commits, and push in batches of fewer than 20 commits. Monorepo support needs Build System V2 or later.
- **Deploy hooks** build a chosen branch on every POST ([Deploy hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/), last updated 21 Apr 2026). The docs don't say whether hooks respect watch paths; they build one project by design, which is what research's weekly rebuild needs.
- **Workers vs Pages:** the migration guide (last updated 12 Oct 2026) describes Pages as current, not deprecated, and Workers as the broader platform. `_headers` and `_redirects` work on both. Workers needs the domain's nameservers on Cloudflare, which we will have. No reason to move research or the other worlds; only dev moves, and only because of the five-project limit.
- **Commercial use:** the Self-Serve Subscription Agreement (last updated 12 Sep 2025) has no clause against commercial use on free plans; it bars collecting card details on a property receiving Free Services, which we don't do.
- **Web Analytics:** "does not use any client-side state, such as cookies or localStorage, to collect usage metrics" ([Web Analytics](https://www.cloudflare.com/web-analytics/), checked 26 Oct 2026). Still free.

**Project plan:**

| Project | Product | Build command (repo root) | Output | Watch paths (include) | Domain |
|---|---|---|---|---|---|
| pow-main | Pages | `npm run build -w apps/main` | `apps/main/dist` | `apps/main/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json` | penofwonder.com, www |
| pow-marketing | Pages | `npm run build -w apps/marketing` | `apps/marketing/dist` | `apps/marketing/*`, shared paths as above | marketing.penofwonder.com |
| pow-research | Pages | `npm run build -w apps/research` | `apps/research/dist` | `apps/research/*`, shared paths | research.penofwonder.com |
| pow-writing | Pages | `npm run build -w apps/writing` | `apps/writing/dist` | `apps/writing/*`, shared paths | writing.penofwonder.com |
| pow-publishing | Pages | `npm run build -w apps/publishing` | `apps/publishing/dist` | `apps/publishing/*`, shared paths | publishing.penofwonder.com |
| pow-dev | Workers static assets | `npm run build -w apps/dev` | `apps/dev/dist` (via `wrangler.jsonc` assets) | `apps/dev/*`, shared paths | dev.penofwonder.com |

A change under `packages/` or `scripts/` rebuilds all six: 6 of the 500 monthly builds. The old project (penofwonderresearch) keeps its repo until cutover.

### 13.2 Formspree

- Free plan: 50 submissions a month, unlimited forms, 2 linked emails, basic spam filtering, 30-day archive, no file uploads ([Plans](https://formspree.io/plans), checked 26 Oct 2026). The help page describes the allowance as monthly but doesn't say per account or per form ([Account limits](https://help.formspree.io/articles/account-management/account-limits)); plan for 50 across all six worlds.
- "Restrict to domain" takes one domain, and a bare domain matches every subdomain ([Restrict to domain](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain.md)), so `penofwonder.com` covers all worlds once research has moved. Until cutover, research posts from penofwonderresearch.pages.dev, so set the restriction at cutover, not before.
- One form for six sites fits technically. On volume, 50 a month is tight once marketing runs ads. Options: Personal, $15 a month or $120 a year, 200 submissions; Professional, $30 a month or $240 a year, 2,000. The plans page shows both monthly and yearly-rate figures; confirm at checkout. Recommendation: launch on Free with WhatsApp as the main route, and upgrade when Formspree's 75% warning arrives.

### 13.3 Meta Pixel and cookies

- **UK (ICO):** guidance on storage and access technologies, finalised after the Data (Use and Access) Act 2025 (page last updated 29 Apr 2026). "The use of storage and access technologies for online advertising purposes requires consent", and advertising measurement is covered by that same consent ([Online advertising](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-the-rules-apply-to-online-advertising/)). Technologies "are only set when valid consent is gathered", refusing must be "as easy" as accepting, and withdrawal must have "the same ease" ([Managing consent](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/)). The new statistical exception covers aggregate analytics, not advertising.
- **Nigeria (NDPA 2023 and the NDPC's GAID 2025, issued 20 Mar 2025):** Article 19 says the use of cookies "requires consent", needs "yes or no" (accept or reject) options for anything beyond necessary cookies, and applies the same rules to any tracking tool that works like a cookie. Article 19(7)(a): the banner must be conspicuous, and a visitor "shall not be required to scroll" to see it. Article 7(1)(l): the cookie notice should "significantly obstruct" the middle, left or right of the home page, and a notice at the bottom where it may be ignored is "tantamount to lack of transparency" ([GAID PDF](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)). Commentary dates it operational from 19 Sep 2025; I did not find that date in the PDF itself.
- **What it means:** the Pixel sets `_fbp` and is an advertising tracker, so both regimes need prior opt-in consent, with reject as easy as accept, and the Pixel must not load until accepted. Under the GAID, a small bottom consent bar is not enough: it has to be prominent on the home page. That makes option (b) heavier than the build prompt pictured.
- **Decided 26 Oct 2026: (a).** Recommendation as written: launch marketing without the Pixel. Every world then stays cookie-free with no banner. Add the Pixel later, with a prominent opt-in panel on marketing only, a "Cookie settings" link in its footer and an updated privacy notice, when you start running ads that send traffic to marketing.penofwonder.com and need conversion data from it. Cloudflare Web Analytics covers traffic counts meanwhile.

### 13.4 Email DNS checklist (before launch)

Check with `dig` or the provider's own checker once the domain exists:
1. **MX** records for the chosen provider only (Zoho or Google). Remove Cloudflare Email Routing's MX records when the real mailbox goes live.
2. **SPF:** exactly one TXT record starting `v=spf1`, including the provider (`include:zoho.eu` or `include:zohomail.com` depending on the Zoho data centre, or `include:_spf.google.com`), ending `~all`. Two SPF records is a fail.
3. **DKIM:** the provider's selector TXT record (for example `zmail._domainkey` or `google._domainkey`), then turn signing on in the provider's console.
4. **DMARC:** `_dmarc` TXT, start with `v=DMARC1; p=none; rua=mailto:<report address>`, move to `p=quarantine` after two clean weeks of reports.
5. **Formspree** sends from its own domain with reply-to set to the visitor, so it needs no SPF entry.
6. **Subdomains** don't send mail, so `sp=` can follow the main policy.
7. Send a test to a Gmail and an Outlook address and read the headers: SPF, DKIM and DMARC should all say pass.

## 14. Research migration plan (Phase 1A)

Research keeps its concept, edit specimen, blog, checks, dark mode, 404 and redirects. Changes, in order:
1. Move tokens and fonts to `packages/brand`; research imports them and keeps its own semantic layer (specimen red, mount, comment colours) in `apps/research`.
2. Swap `Header.astro` and `Footer.astro` for `packages/ui` ones, with research marked current and its accent per section 11, question 3.
3. Site URL to https://research.penofwonder.com: Astro `site`, canonical URLs, sitemap, RSS, JSON-LD, OG image.
4. Email to `[BUSINESS EMAIL]`; WhatsApp unchanged.
5. `/academic-integrity` becomes a 301 to penofwonder.com/academic-integrity in `public/_redirects`; footer links point there.
6. Footer business line kept, followed by the shared legal line.
7. `site.ts` contact values come from `packages/config/contact.ts`.

Before and after: screenshots of `/` and `/publication-support` at 360 and 1440 px, light and dark, taken from the current build before step 1 and from the migrated build after step 7, shown side by side. Then PageSpeed mobile on both pages once deployed; the bar is the current 100/100/100/100.

## 15. Verdicts on the corrections to the brief (build prompt section 2)

1. **Northern Star and the 34%: agreed, with one addition.** The main proof strip uses the aggregate wording. Addition: the portfolio's Northern Star case already says "Cost per lead: Down about 34%" and "ROAS: Roughly 3.4×", marked "directional and signed off with the client", for a 3-month campaign in 2025. The home page then calls the same two numbers "avg." across campaigns. So 34% and 3.4× are each presented both as one client's result and as an average. Before either goes in the register, the evidence has to say which it is. If they are Northern Star's figures, the marketing proof row needs real averages or should drop those two numbers. "About" and "roughly" also don't fit "lab-grade proof": the register will hold the exact figure from the evidence.
2. **Northern Star as an independent client: agreed.** Presented as a client case study, numbers gated on evidence.
3. **Research gate already met: agreed.** The source is imported into `apps/research` with its 50 commits of history.
4. **Founder photo: agreed.** The arms-crossed portrait (research's About) is reused; bio waits on approval. Draft in `PHASE-0.md`.
5. **`live`/`soon` status per world: agreed.** `worlds.ts` carries `status`; a `soon` world gets a holding page on its own subdomain and plain-text menu entries plus "Opening soon".
6. **Static testimonials: agreed.** Marketing's three only, and only once each person's written "yes" is in `_source/proof/`. Note the portfolio shows two versions of Nife's quote (home: "tested angles methodically", case study: "tested methodically"); the register will hold the wording Nife approved.
7. **Meta Pixel sets cookies: agreed.** Facts in 13.3. Recommendation: option (a), launch without it. Option (b) needs a prominent opt-in panel under Nigeria's GAID, not a small bar.
8. **Fixed research proof line: agreed.** Exactly "helped a researcher take two manuscripts through to publication in 2026".
9. **The six printed books: agreed, checked against the scan.** The four chapter-book ISBNs match their printed back covers and all pass the check digit. Series name "Hidden Treasures Companion Readers" confirmed in every PDF's "Other books" page. The scan shows no imprint line on the covers; the PDFs say "Published by Hidden Treasures" with "ISBN: [to be assigned]". Further findings and reprint fixes are in section 12 and `intake.md`.
10. **Weekly blog rebuild: agreed and done.** `.github/workflows/research-weekly-rebuild.yml` now calls the `CF_DEPLOY_HOOK_RESEARCH` hook only when a piece is scheduled, keeps "Run workflow", and fails loudly if the secret is missing. It needs the hook created in Phase 1C.

**Also found, not in the build prompt:**
- Cloudflare's five-projects-per-repository limit (13.1).
- The portfolio's 47 blog posts (11, question 1).
- The portfolio's WhatsApp buttons all use the old number, +234 903 572 2959. They go on the portfolio fix list in `PHASE-0.md`.
- Research's own DESIGN.md (section 11) still describes the empty-commit rebuild; it gets updated in Phase 1A.

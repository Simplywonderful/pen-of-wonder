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
- **Radius:** since the revamp, cards and panels 12px, inputs 8px, buttons fully round (section 20.1, D2). Before it: 0, with 2px on buttons and inputs.
- **Borders vs shadows:** hairline rules, plus one soft shadow on card hover and the floating WhatsApp button (section 20.1, D3).
- **Icons:** the hand-drawn set in `packages/ui/Icon.astro`, one per world and a few for contact details (section 20.1, D1), plus the WhatsApp glyph, the arrow character and the menu chevron.
- **Marks:** the POW wordmark (ink drop as the O) in every header and the ink-drop icon as favicon; the quill emblem only at 120px or larger (footer of main and research).
- **Imagery:** no stock photos of people, no AI-generated people, nobody posed who could be mistaken for staff. The founder's two studio portraits are the only photos of a person. Each world may use an approved AI-generated or owner-made still life of the work itself, no people, no readable text, approved image by image. Proposed styles: main, a desk with the five kinds of paper; marketing, a printed ad proof beside a phone showing a results screen with no readable numbers; writing, an envelope and a folded CV on good paper; publishing, the printed readers themselves (real photos once supplied); dev, none. Until approved, a sized placeholder box, never a stock image.
- **Motion:** 150 to 250ms colour and transform transitions on buttons, menu panels and FAQs, and the hero motif's slow pulse (section 20.1, D4). No scroll animation, no animated counters. Full `prefers-reduced-motion` handling.

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
- No five identical cards: "Choose your world" is a card grid since the revamp (D1), four world cards each in its own accent, and dev as a slim full-width strip.
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
- **The canonical Academic Integrity Policy** (`apps/main/src/content/pages/academic-integrity.md`) is exempt from the academic-terms check outside research. It has to name assignments, dissertations and exams to say we refuse them. Nothing else on main is exempt.
- **slop-check "stripe-border" WARN on cards with a world accent** (`packages/ui/Card.astro`, revamp, 25 Nov 2026; before it `WorldDividers.astro`). The 3px top edge in each world's accent is the binder divider's edge carried into the card grid: it is how main tells the five worlds apart. Only cards given a world `accent` have it. Kept.
- **Hex values in `scripts/make-og.py`.** An image can't read CSS, so the OG script writes the brand and accent colours out again. They must match `packages/brand/tokens.css`.

## 10. Open TODOs for the owner

| Placeholder | Where | Notes |
|---|---|---|
| [DOMAIN REGISTERED] | Everything | penofwonder.com at Cloudflare; Phase 1C gate |
| [SECOND DOMAIN] | Redirect | penofwonderconsults.com, if cheap |
| [PENOFWONDERRESEARCH.COM REGISTERED?] | Redirect | |
| [BUSINESS EMAIL] | All worlds | Interim: penofwonder@gmail.com (owner, 27 Oct 2026). Replace with the address on penofwonder.com, provider [ZOHO MAIL OR GOOGLE WORKSPACE], at Phase 1C; update the privacy notice's processor line too |
| [FIRST CAMPAIGN YEAR] | Marketing proof | For "across 12+ client campaigns since …". The portfolio dates Northern Star to 2025, so the year is 2025 or earlier |
| [EVIDENCE FILES FOR ALL FOUR NUMBERS] | `_source/proof/` | Screenshots for 12+, 34%, 3.4×, ₦18M+ |
| [NORTHERN STAR CPL FIGURE + EVIDENCE] | Main proof strip, marketing Work | The portfolio already states "Down about 34%" for Northern Star, labelled "directional". Needs an evidence file to be used as a client figure |
| [TESTIMONIAL PERMISSION SCREENSHOTS] | `_source/proof/` | Nife, Beulah Fayinka, Yetty. The brief says confirmed; the rule needs the written "yes" on file |
| [CONFIRM THIS SERVICE IS OFFERED] | Marketing | Social media marketing; page built, kept out of the menu |
| [META PIXEL ID] | Marketing | Not at launch (decided 26 Oct 2026); needed only when the opt-in is added |
| [APPROVE FOUNDER BIO FOR MAIN SITE] | Main home and About | Built as drafted, taking "copy as drafted" (26 Oct 2026) to include it. The About page's longer bio reuses research's approved founder facts. Say if either needs changing |
| Proof register, pending | `packages/config/proof.ts` | Seven entries wait for evidence or a fact; development shows them as [TODO], production leaves them out. Marketing's four figures and main's marketing line won't appear until then |
| Plex Mono × glyph | `packages/brand/public/fonts` | The Plex subset has no ×; "3.4×" would fall back to another font for that one character. Re-subset when the figure goes live |
| [RESEARCH PROOF EVIDENCE] | `_source/proof/research/two-manuscripts-2026/` | The acceptance or publication emails behind "two manuscripts through to publication in 2026". The local build fails until it's there |
| [CV EMAIL] | Research `/files/Wonderful-Adebagbo-CV.pdf` | The web CV still shows the Gmail address; rebuild it from `_source/research/cv/` once the business email exists |
| [SOCIAL LINKS] | Footers | None until company accounts exist |
| [BUSINESS PLAN CLIENT PERMISSION] | Writing Samples | Phase 2 |
| [PRICES OR QUOTE ONLY] | Writing | Settled 21 Nov 2026: quote on request |
| Book facts Q1 to Q27 | `_source/books/intake.md` → `books.ts` | From the owner's mother; section 12 |
| Pixabay page URLs | `_source/books/image-sources.md` | One per Look and Learn photo |
| [FRONT COVERS] | Main, publishing | Clean front-cover files; the scan is evidence, not artwork |
| [CONFIRM THE IMPRINT NAME] | Publishing | "Hidden Treasures" (printed books) vs "Hidden Treasures Publishers" (brief) |
| [TOWN AND STATE PER SCHOOL] | Publishing | Q12 |
| [SELAR/AMAZON LINKS] | Publishing | Only when listings are live |
| Approved testimonials per world | All worlds | `showTestimonials` off until supplied |
| Legal review | Privacy, Terms, cookie notice | Section 13 lists what a lawyer should check |
| [COMPANY SOCIAL ACCOUNTS] | Revamp R5, footer icons | Facebook Page, Instagram professional account, LinkedIn Page, all active |
| [BUFFER ACCOUNT + API KEY] | Revamp R5 | Three channels connected |
| [BREVO ACCOUNT + API KEY] | Revamp R4 | Sending waits for the domain and business email |
| [TELEGRAM BOT TOKEN + CHAT ID] or [EMAIL ALERTS] | Revamp R3 | Owner alerts for new enquiries |
| [CLOUDFLARE ACCOUNT CRON COUNT] | Revamp R3 | Cron triggers already used on the account (5 allowed) |
| [TIMILEGIT REPO PATH, if available] | Revamp R3 to R6 | Reuse its real /api code |
| [TURNSTILE ON?], [VIEW COUNT ON POSTS?] | Revamp R3, R6 | Defaults: off, off |
| [RETENTION PERIOD] | Privacy notice | Suggested: enquiries deleted 24 months after last contact |
| [LEGAL REVIEW] of the revamp privacy notice | Privacy | D1 storage, Brevo, Buffer, Telegram, aggregate counts |

## 11. Questions for the owner (Phase 0)

**Answered 26 Oct 2026:** (1) the latest three posts only; (2) no Meta Pixel at launch; (3) option B, research's buttons stay Ink Green; (4) dev on Workers static assets; (5) accents as proposed; copy as drafted in `PHASE-0.md`. Still open: whether 34% and 3.4× are Northern Star's figures or averages (needs the evidence files).

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

## 16. Phase 1B: what was built, and what changed from the plan (27 Oct 2026)

**Built, locally:** main (home, About, Contact and thanks, Academic Integrity Policy, Privacy, Terms, 404), marketing (home, Services, five service pages, Work, the Northern Star case, Process, FAQ, Blog with the three October posts and RSS, Contact and thanks, 404), and holding sites for writing, publishing and dev. Each world has its sitemap, robots.txt, canonical URLs, Open Graph and Twitter tags, an OG image and JSON-LD (Organization on main with each live world as a sub-organisation; ProfessionalService on each world; Service and FAQPage on marketing; BlogPosting on posts). Security headers for every world come from `packages/brand/public/_headers`.

**Changes from the plan:**
1. **Pending proof.** The build prompt says proof-check fails on any register entry without evidence. Marketing's four figures, the summary line for main, Northern Star's figure and publishing's "printed in 2026" are in the register as `pending`. They render as [TODO] markers in development and review builds (`PUBLIC_SHOW_TODOS=true`) and are left out of production, the same rule the book facts follow. proof-check still fails on any `live` entry without evidence. Result: in production, main's proof strip shows only research's line, and marketing shows no figures yet.
2. **Hidden Treasures on main** lists the six readers as a reading ladder by class, read from `books.ts`, because there are no clean cover files yet. "Printed in 2026" is shown only once its proof entry is live.
3. **The header's second row** carries a short line on worlds without their own page nav: main and the holding pages.
4. **No hero images.** No world image is approved yet, so pages carry none, rather than placeholder boxes. The photo styles in section 4 still stand.
5. **Social media marketing** is built but appears only in development and review builds, out of the menu and the sitemap, until confirmed.
6. **The 16 October post's lead figures (133 leads, two paid) are cut**, because there is no evidence on file; see `_source/fact-check-log-marketing.md`.
7. **Main's Privacy and Terms are new drafts** for every world except research, which keeps its own. Terms deliberately leave payment splits, quote validity and revision rounds to each written quote, since only research's are approved. For a lawyer: liability cap, governing law for UK consumers, refunds of ad spend, international transfers, and whether the NDPA needs a named data protection contact.
8. **Research's prose styles and portrait mount** moved into the shared packages unchanged, so main and marketing use the same ones.

**Checks (27 Oct 2026, all six apps built as on Cloudflare):** integrity-check clean (139 files); proof-check passes on Cloudflare and fails locally only on research's missing evidence folder; contrast-check passes across six worlds in both modes; link-check resolves 2,737 references, cross-world links included; slop-check HIGH 0 everywhere (WARNs recorded in section 9). Screenshots of every page at 360, 768 and 1440 px in light and dark: 174 images in `_source/screenshots/phase-1b/`, no horizontal overflow on any. Lighthouse 13.5.0 mobile, local, home pages: main 97/100/100/100, marketing 94/100/100/100, writing 98/100/100/100, publishing 100/100/100/100, dev 97/100/100/100, research 99/100/100/100. Local runs vary with machine load; PageSpeed after deploy is the measure.

**Could each page belong to a different business if the name were swapped?** Main: no. The binder dividers, the founder's lab story and P-E-N, and the readers by class are specific to this company. Marketing: mostly no. The test log, the ad-spend line in naira and the honest Northern Star case are specific, but the home page leans on its proof readings, which can't show until the evidence is in; until then it reads closer to a generic agency page. The holding pages are deliberately plain.

## 17. Interim hosting before the domain (27 Oct 2026)

The owner asked to go live on Cloudflare's free addresses while penofwonder.com is unregistered, and chose (27 Oct 2026) to leave the existing research site as it is and to use Git-connected projects. Setup steps are in `DEPLOY.md`.

- `packages/config/worlds.ts` gives every world an `interimHost` and a `domainLive` switch (now `false`). Canonical URLs, sitemaps, robots.txt, RSS, JSON-LD, OG image URLs and every cross-world link use the interim addresses until the switch is turned on.
- Interim addresses: main `penofwonder.pages.dev`, marketing `penofwondermarketing.pages.dev`, writing `penofwonderwriting.pages.dev`, publishing `penofwonderpublishing.pages.dev`, research `penofwonderresearch.pages.dev` (the existing site, built from the old repo), dev `penofwonderdev.pages.dev` (an ordinary Pages project until research moves in, then a Worker; see `DEPLOY.md`).
- Research isn't deployed from this repo yet, so only four Pages projects and one Worker are created now; the fifth Pages slot is kept for research.
- The research weekly-rebuild workflow here exits quietly while `CF_DEPLOY_HOOK_RESEARCH` is unset. The old repo's own weekly rebuild keeps releasing research's scheduled blog pieces.
- Until the cutover, a change to the live research site still has to be made in the old repo. Research changes made here (the shared header and footer, the email placeholder) go live only at the cutover.
- The interim sites are indexable, with their own addresses as canonical. When the domain arrives, each `pages.dev` address keeps serving, so add a redirect to the custom domain then (Cloudflare Bulk Redirects), or search engines will see two copies.

## 18. Blogs for marketing, writing and publishing (21 Nov 2026)

- One shared blog: `packages/ui/blog.ts` (schema, which posts are live, structured data, RSS, `llms.txt`), `BlogIndex.astro` and `BlogArticle.astro`. Each world's headings, intro and WhatsApp button are in `packages/config/blogs.ts`. Marketing moved onto it with no change to its three live posts.
- New posts start as `draft: true` with no `publishDate`. Drafts show in development and review builds, marked "Draft" and `noindex`, and never in production. The owner approves each post and picks its date; a post goes live once it has `draft: false` and a date on or before the build day. A future date waits for the first build after it.
- A blog's `/blog` page and its "Blog" menu link appear on a live world once it has one live post, and on a holding site (Publishing) once it has three (`blogMinPosts`). Before that, `/blog` isn't built at all. `worldUrl()` lets `/blog` paths through for `soon` worlds.
- Every post page carries BlogPosting (author linked to main's About page), BreadcrumbList and, when it has questions, FAQPage. Each site serves `/rss.xml` and `/llms.txt`.
- Posts may cite Meta's Business Help Centre, so `integrity-check` now allows `facebook.com/business/help/` links. Every other facebook.com link is still banned.
- `[YOUR STORY: ...]` gaps are flagged HIGH by `slop-check` on purpose: each must be filled with a real story or deleted before a post is approved.
- Fact checks are logged in `_source/fact-check-log-marketing.md`, `-writing.md` and `-publishing.md`.
- Search and AI-answer features on every post (owner's request, 21 Nov 2026): a `description` (meta description, 120 to 155 characters) and an optional `seoTitle` (60 at most); the title tag adds the world's name only when it fits in 60 characters. Posts open with the answer in 40 to 60 words, then "In short", question-style H2s, at least one table or checklist, "Questions this answers" (FAQPage) and cited primary sources. Pages carry an "On this page" list (four or more H2s), an "About the author" line with approved facts (`authorBio` in `packages/config/blogs.ts`) and three related posts. BlogPosting includes `wordCount`, `abstract` and `articleSection`.
- Internal links between posts are written as normal Markdown links (`/blog/slug`). `linkBuiltPostsOnly()` shows a link only once its target post is built, and plain text before that, so posts can link to drafts without leaving broken links in production.

## 19. Writing goes live; Marketing takes the portfolio's ads posts (21 Nov 2026)

- On the owner's instruction, Writing is `live` ahead of the brief's Phase 2 conditions. Built: home (boundary sentence under the hero), Services, six service pages (CVs and cover letters, LinkedIn profiles, Grant writing, Business plans and proposals, Ghostwriting, Editing and proofreading), How it works, FAQ (boundary sentence word for word), Request a quote (the shared form) and thanks, and the blog. Every job is quoted on request (owner's choice); no prices, turnaround times or revision counts are promised.
- Not built: the Samples page, which waits for written permission from the clients concerned ([BUSINESS PLAN CLIENT PERMISSION]). No proof strip: Writing has no register entry yet.
- Writing's signature detail is the closing section set as the end of a letter, with a signature line.
- Publishing stays a holding site until the book facts are in (owner's choice, 21 Nov 2026).
- Marketing's blog now holds the founder's 45 ads posts from the portfolio, besides the first three. The portfolio still serves the same posts; its copies need rel="canonical" pointing here, or redirects, so search engines don't see duplicates. Details in `_source/fact-check-log-marketing.md`.

## 20. Revamp, Nov 2026 (Phase R0, 25 Nov 2026)

Source: `Pen of Wonder Consults/Website/pen-of-wonder-revamp-brief.md` (24 Nov 2026). The owner asked for Edunotech's page anatomy and TIMILEGIT's automations on the existing worlds. Copy, brand tokens, world structure and every non-negotiable in CLAUDE.md stay. This section records what the revamp changes; where it is silent, sections 1 to 19 still hold. Status: **proposed, waiting on the owner's go-ahead (end of Phase R0).** Nothing below is built yet.

### 20.1 Rule changes (brief section 3), with the defaults applied

| # | Rule today | Change | Default taken |
|---|---|---|---|
| D1 | Icons: none (4); no three identical icon cards (7) | Edunotech's card grid, one icon per card | Allowed. Hand-drawn single-weight line SVGs in one shared `Icon.astro`, no icon pack. One icon per world or service. On main, dev stays a narrower card so the five aren't identical |
| D2 | Radius 0, 2px on buttons and inputs | Rounded cards, pill buttons | Cards and panels 12px, inputs 8px, buttons 999px: `--radius`, `--radius-sm`, `--radius-pill` in `packages/brand/tokens.css`. Replaces the "paper has square corners" line in 4 |
| D3 | No shadows anywhere | Soft shadow | One `--shadow` token, used on card hover and on the floating WhatsApp button only. Never on a card at rest |
| D4 | No scroll animation; motion limits | Decorative hero SVG with a slow pulse | One decorative hero SVG per world (section 20.3), slow CSS pulse on a few elements, no scroll-triggered animation, no counters, fully still under `prefers-reduced-motion` |
| D5 | No social links or icons until company accounts exist | Share buttons and footer icons | Share buttons on blog posts allowed now (share intents, not company links). Footer social icons stay off until `packages/config/social.ts` holds real company URLs |
| D6 | Forms store nothing on the site | Submissions in D1 | Storage in the Pen of Wonder D1 database allowed, with the privacy notice updated first (brief section 6). The CLAUDE.md line changes with it |
| D7 | Eyebrow labels on research only | Eyebrow pills everywhere | Allowed on every world: an uppercase label in a pill, Spark Gold on green or dark grounds, the world accent on light grounds |
| D8 | Gold once per layout, to mark the win | Edunotech uses its lime many times | Rule kept. Spark Gold carries only the hero's highlighted phrase. Eyebrow pills on dark grounds use a Cream outline or low-opacity Spark Gold, whichever passes `contrast-check` (reported in R1) |
| D9 | `integrity-check` bans facebook.com outside Meta's help centre | Share buttons need the sharer URL | `facebook.com/sharer/sharer.php` added to the allow list. Nothing else |

Sections 4, 7 and 9 will be edited to point here when R1 starts, so no two rules contradict each other.

### 20.2 Components (brief 4.1), all in `packages/ui`

| Component | New or reworked | Replaces |
|---|---|---|
| `Header.astro` | Reworked: sticky, hairline border once scrolled, pill "Chat on WhatsApp" in the world accent, drawer open and close icons | today's header (dropdown behaviour kept) |
| `PageHero.astro` | New: dark band, eyebrow, H1, lead, up to two buttons | `PageHead.astro` on inner pages |
| `HomeHero.astro` | New: Fraunces 700 sentence case, final phrase in Spark Gold, lead, two pill buttons, step-word strip, decorative SVG | each world's hand-built hero |
| `Eyebrow.astro` | New (D7) | |
| `SplitIntro.astro` | New: two-column intro | "problem and the turn" blocks, founder block |
| `CardGrid.astro`, `Card.astro` | New (D1, D3): whole-card link, icon tile, title, two lines, "Go to … →" | `WorldDividers.astro`, service lists |
| `Steps.astro` | New layout: numbered circles on a dashed line | `HowWeWork.astro` layout and each world's process list (same steps, same words) |
| `FeatureBand.astro` | New: dark two-column band with a numbered panel | Hidden Treasures block, featured case |
| `CtaPanel.astro` | New: closing call to action in a rounded dark panel | each page's final section |
| `Footer.astro` | Reworked: dark band, brand block, columns, newsletter row, legal row | today's footer |
| `WhatsAppFloat.astro` | New: fixed round button, `data-event="whatsapp_float"` | |
| `ShareMenu.astro` | New (R5) | |
| `Form.astro` primitives | New (R3): field, error, consent, honeypot, status | `ContactForm.astro` internals |
| `Icon.astro` | New (D1) | |

### 20.3 Decisions made in R0 (owner may reverse)

- **Dark mode hero bands.** Main's band is Ink Green in light mode and Spark Gold in dark mode today. A Spark Gold phrase can't sit on a Spark Gold band, so in dark mode every HomeHero and PageHero band becomes Deep Ink (as the brief specifies for PageHero), with Spark Gold for the phrase.
- **Hero motif.** Fine ruled lines with ink drops on them, one inline SVG per world in its accent at low opacity; main uses all five accents. Two variants shown in R1.
- **Eyebrow and card-link wording** is new copy the layout needs. It will be drawn from words already on each page (section headings, world and service names) and listed for approval in R1, never invented claims.
- **HomeHero step strip** uses the four How we work steps, shortened as the brief gives them: Message · Consult · Quote · Deliver.
- **Before screenshots:** every page in each live sitemap, plus 404 and thank-you pages, plus two posts per blog (all posts share one layout), at 360 and 1440 px in light and dark: `_source/screenshots/revamp-before/`.

### 20.4 Open questions for the owner (conflicts the brief doesn't settle)

1. **Research's own rules. Answered 25 Nov 2026: revamp research too, overriding its rules.** The revamp's D1 to D9 apply inside research as everywhere else: eyebrows, icon cards, hover shadow, rounded corners, share buttons naming LinkedIn and Facebook, the decorative hero. In R2 `apps/research/DESIGN.md` section 7 and `apps/research/CLAUDE.md` (No social links) get a line pointing here. Not overridden, because the brief keeps them closed: research's academic-integrity rules, the "What we do and don't do" box, its proof line, its voice rules and its edit specimen. The live research site stays on the old repo until cutover.
2. **Empty commits.** CLAUDE.md and the brief say never push one. On 21 Nov 2026 I pushed two, because Cloudflare built only main (then only main and writing) after pushes that changed marketing, writing and publishing. Those projects' build watch paths are probably not set as in 13.1. Please check them in the Cloudflare dashboard; the per-project deploy hooks in brief 5.10 give a safe fallback once they exist.

### 20.5 Pages that will change

Every page on every world changes through the shared header, footer (with the newsletter row) and the floating WhatsApp button. On top of that:

| World | Page | What changes |
|---|---|---|
| Main | Home | HomeHero, world CardGrid, proof strip on Cream, Steps, Hidden Treasures FeatureBand, founder SplitIntro, testimonials (unchanged, flag-gated), CtaPanel |
| Main | About, Contact, Academic Integrity, Privacy, Terms, contact thanks, 404 | PageHero; Contact gets details beside the form; Privacy rewritten for D6 (brief 6, legal review) |
| Main | New: newsletter "check your email" and "confirmed" (R4) | New, `noindex` |
| Marketing | Home | HomeHero (Raspberry), SplitIntro, service CardGrid, proof readings, Steps (five-step test log), Northern Star FeatureBand, FAQ, latest posts, CtaPanel |
| Marketing | Services, five service pages, Work, Northern Star, Process, FAQ, Contact, thanks, 404 | PageHero; Services gets the jump index; Contact two-column |
| Marketing | Blog index, 52 posts | PageHero, "Most read this month" rail (R6), ShareMenu (R5), newsletter block |
| Writing | Home, Services, six service pages, How it works, FAQ, Request a quote, thanks, 404 | As marketing; the letter-ending signature stays as Writing's signature detail |
| Writing | Blog index, 5 posts | As marketing |
| Publishing | Holding page, 404 | PageHero, SplitIntro, "Notify me" form beside WhatsApp |
| Dev | Holding page, 404 | As publishing |
| Research (monorepo copy only) | All pages and 23 posts | Same anatomy as the other worlds (question 1); Ink Green buttons kept (26 Oct decision). The live research site stays on the old repo until cutover |

### 20.6 Phase R1: built on main (25 Nov 2026)

- **Tokens** (`packages/brand/tokens.css`): `--radius-sm` 8px, `--radius` 12px, `--radius-pill`, one `--shadow`, `--section` and `--gutter` (Edunotech's spacing), the container widened to 75rem, and a band palette (`band`, `band-panel`, `band-ink`, `band-muted`, `band-rule`, `band-gold`): Ink Green by day, a deeper ink than the page at night. Buttons are pills; `.btn-on-band` and `.btn-band-outline` sit on bands.
- **Contrast:** every new pairing added to `scripts/contrast-check.mjs` (text and secondary text on bands and band panels, the gold phrase on the band, Cream buttons on bands, eyebrow text on page and panels). All pass across six worlds in both modes; the gold phrase is 4.80:1 on Ink Green (large text needs 3). D8: eyebrows on bands are a Cream outline, so Spark Gold appears once, in the hero. In dark mode main's world accent is already Spark Gold (26 Oct decision), so its buttons and page eyebrows are gold too; that predates the revamp and is unchanged.
- **Components** in `packages/ui`: Icon, Eyebrow, InkMotif, HomeHero, PageHero, SplitIntro, Card, CardGrid, Steps, FeatureBand, CtaPanel, WhatsAppFloat, NewsletterForm, plus the reworked Header (sticky, hairline once scrolled, pill WhatsApp button, drawer icons, `data-menu-open` hides the float) and Footer (dark band, brand block with the emblem on every world, columns, newsletter row, legal row with room for the float). `how-we-work.ts` holds the four steps for both the old and new layouts. `packages/config/api.ts` holds the pow-api origin, `null` until R3, so the newsletter row is shown disabled with "Newsletter signups open soon." and collects nothing.
- **Main:** home, About and Contact rebuilt in the new anatomy. `WorldDividers.astro` removed (the world cards replace it).
- **Shared, so visible on every world now:** the header, footer, newsletter row, floating WhatsApp button, pill buttons, 8px form fields and the wider container. The inner pages of the other worlds change in R2.
- **Hero variants for the owner** (development only, `/design/ruled`, `/design/trail`, `/design/photo`): ruled lines with drops; one pen stroke with drops; the approved desk photograph with the motif faint behind the band. **Owner chose "photo" (25 Nov 2026):** each world's hero shows its approved photograph with the ruled motif faint behind the band; a world without a photograph shows the motif alone.
- **New wording the layout needed, for approval:** hero eyebrow "Pen of Wonder Consults"; eyebrows "Pen of Wonder" (worlds), "Hidden Treasures" (books), "Our founder", "About", "How we think", "P-E-N", "Contact"; the founder section's heading "Wonderful Adebagbo" (was "Our founder", now its eyebrow); About's "That way of working comes from a lab." moved from the first sentence of a paragraph into a heading; card links "Go to Marketing →" and "Opening soon: see what's coming"; hero step strip "Message · Consult · Quote · Deliver"; footer headings "Pen of Wonder", "Worlds", "Connect", "Newsletter", the link "Home", the line "New guides from our blogs, in one email a month.", the newsletter consent "I agree to receive the newsletter and can unsubscribe at any time. See our privacy notice.", and "Newsletter signups open soon."; Contact's "Reach us directly".
- **Screenshots:** `_source/screenshots/revamp-r1/` (before and after for home, About and Contact at 360 and 1440 px, light and dark; the three hero variants).

### 20.7 Phase R2: rolled out to every world (25 Nov 2026)

- **Hero tokens:** `--color-hero-bg`, `--color-hero-ink`, `--color-hero-highlight` and `--color-hero-underline`. By day the home hero is the world's band; at night it is deep ink. Spark Gold on the Raspberry, Olive and Terracotta bands measured 2.87, 2.89 and 2.94:1 (large text needs 3), so on those three worlds the highlighted phrase is Cream with a Spark Gold underline by day, and Spark Gold at night. Main, research and dev keep the gold phrase (4.80, 4.80, 3.50:1). Both pairs are in `contrast-check`, and every world passes in both modes.
- **Every inner page** opens with the dark band: `PageHead` (shared and research's own) now wraps `PageHero`, and slotted text, links and buttons are restyled for the band. Policy pages on main and research use it too. Research's "What we do and don't do" box on Coaching, and the red-pen line on its Contact page, moved from inside the old header to just below the band, still near the top.
- **New shared components:** `ServiceSections` (the Services page's jump index and one section per service, alternating grounds), `ContactSection` (details beside the form, now on main, marketing and writing), `LatestPosts` (three post cards on a home). `Card` takes a `kicker`; `Icon` has one line icon per service, plus coaching for research; `CtaPanel` takes an `after` slot.
- **Marketing:** home (HomeHero in Raspberry with the five-step test log as its strip, the problem, service cards, proof readings and the ad-spend line, Steps, the Northern Star feature band, testimonials, latest posts, FAQ, closing panel), Services, every service page, Process, FAQ, Contact; the Northern Star case opens on the dark band.
- **Writing:** home (Olive hero, boundary sentence directly under it, the problem, service cards, Steps, latest posts, FAQ with the Marketing line, a closing panel that ends with the letter signature, Writing's signature detail), Services, every service page, How it works, FAQ, Request a quote.
- **Publishing and Dev (holding):** PageHero with the world's headline and WhatsApp, "What's coming" beside the world's photograph (Dev's section on graph paper), then "Hear when we open" with WhatsApp beside the shared form in notify mode, then the latest posts once a blog is on.
- **Research (monorepo copy):** home (HomeHero with the desk photo; long headlines step down a size; where-to-start cards with who each is for; the edit specimen kept as research's signature; the founder's published work; testimonials; the free review as the closing panel), every inner page on the band, the floating WhatsApp button. `apps/research/CLAUDE.md` and `DESIGN.md` point here. The live research site is still the old repo until cutover; the monorepo's research blog template predates the old repo's 21 Nov answer, FAQ and related-pieces fields, so those come across at cutover.
- **Blog posts** (all worlds) end with a newsletter block before the related posts. Share buttons come in R5 and "Most read" in R6.
- **More new wording, for approval:** eyebrows "Service", "Services", "Process", "Work", "FAQ", "Contact", "Request a quote", "How it works", "How to work with us", "The problem", "Featured case", "Blog", "Research", "Our founder", "Coaching", "Publication support", "Work with us", "Opening soon", "Pen of Wonder Research"; card link "See what's included"; Northern Star panel items taken from its summary ("Rebuilt the account" and so on); Marketing's "Send a message" button and "Not sure which service fits?" panel with "Tell us what you sell and what you've tried, and we'll say which service would help first."; Writing's hero strip "Brief · Quote · Talk · Draft · Deliver"; holding pages' "What's coming", "Hear when we open" and "Leave your email and we'll write once, when [world] opens. Or ask us now on WhatsApp."; the notify hint "What you'd like to hear about when we open."; the post newsletter block "Get new guides by email" and "One email a month with the new posts from our blogs."; LatestPosts' "Read the post" and "All posts".
- **Screenshots:** `_source/screenshots/revamp-r2/`, homes and key inner pages of every world at 360 and 1440 px, light and dark.

# DESIGN.md

The design brief for Pen of Wonder Research. Every visual and copy decision traces back to something here. `[ASSUMED]` marks a guess the owner should confirm. `[PROPOSED]` items from the original brief carry a verdict.

Written 17 October 2026 (Phase 0).

## 1. The job

- **Client / site:** Pen of Wonder Research, the research service of Pen of Wonder Consults (a registered business name in Nigeria), run by Wonderful Adebagbo from Ibadan (WAT, UTC+1). One person, so the site speaks as "I".
- **The one job of the home page:** within 10 seconds, a researcher believes "this person knows how journal manuscripts work and won't embarrass me", and a student believes "this person will teach me, not do it for me".
- **Primary action:** "Send your manuscript for a free one-page review", to `/contact?as=researcher`.
- **Secondary actions:** the editing-firm door (`/work-with-me`) and the student door (`/coaching`).

## 2. Audience and context

- **Who visits:**
  1. Researchers: Nigerian lecturers, preprint authors, health professionals, PhD students and recent graduates who want a paper published.
  2. Editing firms and research teams who hire freelance editors and proofreaders.
  3. Postgraduate students in the UK (many Nigerian) who want dissertation coaching or SPSS and NVivo tutoring.
- **Where and on what device:** Nigerian researchers mostly on mid-range Android phones over mobile data; UK postgraduates on phones and laptops; editing-firm managers on laptops, scanning for credentials. Design for a mid-range Android on a slow connection first: small pages, self-hosted subset fonts, no client framework, images under 100 KB each where possible.
- **What they already know or worry about:** researchers fear predatory journals, desk rejection and being embarrassed by sloppy editing; they want to remain the author. Firms want proof of care and a test edit. Students worry about cost and, if they are careful, about anything that looks like contract cheating. Lecturers who land on the student pages must not see an essay mill.
- **Language and tone:** plain, warm, direct British English. Wonderful's 2025 "30 Lessons" posts are the model: short sentences, first person, honest about early mistakes ("I was wrong."), a practical tip at the end.

## 3. Concept

- **Concept:** a manuscript returned by a careful editor. Good paper, clear type, generous margins, and in the margin a few precise comments in the editor's hand. The site is the clean manuscript; editing marks appear only where they prove something.
- **Why it fits:** the service is editing and manuscript preparation. Showing a real-looking tracked-changes edit, with the reason for every change, demonstrates the skill instead of claiming it. Verdict on [PROPOSED]: **kept**.

### Signature detail: the language of editing, with restraint

- **Edit specimen** (`EditSpecimen` component): one paragraph shown as a tracked-changes edit, with Word's own view names (All Markup, No Markup, Original) as a CSS-only radio group, comment balloons labelled WA1, WA2, WA3 that say why each change was made, visually hidden "deletion start / end" and "insertion start / end" text for screen readers, and comments that drop below the paragraph as numbered notes on phones. Labelled: "An illustrative example written for this page. Not a client's manuscript." Used twice only: Home (methods paragraph, STROBE) and Publication support (results sentence that overclaims). Draft text is in `PHASE-0.md` for approval.
- **Proof marks, two on the whole site,** hand-drawn inline SVG strokes based on BS 5261 proof-correction marks, drawn in Win Gold since the brand change:
  1. **404 page:** a caret (insertion mark) under the missing word in "This page is ⁁ here", with the margin note "Not found. Try the contents below."
  2. **Contact page, under the "free one-page review" line:** a ring round "three changes". Justification: it is the one promise that best captures what the reviewer does (picks the three things that matter most), the contact page is where a visitor decides to send work, and a single ring there is a small human touch at the moment of trust. It does not compete with the specimen, which lives on Home and Publication support, not Contact.
- **Margin notes for asides:** on wide screens the main column sits left of centre and a narrow right margin holds short asides (a definition of STROBE, a note on predatory journals). On phones, asides sit inline in a quiet muted style. This is where the layout's asymmetry comes from.
- Nothing else gets the editing treatment.

## 4. Decisions

**Brand change, 17 Oct 2026.** During Phase 1 the owner asked for the site to carry the Pen of Wonder Consults brand (`C:UsersUserClaudeProjectsPen of Wonder ConsultsBrand`, Brand Core v1, Oct 2026), choosing "full brand" over a sub-brand. This replaces the Phase 0 paper-and-ink palette and the Source Serif 4 / Source Sans 3 pairing. It also reverses the earlier rule to keep this site visually apart from the Meta-ads work: both now sit under one masterbrand. Kept from the brief: the manuscript concept, the edit specimen, first person singular ("I", not the brand's "we"), and no tagline (owner chose not to use "Words that make you win." here).

Each line: the choice, then why.

- **Mode:** light by default (Parchment), following `prefers-color-scheme`, with a manual toggle. Dark is the manuscript under a desk lamp, on the brand's Deep Ink. Inline script in `<head>` prevents a flash; the choice is stored in `localStorage` inside try/catch.
- **Background:** Parchment `#EDEEE7` / `oklch(0.946 0.009 113.2)`. Dark: Deep Ink `#1B2420`. Why: the brand's main background, and close to the manuscript paper the concept asks for.
- **Panels** (comment balloons, the do/don't box, the photo mount): Cream `#F4F0E4`. Dark panels: `oklch(0.302 0.022 166.8)`, a lifted Deep Ink. The photo mount stays Cream in both modes so the white-backed portraits read as mounted prints.
- **Text:** Deep Ink `#1B2420`; dark mode Cream. **Headings:** Ink Green `#0F433B` (brand: "logo, headings, buttons"); dark mode Cream.
- **Actions** (primary button, focus ring, comment labels and markers, link underline on hover): Ink Green with Cream text. Dark mode: Spark Gold `#D4A24A` with Deep Ink text (brand: Spark Gold on dark or green grounds only).
- **Gold:** Win Gold `#A5701F` marks "the win" once per layout, as the brand rules say. On this site it is used only for the two proof marks (Contact ring, 404 caret) and the drop in the OG image. At 3.6:1 it is never used for small text.
- **Tracked-change red:** `oklch(0.504 0.168 28.3)` (dark `oklch(0.721 0.137 29)`), used only for `<del>` and `<ins>` inside the edit specimen, because it depicts Word's markup. It is the one colour outside the brand palette, kept on purpose (owner approved in the brand question).
- **Neutrals:** Quill Grey `#5B6661` for secondary text; hairline rules `oklch(0.868 0.014 120.3)`; form borders `oklch(0.596 0.015 159.7)`. Dark equivalents in `global.css`.
- **Semantic tokens:** `--color-bg`, `--color-panel`, `--color-text`, `--color-heading`, `--color-muted`, `--color-rule`, `--color-rule-strong`, `--color-accent`, `--color-on-accent`, `--color-gold`, `--color-mark-del`, `--color-mark-ins`, `--color-comment-bg`, `--color-mount`. Raw OKLCH palette tokens (converted from the brand hex values, which are noted beside each) feed them.
- **Heading font: Fraunces** (brand). Static instance at weight 700, optical size 72, SOFT 0, WONK 0: the brand's headline face, held back from the board's heaviest weight because this is a reading site. Covers £, ₦, ẹ, ọ, ṣ; lacks ǹ and ḿ (rare in headings). 19 KB for basic Latin.
- **Body font: Inter** (brand). Variable 400 to 600 at optical size 16, plus a 400 italic for journal names. Inter is on the skill's over-used list; the written reason is that it is the masterbrand's body face and consistency across the brand outweighs novelty here. Covers every Yoruba and Hausa character tested.
- **Numbers: IBM Plex Mono** (brand, "numbers and proof"): prices, dates, the contents numbers on Home and the step numbers. Not used for reference lists, which stay in Inter with tabular figures for readability. Subset to ASCII plus £, ₦, ·, en dash, arrow.
- **Self-hosting:** all three families as WOFF2 in `public/fonts`, split into basic and extended Latin with `unicode-range`; Inter and Fraunces basic files are preloaded. No Google Fonts request.
- **Type scale ratio:** 1.25, fluid with `clamp()`; headings tracked -0.012em to -0.02em, `text-wrap: balance`; paragraphs `text-wrap: pretty`; body measure about 65ch.
- **Spacing feel:** airy, like a manuscript margin, on Tailwind's 4px step (4, 8, 12, 16, 24, 32, 48, 64, 96 in use).
- **Radius:** 0, with 2px on buttons, inputs and the specimen toggle. Why: paper has square corners.
- **Borders vs shadows:** hairline rules only. No shadows.
- **Icons:** none, except the arrow character in text links and a WhatsApp glyph on WhatsApp buttons.
- **Logo:** the emblem (quill circle) in the footer at 144px, green on light and cream on dark, cropped from the brand's transparent PNGs to the circle. The brand says not to show the emblem below about 120px, so the header keeps a Fraunces text wordmark instead of a tiny emblem. Favicon, touch icon and 512px icon are the brand's ink-drop files (Brand/Icons), unchanged. The POW mark is not used on the site (brand: avatars and social).
- **Imagery:** only Wonderful's two studio portraits, cropped to 4:5 around the subject, in Cream mounts. Hand-on-chin on Home (`fetchpriority="high"`), arms-crossed on About (lazy). AVIF and WebP with JPEG fallback.
- **Motion:** 150 to 250ms transitions on colour, `transform` and `opacity` for buttons, menu, specimen toggle, FAQ. No scroll animation. Full `prefers-reduced-motion` handling.

### Contrast check

Output of `node scripts/contrast-check.mjs` (17 Oct 2026, reads the tokens from `src/styles/global.css`):

```
light  ink on paper           13.61:1  needs 4.5  pass  body text
light  ink on panel           13.97:1  needs 4.5  pass  text in comment balloons and the do/don't box
light  heading on paper        9.52:1  needs 4.5  pass  headings
light  muted on paper          5.11:1  needs 4.5  pass  secondary text, dates, captions
light  muted on panel          5.24:1  needs 4.5  pass  secondary text inside panels
light  markup on paper         5.49:1  needs 4.5  pass  tracked-change marks (del/ins)
light  accent on paper         9.52:1  needs 4.5  pass  links on hover, comment labels
light  accent on panel         9.77:1  needs 4.5  pass  comment labels inside balloons
light  onAccent on accent      9.77:1  needs 4.5  pass  primary button label, comment markers
light  accent on paper         9.52:1  needs 3  pass  focus ring
light  gold on paper           3.64:1  needs 3  pass  gold proof marks (graphics and large text only)
light  ruleStrong on paper     3.41:1  needs 3  pass  form field borders
dark   ink on paper           13.97:1  needs 4.5  pass  body text
dark   ink on panel           11.77:1  needs 4.5  pass  text in comment balloons and the do/don't box
dark   heading on paper       13.97:1  needs 4.5  pass  headings
dark   muted on paper          7.66:1  needs 4.5  pass  secondary text, dates, captions
dark   muted on panel          6.46:1  needs 4.5  pass  secondary text inside panels
dark   markup on paper         6.08:1  needs 4.5  pass  tracked-change marks (del/ins)
dark   accent on paper         6.86:1  needs 4.5  pass  links on hover, comment labels
dark   accent on panel         5.78:1  needs 4.5  pass  comment labels inside balloons
dark   onAccent on accent      6.86:1  needs 4.5  pass  primary button label, comment markers
dark   accent on paper         6.86:1  needs 3  pass  focus ring
dark   gold on paper           6.86:1  needs 3  pass  gold proof marks (graphics and large text only)
dark   ruleStrong on paper     4.02:1  needs 3  pass  form field borders
both   ink on mount           13.97:1  needs 4.5  pass  photo mount (fixed paper in both modes)

All pairs pass.
```

## 5. Content inventory

| Content | Have it? | Source / TODO |
|---|---|---|
| Services | Yes | This brief; Publication support, Work with me, Coaching |
| Prices | Coaching only | Approved GBP prices (see below). No prices for researchers or firms (quoted after review) |
| Testimonials | No | Component built, `showTestimonials: false` until written-permission quotes arrive |
| Photos | Yes | Two studio portraits in `_source/`; [PHOTOGRAPHER CREDIT] |
| Credentials | Yes | Two DOIs verified 17 Oct 2026 via Crossref; BSc (McPherson, 4.88/5.0); roles listed in the brief |
| Contact | Partly | WhatsApp, email and Formspree form (xdeabooe) confirmed; [CALENDLY LINK] |
| FAQs | Yes | Publication support FAQ from the brief |
| Blog | Source only | 120 posts and the content plan in `_source/`; six launch pieces in Phase 2 |

## 6. Page structure

Site map: `/`, `/publication-support`, `/work-with-me`, `/coaching`, `/about`, `/blog`, `/blog/[slug]`, `/rss.xml`, `/contact`, `/contact/thanks`, `/academic-integrity`, `/privacy`, `/terms`, `/404`, plus `sitemap-index.xml` and `robots.txt`.

Home, in order:
1. **Opening:** H1, two-sentence paragraph, primary button, hand-on-chin portrait in its mount. Desktop: text on a wide column left of centre, portrait narrower to the right. Phone: text first, portrait after.
2. **Three doors, set like a journal's contents page:** three entries separated by hairline rules, each with who it is for, one sentence and a text link. Stacked list on a phone.
3. **Edit specimen**, introduced in one line as what the free review looks at.
4. **Published work and background:** two APA 7 references with DOIs, Wonderful in bold, then one plain line of background. No counters.
5. **The free one-page review:** two or three sentences and the button. Slot for [TODO: anonymised sample one-page review, optional].
6. **Testimonials:** present, hidden by the flag.

Other pages follow section 5 of the build prompt. Footer on every page: the business-name line, Academic Integrity Policy, Privacy, Terms, contact, theme toggle.

## 7. What this site will NOT do

- No purple or blue, and no gradients.
- No glowing blobs, glassmorphism, aurora, noise textures, marquees, WebGL, 3D or shader effects (`immersive-effects.md` read only to confirm none is needed).
- No badge pill above the H1. No eyebrow labels, except at most two on the whole site.
- No three identical icon cards. No icon on any card.
- No stats counters, round-number banners, client counts, logos, star ratings or "trusted by" strips.
- No testimonial carousel; no testimonials at all until approved.
- No coloured left-border stripes on callouts. No hover lift on cards. No shadows.
- No fade-up on scroll.
- No strikethrough jokes or red underlines outside the specimen, and no proof marks beyond the two gold ones.
- No emoji, exclamation marks, em dashes or buzzwords. No "Get started" or "Learn more".
- No social links or icons, no link to wonderfuladebagbo.link.
- No percentages from the CV, no "150 researchers" claim, no postgraduate study.

## 8. References

- The concept's own references: Microsoft Word's Review pane (view names, comment balloons, tracked-change colours) and BS 5261 proof-correction marks. Taking: the vocabulary and the logic of marks. Not taking: Word's UI chrome, its blue, or its fonts.
- A journal's printed contents page: taking the hairline-ruled list for the three doors. Not taking any journal's branding or logo.

## 9. Intentional exceptions

slop-check (17 Oct 2026): HIGH 0. WARNs kept on purpose:

- **`_source/` (em dashes, emoji, slop words: over 1,100 hits).** These are Wonderful's original LinkedIn posts, kept as source material. `_source/` is gitignored and never built or deployed. The blog rewrites remove all of it.
- **Inter (over-used font).** The Pen of Wonder Consults brand sets Inter as its body face; brand consistency is the reason. See section 4.
- **`console.log` in `scripts/`.** These are command-line tools whose job is to print results. None is in `src/`.
- **TODO markers in the footer pages.** Deliberate visible placeholders for the owner and a lawyer; listed in section 10.
- **En dashes in APA page ranges (145–170)** are typographic convention, not em dashes. slop-check only matches U+2014.
- **Hex values** in `BaseLayout.astro` (`theme-color` meta), `site.webmanifest` and `scripts/make-brand-assets.py` are the brand's hex values in places that cannot read CSS variables.
- **"Think. Check. Submit." (triad)** in the G23 blog guide is the real name of the publishing-industry checklist it links to, not a slogan.
- **Eyebrow labels:** two on the whole site, "Where to start" above the contents list on Home and "What I do and don't do" on the Coaching box.

## Decisions confirmed by the owner (17 Oct 2026)

- Email: adebagbo.wonderfull@gmail.com.
- Host: Cloudflare Pages, free plan, with Cloudflare Web Analytics. Live address: https://penofwonderresearch.pages.dev (project name without hyphens), connected to the private GitHub repo Simplywonderful/pen-of-wonder-research for automatic deploys from main. Commercial use permitted under the Self-Serve Subscription Agreement (https://www.cloudflare.com/terms/, last updated 12 Sep 2025, checked 17 Oct 2026). Web Analytics "does not use any client-side state, such as cookies or localStorage" (https://www.cloudflare.com/web-analytics/, checked 17 Oct 2026).
- Formspree free plan, reCAPTCHA off. No-JavaScript submissions land on Formspree's own thank-you page; JavaScript submissions go to /contact/thanks.
- H1 (left to me): "I help researchers get their manuscripts ready for a journal and through peer review."
- Edit specimens approved as drafted in PHASE-0.md section 5.
- Coaching prices approved: £40 single session, £110 for 3 sessions (SPSS or NVivo), £210 for 6 dissertation sessions.
- Font change approved: Source Serif 4 headings, Source Sans 3 body. Superseded the same day by the brand change (section 4).
- Brand: full Pen of Wonder Consults brand (colours, Fraunces, Inter, IBM Plex Mono, emblem, ink-drop icons). No tagline. Tracked-change marks stay red inside the specimen only.

## 10. Open TODOs for the owner

| Placeholder | Where | Notes |
|---|---|---|
| [CONFIRM SUBJECTS] | Work with me | Draft: biochemistry and life sciences, public health and health sciences, social sciences, education, business |
| [CONFIRM STYLES] | Work with me | Draft: APA, Harvard, Vancouver, AMA |
| [HOURS PER WEEK] | Work with me | |
| [HOLD: revised CV] | Work with me | No CV link until supplied |
| [ZOOM / GOOGLE MEET] | Coaching | |
| Pack validity period | Coaching | Assumed 3 months (analysis pack) and 6 months (dissertation pack) |
| [CALENDLY LINK] | Coaching, Contact | |
| [CONFIRM PAYMENT METHODS] | Terms | Raenest, Grey, NGN bank transfer |
| [CONFIRM REFUND POLICY], deposits | Terms | |
| [RETENTION PERIOD] | Privacy | Note: Formspree free keeps submissions 30 days; copies also sit in your email |
| [CAC BN NUMBER] | Footer | Optional |
| [PHOTOGRAPHER CREDIT] | About or footer | |
| [HIGH-RESOLUTION ORIGINALS] | Photos | Not needed at current sizes; only if larger display is wanted |
| Approved testimonials | Home | Written permission, initials and role only; section hidden until then |
| [TODO: anonymised sample one-page review] | Home | Optional |
| Terms: quote validity, revisions, session notice period, unused pack sessions | Terms | Drafted with assumptions (14 days) marked [TODO]; confirm or change |
| Terms: liability and governing law | Terms | For a lawyer, Nigeria and UK clients |
| Privacy: providers' transfer mechanisms | Privacy | Confirm Formspree, Google, Meta, Cloudflare safeguards |

## 11. Launch checks (17 Oct 2026)

- Live at https://penofwonderresearch.pages.dev. All 13 pages, RSS, sitemap, robots.txt, fonts and icons return 200; unknown URLs return the custom 404.
- No cookies, no localStorage entries until someone uses the theme switch, and no third-party requests (checked in the browser on /contact before analytics is switched on).
- PageSpeed Insights (Google's servers, mobile): Home 100 / 100 / 100 / 100 (LCP 1.5 s, TBT 0 ms, CLS 0); Publication support 100 / 100 / 100 / 100 (LCP 1.2 s, TBT 0 ms, CLS 0). Local Lighthouse on this Windows machine swings widely between identical runs (49 to 97 on the same page) because of machine load, so the PageSpeed figures are the ones to trust.
- Cloudflare Web Analytics is on (beacon from static.cloudflareinsights.com). With it running, the site still sets no cookies and writes nothing to storage (checked in the browser on /contact).
- Contact form connected to Formspree form xdeabooe (free plan, reCAPTCHA off). A test message sent through the live form on 17 Oct 2026 was accepted and the visitor was taken to /contact/thanks. Inbox delivery to be confirmed by the owner.
- Weekly rebuild: the GitHub Action pushes an empty commit on Mondays when a blog piece has a releaseDate, which triggers a Cloudflare build. No deploy hook or secret needed.

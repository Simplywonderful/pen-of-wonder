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
- **Red-pen marks, two on the whole site,** hand-drawn inline SVG strokes based on BS 5261 proof-correction marks:
  1. **404 page:** a caret (insertion mark) under the missing word in "This page is ⁁ here", with the margin note "Not found. Try the contents below."
  2. **Contact page, under the "free one-page review" line:** a ring round "three changes". Justification: it is the one promise that best captures what the reviewer does (picks the three things that matter most), the contact page is where a visitor decides to send work, and a single ring there is a small human touch at the moment of trust. It does not compete with the specimen, which lives on Home and Publication support, not Contact.
- **Margin notes for asides:** on wide screens the main column sits left of centre and a narrow right margin holds short asides (a definition of STROBE, a note on predatory journals). On phones, asides sit inline in a quiet muted style. This is where the layout's asymmetry comes from.
- Nothing else gets the editing treatment.

## 4. Decisions

Each line: the choice, then why.

- **Mode:** light by default, following `prefers-color-scheme`, with a manual toggle. Dark is "the same manuscript under a desk lamp": warm dark paper, cream text, the red lifted for contrast. A tiny inline script in `<head>` sets `data-theme` before paint; the manual choice is stored in `localStorage` inside try/catch. Verdict: **kept**.
- **Dominant colour (ink):** warm near-black `oklch(0.24 0.015 60)`; dark mode cream `oklch(0.92 0.022 85)`. Why: a manuscript's identity is its ink, and paper-and-ink keeps this brand apart from the blue-and-red Meta ads brand. Verdict: **kept**.
- **Background (paper):** warm off-white `oklch(0.975 0.008 85)`; dark `oklch(0.215 0.012 60)`. Panel (comment balloons, the do/don't box): `oklch(0.945 0.012 82)`; dark `oklch(0.26 0.014 62)`. Verdict: **kept**.
- **Accent colour (editor's red), under 10%:** `oklch(0.53 0.19 27)`; dark `oklch(0.72 0.15 32)`. Used for edit marks, the primary button, focus rings and link underlines on hover. Not used for form errors (ink text plus `aria-invalid`), so red keeps one meaning: "the editor touched this". Verdict: **kept**, dark value set to `0.72 0.15 32` to clear 4.5:1 on the dark panel.
- **Neutrals:** muted text `oklch(0.47 0.016 62)` / dark `oklch(0.75 0.02 80)`; form borders `oklch(0.58 0.014 65)` / dark `oklch(0.55 0.016 70)`; hairline rules (decorative) `oklch(0.86 0.012 78)` / dark `oklch(0.34 0.014 65)`. All tinted warm toward the paper; no stock greys.
- **Semantic tokens:** `--color-bg`, `--color-text`, `--color-muted`, `--color-rule`, `--color-rule-strong`, `--color-panel`, `--color-accent`, `--color-on-accent`, `--color-mark-del`, `--color-mark-ins`, `--color-comment-bg`, `--color-mount` (always light paper). Raw OKLCH palette tokens feed these; components use only semantic tokens.
- **Heading font: Source Serif 4** (variable, optical sizes 8 to 60; Display optical size for large headings). Verdict on [PROPOSED] Newsreader: **changed**. Newsreader passes £, ₦ and curly quotes, and is not on the skill's over-used lists, but its character set lacks ṣ and Ṣ (U+1E63, U+1E62), ǹ and ḿ, which Yoruba names and words need; a heading such as a blog title with "Ṣeun" would fall back to another font mid-word. Source Serif 4 has all of them, keeps the journal-page feel (it was drawn for long-form reading and has true optical sizes like Newsreader), and is in the skill's "bookish or academic" pool. Checked with fontTools against the Google Fonts files on 17 Oct 2026.
- **Body font: Source Sans 3.** Verdict: **kept**. Not on the over-used lists; has £, ₦, curly quotes and every Yoruba character tested, plus Hausa ɓ and ɗ. It shares a skeleton with Source Serif 4, so the pair reads as one hand. Known gap: Hausa ƙ (U+0199) is missing in all four fonts tested; it would fall back to the system font if ever used. Acceptable: no Hausa copy is planned.
- **Third family:** none. References and dates use Source Sans 3 with `tabular-nums`; no mono is needed.
- **Licences:** both SIL Open Font License; self-hosted WOFF2, Latin plus Latin Extended (Latin Ext Additional covers ṣ ẹ ọ), weights used only (serif 500 and 600 with opsz axis; sans 400, 400 italic, 600).
- **Type scale ratio:** 1.25, fluid with `clamp()`. Headings large with tight tracking (-0.015em to -0.025em), `text-wrap: balance`; paragraphs `text-wrap: pretty`; body measure 65ch; `tabular-nums` on dates, prices and references. Why: 1.25 gives clear hierarchy without the shouting of an editorial 1.5 scale, which suits a working document.
- **Spacing feel:** airy, like a manuscript margin, on one 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64, 96). Why: margins are the concept.
- **Radius:** 0, with 2px only on form fields and buttons for touch comfort. Why: paper has square corners.
- **Borders vs shadows:** hairline rules only, like the rules between articles in a journal's contents. No shadows.
- **Icons:** none, except an arrow glyph (→, a text character) in text links where it helps, and a WhatsApp mark on the WhatsApp button. No icon on any card.
- **Imagery:** only Wonderful's two studio portraits, each shown as a print mounted on the page: a paper-coloured mount with a hairline rule that stays paper-coloured in dark mode, so it reads as a photo clipped to the manuscript rather than a white hole. No tilt, no shadow, no paperclip. Hand-on-chin on Home (`fetchpriority="high"`), arms-crossed on About (lazy). Astro's image pipeline outputs AVIF and WebP. Source files are 1023 px wide, enough for display up to about 500 CSS px. No watermark seen on either.
- **Motion:** almost none. 150 to 250 ms transitions on `transform` and `opacity` only, for the theme toggle, menu, specimen toggle and form states. No scroll animation. Full `prefers-reduced-motion` handling.

### Contrast check

Output of `node scripts/contrast-check.mjs` (17 Oct 2026). WCAG 2.x ratios; body text needs 4.5:1, large text and UI 3:1.

```
light  ink on paper           15.34:1  needs 4.5  pass  body text
light  ink on panel           14.04:1  needs 4.5  pass  text in comment balloons and the do/don't box
light  muted on paper          6.37:1  needs 4.5  pass  secondary text, dates, captions
light  muted on panel          5.83:1  needs 4.5  pass  secondary text inside panels
light  accent on paper         5.41:1  needs 4.5  pass  edit marks (del/ins), hovered links
light  accent on panel         4.95:1  needs 4.5  pass  edit marks inside comment panels
light  onAccent on accent      5.41:1  needs 4.5  pass  primary button label
light  accent on paper         5.41:1  needs 3  pass  focus ring
light  ruleStrong on paper     4.00:1  needs 3  pass  form field borders
dark   ink on paper           13.85:1  needs 4.5  pass  body text
dark   ink on panel           12.29:1  needs 4.5  pass  text in comment balloons and the do/don't box
dark   muted on paper          7.88:1  needs 4.5  pass  secondary text, dates, captions
dark   muted on panel          6.99:1  needs 4.5  pass  secondary text inside panels
dark   accent on paper         6.65:1  needs 4.5  pass  edit marks (del/ins), hovered links
dark   accent on panel         5.91:1  needs 4.5  pass  edit marks inside comment panels
dark   onAccent on accent      6.65:1  needs 4.5  pass  primary button label
dark   accent on paper         6.65:1  needs 3  pass  focus ring
dark   ruleStrong on paper     3.61:1  needs 3  pass  form field borders
both   ink on mount           15.34:1  needs 4.5  pass  photo mount (fixed paper in both modes)

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
| Contact | Partly | WhatsApp and email confirmed; [FORMSPREE FORM ID]; [CALENDLY LINK] |
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

- No purple or blue, and no gradients (except possibly the OG image).
- No glowing blobs, glassmorphism, aurora, noise textures, marquees, WebGL, 3D or shader effects (`immersive-effects.md` read only to confirm none is needed).
- No badge pill above the H1. No eyebrow labels, except at most two on the whole site.
- No three identical icon cards. No icon on any card.
- No stats counters, round-number banners, client counts, logos, star ratings or "trusted by" strips.
- No testimonial carousel; no testimonials at all until approved.
- No coloured left-border stripes on callouts. No hover lift on cards. No shadows.
- No fade-up on scroll.
- No strikethrough jokes or red underlines outside the specimen and the two red-pen marks.
- No emoji, exclamation marks, em dashes or buzzwords. No "Get started" or "Learn more".
- No social links or icons, no link to wonderfuladebagbo.link.
- No percentages from the CV, no "150 researchers" claim, no postgraduate study.

## 8. References

- The concept's own references: Microsoft Word's Review pane (view names, comment balloons, tracked-change colours) and BS 5261 proof-correction marks. Taking: the vocabulary and the logic of marks. Not taking: Word's UI chrome, its blue, or its fonts.
- A journal's printed contents page: taking the hairline-ruled list for the three doors. Not taking any journal's branding or logo.

## 9. Intentional exceptions

Anything slop-check flags that is kept on purpose (filled in Phase 1).

- En dashes in APA page ranges (145–170) are typographic convention, not em dashes. slop-check only matches U+2014, so they are not flagged; noted here so no one "fixes" them into em dashes.

## Decisions confirmed by the owner (17 Oct 2026)

- Email: adebagbo.wonderfull@gmail.com.
- Host: Cloudflare Pages, free plan, with Cloudflare Web Analytics. Commercial use permitted under the Self-Serve Subscription Agreement (https://www.cloudflare.com/terms/, last updated 12 Sep 2025, checked 17 Oct 2026). Web Analytics "does not use any client-side state, such as cookies or localStorage" (https://www.cloudflare.com/web-analytics/, checked 17 Oct 2026).
- Formspree free plan, reCAPTCHA off. No-JavaScript submissions land on Formspree's own thank-you page; JavaScript submissions go to /contact/thanks.
- H1 (left to me): "I help researchers get their manuscripts ready for a journal and through peer review."
- Edit specimens approved as drafted in PHASE-0.md section 5.
- Coaching prices approved: £40 single session, £110 for 3 sessions (SPSS or NVivo), £210 for 6 dissertation sessions.
- Font change approved: Source Serif 4 headings, Source Sans 3 body.

## 10. Open TODOs for the owner

| Placeholder | Where | Notes |
|---|---|---|
| [FORMSPREE FORM ID] | Contact form | Create the form on the free plan; switch reCAPTCHA off (it is Google's and sets cookies) |
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

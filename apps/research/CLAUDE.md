# Pen of Wonder Research

Website for Pen of Wonder Research, the research service of Pen of Wonder Consults (Wonderful Adebagbo, Ibadan), at research.penofwonder.com. Astro, static output, Tailwind v4. Since 26 Oct 2026 it lives in the Pen of Wonder monorepo at `apps/research`, imported with its history; the old pen-of-wonder-research repo is frozen until cutover.

Read this folder's DESIGN.md and the root DESIGN.md before any UI or copy change. Inside research, this file and research's DESIGN.md win over anything generic at the root. Load the `handcrafted-frontend` skill (installed at the repo root) for any UI work.

The site uses the Pen of Wonder Consults brand. The family's colours, fonts and buttons live in `packages/brand/tokens.css`; research's own additions (the specimen red, the photo mount, the sheet layout) live in `src/styles/global.css`. Run `node scripts/contrast-check.mjs` from the repo root after any colour change. The header and footer are the shared ones in `packages/ui`; contact details, the site address and the legal line come from `packages/config`. The site speaks as the company ("we"), with Wonderful Adebagbo as founder and the face of the brand (owner decision, 24 Oct 2026).

## Non-negotiables

### UK law on contract cheating (Skills and Post-16 Education Act 2022, ss. 26 to 28)
- Providing or advertising a service that completes all or part of a student's assignment is a criminal offence in England, even when the audience is mixed. Tutoring and legitimate proofreading are not caught.
- Student pages sell teaching, never doing. The student always writes the work and runs the analysis.
- Never use: "we write your dissertation", "assignment help", "do my assignment", "guaranteed grade", "pass guaranteed", "100% plagiarism-free", "undetectable", "AI-free", "write my essay", or anything offering to complete work. No "done for you", "we handle it", "leave it to us" on student-facing pages.
- No proofreading or editing offered to students. Editing is for researchers' manuscripts and for firms.
- The root `scripts/integrity-check.mjs` fails the build on banned phrases in `src/`. Run it with slop-check. With the company voice, watch for "we write…", "we do…", "we handle…" on student pages: teaching only.

### Mixed audience
- Every student page has a visible "What we do and don't do" box near the top.
- The Academic Integrity Policy is linked in the footer of every page. Its canonical copy is on the main site (penofwonder.com/academic-integrity); research's `/academic-integrity` 301s there.

### No invented proof
- No fake testimonials, client counts, logos, star ratings, stock quotes or "trusted by" strips.
- Testimonials only from quotes supplied with written permission, as text, initials and role only. Never student assignment feedback. Research's `show` flag in `packages/config/testimonials.ts` stays false until approved quotes exist.
- No percentage claims from the CV (30%, 50%, 200%). Not the "approximately 150 researchers and students" claim.
- No postgraduate study (MSc, MPH) anywhere on the site.
- The 2026 work is described only as: "helped a researcher take two manuscripts through to publication". It is read from the proof register (`packages/config/proof.ts`, entry `research-manuscripts`). Never name the papers or the client.

### Voice
- Plain, warm, direct. British spelling.
- Company pages speak as Pen of Wonder Research: "we", "our", "us". Never invent a team: no "our team of editors", "our statisticians", staff counts or named roles that don't exist. Wonderful is named as founder.
- Blog posts keep the author's first-person voice ("I") with a byline; they are his experiences.
- The edit specimen's margin comments stay in the editor's singular voice ("I've taken these from…"), as real editor comments would.
- No em dashes anywhere: copy, alt text, meta, code comments.
- No exclamation marks. No emoji.
- No buzzwords: leverage, elevate, unlock, empower, seamless, cutting-edge, world-class, tailored solutions, journey, delve, robust, game-changing, "in today's fast-paced world", "whether you're X or Y".
- Buttons say what happens next ("Send your manuscript", "Book a 60-minute session"), never "Get started" or "Learn more".

### No social links
- No LinkedIn, Facebook, social icons or link to wonderfuladebagbo.link. The blog's "Adapted from posts first shared on LinkedIn" line has no link.
- Revamp exception (owner, 25 Nov 2026; root DESIGN.md 20): share buttons on blog posts may name LinkedIn, Facebook, X and Telegram. They are share intents, not company links. Footer social icons stay off until company accounts exist.

### Contact details
- WhatsApp: +234 704 641 8092, `https://wa.me/2347046418092` with a short prefilled message.
- Never use the old number +234 903 572 2959 (it is in LinkedIn posts 1 and 2; strip it).
- Email: the business address in `packages/config/contact.ts`. Until it exists it shows as a `[TODO]`; no Gmail fallback.
- Reply time: within one working day.

### Placeholders and sources
- Anything unknown is shown as a visible `[TODO]` placeholder and listed in DESIGN.md section 10. Never invent.
- The repo-root `_source/research/` holds the CV, phone numbers and raw posts. It is gitignored and must never be committed or deployed.

## Blog batches
- Dates (owner decision, 30 Oct 2026): pieces are spaced fortnightly, on Mondays, continuing from the latest `publishDate` on the blog (the first sixteen run from 5 Jan to 17 Aug 2026; the next five from 31 Aug to 26 Oct 2026). Readers see the date, and the blog list and RSS are ordered by it, newest first. Fill dates up to today; anything beyond today is scheduled. If the owner gives specific dates, use those. A past date goes live on the next build; a future date stays hidden until the weekly rebuild after that day. The original LinkedIn dates go in `sourceDates` and appear only in the "Adapted from posts first shared on LinkedIn" line. The weekly rebuild (`.github/workflows/research-weekly-rebuild.yml` at the root) calls research's Cloudflare deploy hook on Mondays when a piece is due that week or scheduled later.
- Follow `_source/research/blog-content-plan.md`. About five pieces per session.
- Search, answer-engine and AI-search readiness (owner request, 21 Nov 2026): pieces are written to be found and quoted, not just adapted. Every piece needs, in front matter: `metaTitle` (under 60 characters, main search phrase first, sentence case), `description` (70 to 160 characters), `keyword` (the search phrase it answers), `answer` (a 40 to 60 word direct answer, shown as "The short answer"), `faq` (three to five real questions, answered only from what the piece says, marked up as FAQPage) and `related` (two or three slugs for "Read next"). The schema enforces these. In the body: H2s phrased as the questions people search ("What is a research design?", "How to choose a sampling technique"), at least one contextual link to another live piece placed at the end of a section, and named, linked sources for any external claim. Never link in the body to a piece whose date is still in the future. Keep slugs unchanged once a piece is live.
- Fact-check every statistic, named study and dated fact against the original source; correct or cut, never invent or repair a reference. Log each in `_source/research/fact-check-log.md`.

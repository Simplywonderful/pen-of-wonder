# Pen of Wonder Research

Website for Pen of Wonder Research, the research service of Pen of Wonder Consults (Wonderful Adebagbo, Ibadan). Astro, static output, Tailwind v4.

Read DESIGN.md before any UI or copy change. Load the `handcrafted-frontend` skill for any UI work.

The site uses the Pen of Wonder Consults brand (source: `C:\Users\User\Claude\Projects\Pen of Wonder Consults\Brand`). Colours and fonts live only in `src/styles/global.css`; run `node scripts/contrast-check.mjs` after any colour change. The brand voice says "we"; this site always says "I".

## Non-negotiables

### UK law on contract cheating (Skills and Post-16 Education Act 2022, ss. 26 to 28)
- Providing or advertising a service that completes all or part of a student's assignment is a criminal offence in England, even when the audience is mixed. Tutoring and legitimate proofreading are not caught.
- Student pages sell teaching, never doing. The student always writes the work and runs the analysis.
- Never use: "we write your dissertation", "assignment help", "do my assignment", "guaranteed grade", "pass guaranteed", "100% plagiarism-free", "undetectable", "AI-free", "write my essay", or anything offering to complete work. No "done for you", "we handle it", "leave it to us" on student-facing pages.
- No proofreading or editing offered to students. Editing is for researchers' manuscripts and for firms.
- `scripts/integrity-check.mjs` fails the build on banned phrases in `src/`. Run it with slop-check.

### Mixed audience
- Every student page has a visible "What I do and don't do" box near the top.
- The Academic Integrity Policy is linked in the footer of every page.

### No invented proof
- No fake testimonials, client counts, logos, star ratings, stock quotes or "trusted by" strips.
- Testimonials only from quotes supplied with written permission, as text, initials and role only. Never student assignment feedback. `showTestimonials` stays false in `src/data/site.ts` until approved quotes exist.
- No percentage claims from the CV (30%, 50%, 200%). Not the "approximately 150 researchers and students" claim.
- No postgraduate study (MSc, MPH) anywhere on the site.
- The 2026 work is described only as: "helped a researcher take two manuscripts through to publication". Never name the papers or the client.

### Voice
- Plain, warm, direct. British spelling. First person singular ("I"), never "we".
- No em dashes anywhere: copy, alt text, meta, code comments.
- No exclamation marks. No emoji.
- No buzzwords: leverage, elevate, unlock, empower, seamless, cutting-edge, world-class, tailored solutions, journey, delve, robust, game-changing, "in today's fast-paced world", "whether you're X or Y".
- Buttons say what happens next ("Send your manuscript", "Book a 60-minute session"), never "Get started" or "Learn more".

### No social links
- No LinkedIn, Facebook, social icons or link to wonderfuladebagbo.link. The blog's "Adapted from posts first shared on LinkedIn" line has no link.

### Contact details
- WhatsApp: +234 704 641 8092, `https://wa.me/2347046418092` with a short prefilled message.
- Never use the old number +234 903 572 2959 (it is in LinkedIn posts 1 and 2; strip it).
- Email: see `src/data/site.ts` (confirmed by the owner, never guessed).
- Reply time: within one working day.

### Placeholders and sources
- Anything unknown is shown as a visible `[TODO]` placeholder and listed in DESIGN.md section 10. Never invent.
- `_source/` holds the CV, phone numbers and raw posts. It is gitignored and must never be committed or deployed.

## Blog batches
- Follow `_source/blog-content-plan.md`. About five pieces per session.
- Fact-check every statistic, named study and dated fact against the original source; correct or cut, never invent or repair a reference. Log each in `_source/fact-check-log.md`.

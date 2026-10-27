# Pen of Wonder

One repo for the Pen of Wonder web estate: the main site at penofwonder.com and five subdomain worlds (marketing, research, writing, publishing, dev). Astro, static output, Tailwind v4, npm workspaces. Owner: Wonderful Adebagbo, Ibadan (WAT, UTC+1).

Read the root DESIGN.md, and the world's own DESIGN.md if it has one, before any UI or copy change. Load the `handcrafted-frontend` skill for any UI work. Research keeps its own rules in `apps/research/CLAUDE.md`; inside research they win over anything generic here.

If a request seems to conflict with a rule below, point it out before doing it.

## Layout

- `apps/<world>`: main, marketing, research, writing, publishing, dev.
- `packages/brand` (tokens, fonts, logos), `packages/ui` (shared components), `packages/config` (contact, worlds, proof, testimonials, legal, books).
- `scripts/`: integrity-check, proof-check, contrast-check, link-check, slop-check runner, books-ready, sync-brand (copies fonts, icons and `_headers` into each app), dev-all, screenshot (full-page, light and dark, flags overflow), make-og.
- `_source/`: gitignored. CV, phone numbers, raw posts, brief, book files, proof. Never commit or deploy it.
- Brand hex values live in exactly one file in `packages/brand`. World URLs live only in `packages/config/worlds.ts`. Contact details live only in `packages/config/contact.ts`.

## Non-negotiables

### Academic work lives only on research
- England's Skills and Post-16 Education Act 2022 (ss. 26 to 28) makes it an offence to provide or advertise a service that completes all or part of a student's assignment, even to a mixed audience. Tutoring and legitimate proofreading are not caught.
- Research keeps every rule in `apps/research/CLAUDE.md`: student pages sell teaching, never doing; the "What we do and don't do" box; no editing or proofreading for students.
- Writing, publishing, marketing, dev and main never mention dissertations, theses, assignments, essays, coursework, homework, exams, term papers or final-year projects as things we write, edit or proofread. Writing states its boundary on its home page and in its FAQ, word for word: "We don't write or edit academic or assessed work. For research support, see our Research team."
- The integrity check runs per app: research keeps its own banned list; every other app also fails on those academic terms, allowed only inside the boundary sentence above.
- The canonical Academic Integrity Policy is penofwonder.com/academic-integrity. Research's `/academic-integrity` 301s to it. Every world's footer links to it.

### No invented proof
- Every number on any world comes from the proof register (`packages/config/proof.ts`): number, exact wording, world, date range and `evidence` (a path under `_source/proof/`). `proof-check` fails the build if an entry has no `evidence`, and locally if the file is missing. Components render numbers only from the register.
- No composite or "representative" results. Own projects are labelled as own projects (the CV campaign, Hidden Treasures).
- Testimonials only from people who agreed in writing (a WhatsApp "yes" counts; keep the screenshot in `_source/proof/`). Each world has a `showTestimonials` flag, off until it has approved quotes. No logos, star ratings, "trusted by" strips or client counts outside the register. No carousels: approved quotes show as a static set.
- No percentages from the CV (30%, 50%, 200%). No "approximately 150 researchers and students" claim.
- No postgraduate study (no MSc, no MPH) on any world.
- Research's proof line is fixed: "helped a researcher take two manuscripts through to publication in 2026". Never name the papers or the client.
- Book facts live only in `packages/config/books.ts` and arrive through `_source/books/intake.md`. A `null` fact is never guessed: it shows as `[TODO: Qn]` in development and is left out of production pages. ISBNs render only with `isbnEvidence` and a valid check digit.

### Voice
- The company speaks as Pen of Wonder ("we", "our", "us"), with Wonderful Adebagbo named as founder and the face of the brand. Never invent a team: no "our editors", "our designers", staff counts or roles that don't exist. "Our illustrator and printer" on publishing is allowed (real suppliers); don't name them without permission.
- Blog posts keep the author's first person ("I") with the byline "By Wonderful Adebagbo, founder".
- Plain, warm, direct. British spelling. Bold promise, lab-grade proof, real numbers only. Faith stays underneath, in the founder story only.
- No em dashes anywhere (copy, alt text, meta, code comments). No exclamation marks. No emoji.
- No buzzwords: leverage, elevate, unlock, empower, seamless, cutting-edge, world-class, tailored solutions, journey, delve, robust, game-changing, "in today's fast-paced world", "whether you're X or Y".
- Buttons say what happens next ("Chat on WhatsApp", "Send your manuscript", "Order for your school"), never "Get started" or "Learn more".

### Contact
- WhatsApp Business: +234 704 641 8092, `https://wa.me/2347046418092`, prefilled with the world and, where known, the service.
- Never use the old number +234 903 572 2959, in any spacing. Don't copy either number printed on the book covers.
- Email: the address in `packages/config/contact.ts`, and nowhere else. Until penofwonder.com has a working business address, the owner chose penofwonder@gmail.com (27 Oct 2026); that replaces the earlier "no Gmail fallback" rule for now. Don't use any other Gmail address.
- Reply time: within one working day.
- No social links or icons on any world until the owner supplies company accounts. No link to wonderfuladebagbo.link.

### Legal and compliance
- Footer on every world: "Pen of Wonder Consults, a registered business name in Nigeria, CAC Business Name No. 7809965."
- Publishing: the Hidden Treasures imprint is the trading name of Wonderful Adebagbo personally. Pen of Wonder provides the services but is never named as the publisher, in copy, schema or metadata.
- Publishing pages say "This is general guidance, not legal advice" wherever copyright or ISBNs come up.
- Forms store nothing on the site. The privacy notice says where emails and WhatsApp messages go and who processes them.
- Every world is cookie-free except marketing, and marketing only if the Meta Pixel decision in DESIGN.md says so.

## Working rules

- Phases end with a STOP: report and wait for the owner's go-ahead.
- Anything unknown is a visible `[TODO]` placeholder, listed in DESIGN.md section 10. Never invent.
- Pin exact versions (`--save-exact`), commit the root lockfile, avoid versions published in the last 7 days, run `npm audit`. No UI kit, animation library or icon pack.
- Small, plain-English commits ("Add marketing process page", not "update").
- Run integrity-check, proof-check, contrast-check, slop-check and link-check before reporting work as done.
- Cloudflare builds every Pages project on a push with zero file changes or with 20 or more commits. Never push empty commits; push in batches of fewer than 20 commits. Research's weekly rebuild uses its deploy hook (`CF_DEPLOY_HOOK_RESEARCH`).

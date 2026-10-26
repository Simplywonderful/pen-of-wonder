# Phase 0 report

26 October 2026. Set-up, brief and decisions. No site code yet apart from the accent test page. DESIGN.md holds the decisions; this file holds the report, the draft copy and the portfolio list.

## 1. What's done

- `C:\Users\User\Claude\Projects\Websites\pen-of-wonder`: git repo with research imported by `git subtree add`, keeping its history (52 commits in all).
- The `handcrafted-frontend` skill installed at the root (`.claude/skills`, `.agents/skills`). Research's own copies were identical and are removed.
- Research's weekly rebuild moved to `.github/workflows/research-weekly-rebuild.yml` and switched to the `CF_DEPLOY_HOOK_RESEARCH` deploy hook. Research's own `package-lock.json` removed in favour of the root lockfile (created in Phase 1A).
- `_source/` (gitignored, checked: `git status` doesn't list it): `brief.md` plus its two diagrams in `brief-media/`, `research/` (everything from research's `_source`), `books/` (six PDFs, the printed-covers scan in `from-mum/`, `intake.md`, `image-sources.md`), `portfolio/` (home, work, the Northern Star case, services, about, contact, the blog index and the three October posts, each with URL and capture time), `proof/` (empty).
- Root `CLAUDE.md` (section 3 of the build prompt as bullets) and `DESIGN.md`.
- `scripts/accent-check.mjs` and the test page `design/accents.html`.
- Pandoc installed for your user account (winget) to convert the brief.

Not done yet: `apps/research/CLAUDE.md` "updated for its new home" is left until Phase 1A, when its paths actually change; nothing in it is wrong today.

## 2. Findings that change the plan

1. **Cloudflare allows five Pages projects per repository, and we have six apps.** Recommendation: dev as a Workers static-assets project from the same repo (DESIGN 13.1).
2. **One accent colour can't pass all four contrast rules.** Each accent is a light/dark pair on one hue, as research already does with Ink Green and Spark Gold (DESIGN 4.1).
3. **34% and 3.4× are presented on the portfolio both as Northern Star's result and as an average across campaigns.** The evidence has to settle which before either enters the register (DESIGN 15, item 1).
4. **The portfolio blog has 47 posts, not three.** Question 1 below.
5. **Nigeria's GAID wants a prominent cookie banner**, which makes the Pixel opt-in heavier than a small bar. Recommendation: launch marketing without the Pixel (DESIGN 13.3).
6. **Push in batches of fewer than 20 commits.** Cloudflare builds every project on a push of 20 or more commits, or with zero file changes.

## 3. Decisions I need from you

1. Marketing blog: the latest three posts only, or all 47?
2. Meta Pixel: (a) launch without it (recommended), or (b) prominent opt-in panel on marketing.
3. Research's buttons: (A) Sage, or (B) stay Ink Green with Sage only in the header rule (recommended).
4. Dev on Workers static assets (recommended), or ask Cloudflare to raise the five-project limit.
5. The five accents on `design/accents.html`: approve, or tell me what to change.
6. Main home and marketing home copy below: approve or edit.
7. Founder bio draft below: approve or edit.
8. Is 3.4× ROAS Northern Star's figure or an average across campaigns? Same question for 34%.

## 4. Where each Phase 0 deliverable is

| Deliverable | Where |
|---|---|
| Repo layout and Cloudflare project plan | `CLAUDE.md` (layout), DESIGN 13.1 |
| Family concept and five sub-concepts | DESIGN 3 |
| Five accents with contrast results | DESIGN 4.1, `design/accents.html`, `node scripts/accent-check.mjs` |
| Header and dropdown design, desktop and phone | DESIGN 6, mocked on `design/accents.html` |
| Main home and marketing home copy | Section 5 below |
| Research migration plan, before-and-after screenshots | DESIGN 14 |
| Meta Pixel facts and recommendation | DESIGN 13.3 |
| Formspree and Cloudflare limits, email DNS checklist | DESIGN 13.1, 13.2, 13.4 |
| Placeholder list | DESIGN 10 |
| `intake.md` and the `books.ts` shape | `_source/books/intake.md`, DESIGN 12 |
| Verdicts on the brief corrections | DESIGN 15 |

To open the test page: run `py -m http.server 4399` from the repo root and go to http://localhost:4399/design/accents.html.

## 5. Draft copy

Bracketed items are placeholders that render as visible `[TODO]` markers. Numbers come from the proof register and appear only once their evidence is on file.

### Main home (penofwonder.com)

**Title:** Pen of Wonder: marketing, writing, research and publishing from Ibadan
**Meta description:** Pen of Wonder runs ads that sell, writes documents that open doors, helps researchers get published and publishes children's readers. Message us on WhatsApp.

**Hero**
H1: Words that make you win.
We run ads that sell, write the documents that get people hired and funded, help researchers get their papers published, and make books children want to read.
Buttons: **Find your service** · **Chat on WhatsApp**

**Choose your world** (H2)
Each part of Pen of Wonder has its own site. Pick the one that fits the job.

- **Marketing.** For business owners, coaches and course creators who want ads that pay for themselves.
  Paid ads on Meta, LinkedIn, TikTok and X · Ad creative built for testing · Landing pages and copy that sells.
  Link: Go to Marketing
- **Writing.** For job seekers, founders, NGOs and anyone applying for funding. Opening soon.
  CVs and LinkedIn profiles · Grant applications and concept notes · Business plans and proposals.
  Link: See what's coming
- **Research.** For researchers preparing a paper for a journal, and for editing firms that need a careful editor.
  Publication support for journal manuscripts · Freelance editing for firms and research teams · Methods coaching for UK postgraduates.
  Link: Go to Research
- **Publishing.** For schools, parents and first-time authors. Opening soon.
  The Hidden Treasures Companion Readers, Basic 1 to 6 · Book writing, editing and ISBN registration · Illustration and printing, quoted per project.
  Link: See what's coming
- **Dev: coming soon.** Websites, automation and business systems. Link: Join the waitlist on WhatsApp

**Proof** (H2: What we can show you)
- Marketing: 34% lower average cost per lead across 12+ client campaigns since [FIRST CAMPAIGN YEAR]. Link: Read the Northern Star case
- Research: Helped a researcher take two manuscripts through to publication in 2026. Link: About publication support
- Publishing (only once its claim is confirmed): Six Companion Readers, printed in 2026. Link: See the readers

**How we work** (H2), an ordered list, the same on every world:
1. **Message us.** Tell us on WhatsApp or by email what you need. We reply within one working day.
2. **Free consultation.** A short chat to understand the job, and an honest answer on whether we're the right fit.
3. **Written quote.** What we'll do, what it costs and when you'll have it. Nothing starts until you agree.
4. **Delivery and revisions.** The work arrives on the agreed date, with the revisions your quote sets out.

**Hidden Treasures** (H2: Hidden Treasures, our founder's readers)
Hidden Treasures is Wonderful Adebagbo's own imprint. He wrote the six Companion Readers for Nigerian primary classes, from picture words in Basic 1 to a final-year story in Basic 6, and they were printed in 2026. Our publishing services grew out of making them.
[FRONT COVERS]
Button: **See the six readers**

**Founder** (H2: Our founder) `[APPROVE FOUNDER BIO FOR MAIN SITE]`
Wonderful Adebagbo was a quiet child who read everything he could find, starting with the Bible. He went on to study biochemistry, graduated top of his class, department and faculty, and published two peer-reviewed papers. The lab taught him a habit he never dropped: state what you expect, test it honestly, and let the evidence decide.
Pen of Wonder is that habit applied to words. Ads are tested like experiments, documents are checked against what their reader needs, manuscripts are edited to a journal's standard, and books are written for children he wants to see reading.
[Portrait: arms crossed, from research's About page]

Our values spell P-E-N:
- **Purpose.** We start from what the work is for: a lead, a job, a publication, a child who keeps reading.
- **Evidence.** We show what we did and what changed, with real numbers or none.
- **Nerve.** We tell you the truth about your ads, your draft or your plan, even when it isn't what you hoped to hear.

**Testimonials** (H2: What clients say). Static, shown only once written permission is on file:
> "Wonderful runs ads like a scientist, not a guesser. He rebuilt our tracking, tested angles methodically, and brought our cost per lead down while we actually understood why. Finally, reporting we could read."
> Nife, Founder, Northern Star Business Consult

> "Our ads started paying for themselves. He found the audiences that actually buy, cut what wasn't working fast, and kept us in the loop the whole way. Sales we could trace to real campaigns."
> Beulah Fayinka, Founder, Delight Fashion

> "He treated our budget like his own. Clear strategy, creatives that converted, and honest weekly updates. We scaled what was working instead of guessing."
> Yetty, Founder, YT Exclusive

(Quotes as they appear on the portfolio home page today. Each needs its written "yes" in `_source/proof/`, ideally for this exact wording on this site.)

**Final call** (H2: Tell us what you need.)
Send a WhatsApp message with a line about the job. We'll reply within one working day and point you to the right part of Pen of Wonder, or tell you honestly if someone else would serve you better.
Buttons: **Chat on WhatsApp** · **Send an email**

### Marketing home (marketing.penofwonder.com)

**Title:** Pen of Wonder Marketing: paid ads run like experiments
**Meta description:** Paid ads on Meta, LinkedIn, TikTok and X, with ad creative, landing pages and copy, for coaches, course creators and online businesses. Tracked, tested, reported plainly.

**Hero band (Raspberry)**
Words that sell
H1: Profitable ads, run like experiments.
We plan, build and run paid ads on Meta, LinkedIn, TikTok and X for coaches, course creators and online businesses, and we show you which naira brought which lead.
Buttons: **Chat about your ads** (WhatsApp: "Hello, I found Pen of Wonder Marketing and I'd like to ask about paid ads") · **Read the Northern Star case**

**The problem** (H2: Most ad budgets are spent on guesses.)
Boosted posts, audiences picked by feel, one creative nobody tested, and a dashboard nobody can read. Money goes out, a few leads come in, and no one can say which part worked, so nothing can be scaled.
Our founder trained in a lab, and we run ads the same way: a clear hypothesis, a controlled test, honest measurement, and a budget that follows the evidence.

**What we do** (H2), a plain list, each item linking to its page:
- **Paid ads.** Strategy, audience research, setup, tracking, optimisation and reporting on Meta, LinkedIn, TikTok and X.
- **Ad creative.** Hooks, scripts, briefs and creatives built to be tested, not admired.
- **Landing pages.** A standalone page, or the page your campaign sends people to.
- **Copywriting.** Sales pages, emails, ad copy and product descriptions.
- **Content writing and SEO.** Website pages, blog articles and content plans.
- [CONFIRM THIS SERVICE IS OFFERED] **Social media marketing.** Content calendars, posting and community replies. (Page built, kept out of the list until confirmed.)

**Proof** (H2: The readings so far), four figures in Plex Mono, each linked to its evidence:
12+ client campaigns launched · 34% lower average cost per lead · 3.4× return on ad spend · ₦18M+ ad spend managed
Label: Across 12+ client campaigns since [FIRST CAMPAIGN YEAR]. Ask us for the breakdown behind any figure.
(Subject to question 8: if 34% and 3.4× are Northern Star's figures, they move to the case study and this row shows only verified averages.)

**Featured case** (H3: Northern Star Business Consult)
A business consultancy was boosting posts with no tracking in place. We rebuilt the account, narrowed it to high-intent audiences on Meta and LinkedIn, wrote and tested new angles, and installed proper conversion tracking. Over three months in 2025, cost per lead fell by [NORTHERN STAR CPL FIGURE], and every lead could be traced to the campaign that brought it.
Link: Read the Northern Star case

**How a campaign runs** (H2), an ordered list:
1. **Diagnose.** We audit your ads, your offer and your tracking, and agree the one number that matters.
2. **Hypothesise.** We write down which audiences and angles we expect to win, and why.
3. **Build.** Creatives, campaign structure, pixel and events, checked before launch.
4. **Test.** Controlled tests across platforms. The data decides.
5. **Scale and report.** Budget moves to what wins, and you get a plain-English report on a schedule we agree.

**Pricing line**
Most clients start from about ₦200,000 a month in ad spend. That is the budget paid to the ad platforms, not our fee, which we quote after a free consultation.

**What clients say** (static, flag-gated): the three quotes above.

**From the blog** (H2): the three latest posts, by Wonderful Adebagbo, founder.

**Questions** (H2), native `<details>`:
- *Which platforms do you run ads on?* Meta (Facebook and Instagram), LinkedIn, TikTok and X.
- *What ad budget do I need?* Most clients start from about ₦200,000 a month in ad spend. We'll tell you honestly if ads aren't the right move for you yet.
- *Do you make the creatives too?* Yes: the angles, the briefs and the ads themselves.
- *Do you answer my leads for me?* No. We advise on how leads should be handled (reply speed, first message, follow-up) but your team runs the inbox. That keeps our reporting honest about what the ads did.
- *Where are you based?* Ibadan, Nigeria. Everything runs remotely, so where you are doesn't matter.
- *How do we start?* Send a WhatsApp message about your offer. We reply within one working day.

**Final call** (H2: Make your ad spend accountable.)
Tell us about your offer and your goal. If ads are the right move, we'll show you how we'd test it. If they aren't yet, we'll say so.
Button: **Chat about your ads**

## 6. Changes the portfolio needs (for you to make in its own repo)

1. **Old WhatsApp number.** Every WhatsApp button on the portfolio (home, work, services, about, the Northern Star case) links to wa.me/2349035722959, the number the new sites must never show.
2. **Blog canonicals.** Once posts move to marketing, give the portfolio's copies `rel="canonical"` to marketing, or replace them with links.
3. **"Hire for a campaign"** should send people to marketing.penofwonder.com.
4. **"Representative results across recent client campaigns"** becomes "across 12+ client campaigns since [FIRST CAMPAIGN YEAR]", and the 34% and 3.4× labels need to agree with the Northern Star case (question 8).
5. **"Trusted by" line and client logo strip** (hero and home) break the family's proof rules; worth removing on the portfolio too, since buyers will see both sites.
6. **Hosting.** The portfolio is on Vercel. Vercel's free Hobby plan is for non-commercial, personal use; a site selling paid ads services needs Pro or another host. Worth checking against Vercel's current terms.
7. **Email.** The portfolio uses wonderfuladebagbo@gmail.com; research uses adebagbo.wonderfull@gmail.com. Once the business email exists, both should point to it or say which is which.
8. **"Academic-Writing-Samples" link** on the About page (tinyurl). With the new academic-integrity line across the family, check what it links to and whether it still belongs on a page that links to the company.

## 7. Next step

Phase 1A (monorepo packages and research moved onto them) starts on your go-ahead and your answers to section 3.

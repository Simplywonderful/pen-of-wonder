# Phase 0 report

Pen of Wonder Research. Prepared 17 October 2026. Nothing here is built yet; this is for your approval.

Contents: 1. Answers I need · 2. Site map · 3. Home copy · 4. Publication support copy · 5. Edit specimens · 6. Hosting · 7. Formspree and analytics · 8. Coaching prices · 9. DOI check · 10. Other things I noticed. The placeholder list is in DESIGN.md section 10.

---

## 1. Answers I need before Phase 1

1. **Email:** `wonderfuladebagbo@gmail.com` (your CV) or `adebagbo.wonderfull@gmail.com` (earlier brief)?
2. **Hosting:** Cloudflare Pages free (my recommendation) or Vercel Pro? See section 6.
3. **H1:** A, B or C (section 3), or a change.
4. **Edit specimens:** approve, or tell me what to change (section 5).
5. **Coaching prices:** approve, adjust, or keep hidden for now (section 8).
6. **Formspree plan:** free (no-JavaScript visitors see Formspree's own thank-you page) or Personal (about $10 a month billed yearly, gives the `/contact/thanks` redirect). See section 7.
7. **Font change:** I swapped Newsreader for Source Serif 4 because Newsreader cannot set ṣ/Ṣ for Yoruba names. Reason in DESIGN.md section 4. Say if you'd rather keep Newsreader.

Anything else (subjects, styles, hours, Calendly, prices, legal items) can come during Phase 1; it shows as a visible `[TODO]` until then.

---

## 2. Site map as I'll build it

```
/                         Home
/publication-support      For researchers
/work-with-me             For editing firms and research teams
/coaching                 For postgraduate students (dissertation coaching, SPSS, NVivo)
/about
/blog                     index
/blog/[slug]              one page per piece
/rss.xml
/contact                  form preset by ?as=researcher | editing-firm | student
/contact/thanks
/academic-integrity       footer
/privacy                  footer
/terms                    footer
/404
/sitemap-index.xml, /robots.txt
```

Header: wordmark "Pen of Wonder Research" (Source Serif 4), then Publication support, Work with me, Coaching, About, Blog, Contact. On phones the links sit behind a "Menu" button (a real `<button>` with `aria-expanded`).

Footer, every page: "Pen of Wonder Research is the research service of Pen of Wonder Consults, a registered business name in Nigeria [CAC BN NUMBER, optional]." Then Academic Integrity Policy, Privacy, Terms, WhatsApp, email, and the theme toggle.

---

## 3. Home copy

### H1 options

Each one avoids promising acceptance.

- **A (my pick):** I help researchers get their manuscripts ready for a journal and through peer review.
  *Why:* says the job plainly, in first person, and "through peer review" names the hard part without promising acceptance.
- **B:** From thesis chapter to submitted paper, with an editor who reads like a reviewer.
  *Why:* more vivid and very specific to Nigerian researchers turning dissertations into papers, but says less about what I actually do.
- **C:** Careful editing and publication support for researchers, and one-to-one teaching for postgraduate students.
  *Why:* covers both audiences in the H1, but it is longer and reads more like a services list.

### Opening

> **I help researchers get their manuscripts ready for a journal and through peer review.**
>
> I'm Wonderful Adebagbo, a research writer and editor in Ibadan with a background in biochemistry. I also teach postgraduate students to plan their dissertations and run their own analysis in SPSS and NVivo.
>
> [Button] Send your manuscript for a free one-page review
>
> [Portrait, mounted] Alt: "Wonderful Adebagbo in a dark suit, resting his chin on his hand and smiling."

### Three doors (set like a contents page, hairline rules between)

> **For researchers**
> Publication support
> Turning a thesis chapter into a paper, editing for journal style, reporting checks, choosing a journal and answering reviewers.
> [Link] How publication support works →
>
> **For editing firms and research teams**
> Work with me
> Freelance editing and proofreading of research manuscripts, theses and reports, in Word with tracked changes and clear comments. I'm happy to do a test edit.
> [Link] My editing details →
>
> **For postgraduate students in the UK**
> Coaching and tutoring
> One-to-one sessions on planning your dissertation and running SPSS or NVivo yourself. I teach and give feedback; you write the work.
> [Link] Coaching and tutoring →

### Edit specimen

> **What the free review looks for**
> Here is the kind of thing I notice: a methods paragraph that leaves out what a reviewer needs to know.
>
> [EditSpecimen: specimen 1, section 5]

### Published work and background

> **Published work**
>
> Adeyanju, A. A., **Adebagbo, W. B.**, Molehin, O. R., & Oyenihi, O. R. (2025). Exploring the multi-drug resistance (MDR) inhibition property of sildenafil: Phosphodiesterase 5 as a therapeutic target and a potential player in reversing MDR for a successful breast cancer treatment. *AIMS Medical Science, 12*(2), 145–170. https://doi.org/10.3934/medsci.2025010
>
> Adeyanju, A. A., Oyedeji, T. A., **Adebagbo, W. B.**, Oluyitan, O. P., & Adeyanju, S. A. (2021). Protective effects of luteolin and gallic acid against storage-induced oxidative damage in whole blood of female Wistar rats. *Applied In Vitro Toxicology, 7*(2), 61–70. https://doi.org/10.1089/aivt.2020.0028
>
> I've been a research writer since 2021. In 2026 I helped a researcher take two manuscripts through to publication. I analyse data in SPSS and NVivo, and at ADAC Data Consult I designed and led a six-month field study and trained the field researchers who collected its data.

### The free one-page review

> **The free one-page review**
>
> Send me your manuscript as a share link, with the journal you're aiming for if you have one. Within 3 working days I'll send back one page: the three changes I'd make first, and why. It costs nothing, and you don't have to go further.
>
> [Button] Send your manuscript for a free one-page review
>
> [Slot, hidden until supplied: anonymised sample one-page review]

### Testimonials

Component present, hidden (`showTestimonials: false`).

### Meta

- Title: `Pen of Wonder Research: manuscript editing and publication support`
- Description: `Wonderful Adebagbo helps researchers prepare manuscripts for journals and peer review, and teaches postgraduate students dissertation skills, SPSS and NVivo.`

---

## 4. Publication support copy

> # Publication support for researchers
>
> You've done the research. I help you turn it into a paper a journal will take seriously: clear structure, complete reporting, the right journal, and calm answers to reviewers. You stay the author throughout.
>
> [Button] Send your manuscript for a free one-page review

### What I help with

Set as a two-column definition list (term left, detail right; stacked on phones).

> **From thesis to paper**
> Cutting a thesis or dissertation chapter down to one argument, at journal length.
>
> **Structure and journal style**
> Editing for clarity, flow and the target journal's author guidelines, in Word with tracked changes and comments.
>
> **Reporting checks**
> Checking your manuscript against the guideline reviewers will use: [STROBE](https://www.equator-network.org/reporting-guidelines/strobe/) for observational studies, [CONSORT](https://www.equator-network.org/reporting-guidelines/consort/) for randomised trials, [PRISMA](https://www.equator-network.org/reporting-guidelines/prisma/) for systematic reviews and [COREQ](https://www.equator-network.org/reporting-guidelines/coreq/) for interviews and focus groups.
>
> **Quantitative analysis**
> Choosing, running and reporting statistical tests in SPSS, with results written so they say what the data shows and no more.
>
> **Qualitative analysis**
> Coding and thematic analysis in NVivo, and writing up themes with the quotes that support them.
>
> **Review methods**
> Planning and reporting systematic and literature reviews: search strategy, screening and synthesis.
>
> **Referencing**
> Tidying references in Mendeley or Zotero and matching the journal's style.
>
> **Choosing a journal**
> Shortlisting journals that fit your scope, and spotting predatory ones before they take your fee.
>
> **Formatting and submission**
> Title page, abstract, cover letter, declarations and the submission system itself.
>
> **Responses to reviewers**
> A point-by-point response that answers each comment, with the matching changes in the manuscript.

Margin aside (wide screens; inline on phones): "A reporting guideline is a checklist of what a paper must tell readers so they can judge it. The EQUATOR Network keeps the official versions."

### How it works

> 1. **Send the manuscript.** A share link is fine, with the target journal and any deadline.
> 2. **Free one-page review.** Within 3 working days: the three changes I'd make first, and why.
> 3. **Quote.** A fixed price based on length and what the paper needs.
> 4. **The work.** Tracked changes and comments, so you see every edit and decide on each one.
> 5. **Reviewer responses.** When the reviews come back, I help you answer them.

### Edit specimen

> **Where papers lose reviewers**
> Results sections often claim more than the design can support. Here is the kind of sentence I'd change, and why.
>
> [EditSpecimen: specimen 2, section 5]

### Questions

Native `<details>` / `<summary>`.

> **Who is the author?**
> You are. The ideas, data and conclusions are yours, and you approve every change. Where a journal asks you to acknowledge writing or editing support, I'll help you word it.
>
> **Do you guarantee acceptance?**
> No one honestly can. Editors and reviewers decide. I make the paper as strong as it can be and help you choose a journal that fits it.
>
> **Is my manuscript kept confidential?**
> Yes. I don't share manuscripts, and I don't name clients.
>
> **Can you tell me if a journal is predatory?**
> Yes. If a journal on your list looks predatory, I'll tell you, and show you why.
>
> **How much does it cost?**
> I quote after the free review, because it depends on the length of the paper and what it needs. There's no charge for the review itself.

> [Button] Send your manuscript for a free one-page review

### Meta

- Title: `Publication support for researchers | Pen of Wonder Research`
- Description: `Help turning a thesis into a paper, editing for journal style, STROBE, CONSORT, PRISMA and COREQ checks, choosing a journal and answering reviewers.`

---

## 5. Edit specimens

Both are **illustrative examples written for these pages, not a client's manuscript**. That label sits under each specimen. The study, places and numbers are invented for the example.

The comments show the habit I'd want a reviewer to see: I never invent facts for the author. Where I add detail, the comment says where it came from (the author's own protocol or tables) and asks them to check it.

### Specimen 1 (Home): methods paragraph, STROBE

**Original**

> A descriptive cross-sectional study was carried out among women in Oyo State to assess there knowledge of breast cancer screening. Participants were selected randomly from health centres. A total of 420 questionnaires were distributed and 386 were returned which were analysed using SPSS. Data was presented using tables and percentages.

**All Markup** (~~struck~~ = deletion, **[bold in brackets]** = insertion)

> A descriptive cross-sectional study was carried out among women ~~in Oyo State~~ **[aged 30 to 65 attending six primary health centres in Ibadan, Oyo State, between March and May 2025,]**¹ to assess ~~there~~ **[their]** knowledge of breast cancer screening. ~~Participants were selected randomly from health centres.~~ **[Centres were chosen by multistage sampling, and women were recruited consecutively at general outpatient clinics.]**² ~~A total of 420 questionnaires were distributed and 386 were returned which were analysed using SPSS.~~ **[Of 420 women approached, 386 returned completed questionnaires (response rate 91.9%). Data were analysed in IBM SPSS Statistics version 29.]**³ ~~Data was presented using tables and percentages.~~

**No Markup**

> A descriptive cross-sectional study was carried out among women aged 30 to 65 attending six primary health centres in Ibadan, Oyo State, between March and May 2025, to assess their knowledge of breast cancer screening. Centres were chosen by multistage sampling, and women were recruited consecutively at general outpatient clinics. Of 420 women approached, 386 returned completed questionnaires (response rate 91.9%). Data were analysed in IBM SPSS Statistics version 29.

**Comments**

- **WA1** STROBE item 5 asks for the setting, places and dates of recruitment, and item 6 for who was eligible. I've taken these from your ethics approval letter. Please check the dates.
- **WA2** "Randomly" needs a method behind it, and a reviewer will ask for one. Your protocol describes multistage sampling of centres and consecutive recruitment of women, so I've described that instead (STROBE item 6a).
- **WA3** Giving the number approached and the response rate lets readers judge non-response (STROBE item 13a). "Data" takes a plural verb in most health journals. I removed the last sentence because your results tables already show this.

### Specimen 2 (Publication support): a results sentence that overclaims

**Original**

> The study proved that knowledge of breast self-examination significantly causes higher screening uptake among the respondents (p=0.03), showing that health education is the solution to late presentation of breast cancer in Nigeria.

**All Markup**

> ~~The study proved that knowledge of breast self-examination significantly causes higher screening uptake among the respondents (p=0.03), showing that health education is the solution to late presentation of breast cancer in Nigeria.~~ **[Women with good knowledge of breast self-examination were more likely to report having been screened]**¹ **[(adjusted odds ratio 1.8, 95% CI 1.1 to 3.0; p = 0.03).]**² **[Because the study is cross-sectional, this association does not show that knowledge leads to screening.]**³

**No Markup**

> Women with good knowledge of breast self-examination were more likely to report having been screened (adjusted odds ratio 1.8, 95% CI 1.1 to 3.0; p = 0.03). Because the study is cross-sectional, this association does not show that knowledge leads to screening.

**Comments**

- **WA1** "Proved" and "causes" claim more than a cross-sectional survey can show. "More likely to" says exactly what you found.
- **WA2** A p-value on its own doesn't tell readers how big the difference is. Your Table 3 has the adjusted odds ratio and confidence interval, so I've reported those (STROBE item 16a).
- **WA3** The point about late presentation across Nigeria goes beyond a sample from one city. It may belong in your discussion as a possibility, next to your limitations. I've added one sentence here so a reviewer doesn't have to ask.

---

## 6. Hosting

Checked 17 October 2026.

| | Cloudflare Pages, free | Vercel Pro |
|---|---|---|
| Commercial use | Allowed. Cloudflare's [Self-Serve Subscription Agreement](https://www.cloudflare.com/terms/) (last updated 12 Sep 2025) has no commercial or personal-use limit on Free Services. The one relevant restriction (s. 2.2.1(h)) bans collecting card details on free plans; this site collects none. The [Service-Specific Terms](https://www.cloudflare.com/service-specific-terms-application-services/) (updated 28 Sep 2026) only restrict serving video or a disproportionate share of images through the CDN. | Required for this site. Vercel's [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) (updated 14 Sep 2026): "Hobby teams are restricted to non-commercial personal use only", and commercial use includes "Advertising the sale of a product or service". |
| Cost | Free. [Limits](https://developers.cloudflare.com/pages/platform/limits/): 500 builds a month, 20,000 files, 25 MiB per file. Far more than this site needs. | $20 a month per developer seat ([pricing](https://vercel.com/pricing)). |
| Address | `pen-of-wonder-research.pages.dev` (if free when we create it) | `pen-of-wonder-research.vercel.app` |
| Analytics | Cloudflare Web Analytics, free, no cookies (section 7) | Vercel Web Analytics, metered on Pro at $3 per 100K events ([pricing](https://vercel.com/pricing)) |
| Weekly blog release | A GitHub Action calls a Pages deploy hook | A GitHub Action calls a Vercel deploy hook |

**Recommendation: Cloudflare Pages, free.** It permits this use, costs nothing, and its analytics are cookie-free. Cloudflare also offers Workers with static assets, but its free address includes your account name (`…workers.dev`), so Pages gives the cleaner URL. The site will be plain static output, so moving later is easy.

Vercel Hobby (free) is not an option: this site advertises paid services.

---

## 7. Formspree and analytics

### Formspree

- **reCAPTCHA sets cookies.** Formspree's reCAPTCHA is Google's, and Google reCAPTCHA sets its own cookies when it loads. Formspree's help pages don't discuss cookies at all. To keep the "no cookie banner" promise, **switch reCAPTCHA off for the form** (Form settings, Spam protection; Formspree says this can be changed per form on [all plans](https://help.formspree.io/hc/en-us/articles/115008379328-reCAPTCHA-settings)). Spam protection then comes from the `_gotcha` [honeypot field](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering.md) and Formspree's basic spam filtering, both on the free plan. In Phase 3 I'll confirm in the browser that submitting the form sets no cookies.
- **The free plan has no custom redirect.** Formspree's [plans page](https://formspree.io/plans) (checked 17 Oct 2026) lists the Free plan at 50 submissions a month, a 30-day submission archive, and only Formspree's default thank-you page. The [Thank You redirect](https://help.formspree.io/hc/en-us/articles/360012378333--Thank-You-redirect) needs a Personal plan or higher ($15 a month, or $10 a month billed yearly). What that means here:
  - **With JavaScript** (nearly everyone): the form posts with `fetch`, shows the success message in place and goes to `/contact/thanks`. This works on the free plan.
  - **Without JavaScript:** the form still submits, but lands on Formspree's own thank-you page instead of `/contact/thanks`.
  - My recommendation: start on free. Upgrade only if 50 messages a month becomes a limit.
- The 30-day archive matters for the privacy notice's [RETENTION PERIOD]: Formspree deletes after 30 days on free, but copies stay in your email until you delete them.

### Analytics

- **Cloudflare Web Analytics:** "does not use any client-side state, such as cookies or localStorage, to collect usage metrics", and Cloudflare says it does not fingerprint visitors by IP address or user agent ([product page](https://www.cloudflare.com/web-analytics/), checked 17 Oct 2026). Free. **No cookies, so no banner.**
- **Vercel Web Analytics** (if you choose Vercel): no third-party cookies; visitors are counted using a hash of the request that is discarded after 24 hours ([privacy docs](https://vercel.com/docs/analytics/privacy-policy), updated 26 Jun 2026). Also no banner needed.

Both links and dates will go into DESIGN.md once you pick a host.

---

## 8. Coaching prices (GBP)

Prices stay as [PRICES AWAITING APPROVAL] on the page until you approve them.

### What UK tutors charge now

All checked 17 October 2026.

| Source | What it shows |
|---|---|
| [Tutorful, SPSS tutors](https://tutorful.co.uk/search/spss) | Six listed tutors at £39, £42, £45, £47, £50 and £59 an hour (mean £47) |
| [Tutorful, dissertation tutors](https://tutorful.co.uk/search/dissertation) | Six listed tutors at £36, £40, £59, £62, £70 and £93 an hour (median about £60) |
| [Study Mind, SPSS tutors](https://studymind.co.uk/spss-tutors) | "private tutors charge between £30.00 and £50.00 per hour", online often slightly cheaper |
| [The Tutor Link, degree-level tutors](https://thetutor.link/degree-tutor/) | PhD students and postdocs £45 to £75 an hour; senior academics £70 to £110; online usually £5 to £10 lower; 5% platform fee |
| [The Profs, SPSS tutors (London)](https://www.theprofs.co.uk/spss-tutors/london/) | Agency: undergraduate from £75 an hour; MSc, MBA and MRes dissertations £90 to £120; £70 registration fee; 5-hour minimum |
| [The Profs, rates FAQ](https://www.theprofs.co.uk/student-resources/faq/what-are-the-profs-hourly-tuition-rates/) | £60 an hour plus a £50 matching fee (page dated Aug 2022, so likely out of date; superseded by the row above) |
| [University of Manchester, NVivo short course](https://events.manchester.ac.uk/event/event:ln-k48qlyqm-hg8ah0/nvivo-for-qualitative-data-analysis) | One-day group course £195 (concession £140). Dated 2020, group format: a weak comparison, included because I found no UK one-to-one NVivo tutor with a published rate |

I couldn't find any independent UK NVivo tutor who publishes an hourly rate. NVivo tutoring is a small market, so SPSS and dissertation rates are the better guide.

### What the numbers say

- Independent online tutors on marketplaces cluster around **£40 to £60 an hour**.
- PhD-level tutors sit at £45 to £75. Agencies charge £75 to £120 plus fees and minimums.
- Below about £30, a price starts to look like a bargain service, which is the wrong signal next to the academic-integrity stance.

### Proposal

| | Price | Per session | Reasoning |
|---|---|---|---|
| **Single 60-minute session** | **£40** | £40 | At the lower edge of the independent-tutor band. You don't list a postgraduate degree, so pricing at PhD-tutor rates would be hard to justify, but published research, real field-study experience and session notes put you well above the bargain end. |
| **Analysis pack: 3 sessions (SPSS or NVivo)** | **£110** | £36.67 | Three sessions matches a real piece of work: clean and plan, run the tests yourself, read the output and write it up. |
| **Dissertation pack: 6 sessions** | **£210** | £35 | Covers topic, proposal, methodology and feedback rounds on drafts the student wrote. The bigger discount rewards commitment without making single sessions look overpriced. |

Packs valid for [3 / 6] months from purchase [ASSUMED], so the student keeps a working rhythm. Payment details go in Terms ([CONFIRM PAYMENT METHODS]).

---

## 9. DOI check

Both checked 17 October 2026 against Crossref metadata (`api.crossref.org/works/<doi>`). `doi.org/10.3934/medsci.2025010` resolves to AIMS Press.

| Item | Your brief | Crossref | Match |
|---|---|---|---|
| Sildenafil paper: title | as written | "Exploring the multi-drug resistance (MDR) inhibition property of Sildenafil: phosphodiesterase 5 as a therapeutic target and a potential player in reversing MDR for a successful breast cancer treatment" | Yes |
| Journal, volume, issue, pages | AIMS Medical Science 12(2): 145 to 170 | AIMS Medical Science, 12(2), 145–170, 2025 | Yes |
| Your position | second author | Adeyanju, **Adebagbo**, Molehin, Oyenihi | Yes, 2nd of 4 |
| Luteolin paper: title | as written | "Protective Effects of Luteolin and Gallic Acid Against Storage-Induced Oxidative Damage in Whole Blood of Female Wistar Rats" | Yes |
| Journal, volume, issue, pages | Applied In Vitro Toxicology 7(2): 61 to 70 (2021) | Applied In Vitro Toxicology, 7(2), 61–70, published 1 June 2021 | Yes |
| Your position | third author | Adeyanju, Oyedeji, **Adebagbo**, Oluyitan, Adeyanju | Yes, 3rd of 5 |

APA 7 versions are in section 3. In APA, article titles are in sentence case, so "Sildenafil" becomes "sildenafil".

---

## 10. Other things I noticed

- **Font check:** see DESIGN.md section 4. Source Sans 3 and Source Serif 4 both have £, ₦, curly quotes and the Yoruba letters ẹ ọ ṣ with tone marks. Newsreader lacks ṣ/Ṣ, ǹ and ḿ.
- **Portraits:** 1023 × 974 (chin) and 1023 × 1537 (arms). No watermark visible on either. Big enough at the planned sizes, so [HIGH-RESOLUTION ORIGINALS] isn't needed. I'll crop the hand-on-chin photo closer to a portrait shape, because the original has a lot of empty background on both sides.
- **Reporting guideline links:** all four EQUATOR pages respond (checked 17 Oct 2026). Note: the CONSORT page is now the CONSORT 2025 statement and PRISMA is PRISMA 2020, so the links point at the current versions.
- **Post 120** mentions a Medium page and a breast cancer review paper in progress. I won't link the Medium page (same rule as the social links), and About won't mention the review paper until it's published.
- **Post 116 (Lesson 27)** mentions presenting at a conference. That's fine in the blog (L6) as your own story, but I won't turn it into a credential on About unless you give me the details.
- **Subjects for Work with me:** your CV doesn't list subject areas, so [CONFIRM SUBJECTS] stays visible.

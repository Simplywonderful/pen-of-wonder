// Reporting guideline links checked on the EQUATOR Network on 17 Oct 2026.
export const publicationSupport = {
  title: "Publication support for researchers | Pen of Wonder Research",
  description:
    "Help turning a thesis into a paper, editing for journal style, STROBE, CONSORT, PRISMA and COREQ checks, choosing a journal and answering reviewers.",

  h1: "Publication support for researchers",
  intro:
    "You’ve done the research. We help you turn it into a paper a journal will take seriously: clear structure, complete reporting, the right journal, and calm answers to reviewers. You stay the author throughout.",
  cta: "Send your manuscript for a free one-page review",

  helpHeading: "What we help with",
  help: [
    { term: "From thesis to paper", detail: "Cutting a thesis or dissertation chapter down to one argument, at journal length." },
    {
      term: "Structure and journal style",
      detail: "Editing for clarity, flow and the target journal’s author guidelines, in Word with tracked changes and comments.",
    },
    { term: "Reporting checks", detail: "guidelines" },
    {
      term: "Quantitative analysis",
      detail: "Choosing, running and reporting statistical tests in SPSS, with results written so they say what the data shows and no more.",
    },
    {
      term: "Qualitative analysis",
      detail: "Coding and thematic analysis in NVivo, and writing up themes with the quotes that support them.",
    },
    {
      term: "Review methods",
      detail: "Planning and reporting systematic and literature reviews: search strategy, screening and synthesis.",
    },
    { term: "Referencing", detail: "Tidying references in Mendeley or Zotero and matching the journal’s style." },
    {
      term: "Choosing a journal",
      detail: "Shortlisting journals that fit your scope, and spotting predatory ones before they take your fee.",
    },
    {
      term: "Formatting and submission",
      detail: "Title page, abstract, cover letter, declarations and the submission system itself.",
    },
    {
      term: "Responses to reviewers",
      detail: "A point-by-point response that answers each comment, with the matching changes in the manuscript.",
    },
  ],
  guidelinesLead: "Checking your manuscript against the guideline reviewers will use:",
  guidelines: [
    { name: "STROBE", href: "https://www.equator-network.org/reporting-guidelines/strobe/", use: "for observational studies" },
    { name: "CONSORT", href: "https://www.equator-network.org/reporting-guidelines/consort/", use: "for randomised trials" },
    { name: "PRISMA", href: "https://www.equator-network.org/reporting-guidelines/prisma/", use: "for systematic reviews" },
    { name: "COREQ", href: "https://www.equator-network.org/reporting-guidelines/coreq/", use: "for interviews and focus groups" },
  ],
  guidelineAside:
    "A reporting guideline is a checklist of what a paper must tell readers so they can judge it. The EQUATOR Network keeps the official versions.",

  stepsHeading: "How it works",
  steps: [
    { title: "Send the manuscript.", text: "A share link is fine, with the target journal and any deadline." },
    { title: "Free one-page review.", text: "Within 3 working days: the three changes we’d make first, and why." },
    { title: "Quote.", text: "A fixed price based on length and what the paper needs." },
    { title: "The work.", text: "Tracked changes and comments, so you see every edit and decide on each one." },
    { title: "Reviewer responses.", text: "When the reviews come back, we help you answer them." },
  ],

  specimenHeading: "Where papers lose reviewers",
  specimenIntro:
    "Results sections often claim more than the design can support. Here is the kind of sentence we’d change, and why.",

  faqHeading: "Questions",
  faq: [
    {
      q: "Who is the author?",
      a: "You are. The ideas, data and conclusions are yours, and you approve every change. Where a journal asks you to acknowledge writing or editing support, we’ll help you word it.",
    },
    {
      q: "Do you guarantee acceptance?",
      a: "No one honestly can. Editors and reviewers decide. We make the paper as strong as it can be and help you choose a journal that fits it.",
    },
    { q: "Is my manuscript kept confidential?", a: "Yes. We don’t share manuscripts, and we don’t name clients." },
    {
      q: "Can you tell me if a journal is predatory?",
      a: "Yes. If a journal on your list looks predatory, we’ll tell you, and show you why.",
    },
    {
      q: "How much does it cost?",
      a: "We quote after the free review, because it depends on the length of the paper and what it needs. There’s no charge for the review itself.",
    },
  ],
} as const;

// The main home page's copy, approved by the owner on 26 Oct 2026 (PHASE-0.md section 5).
// Numbers are not written here: they come from the proof register through ProofStrip.
import type { WorldId } from "@pow/config/worlds";

export const home = {
  title: "Pen of Wonder: marketing, writing, research and publishing from Ibadan",
  description:
    "Pen of Wonder runs ads that sell, writes documents that open doors, helps researchers get published and publishes children's readers. Message us on WhatsApp.",
  h1: "Words that make you win.",
  lead: "We run ads that sell, write the documents that get people hired and funded, help researchers get their papers published, and make books children want to read.",

  worldsHeading: "Choose your world",
  worldsIntro: "Each part of Pen of Wonder has its own site. Pick the one that fits the job.",
  dividers: [
    {
      world: "marketing",
      who: "For business owners, coaches and course creators who want ads that pay for themselves.",
      services: ["Paid ads on Meta, LinkedIn, TikTok and X", "Ad creative built for testing", "Landing pages and copy that sells"],
    },
    {
      world: "writing",
      who: "For job seekers, founders, NGOs and anyone applying for funding.",
      services: ["CVs and LinkedIn profiles", "Grant applications and concept notes", "Business plans and proposals"],
    },
    {
      world: "research",
      who: "For researchers preparing a paper for a journal, and for editing firms that need a careful editor.",
      services: [
        "Publication support for journal manuscripts",
        "Freelance editing for firms and research teams",
        "Methods coaching for UK postgraduates",
      ],
    },
    {
      world: "publishing",
      who: "For schools, parents and first-time authors.",
      services: [
        "The Hidden Treasures Companion Readers, Basic 1 to 6",
        "Book writing, editing and ISBN registration",
        "Illustration and printing, quoted per project",
      ],
    },
  ] as { world: WorldId; who: string; services: string[] }[],
  dev: { line: "Websites, automation and business systems.", link: "Join the waitlist on WhatsApp" },

  proofHeading: "What we can show you",

  booksHeading: "Hidden Treasures, our founder's readers",
  booksButton: "See the readers",

  founderHeading: "Our founder",
  founder: [
    "Wonderful Adebagbo was a quiet child who read everything he could find, starting with the Bible. He went on to study biochemistry, graduated top of his class, department and faculty, and published two peer-reviewed papers. The lab taught him a habit he never dropped: state what you expect, test it honestly, and let the evidence decide.",
    "Pen of Wonder is that habit applied to words. Ads are tested like experiments, documents are checked against what their reader needs, manuscripts are edited to a journal's standard, and books are written for children he wants to see reading.",
  ],
  portraitAlt: "Wonderful Adebagbo in a dark suit, arms crossed, smiling.",
  valuesIntro: "Our values spell P-E-N:",
  values: [
    { name: "Purpose.", text: "We start from what the work is for: a lead, a job, a publication, a child who keeps reading." },
    { name: "Evidence.", text: "We show what we did and what changed, with real numbers or none." },
    { name: "Nerve.", text: "We tell you the truth about your ads, your draft or your plan, even when it isn't what you hoped to hear." },
  ],

  finalHeading: "Tell us what you need.",
  final:
    "Send a WhatsApp message with a line about the job. We'll reply within one working day and point you to the right part of Pen of Wonder, or tell you honestly if someone else would serve you better.",
} as const;

// Student-facing copy. It sells teaching only: the student writes the work and runs the analysis.
// Read the contract-cheating rules in CLAUDE.md before changing a word here.
export const coaching = {
  title: "Dissertation coaching, SPSS and NVivo tutoring | Pen of Wonder Research",
  description:
    "One-to-one online sessions for postgraduate students in the UK: plan your dissertation, and learn to run and report SPSS and NVivo analysis yourself.",

  h1: "Dissertation coaching and SPSS and NVivo tutoring",
  intro:
    "One-to-one online sessions for postgraduate students. We teach you how to plan your dissertation and how to run and report your own analysis. You do the work; we help you understand it.",
  cta: "Book a 60-minute session",

  sections: [
    {
      id: "dissertation",
      heading: "Dissertation coaching",
      lead: "For the parts of a dissertation that are hardest to work out alone:",
      items: [
        "Choosing and narrowing a topic",
        "A proposal you can defend",
        "Methodology choices, and how to justify them",
        "Structure, chapter by chapter",
        "Feedback on drafts you have written",
      ],
      note: "Some universities limit the feedback anyone other than your supervisor can give on drafts. Check your handbook first, and tell us what it says.",
    },
    {
      id: "spss",
      heading: "SPSS tutoring",
      lead: "You run SPSS on your own data while we guide you:",
      items: [
        "Cleaning and coding your data",
        "Choosing the right test for your question",
        "Running it yourself, step by step",
        "Reading the output",
        "Writing up the results in your own words",
      ],
    },
    {
      id: "nvivo",
      heading: "NVivo tutoring",
      lead: "For qualitative data from interviews, focus groups or documents:",
      items: [
        "Setting up a project and coding",
        "Building and refining themes",
        "Thematic analysis, from codes to argument",
        "Writing up qualitative findings",
      ],
    },
  ],

  formatHeading: "How sessions work",
  format: [
    "60 minutes on screen share. You drive; we guide.",
    "Session notes afterwards, so you can carry on alone.",
    "Times are agreed in UK time. Nigeria is on UTC+1 all year: the same as UK summer time, one hour ahead in winter.",
  ],

  pricesHeading: "Prices",
  pricesNote: "Prices are in pounds sterling. How to pay is set out in the terms.",

  bookingHeading: "Booking",
  booking: "Send us a message through the contact form or on WhatsApp, and we’ll find a time that suits you.",
} as const;

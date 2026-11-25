// How a writing job runs, in order. Nothing here promises a turnaround or a number of revisions:
// both are agreed in each quote.
export const steps = [
  {
    name: "Tell us what you need",
    line: "A WhatsApp message or email with the document, who will read it and when it's due.",
    detail: [
      "Send what you already have: an old CV, a funder's call, a draft report. If you have nothing yet, a few lines about the job is enough to start.",
    ],
  },
  {
    name: "Get a quote",
    line: "We look at the job and send a price, a delivery date and what's included.",
    detail: [
      "If the job isn't a good fit, or the deadline is too tight to do it well, we say so at this stage rather than after you've paid.",
    ],
  },
  {
    name: "Talk it through",
    line: "A short conversation, so we understand your work, your reader and your goal.",
    detail: [
      "This is where the useful facts come out: the result you forgot to mention, the reason a funder should trust you, the way you actually talk about your work.",
    ],
  },
  {
    name: "Read the draft",
    line: "You get a full draft, and tell us what's wrong, missing or not quite you.",
    detail: ["We make the changes and explain any suggestion we think you should keep, but the final word is yours."],
  },
  {
    name: "Receive the final files",
    line: "The finished document in the formats you need, ready to send.",
    detail: ["Usually a PDF to send and a Word file you can update yourself."],
  },
];

/** One word per step, for the hero's strip (revamp brief 4.1). */
export const stepWords = ["Brief", "Quote", "Talk", "Draft", "Deliver"];

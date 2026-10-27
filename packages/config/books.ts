// Every Hidden Treasures fact the sites show lives here and nowhere else. Facts arrive through
// _source/books/intake.md (questions Q1 to Q27); each filled fact names its question in `source`,
// and a claim names its file in `evidence`. A null fact is never guessed: development shows a
// [TODO: Qn] marker and production leaves the sentence, row or button out. The printed covers are
// the source of truth over the 26 Oct 2026 PDFs. `npm run books:ready` lists what is missing.

export type Sourced<T> = { value: T; source: string; evidence?: string } | null;

export type Title = {
  slug: string;
  title: string;
  series: "companion-readers";
  level: string;
  type: "picture-reader" | "chapter-book";
  format: "A5";
  /** Word for word from the printed back cover, never from the PDFs. */
  blurb: { text: string; source: "printed-cover"; evidence: string } | null;
  printed: Sourced<boolean>;
  printRun: Sourced<string>;
  printDate: Sourced<string>;
  printer: Sourced<string>;
  isbn: string | null;
  isbnEvidence: string | null;
  coverImage: string | null;
  copyrightPage: string | null;
  sampleSpreads: string[];
};

export type School = {
  name: string;
  town: Sourced<string>;
  state: Sourced<string>;
  titles: Sourced<string[]>;
  copies: Sourced<string>;
  date: Sourced<string>;
  /** Invoice, receipt, transfer, delivery note or written order (Q15). Without it the school isn't counted. */
  evidence: string | null;
  canName: boolean;
  quote: { text: string; by: string; permission: string } | null;
};

const scan = "books/from-mum/printed-covers-scan-4-chapter-books.pdf";

export const imprint = {
  /** Q7. Until it is answered, pages use the printed books' wording. */
  name: null as Sourced<string>,
  printedName: "Hidden Treasures",
  registeredWithCac: null as Sourced<boolean>,
  registeredOwner: null as Sourced<string>,
  address: null as Sourced<string>,
};

/** The imprint name to show: the confirmed one, or the printed books' wording until Q7 settles it. */
export const imprintName = () => imprint.name?.value ?? imprint.printedName;

export const series = [
  { slug: "companion-readers", name: "Hidden Treasures Companion Readers", status: "printed" as const },
  { slug: "hidden-treasures", name: "Hidden Treasures", status: "in-production" as const, books: 15, isbns: null },
];

const unknown = { printed: null, printRun: null, printDate: null, printer: null, coverImage: null, copyrightPage: null, sampleSpreads: [] };

export const titles: Title[] = [
  {
    slug: "look-and-learn-my-first-picture-words",
    title: "Look and Learn: My First Picture Words",
    series: "companion-readers",
    level: "Basic 1 to 2",
    type: "picture-reader",
    format: "A5",
    blurb: null,
    isbn: null,
    isbnEvidence: null,
    ...unknown,
  },
  {
    slug: "look-and-learn-more-picture-words",
    title: "Look and Learn: More Picture Words",
    series: "companion-readers",
    level: "Basic 1 to 2",
    type: "picture-reader",
    format: "A5",
    blurb: null,
    isbn: null,
    isbnEvidence: null,
    ...unknown,
  },
  {
    slug: "the-correction-book",
    title: "The Correction Book",
    series: "companion-readers",
    level: "Basic 3",
    type: "chapter-book",
    format: "A5",
    blurb: {
      text: "In Class Three at Oke-Ilewo Primary School, a small notebook passes from hand to hand every Friday. It records whatever has happened that week: the good and the not-so-good alike. Across three terms of new pupils, missing chalk, sudden rain, and a garden grown from nothing, The Correction Book follows one ordinary class learning, one small lesson at a time, that character is built in the everyday moments nobody thinks to write down, until somebody finally does.",
      source: "printed-cover",
      evidence: `${scan}, page 2`,
    },
    isbn: "978-978-63709-0-3",
    isbnEvidence: `${scan}, page 2`,
    ...unknown,
  },
  {
    slug: "a-court-called-class-four",
    title: "A Court Called Class Four",
    series: "companion-readers",
    level: "Basic 4",
    type: "chapter-book",
    format: "A5",
    blurb: {
      text: "Every Friday afternoon at Ilupeju Model School, Basic Four settles its disputes in a court of its own making: evidence weighed, witnesses questioned, and no verdict reached until every side has been properly heard. Across three terms of broken windows, borrowed uniforms, whispered rumours, and one especially hard-won apology, A Court Called Class Four follows one ordinary classroom learning, case by case, that fairness is a habit built through practice, not a rule that simply appears when needed.",
      source: "printed-cover",
      evidence: `${scan}, page 4`,
    },
    isbn: "978-978-63709-3-4",
    isbnEvidence: `${scan}, page 4`,
    ...unknown,
  },
  {
    slug: "the-weight-of-the-trophy",
    title: "The Weight of the Trophy",
    series: "companion-readers",
    level: "Basic 5 to 6",
    type: "chapter-book",
    format: "A5",
    blurb: {
      text: "Honesty House has finished last for three years running when Ifeoma is unexpectedly named its captain, leading pupils other houses have quietly given up on, and facing choices, term after term, where the easier path and the honest one rarely point the same way. Across a school year building toward the Inter-House Cup, The Weight of the Trophy follows one reluctant captain discovering that what a team becomes while trying honestly to succeed can matter as much as whether it wins.",
      source: "printed-cover",
      evidence: `${scan}, page 3`,
    },
    isbn: "978-978-63709-2-7",
    isbnEvidence: `${scan}, page 3`,
    ...unknown,
  },
  {
    slug: "the-last-assembly",
    title: "The Last Assembly",
    series: "companion-readers",
    level: "Basic 6",
    type: "chapter-book",
    format: "A5",
    blurb: {
      text: "Onyinye's final year at Temidayo Grammar Preparatory School arrives with a prefect's badge, a Common Entrance Examination looming at its centre, and a graduating class quietly discovering that growing up asks harder questions than any exam does: about fairness, honesty, inherited ambition, and what is owed to the people watching you lead. The Last Assembly follows one Basic Six class through its final year of primary school, building toward a farewell that has less to do with a badge changing hands than with who each pupil has quietly become by the time it does.",
      source: "printed-cover",
      evidence: `${scan}, page 1`,
    },
    isbn: "978-978-63709-1-0",
    isbnEvidence: `${scan}, page 1`,
    ...unknown,
  },
];

// Q12: the three schools the owner confirmed bought the books (26 Oct 2026). None is counted or
// named until its sales record is on file (Q15) and it has agreed (Q16).
export const schools: School[] = ["Wellspring Model Academy", "Lead Leaders Academy", "Greater Heights Global Academy"].map(
  (name) => ({ name, town: null, state: null, titles: null, copies: null, date: null, evidence: null, canName: false, quote: null }),
);

export const orders = {
  minimumOrder: null as Sourced<string>,
  leadTime: null as Sourced<string>,
  deliveryStates: null as Sourced<string[]>,
  paymentTerms: null as Sourced<string>,
  handledBy: null as Sourced<string>,
};

export const consultant = {
  name: "Mrs Adebagbo",
  role: "series consultant",
  school: "Wellspring Model Academy",
  canName: null as Sourced<boolean>,
};

/** ISBN-13 check digit. A wrong one fails the build. */
export function validIsbn13(isbn: string): boolean {
  const digits = isbn.replace(/-/g, "");
  if (!/^\d{13}$/.test(digits)) return false;
  const sum = [...digits.slice(0, 12)].reduce((s, d, i) => s + Number(d) * (i % 2 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(digits[12]);
}

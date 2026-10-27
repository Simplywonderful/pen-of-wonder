// The proof register. Every number on every world comes from an entry here, rendered word for word.
// `evidence` is a file or folder under _source/proof/ holding the screenshot or document behind it.
// A `live` entry must name its evidence (scripts/proof-check.mjs fails the build otherwise, and
// locally if the file is missing). A `pending` entry is waiting for its evidence or a missing fact:
// development shows it as a [TODO] marker and production leaves it out, so it never ships unproven.
// No composite or "representative" results; own projects say so in their wording.
import type { WorldId } from "./worlds.ts";

export type ProofEntry = {
  id: string;
  world: WorldId;
  /** Other worlds whose pages show this claim too (main's proof strip, for example). */
  alsoOn?: WorldId[];
  status: "live" | "pending";
  /** The figure on its own, for a proof strip; omit for a sentence-only claim. */
  figure?: string;
  /** The exact wording. Pages render this and never paraphrase it. */
  wording: string;
  dateRange: string | null;
  evidence: string | null;
  /** Where the claim is explained: a case study or page path in the same world. */
  link?: { path: string; label: string };
  ownProject?: boolean;
  /** What is still needed, for pending entries. */
  needs?: string;
};

export const proof: ProofEntry[] = [
  {
    id: "research-manuscripts",
    world: "research",
    alsoOn: ["main"],
    status: "live",
    wording: "helped a researcher take two manuscripts through to publication",
    dateRange: "2026",
    evidence: "research/two-manuscripts-2026",
    link: { path: "/publication-support", label: "About publication support" },
  },
  {
    id: "marketing-campaigns",
    world: "marketing",
    status: "pending",
    figure: "12+",
    wording: "client campaigns launched",
    dateRange: null,
    evidence: null,
    needs: "evidence file and [FIRST CAMPAIGN YEAR]",
  },
  {
    id: "marketing-cpl",
    world: "marketing",
    status: "pending",
    figure: "34%",
    wording: "lower average cost per lead",
    dateRange: null,
    evidence: null,
    needs: "evidence file, and whether this is an average across campaigns or Northern Star's figure",
  },
  {
    id: "marketing-roas",
    world: "marketing",
    status: "pending",
    figure: "3.4×",
    wording: "return on ad spend",
    dateRange: null,
    evidence: null,
    needs: "evidence file, and whether this is an average across campaigns or Northern Star's figure",
  },
  {
    id: "marketing-spend",
    world: "marketing",
    status: "pending",
    figure: "₦18M+",
    wording: "ad spend managed",
    dateRange: null,
    evidence: null,
    needs: "evidence file",
  },
  {
    id: "marketing-cpl-summary",
    world: "marketing",
    alsoOn: ["main"],
    status: "pending",
    figure: "34%",
    wording: "lower average cost per lead across 12+ client campaigns since [FIRST CAMPAIGN YEAR]",
    dateRange: null,
    evidence: null,
    link: { path: "/work/northern-star", label: "Read the Northern Star case" },
    needs: "evidence file and [FIRST CAMPAIGN YEAR]",
  },
  {
    id: "northern-star-cpl",
    world: "marketing",
    status: "pending",
    wording: "cost per lead fell by [NORTHERN STAR CPL FIGURE]",
    dateRange: "2025",
    evidence: null,
    needs: "Northern Star's own figure and its evidence file",
  },
  {
    id: "publishing-readers",
    world: "publishing",
    alsoOn: ["main"],
    status: "pending",
    wording: "Six Companion Readers, printed in 2026",
    dateRange: "2026",
    evidence: null,
    ownProject: true,
    needs: "printed copies or copyright pages for all six titles (intake Q3, Q5)",
  },
];

export function proofEntry(id: string): ProofEntry {
  const entry = proof.find((p) => p.id === id);
  if (!entry) throw new Error(`No proof register entry: ${id}`);
  return entry;
}

/** Entries a world may show: live ones always, pending ones only as development markers. */
export function proofFor(world: WorldId, showTodos: boolean): ProofEntry[] {
  return proof.filter((p) => p.world === world && (p.status === "live" || showTodos));
}

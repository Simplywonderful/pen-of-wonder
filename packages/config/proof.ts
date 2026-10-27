// The proof register. Every number on every world comes from an entry here, rendered word for word.
// `evidence` is a file or folder under _source/proof/ holding the screenshot or document behind it.
// scripts/proof-check.mjs fails the build if an entry has no evidence, and locally if it is missing.
// No composite or "representative" results; own projects say so in their wording.
import type { WorldId } from "./worlds.ts";

export type ProofEntry = {
  id: string;
  world: WorldId;
  /** The figure on its own, for a proof strip; omit for a sentence-only claim. */
  figure?: string;
  /** The exact wording. Pages render this and never paraphrase it. */
  wording: string;
  dateRange: string;
  evidence: string | null;
  ownProject?: boolean;
};

export const proof: ProofEntry[] = [
  {
    id: "research-manuscripts",
    world: "research",
    wording: "helped a researcher take two manuscripts through to publication",
    dateRange: "2026",
    evidence: "research/two-manuscripts-2026",
  },
];

export function proofEntry(id: string): ProofEntry {
  const entry = proof.find((p) => p.id === id);
  if (!entry) throw new Error(`No proof register entry: ${id}`);
  return entry;
}

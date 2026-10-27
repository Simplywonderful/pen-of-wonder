// Approved quotes only. Each needs the person's written agreement (a WhatsApp "yes" counts),
// kept as a screenshot under _source/proof/ and named in `permission`. A quote without
// `permission` never renders, and a world shows none until its `show` flag is on.
// Shown as a static set: no carousels. Research quotes carry initials and role only, and are never
// a student's feedback about marked work (see apps/research/CLAUDE.md).
import type { WorldId } from "./worlds.ts";

export type Testimonial = {
  quote: string;
  by: string;
  role: string;
  permission: string | null;
};

export const testimonials: Record<WorldId, { show: boolean; quotes: Testimonial[] }> = {
  main: { show: false, quotes: [] },
  marketing: {
    show: false,
    quotes: [
      {
        quote:
          "Wonderful runs ads like a scientist, not a guesser. He rebuilt our tracking, tested angles methodically, and brought our cost per lead down while we actually understood why. Finally, reporting we could read.",
        by: "Nife",
        role: "Founder, Northern Star Business Consult",
        permission: null,
      },
      {
        quote:
          "Our ads started paying for themselves. He found the audiences that actually buy, cut what wasn't working fast, and kept us in the loop the whole way. Sales we could trace to real campaigns.",
        by: "Beulah Fayinka",
        role: "Founder, Delight Fashion",
        permission: null,
      },
      {
        quote:
          "He treated our budget like his own. Clear strategy, creatives that converted, and honest weekly updates. We scaled what was working instead of guessing.",
        by: "Yetty",
        role: "Founder, YT Exclusive",
        permission: null,
      },
    ],
  },
  writing: { show: false, quotes: [] },
  research: { show: false, quotes: [] },
  publishing: { show: false, quotes: [] },
  dev: { show: false, quotes: [] },
};

/** The quotes a world may show right now: flag on, and written permission on file. */
export function approvedQuotes(id: WorldId): Testimonial[] {
  const set = testimonials[id];
  return set.show ? set.quotes.filter((q) => q.permission) : [];
}

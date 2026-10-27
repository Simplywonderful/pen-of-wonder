// Is publishing ready to launch? Lists every unknown book fact, every claim without evidence,
// and fails if a launch-required fact is missing: the imprint name (Q7), each title's cover image
// and copyright page (Q3/Q5), who handles orders (Q22) and the consultant naming decision (Q25).
// Sales, schools and ISBNs are not required: without them publishing launches without those claims.
// Contradictions with the printed covers are found by reading the intake answers, so they are
// reported by hand when "book facts are in" (see the root CLAUDE.md).
// Usage: npm run books:ready
import { imprint, titles, schools, orders, consultant } from "../packages/config/books.ts";

const missing = [];
const unknown = [];
const unsupported = [];

if (!imprint.name) missing.push(`imprint name (Q7); pages use the printed wording "${imprint.printedName}" meanwhile`);
for (const t of titles) {
  if (!t.coverImage) missing.push(`${t.title}: cover image (Q5)`);
  if (!t.copyrightPage) missing.push(`${t.title}: printed PDF or copyright-page photo (Q3/Q5)`);
  if (!t.blurb) unknown.push(`${t.title}: printed back-cover blurb`);
  if (!t.isbn) unknown.push(`${t.title}: ISBN (Q6, Q8)`);
  for (const key of ["printed", "printRun", "printDate", "printer"]) if (!t[key]) unknown.push(`${t.title}: ${key} (Q1, Q2, Q4)`);
}
if (!orders.handledBy) missing.push("who handles school orders (Q22)");
if (!consultant.canName) missing.push("consultant naming decision (Q25)");
for (const [key, value] of Object.entries(orders)) if (!value && key !== "handledBy") unknown.push(`orders: ${key} (Q19 to Q21)`);
for (const [key, value] of Object.entries(imprint)) if (value === null && key !== "name") unknown.push(`imprint: ${key} (Q7, Q11)`);
for (const s of schools) {
  if (!s.evidence) unsupported.push(`${s.name}: no sales record (Q15), so not counted`);
  if (!s.canName) unsupported.push(`${s.name}: not yet agreed to be named (Q16)`);
  if (!s.town || !s.state) unknown.push(`${s.name}: town and state (Q12)`);
}

const list = (title, items) => items.length && console.log(`\n${title} (${items.length})\n  ${items.join("\n  ")}`);
list("Launch-required, missing", missing);
list("Claims without evidence (left off the pages)", unsupported);
list("Unknown facts (shown as [TODO: Qn] in development, left out in production)", unknown);

if (missing.length) {
  console.error(`\nbooks:ready: not ready. ${missing.length} launch-required fact(s) missing.`);
  process.exit(1);
}
console.log("\nbooks:ready: every launch-required fact is in.");

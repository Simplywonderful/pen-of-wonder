// Every number needs its evidence. Fails if a proof register entry has no `evidence`, if an ISBN
// has no `isbnEvidence` or a wrong check digit, or if an approved quote has no permission on file.
// When run locally (not on Cloudflare or CI), it also fails if an evidence file is missing from
// _source/proof/ or _source/books/, which never leaves this machine.
// Usage: node scripts/proof-check.mjs
import { existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { proof } from "../packages/config/proof.ts";
import { titles, schools, validIsbn13 } from "../packages/config/books.ts";
import { testimonials } from "../packages/config/testimonials.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const local = !process.env.CF_PAGES && !process.env.WORKERS_CI && !process.env.CI;
const problems = [];

// Evidence may be a file or a folder of files; "page 2" style notes after a comma are ignored.
function present(base, path) {
  const full = join(root, "_source", base, path.split(",")[0].trim());
  if (!existsSync(full)) return false;
  return statSync(full).isDirectory() ? readdirSync(full).length > 0 : true;
}

for (const p of proof) {
  // Pending entries never render in production (see packages/config/proof.ts), so they may wait.
  if (p.status === "pending") continue;
  if (!p.evidence) problems.push(`proof "${p.id}": no evidence named`);
  else if (local && !present("proof", p.evidence)) problems.push(`proof "${p.id}": _source/proof/${p.evidence} is missing`);
}

for (const t of titles) {
  if (!t.isbn) continue;
  if (!validIsbn13(t.isbn)) problems.push(`book "${t.slug}": ISBN ${t.isbn} has a wrong check digit`);
  if (!t.isbnEvidence) problems.push(`book "${t.slug}": ISBN without isbnEvidence`);
  else if (local && !present("", t.isbnEvidence)) problems.push(`book "${t.slug}": _source/${t.isbnEvidence.split(",")[0]} is missing`);
}

for (const s of schools) {
  if (s.evidence && local && !present("", s.evidence)) problems.push(`school "${s.name}": _source/${s.evidence} is missing`);
}

for (const [world, set] of Object.entries(testimonials)) {
  for (const q of set.quotes) {
    if (q.permission && local && !present("proof", q.permission)) {
      problems.push(`testimonial from ${q.by} (${world}): _source/proof/${q.permission} is missing`);
    }
  }
}

if (problems.length) {
  console.error(`proof-check: ${problems.length} problem(s)${local ? "" : " (file presence not checked off this machine)"}\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`proof-check: ${proof.filter((p) => p.status === "live").length} live register entries (${proof.filter((p) => p.status === "pending").length} pending, not shown in production), ${titles.filter((t) => t.isbn).length} ISBNs and every approved quote have their evidence${local ? " on file" : ""}.`);

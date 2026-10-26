// Fails the build if src/ contains wording that could advertise contract cheating
// (Skills and Post-16 Education Act 2022, ss. 26 to 28), invented proof, banned contact
// details, or the site's voice rules (em dashes, exclamation marks in copy).
// Usage: node scripts/integrity-check.mjs   (exits 1 on any hit)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const EXTENSIONS = new Set([".astro", ".md", ".mdx", ".ts", ".js", ".mjs", ".css", ".json"]);

const banned = [
  // Contract cheating, from CLAUDE.md
  "we write your dissertation",
  "write your dissertation",
  "assignment help",
  "do my assignment",
  "do your assignment",
  "guaranteed grade",
  "grade guaranteed",
  "pass guaranteed",
  "guaranteed pass",
  "100% plagiarism-free",
  "plagiarism free",
  "plagiarism-free",
  "undetectable",
  "ai-free",
  "write my essay",
  "essay writing service",
  "done for you",
  "we handle it",
  "leave it to us",
  "humanise your",
  "humanize your",
  "bypass ai detection",
  // Invented or unapproved proof
  "trusted by",
  "150 academic researchers",
  "approximately 150",
  // The old number, in any common spacing
  "903 572 2959",
  "9035722959",
  "903-572-2959",
  // Social links that belong to another brand
  "linkedin.com/in",
  "facebook.com",
  "wonderfuladebagbo.link",
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (EXTENSIONS.has(extname(name))) files.push(path);
  }
})(ROOT);

const hits = [];
for (const file of files) {
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .forEach((line, i) => {
      const lower = line.toLowerCase();
      for (const phrase of banned) {
        if (lower.includes(phrase)) hits.push(`${file}:${i + 1}  banned phrase "${phrase}"`);
      }
      if (line.includes("\u2014")) hits.push(`${file}:${i + 1}  em dash`);
      // Exclamation marks in prose only: skip code operators like !== and !value.
      if (/[A-Za-z’'")\]]!(\s|$|<|")/.test(line) && !/^\s*(\/\/|\*|import|const|if|return)/.test(line)) {
        hits.push(`${file}:${i + 1}  exclamation mark`);
      }
    });
}

if (hits.length) {
  console.error(`integrity-check: ${hits.length} problem(s)\n` + hits.join("\n"));
  process.exit(1);
}
console.log(`integrity-check: ${files.length} files clean.`);

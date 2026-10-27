// Fails the build on wording that could advertise contract cheating (Skills and Post-16 Education
// Act 2022, ss. 26 to 28), invented proof, the old phone number, social links, em dashes and
// exclamation marks in copy. Every app gets research's list. Every app except research, and the
// shared packages (which every world renders), also fail on academic terms, allowed only inside
// the writing boundary sentence, matched exactly.
// Usage: node scripts/integrity-check.mjs [app ...]   (no app = every app, plus packages)
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const EM_DASH = String.fromCharCode(0x2014);
const EXTENSIONS = new Set([".astro", ".md", ".mdx", ".ts", ".js", ".mjs", ".css", ".json"]);

const banned = [
  // Contract cheating
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
  "representative results",
  // The old number, in any common spacing
  "903 572 2959",
  "9035722959",
  "903-572-2959",
  // Social links
  "linkedin.com/in",
  "facebook.com",
  "wonderfuladebagbo.link",
];

const academic = /\b(dissertations?|thes[ie]s|assignments?|essays?|coursework|homework|exams?|examinations?|term papers?|final[- ]year projects?)\b/i;
const boundary = "We don't write or edit academic or assessed work. For research support, see our Research team.";
// Recorded in DESIGN.md section 9: the books' own printed back-cover blurbs are quoted word for word.
const isPrintedBlurb = (file, line) => file.endsWith(join("packages", "config", "books.ts")) && /^\s*text: "/.test(line);
// Also recorded there: the canonical Academic Integrity Policy has to name the work it refuses.
const isPolicy = (file) => file.endsWith(join("apps", "main", "src", "content", "pages", "academic-integrity.md"));

function files(dir) {
  const out = [];
  (function walk(d) {
    for (const name of readdirSync(d)) {
      const path = join(d, name);
      if (statSync(path).isDirectory()) {
        if (name !== "node_modules") walk(path);
      } else if (EXTENSIONS.has(extname(name))) out.push(path);
    }
  })(dir);
  return out;
}

function scan(paths, strict) {
  const hits = [];
  for (const file of paths) {
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .forEach((line, i) => {
        const where = `${relative(root, file)}:${i + 1}`;
        const lower = line.toLowerCase();
        for (const phrase of banned) if (lower.includes(phrase)) hits.push(`${where}  banned phrase "${phrase}"`);
        if (line.includes(EM_DASH)) hits.push(`${where}  em dash`);
        // Exclamation marks in prose only: skip code operators like !== and !value.
        if (/[A-Za-z’'")\]]!(\s|$|<|")/.test(line) && !/^\s*(\/\/|\*|import|const|if|return)/.test(line)) {
          hits.push(`${where}  exclamation mark`);
        }
        if (strict && !isPrintedBlurb(file, line) && !isPolicy(file)) {
          const m = line.replace(boundary, "").match(academic);
          if (m) hits.push(`${where}  academic term "${m[0]}" outside research`);
        }
      });
  }
  return hits;
}

const requested = process.argv.slice(2);
const apps = requested.length ? requested : readdirSync(join(root, "apps")).filter((a) => existsSync(join(root, "apps", a, "src")));

let hits = [];
let count = 0;
for (const app of apps) {
  const src = join(root, "apps", app, "src");
  if (!existsSync(src)) {
    console.error(`integrity-check: no app called "${app}".`);
    process.exit(1);
  }
  const list = files(src);
  count += list.length;
  hits = hits.concat(scan(list, app !== "research"));
}
const shared = files(join(root, "packages"));
count += shared.length;
hits = hits.concat(scan(shared, true));

if (hits.length) {
  console.error(`integrity-check: ${hits.length} problem(s)\n` + hits.join("\n"));
  process.exit(1);
}
console.log(`integrity-check: ${count} files clean (${apps.join(", ")}, packages).`);

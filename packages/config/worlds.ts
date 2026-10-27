// Every world's address, status and menu. No world's URL is written anywhere else.
// In development each app runs on its own port, so cross-world links work locally; set
// PUBLIC_WORLD_URLS=local or =production to override (for example to preview a local build).
// Menu blurbs show on every world's header, so they never mention academic work.
//
// penofwonder.com isn't registered yet (owner, 27 Oct 2026), so the live sites run on Cloudflare's
// free addresses: each world's interimHost. Every canonical URL, sitemap and cross-world link uses
// them until domainLive is switched on. Research's interim address is the existing research site,
// which stays live and untouched until the domain arrives.
export const domainLive = false;

export type WorldId = "main" | "marketing" | "writing" | "research" | "publishing" | "dev";
export type WorldStatus = "live" | "soon";
export type MenuItem = { label: string; path: string };
/** What a world's one-page holding site says while its status is "soon". */
export type Holding = {
  headline: string;
  line: string;
  services: [string, string, string];
  button: string;
  /** What the prefilled WhatsApp message asks about. */
  ask: string;
  aside?: { text: string; world: WorldId; label: string };
};

export type World = {
  id: WorldId;
  label: string;
  name: string;
  host: string;
  /** The free Cloudflare address used until the domain is registered. */
  interimHost: string;
  port: number;
  status: WorldStatus;
  /** A short label beside the world in the header menu. Only Dev has one ("Dev (Soon)" in the brief). */
  badge?: string;
  tagline: string;
  menu: MenuItem[];
  holding?: Holding;
};

export const worlds: World[] = [
  {
    id: "main",
    label: "Pen of Wonder",
    name: "Pen of Wonder",
    host: "penofwonder.com",
    interimHost: "penofwonder.pages.dev",
    port: 4321,
    status: "live",
    tagline: "Words that make you win.",
    menu: [],
  },
  {
    id: "marketing",
    label: "Marketing",
    name: "Pen of Wonder Marketing",
    host: "marketing.penofwonder.com",
    interimHost: "penofwondermarketing.pages.dev",
    port: 4322,
    status: "live",
    tagline: "Words that sell.",
    menu: [
      { label: "Paid ads on Meta, LinkedIn, TikTok and X", path: "/paid-ads" },
      { label: "Ad creative built for testing", path: "/ad-creative" },
      { label: "Landing pages", path: "/landing-pages" },
      { label: "Copywriting", path: "/copywriting" },
      { label: "Content writing and SEO", path: "/content-and-seo" },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    name: "Pen of Wonder Writing",
    host: "writing.penofwonder.com",
    interimHost: "penofwonderwriting.pages.dev",
    port: 4324,
    status: "soon",
    tagline: "Words that open doors.",
    menu: [
      { label: "CVs and cover letters", path: "/cvs" },
      { label: "LinkedIn profiles", path: "/linkedin" },
      { label: "Grant writing", path: "/grants" },
      { label: "Business plans and proposals", path: "/business-plans" },
    ],
    holding: {
      headline: "CVs, grant applications and business plans that get read.",
      line: "Pen of Wonder Writing opens soon, for job seekers, professionals, founders, NGOs and anyone applying for funding. If you need something written now, tell us on WhatsApp and we'll say honestly whether we can take it on yet.",
      services: [
        "CVs, cover letters and LinkedIn profiles",
        "Grant applications, concept notes and budget narratives",
        "Business plans, proposals and company profiles",
      ],
      button: "Ask about writing on WhatsApp",
      ask: "a writing job",
      aside: { text: "Need copy that sells?", world: "marketing", label: "That's our Marketing team" },
    },
  },
  {
    id: "research",
    label: "Research",
    name: "Pen of Wonder Research",
    host: "research.penofwonder.com",
    interimHost: "penofwonderresearch.pages.dev",
    port: 4323,
    status: "live",
    tagline: "Quiet, on request.",
    menu: [
      { label: "Publication support for journal manuscripts", path: "/publication-support" },
      { label: "Freelance editing for firms and research teams", path: "/work-with-us" },
      { label: "Methods coaching for UK postgraduates", path: "/coaching" },
      { label: "A free one-page review of your manuscript", path: "/contact" },
    ],
  },
  {
    id: "publishing",
    label: "Publishing",
    name: "Pen of Wonder Publishing",
    host: "publishing.penofwonder.com",
    interimHost: "penofwonderpublishing.pages.dev",
    port: 4325,
    status: "soon",
    tagline: "Books and the people who write them.",
    menu: [
      { label: "The Hidden Treasures Companion Readers", path: "/books" },
      { label: "Book writing and ghostwriting", path: "/book-writing" },
      { label: "Editing and proofreading", path: "/editing" },
      { label: "ISBN, layout and listing", path: "/isbn-and-listing" },
    ],
    holding: {
      headline: "Books children want to read, and help for the people who write them.",
      line: "Pen of Wonder Publishing opens soon. It will show the Hidden Treasures Companion Readers, written by our founder for Nigerian primary classes, and offer book services to authors, churches, schools and organisations.",
      services: [
        "The Hidden Treasures Companion Readers, Basic 1 to 6",
        "Book writing, editing and ISBN registration",
        "Illustration and printing, quoted per project",
      ],
      button: "Ask about the books on WhatsApp",
      ask: "the Hidden Treasures readers",
    },
  },
  {
    id: "dev",
    label: "Dev",
    name: "Pen of Wonder Dev",
    host: "dev.penofwonder.com",
    interimHost: "penofwonderdev.pages.dev",
    port: 4326,
    status: "soon",
    badge: "Soon",
    tagline: "Websites and business systems, soon.",
    menu: [
      { label: "Websites", path: "/" },
      { label: "Automation", path: "/" },
      { label: "Business systems", path: "/" },
    ],
    holding: {
      headline: "Websites and business systems, soon.",
      line: "Pen of Wonder Dev will build websites, automation and the systems a small business runs on. We aren't taking dev projects yet. Join the waitlist on WhatsApp and we'll tell you when we open.",
      services: ["Websites", "Automation", "Business systems"],
      button: "Join the waitlist on WhatsApp",
      ask: "joining the Dev waitlist",
      aside: { text: "Need a landing page now?", world: "marketing", label: "Our Marketing team builds them" },
    },
  },
];

/** The worlds in the header menu, in menu order. Main is the home link, not a menu item. */
export const menuWorlds = ["marketing", "writing", "research", "publishing", "dev"].map((id) => world(id as WorldId));

export function world(id: WorldId): World {
  const found = worlds.find((w) => w.id === id);
  if (!found) throw new Error(`Unknown world: ${id}`);
  return found;
}

type Mode = "local" | "production";
const env = (import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env ?? {};
const defaultMode: Mode =
  env.PUBLIC_WORLD_URLS === "local" || env.PUBLIC_WORLD_URLS === "production"
    ? env.PUBLIC_WORLD_URLS
    : env.DEV
      ? "local"
      : "production";

/** The origin of a world, e.g. https://research.penofwonder.com (or its interim address) or http://localhost:4323. */
export function worldOrigin(id: WorldId, mode: Mode = defaultMode): string {
  const w = world(id);
  return mode === "local" ? `http://localhost:${w.port}` : `https://${domainLive ? w.host : w.interimHost}`;
}

/** A full URL to a page in a world. A `soon` world only has its holding page, so every path goes home. */
export function worldUrl(id: WorldId, path = "/", mode: Mode = defaultMode): string {
  const w = world(id);
  const target = w.status === "soon" ? "/" : path;
  const url = new URL(target, worldOrigin(id, mode)).href;
  return target === "/" ? url.replace(/\/$/, "") : url;
}

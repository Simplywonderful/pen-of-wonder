// Research's own settings. Contact details, the address and the legal identity come from the
// shared config in packages/config, so they are written once for every world.
// A value of null renders as a visible [TODO] marker, so nothing is ever invented.
import { contact, contactPlaceholders, whatsappLink } from "@pow/config/contact";
import { legal } from "@pow/config/legal";
import { world, worldOrigin } from "@pow/config/worlds";

export const site = {
  world: "research",
  name: world("research").name,
  owner: legal.founder,
  // Canonical URLs, sitemap, RSS and JSON-LD always use the live address, even in development.
  url: worldOrigin("research", "production"),
  locale: "en-GB",
  city: legal.city,
  region: legal.region,
  country: legal.country,
  timezone: legal.timezone,

  email: contact.email,
  whatsapp: {
    display: contact.whatsapp.display,
    link: whatsappLink("research"),
  },
  replyTime: contact.replyTime,
  reviewTurnaround: "3 working days",

  businessLine: "Pen of Wonder Research is the research service of Pen of Wonder Consults.",

  formspreeId: contact.formspreeId,
  calendlyUrl: null as string | null,
  meetingPlatform: "Google Meet" as string | null,
} as const;

export const placeholders = {
  email: contactPlaceholders.email,
  formspreeId: contactPlaceholders.formspreeId,
  calendlyUrl: "CALENDLY LINK",
  meetingPlatform: "ZOOM / GOOGLE MEET",
} as const;

export const prices = {
  currency: "GBP",
  single: { label: "Single session", sessions: 1, price: 40, note: "60 minutes, one topic" },
  analysis: {
    label: "Analysis pack",
    sessions: 3,
    price: 110,
    note: "SPSS or NVivo, used within 3 months",
  },
  dissertation: {
    label: "Dissertation pack",
    sessions: 6,
    price: 210,
    note: "Dissertation coaching, used within 6 months",
  },
} as const;

export const nav = [
  { href: "/publication-support", label: "Publication support" },
  { href: "/work-with-us", label: "Work with us" },
  { href: "/coaching", label: "Coaching" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const roles = [
  { value: "researcher", label: "Researcher" },
  { value: "editing-firm", label: "Editing firm or research team" },
  { value: "student", label: "Postgraduate student" },
] as const;

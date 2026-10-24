// Contact details, feature flags and every placeholder the owner still has to fill.
// A value of null renders as a visible [TODO] marker on the page, so nothing is ever invented.

export const site = {
  name: "Pen of Wonder Research",
  owner: "Wonderful Adebagbo",
  url: "https://penofwonderresearch.pages.dev",
  locale: "en-GB",
  city: "Ibadan",
  region: "Oyo State",
  country: "Nigeria",
  timezone: "WAT (UTC+1)",

  email: "adebagbo.wonderfull@gmail.com",
  whatsapp: {
    display: "+234 704 641 8092",
    link: "https://wa.me/2347046418092?text=" +
      encodeURIComponent("Hello, I found Pen of Wonder Research and would like to ask about "),
  },
  replyTime: "within one working day",
  reviewTurnaround: "3 working days",

  businessLine:
    "Pen of Wonder Research is the research service of Pen of Wonder Consults, a registered business name in Nigeria.",
  cacNumber: "7809965" as string | null,

  formspreeId: "xdeabooe" as string | null,
  calendlyUrl: null as string | null,
  meetingPlatform: "Google Meet" as string | null,
  photographerCredit: null as string | null,

  showTestimonials: false,
} as const;

export const placeholders = {
  cacNumber: "CAC BN NUMBER, optional",
  formspreeId: "FORMSPREE FORM ID",
  calendlyUrl: "CALENDLY LINK",
  meetingPlatform: "ZOOM / GOOGLE MEET",
  photographerCredit: "PHOTOGRAPHER CREDIT",
  subjects: "CONFIRM SUBJECTS",
  styles: "CONFIRM STYLES",
  hours: "HOURS PER WEEK",
  cv: "HOLD: no CV link until a revised CV is supplied",
  paymentMethods: "CONFIRM PAYMENT METHODS",
  refundPolicy: "CONFIRM REFUND POLICY",
  deposits: "CONFIRM DEPOSITS",
  retention: "RETENTION PERIOD",
  sampleReview: "TODO: anonymised sample one-page review, optional",
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

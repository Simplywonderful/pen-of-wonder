// The same four steps on every world, in order, because the order is the point. Shown by
// HowWeWork.astro (old layout) and Steps.astro (the revamp's layout).
import { contact } from "@pow/config/contact";

export const howWeWorkSteps = [
  { title: "Message us.", body: `Tell us on WhatsApp or by email what you need. We reply ${contact.replyTime}.` },
  { title: "Free consultation.", body: "A short chat to understand the job, and an honest answer on whether we're the right fit." },
  { title: "Written quote.", body: "What we'll do, what it costs and when you'll have it. Nothing starts until you agree." },
  { title: "Delivery and revisions.", body: "The work arrives on the agreed date, with the revisions your quote sets out." },
];

/** The same steps as headings, without the full stop a heading doesn't take. */
export const howWeWorkHeadings = howWeWorkSteps.map((s) => ({ title: s.title.replace(/\.$/, ""), body: s.body }));

/** The hero's step strip (revamp brief 4.1): one word per step. */
export const howWeWorkWords = ["Message", "Consult", "Quote", "Deliver"];

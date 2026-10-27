// Every contact detail on every world lives here and nowhere else.
// A value of null renders as a visible [TODO] marker, so nothing is ever invented.
// Never add the old WhatsApp number (see CLAUDE.md), or either number printed on the book covers.
import { world, type WorldId } from "./worlds.ts";

export const contact = {
  whatsapp: {
    display: "+234 704 641 8092",
    number: "2347046418092",
  },
  // Interim address chosen by the owner on 27 Oct 2026, while penofwonder.com is unregistered. It
  // replaces the "no Gmail fallback" rule for now; switch to the business address on the domain
  // (e.g. hello@penofwonder.com) once it exists and works.
  email: "penofwonder@gmail.com" as string | null,
  replyTime: "within one working day",
  formspreeId: "xdeabooe" as string | null,
} as const;

export const contactPlaceholders = {
  email: "BUSINESS EMAIL",
  formspreeId: "FORMSPREE FORM ID",
} as const;

/** A WhatsApp link prefilled with the world and, where known, the service. */
export function whatsappLink(id: WorldId, service?: string): string {
  const message = `Hello, I found ${world(id).name} and I'd like to ask about ${service ?? ""}`;
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

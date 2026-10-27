// Markdown pages (privacy, terms) write {email} where the contact address goes. This swaps it in
// the rendered HTML for the address in packages/config/contact.ts, or for a visible [TODO] marker
// until one exists, so the address is written in one place for every world.
import { contact, contactPlaceholders } from "@pow/config/contact";

export function withContactEmail(html: string): string {
  const email = contact.email
    ? `<a href="mailto:${contact.email}">${contact.email}</a>`
    : `<span class="todo">[${contactPlaceholders.email}]</span>`;
  return html.replaceAll("{email}", email);
}

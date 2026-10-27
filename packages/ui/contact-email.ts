// Markdown pages (privacy, terms, policies) can't import config, so they use two tokens, swapped in
// the rendered HTML:
//   {email}                  the address in packages/config/contact.ts, or a visible [TODO] marker
//   {world:research/privacy} a link target in another world, from packages/config/worlds.ts
// so addresses are written in one place for every world.
import { contact, contactPlaceholders } from "@pow/config/contact";
import { worldUrl, worlds, type WorldId } from "@pow/config/worlds";

const ids = new Set(worlds.map((w) => w.id));

export function withContactEmail(html: string): string {
  const email = contact.email
    ? `<a href="mailto:${contact.email}">${contact.email}</a>`
    : `<span class="todo">[${contactPlaceholders.email}]</span>`;
  return html
    .replaceAll("{email}", email)
    .replace(/(?:\{|%7B)world:([a-z]+)(\/[^}%"]*)?(?:\}|%7D)/g, (token, id: string, path?: string) => {
      if (!ids.has(id as WorldId)) throw new Error(`Unknown world in ${token}`);
      return worldUrl(id as WorldId, path ?? "/");
    });
}

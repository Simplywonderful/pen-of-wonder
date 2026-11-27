// The company's own social accounts, supplied by the owner on 27 Nov 2026. Every world's footer and
// the main site's structured data (sameAs) read from here, so a change of account is one edit.
// Company accounts only: never Wonderful's personal profiles or personal link page (CLAUDE.md).
export interface SocialAccount {
  label: string;
  url: string;
}

export const social: SocialAccount[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/pen-of-wonder/" },
  { label: "Facebook", url: "https://www.facebook.com/penofwonderconsult/" },
  { label: "Instagram", url: "https://www.instagram.com/penofwonder/" },
];

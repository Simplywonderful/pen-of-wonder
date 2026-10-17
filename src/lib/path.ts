// Static builds use file output (about.html), so Astro.url.pathname ends in .html.
// Pages are served and linked without it, so strip it before comparing or publishing URLs.
export const cleanPath = (pathname: string) =>
  pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/(.)\/$/, "$1") || "/";

// The shared backend every world posts to (revamp brief 5.1): the pow-api Worker. After the domain it
// moves to https://api.penofwonder.com. DEPLOY.md ("pow-api") has the owner's steps.

export const api = {
  /** The Worker's origin, e.g. https://pow-api.<account>.workers.dev. null until it is deployed. */
  origin: null as string | null,
  /**
   * Where the contact forms post (brief 5.2). "formspree" until pow-api is deployed and tested; then
   * "api". Keep Formspree's form id in contact.ts for one week after switching, as the fallback, and
   * remove it once /submit has run a week without errors.
   */
  forms: "formspree" as "formspree" | "api",
};

export const apiReady = () => api.origin !== null;
/** The forms post to pow-api only when it exists and the switch is on. */
export const formsUseApi = () => apiReady() && api.forms === "api";

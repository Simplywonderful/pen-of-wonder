// The shared backend every world posts to (revamp brief 5.1): the pow-api Worker. After the domain it
// moves to https://api.penofwonder.com. DEPLOY.md ("pow-api") has the owner's steps.

export const api = {
  /** The Worker's origin. Deployed 26 Nov 2026; becomes https://api.penofwonder.com after the domain. */
  origin: "https://pow-api.wonderfuladebagbo.workers.dev" as string | null,
  /**
   * Where the contact forms post (brief 5.2). "formspree" until pow-api is deployed and tested; then
   * "api". Switched to "api" on 26 Nov 2026. Keep Formspree's form id in contact.ts until 3 Dec 2026,
   * as the fallback, and remove it once /submit has run a week without errors.
   */
  forms: "api" as "formspree" | "api",
  /** Newsletter signups (brief 5.3): off until pow-api has /subscribe and Brevo (Phase R4). */
  newsletter: false,
};

export const apiReady = () => api.origin !== null;
/** The newsletter row collects addresses only when pow-api and its signup switch are both on. */
export const newsletterReady = () => apiReady() && api.newsletter;
/** The forms post to pow-api only when it exists and the switch is on. */
export const formsUseApi = () => apiReady() && api.forms === "api";

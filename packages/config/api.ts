// The shared backend every world posts to (revamp brief 5.1): the pow-api Worker. Until it is
// deployed (Phase R3), forms that need it show as "opening soon" instead of posting anywhere.
// After the domain it moves to https://api.penofwonder.com.

export const api = {
  /** The Worker's origin, e.g. its workers.dev address. null until Phase R3 deploys it. */
  origin: null as string | null,
};

export const apiReady = () => api.origin !== null;

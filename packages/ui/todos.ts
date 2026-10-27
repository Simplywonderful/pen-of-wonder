// Whether to show [TODO] markers for facts still waiting on the owner. On in development and in
// review builds (PUBLIC_SHOW_TODOS=true); off in production, where pages leave the gap out instead.
export const showTodos: boolean = Boolean(import.meta.env.DEV) || import.meta.env.PUBLIC_SHOW_TODOS === "true";

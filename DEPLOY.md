# Deploying to Cloudflare (interim, before the domain)

penofwonder.com isn't registered yet, so the worlds go live on Cloudflare's free addresses. Research stays on its existing site (penofwonderresearch.pages.dev, built from the old repo) until the domain arrives. Settings checked against Cloudflare's docs on 26 Oct 2026 (DESIGN.md section 13.1).

The repo is private on GitHub: `Simplywonderful/pen-of-wonder`, branch `main`.

## 1. Four Pages projects (main, marketing, writing, publishing)

For each row below, in the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**. Pick `Simplywonderful/pen-of-wonder` (the first time, Cloudflare asks to install its GitHub app; give it access to this repository only). Then:

| Project name | Build command | Build output directory |
|---|---|---|
| `penofwonder` | `npm run build -w apps/main` | `apps/main/dist` |
| `penofwonder-marketing` | `npm run build -w apps/marketing` | `apps/marketing/dist` |
| `penofwonder-writing` | `npm run build -w apps/writing` | `apps/writing/dist` |
| `penofwonder-publishing` | `npm run build -w apps/publishing` | `apps/publishing/dist` |

For all four:
- **Production branch:** `main`.
- **Framework preset:** None.
- **Root directory:** leave empty (the repo root).
- **Environment variables:** none needed. The Node version comes from `.node-version` in the repo.
- Save and deploy. The first build takes a few minutes.

Then, in each project's **Settings → Build → Build watch paths**, set **Include paths** to these (one per line), with that project's own app in the first line:

```
apps/main/*
packages/*
scripts/*
package.json
package-lock.json
.node-version
```

(`apps/marketing/*` for marketing, and so on.) Leave **Exclude paths** empty. This stops a change to one world from rebuilding the others. A change under `packages/` or `scripts/` still rebuilds all of them, which is intended.

Finally, in each project's **Metrics → Web Analytics**, turn it on. It's cookie-free.

**Check the address each project was given.** It's shown at the top of the project, normally `<project name>.pages.dev`. If Cloudflare added anything to a name (it does when a name is taken), tell me: the addresses are written in `packages/config/worlds.ts`, and every link between the worlds uses them.

## 2. One Worker for dev

Pages allows five projects per repository, and research will need the fifth when it moves in, so dev runs on Workers.

**Workers & Pages → Create → Workers → Import a repository**, pick `Simplywonderful/pen-of-wonder`, then:

- **Project name:** `penofwonder-dev` (it must match `name` in `apps/dev/wrangler.jsonc`).
- **Root directory:** leave empty.
- **Build command:** `npm run build -w apps/dev`
- **Deploy command:** `npx wrangler deploy --config apps/dev/wrangler.jsonc`
- **Build watch paths** (Settings → Build): `apps/dev/*`, `packages/*`, `scripts/*`, `package.json`, `package-lock.json`, `.node-version`.

**Tell me the Worker's address.** It looks like `penofwonder-dev.<your-account>.workers.dev`. Until I put it in `worlds.ts`, the Dev links on the other worlds point at a placeholder address and won't work.

Web Analytics isn't injected on Workers; once the Worker exists, add a site for it under **Web Analytics** and send me the token, which goes in `packages/config/analytics.ts`.

## 3. After the first deploys

- I update `worlds.ts` with the real addresses (dev at least) and push; every project rebuilds once.
- Push in batches of fewer than 20 commits. A push of 20 or more, or one with no file changes, makes every project build.
- Formspree: leave "Restrict to domain" off until the domain exists. One domain covers all subdomains, but the `pages.dev` addresses are all different domains.

## 4. When penofwonder.com is registered (Phase 1C proper)

1. Add each custom domain in its project (**Custom domains → Set up a domain**).
2. Set `domainLive = true` in `packages/config/worlds.ts`, fill in the Worker's custom domain, and push.
3. Create the new research Pages project from this repo (`npm run build -w apps/research`, output `apps/research/dist`), its deploy hook, and the `CF_DEPLOY_HOOK_RESEARCH` repository secret.
4. Cut the old research site over to a redirect, as DESIGN.md section 14 and the build prompt describe.

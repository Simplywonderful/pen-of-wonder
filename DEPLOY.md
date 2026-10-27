# Deploying to Cloudflare (interim, before the domain)

penofwonder.com isn't registered yet, so the worlds go live on Cloudflare's free `pages.dev` addresses. Cloudflare builds each site from the private GitHub repo `Simplywonderful/pen-of-wonder` whenever `main` is pushed (owner's choice, 27 Oct 2026). Research stays on its existing site (penofwonderresearch.pages.dev, built from the old repo) until the domain arrives.

You must be signed in to GitHub as **Simplywonderful** to see the repo, and when Cloudflare asks to connect to GitHub.

## 1. Five Pages projects, connected to GitHub

For each row, in the Cloudflare dashboard: **Workers & Pages → Create → Pages → Import an existing Git repository** (it may say **Connect to Git**). The first time, Cloudflare asks to install its GitHub app: choose the **Simplywonderful** account and give it access to the `pen-of-wonder` repository only. Then pick `pen-of-wonder` and set:

| Project name (type exactly) | Build command | Build output directory |
|---|---|---|
| `penofwonder` | `npm run build -w apps/main` | `apps/main/dist` |
| `penofwondermarketing` | `npm run build -w apps/marketing` | `apps/marketing/dist` |
| `penofwonderwriting` | `npm run build -w apps/writing` | `apps/writing/dist` |
| `penofwonderpublishing` | `npm run build -w apps/publishing` | `apps/publishing/dist` |
| `penofwonderdev` | `npm run build -w apps/dev` | `apps/dev/dist` |

For all five:
- **Production branch:** `main`.
- **Framework preset:** None.
- **Root directory:** leave empty (the repo root).
- **Environment variables:** none. The Node version comes from `.node-version` in the repo.
- **Save and Deploy.** The first build takes a few minutes. Check it says **Success** under **Deployments**; if it fails, send me the build log.

Then in each project, **Settings → Build → Build watch paths → Include paths**, one per line, with that project's own app in the first line:

```
apps/main/*
packages/*
scripts/*
package.json
package-lock.json
.node-version
```

(`apps/marketing/*` for marketing, `apps/dev/*` for dev, and so on.) Leave **Exclude paths** empty. A change to one world then rebuilds only that world; a change under `packages/` or `scripts/` rebuilds all five, which is intended.

Finally, in each project, **Metrics → Web Analytics → Enable**. It's cookie-free.

**Check each address.** It's shown at the top of the project, normally `<project name>.pages.dev`. If Cloudflare added anything to a name (it does when a name is taken), tell me: every link between the worlds uses these addresses (`packages/config/worlds.ts`).

## 2. Updating the sites

Push to `main` on GitHub. Each project rebuilds when its own files change. Push in batches of fewer than 20 commits: a push of 20 or more, or one with no file changes, rebuilds every project.

If GitHub isn't reachable, `node scripts/prepare-upload.mjs` still builds upload-ready copies in `_deploy/`, but a project connected to Git can't take uploads.

## 3. When penofwonder.com is registered (Phase 1C proper)

1. Add each custom domain in its project (**Custom domains → Set up a domain**).
2. Set `domainLive = true` in `packages/config/worlds.ts` and push.
3. Move research here. Pages allows five Git-connected projects per repository, so dev moves to a Worker first (`apps/dev/wrangler.jsonc` is ready; DESIGN.md section 13.1), then research gets a Pages project (`npm run build -w apps/research`, output `apps/research/dist`), a deploy hook, and the `CF_DEPLOY_HOOK_RESEARCH` repository secret for the weekly rebuild.
4. Cut the old research site over to a redirect, as DESIGN.md section 14 and the build prompt describe.
5. Redirect each `pages.dev` address to its custom domain (Cloudflare Bulk Redirects), so search engines don't see two copies.

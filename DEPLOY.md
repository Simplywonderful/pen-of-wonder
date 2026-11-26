# Deploying to Cloudflare (interim, before the domain)

penofwonder.com isn't registered yet, so the worlds go live on Cloudflare's free `pages.dev` addresses. Cloudflare builds each site from the private GitHub repo `Simplywonderful/pen-of-wonder` whenever `main` is pushed (owner's choice, 27 Oct 2026). Research moved here on 26 Nov 2026 (owner decision, section 1A): it builds from this repo at penofwonder-research.pages.dev, and the old penofwonderresearch.pages.dev only redirects to it. Dev is a Worker at penofwonder-dev.wonderfuladebagbo.workers.dev, because Pages allows five projects per repository.

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

## 1A. Moving research here, and dev to a Worker (26 Nov 2026)

Pages takes five Git-connected projects per repository and we have six sites, so dev becomes a Worker first. Do the steps in this order: the old dev address keeps working until step 2.

1. **Dev as a Worker.** **Workers & Pages → Create → Workers → Import a repository**, pick `pen-of-wonder`, and set:
   - **Project name:** `penofwonder-dev` (exactly; it must match `apps/dev/wrangler.jsonc`)
   - **Build command:** `npm run build -w apps/dev`
   - **Deploy command:** `npx wrangler deploy --config apps/dev/wrangler.jsonc`
   - **Root directory:** leave empty. **Production branch:** `main`.

   Deploy, then open `https://penofwonder-dev.wonderfuladebagbo.workers.dev`: it should show the Dev page. In the Worker's **Settings → Build → Build watch paths**, use the include list from section 1 with `apps/dev/*` first.
2. **Delete the old dev Pages project.** Open `penofwonderdev` → **Settings** → **Delete project**. This frees its place for research.
3. **Research as a Pages project.** As in section 1: project name `penofwonder-research`, build command `npm run build -w apps/research`, output `apps/research/dist`, production branch `main`, watch paths with `apps/research/*` first, and **Metrics → Web Analytics → Enable**. Check the address is `penofwonder-research.pages.dev`; if Cloudflare added anything to it, tell me.
4. **The weekly rebuild hook.** In `penofwonder-research`: **Settings → Build → Deploy hooks → Add deploy hook**, name `weekly rebuild`, branch `main`, and copy the address it shows. On GitHub, open `pen-of-wonder` → **Settings → Secrets and variables → Actions → New repository secret**, name `CF_DEPLOY_HOOK_RESEARCH`, and paste the address. Keep it private: anyone with it can trigger builds.
5. **Tell me it's done.** I push the new addresses (every site's links, the sitemap and canonical URLs), update pow-api so it accepts the research and dev forms from their new addresses, and push the old research repo, which now builds only a permanent redirect (same path, new address). Then I check every old research page lands on its new address.

## 2. Updating the sites

Push to `main` on GitHub. Each project rebuilds when its own files change. Push in batches of fewer than 20 commits: a push of 20 or more, or one with no file changes, rebuilds every project.

If GitHub isn't reachable, `node scripts/prepare-upload.mjs` still builds upload-ready copies in `_deploy/`, but a project connected to Git can't take uploads.

## 3. When penofwonder.com is registered (Phase 1C proper)

1. Add each custom domain in its project (**Custom domains → Set up a domain**).
2. Set `domainLive = true` in `packages/config/worlds.ts` and push.
3. Research and dev already moved (section 1A). Change `TARGET` in the old research repo's `scripts/redirect-build.mjs` to `https://research.penofwonder.com` and push it, so the old address skips a hop.
4. Redirect each `pages.dev` address to its custom domain (Cloudflare Bulk Redirects), so search engines don't see two copies.

## 4. pow-api: the shared backend (revamp Phase R3)

One Cloudflare Worker, `pow-api`, takes every world's forms and runs the hourly jobs. Its code is in `apps/api`; the tests run with `npm test -w apps/api`. You run these steps once, on your own computer, from the repository folder. Commands that start with `npx wrangler` sign in to your Cloudflare account the first time.

1. **Sign in:** `npx wrangler login` (from `apps/api`), and approve in the browser.
2. **Create the database:** `npx wrangler d1 create pow`. Copy the `database_id` it prints into `apps/api/wrangler.jsonc`, replacing the zeros.
3. **Create the tables:** `npm run db:migrate -w apps/api`.
4. **Add the secrets**, one at a time (`npx wrangler secret put NAME`, then paste the value):
   - `HASH_SALT`: any long random phrase. It scrambles IP addresses before they're counted. Keep it secret; don't change it later.
   - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, for new-enquiry alerts. Create the bot by messaging @BotFather on Telegram (`/newbot`), which gives the token. Then send your new bot any message, open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser, and copy the `chat` `id` from the reply.
   - Later phases add `BREVO_API_KEY` (R4), `BUFFER_API_KEY` (R5), `ADMIN_KEY` and the `CF_DEPLOY_HOOK_*` secrets (R6). Leave them out for now.
5. **Check the cron count.** The Worker uses one cron trigger (hourly). The free plan allows five per account, shared with every other Worker on it ([CLOUDFLARE ACCOUNT CRON COUNT]).
6. **Deploy:** `npm run deploy -w apps/api`. Wrangler prints the address, `https://pow-api.<your-subdomain>.workers.dev`.
7. **Check it:** open `<address>/health`. It should show `"db": true` and `"telegram": true`. It shows only true or false, never a secret.
8. **Tell me the address.** I set `api.origin` in `packages/config/api.ts`, switch `forms` to `"api"`, publish the updated privacy notice from `drafts/privacy-after-pow-api.md` in the same push (it describes the database and Telegram alerts, so it must not go live before them), and send a test message from every world. You confirm each Telegram alert arrives.
   Done on 26 Nov 2026: the forms post to `https://pow-api.wonderfuladebagbo.workers.dev`, and the notice is live.
9. **One week later** (3 Dec 2026), if `/submit` has run without errors, I remove Formspree from the code, `contact.ts` and the privacy notice.

After the domain is registered, add `api.penofwonder.com` as a custom domain on the Worker (**Workers & Pages → pow-api → Settings → Domains & Routes**) and change `api.origin` to it.

# Deploying to Cloudflare (interim, before the domain)

penofwonder.com isn't registered yet, so the worlds go live on Cloudflare's free `pages.dev` addresses, uploaded by hand (owner's choice, 27 Oct 2026). Research stays on its existing site (penofwonderresearch.pages.dev, built from the old repo) until the domain arrives.

The code is also on GitHub as a private repo, `Simplywonderful/pen-of-wonder`, but Cloudflare doesn't build from it: each site is built on this machine and uploaded.

## 1. Build the upload folders

From the repo root:

```bash
node scripts/prepare-upload.mjs
```

It builds main, marketing, writing, publishing and dev with every check, including the evidence files in `_source/proof/`, and copies each into `_deploy/<project name>/`. A site that fails a check isn't copied; the script says why. `_deploy/` is gitignored.

## 2. Upload each folder (first time)

For each project, in the Cloudflare dashboard: **Workers & Pages → Create → Pages → Upload assets** (also called "Drag and drop your files"):

| Project name (type exactly) | Folder to upload |
|---|---|
| `penofwonder` | `_deploy/penofwonder` |
| `penofwonder-marketing` | `_deploy/penofwonder-marketing` |
| `penofwonder-writing` | `_deploy/penofwonder-writing` |
| `penofwonder-publishing` | `_deploy/penofwonder-publishing` |
| `penofwonder-dev` | `_deploy/penofwonder-dev` |

1. Type the project name, then **Create project**.
2. Drag the whole folder (or choose it) onto the upload box. Upload the folder's contents, with `index.html` at the top level, not a folder that contains it.
3. **Deploy site.**
4. Note the address it shows. If it isn't exactly `<project name>.pages.dev` (Cloudflare adds a suffix when a name is taken), tell me: every link between the worlds uses these addresses, so I'd rebuild and you'd upload again.
5. In the project, **Metrics → Web Analytics → Enable**. It's cookie-free.

A project that already exists and was created from Git can't take uploads. If you made Git-connected projects earlier, delete them first, or upload under the names above.

## 3. Updating a site later

Run `node scripts/prepare-upload.mjs` (or `node scripts/prepare-upload.mjs marketing` for one site), then in the project: **Deployments → Create deployment → upload the folder again**.

## 4. When penofwonder.com is registered (Phase 1C proper)

1. Add each custom domain in its project (**Custom domains → Set up a domain**).
2. Set `domainLive = true` in `packages/config/worlds.ts`, rebuild and upload everything.
3. Move research here: build `apps/research`, upload it to a new project, and cut the old research site over to a redirect, as DESIGN.md section 14 and the build prompt describe.
4. Redirect each `pages.dev` address to its custom domain (Cloudflare Bulk Redirects), so search engines don't see two copies.
5. Optional: switch to Git-connected builds then. Pages allows five Git-connected projects per repository, so dev would move to a Worker (`apps/dev/wrangler.jsonc` is ready for that).

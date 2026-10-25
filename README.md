# Marpos Studio Astro reference

A working editorial website adapted from the [official Astro Blog starter](https://github.com/withastro/astro/tree/astro%406.0.0/examples/blog), pinned to upstream commit `48e5c4d3518dbd82edff87fa628be9e46c9b21bf`. It keeps the starter's typography, global styles, date/link components, fonts and abstract image assets, and replaces the starter articles and templates with a Marpos Studio journal.

This is an integration reference, not an official production Marpos website. The two contributor profiles are explicitly sample editorial identities. No accounts, API keys, external CMS, or remote media service are needed.

## Run

Use Node 22.12 or newer (a supported even-numbered Node release).

```sh
git clone https://github.com/ludulicious/marpos-studio-astro-reference.git
cd marpos-studio-astro-reference
npm ci
npm run dev
```

Open the address Astro prints, normally `http://localhost:4321`. Run `npm run check` for Astro/TypeScript diagnostics and `npm run build` for a static production build. `npm run preview` serves the built version, which excludes draft stories.

Astro is pinned to 6.4.8, the release used for this reference's verification. MDX is deliberately absent because Studio currently edits Markdown, YAML and JSON. This project has its own package manifest and lockfile; it does not add dependencies to Studio's desktop app.

## Add to Marpos Studio through GitHub

1. Sign in to GitHub in Marpos Studio with an account that can write to this repository.
2. Choose **Add project**, find `ludulicious/marpos-studio-astro-reference`, and choose **Set up**. The Astro website is at the repository root; there is no nested website folder to select.
3. Studio clones the repository, installs its dependencies, and discovers Pages, Blog, Authors and Categories.
4. Edit a story and check **Preview this page**. Save the local edit, then open **Review & publish** to inspect the content comparison.
5. Choose **Save for later** to test an online draft. Reopen that draft, finish the edit, and use **Publish changes** to update the default branch after review and confirmation.
6. Check the resulting content and website update on GitHub. Publication updates Git; the live website updates automatically through the GitHub Pages workflow described below.

If this new repository is absent from Studio's repository list, check that the GitHub connection has access to it, then refresh the list. For an independent test, fork this public repository to an account where you have write access and add your fork instead.

For local-only editing, clone the repository, run `npm ci`, then choose **Open local repository** and select its root folder. Local projects use your normal Git tools rather than Studio's online draft and publishing controls.

## Editable content and visible results

| Collection | Source | Reader-facing result |
| --- | --- | --- |
| Pages | `src/content/pages/*.md` | Home at `/`, About at `/about/`, new pages at `/<id>/` |
| Blog | `src/content/blog/*.md` | Journal at `/blog/`, individual stories at `/blog/<id>/` |
| Authors | `src/data/authors/*.json` | Shared bylines, contributor profiles and story links at `/team/` |
| Categories | `src/data/categories/*.yml` | Topic names, descriptions, order and story links at `/topics/` |

There are 13 initial records: two pages, six stories, two authors and three topics. Five stories are published and one is a draft. The home page lists featured stories. All journal, contributor, topic and related-story lists filter drafts out of production. RSS includes only published stories in both development and production.

`src/content.config.ts` is the native Astro contract. It includes required/optional fields, dates, a status enum, tags, booleans, bounded numbers, nested image and call-to-action objects, scalar and array collection references, and a cross-field date refinement. Website templates actually consume these fields; they are not just editor fixtures.

`studio.preview.json` maps the home page to `/` and author/topic records to their shared pages. New authors and topics inherit those shared preview destinations. Studio infers `/blog` from the dynamic Astro story route, and new ordinary pages use the root route. Renaming or moving the specially mapped home page also requires updating its mapping and home-page query.

Images live in `public/images/`. The `hero` field stores `{ src, alt }`, which Studio recognises as media; use `/images/...` paths when selecting or uploading. Markdown body images exercise the story editor's image support separately.

## Suggested acceptance session

1. Open **Your first content edit in Marpos Studio**. Change the title, description and opening paragraph; try visual/source switching and checklists. Preview, save, reopen, then verify the journal list and home page reflect the saved edit.
2. Change its nested hero image and alternative text. Preview both the story and journal list. Upload an image into `public/images/` and confirm the path still works after reopening.
3. Change its author, topics and related stories using reference pickers. Check the byline, topic links and **Keep reading** section. Edit the shared author's name and a topic's description; preview `/team/` and `/topics/` to see the data collections render.
4. Set the update date before the publication date and use **Revalidate**. Expect feedback on `updatedDate`; repair the date. Clear a required description and confirm a draft can retain incomplete work with validation feedback. An invalid changed document should block GitHub publication.
5. Create a new blog story with the required details, an existing author and at least one topic. Set status to `draft`. Preview its `/blog/<id>/` route. It should appear in development, while `npm run build` excludes it. Set status to `published`, rebuild, and confirm it appears in the static site and RSS.
6. Create an ordinary page, author and topic. Check the new page route and shared previews for the data records. Select the new author/topic on a story to exercise newly saved reference choices.
7. Temporarily change a story in page preview, then discard it. Confirm the saved page returns. Save another edit and confirm it survives reopening. With no unsaved editor changes, edit a content file or schema in your code editor and check Studio's local refresh.
8. With this repository added through GitHub, check review, online draft saving, reopening the draft, and publishing. Verify that only the intended content and media changes reach the default branch. Publishing to `main` automatically triggers the GitHub Pages workflow. Wait for its successful deployment, then check the live page.

A production build verifies Astro rendering and content contracts; it does not prove the whole desktop editing workflow. The steps above are the manual acceptance session for that workflow. Remote loaders, MDX, Vue islands and SSR adapters are not covered by this static reference.

## GitHub Pages and end-to-end publishing

Live website: **https://ludulicious.github.io/marpos-studio-astro-reference/**

Every push to `main`, including a publication through Marpos Studio, runs `.github/workflows/deploy.yml`. It installs locked dependencies, checks the Astro project, builds the static website, and deploys `dist/` to GitHub Pages. You can also run it manually from the repository's Actions tab. Online drafts remain on their own branches and do not deploy.

To verify a publication:

1. Add this repository through **Add project** in Studio. If it is already open, use **Get latest website** to receive this deployment setup.
2. Make a recognisable change to a published article and preview it. Review and publish the change through Studio.
3. Watch **Deploy Astro to GitHub Pages** in [Actions](https://github.com/ludulicious/marpos-studio-astro-reference/actions).
4. After the run succeeds, open the article on the live website and confirm the edit. The `status` field must be `published` for a story to appear in a production build.
5. For Studio's deployment confirmation, open **Review & publish → Website updates → Manage environments** and add **Production** with `https://ludulicious.github.io/marpos-studio-astro-reference/` (including the repository subpath). Save the next website update through Studio so it generates `public/marpos-deployment.json`. The deployment includes that public marker automatically; **Check environments** can then identify the deployed update.

GitHub Pages builds set `ASTRO_BASE_PATH=/marpos-studio-astro-reference/`. Links, images, Markdown content and feeds include this prefix in production. Local development and Studio previews keep root URLs, as do the content files and `studio.preview.json`. To reproduce the Pages build locally:

```sh
ASTRO_BASE_PATH=/marpos-studio-astro-reference/ npm run build
ASTRO_BASE_PATH=/marpos-studio-astro-reference/ npm run preview
```

`site` in `astro.config.mjs` identifies the Pages origin for canonical URLs and feeds. If you fork the repository for another account, update that origin and the workflow's `ASTRO_BASE_PATH`. No custom domain or paid hosting is required.

## Attribution

Upstream Astro code/assets retain their MIT notice in `LICENSE.upstream`. The starter credits [Bear Blog](https://github.com/HermanMartinus/bearblog) for the base CSS; its original attribution remains in `src/styles/global.css`. This adaptation uses the official starter rather than claiming to represent an independent public customer website.

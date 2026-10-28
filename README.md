# Marpos Studio Astro reference

A working editorial website adapted from the [official Astro Blog starter](https://github.com/withastro/astro/tree/astro%406.0.0/examples/blog), pinned to upstream commit `48e5c4d3518dbd82edff87fa628be9e46c9b21bf`. It preserves the starter’s integration foundations and adds an editorial user manual, real photography, and a searchable media library.

This is an integration reference, not an official production Marpos website. The two contributor profiles are explicitly sample editorial identities. No accounts, API keys, or external CMS are needed. All photos and fonts are local. Video playback loads the original YouTube player on request and requires an internet connection.

## Run

Use Node 22.12 or newer (a supported even-numbered Node release).

```sh
git clone https://github.com/ludulicious/marpos-studio-astro-reference.git
cd marpos-studio-astro-reference
npm ci
npm run dev
```

Open the address Astro prints, normally `http://localhost:4321`. Run `npm run check` for Astro/TypeScript diagnostics and `npm run build` for a static production build. `npm run preview` serves the built version, which excludes draft stories.

Astro is pinned to 6.4.8, the release used for this reference's verification. The blog includes Markdown, MDX and Markdoc, with `@astrojs/mdx` pinned to 5.0.0. Studio edits MDX stories in its source editor to preserve imports, JSX and expressions. This project has its own package manifest and lockfile; it does not add dependencies to Studio's desktop app.

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
| Pages | `content/pages/**/*.md` | Home at `/`, About at `/about/`, User manual at `/blog/`, Contributors at `/team/`, Topics at `/topics/`, new pages at `/<id>/` |
| Blog | `content/blog/*.{md,mdx,mdoc}` | User manual at `/blog/`, individual stories at `/blog/<id>/` |
| Authors | `content/authors/*.json` | Shared bylines, contributor profiles and story links at `/team/` |
| Media Library | `content/photos/*.json`, `content/videos/*.json` | Searchable library at `/library/`, per-asset details at `/library/<id>/`, referenced videos in chapters |
| Categories | `content/categories/*.yml` | Topic names, descriptions, order and story links at `/topics/` |

There are 47 initial records: five pages, ten manual chapters, two authors, three topics, and 27 media records. Nine chapters are published and one is a draft. The home page lists featured chapters. Chapters use an optional `chapter` number for ordered navigation, and `videos` references for reusable video lessons. All journal, contributor, topic and related-story lists filter drafts out of production. RSS includes only published stories in both development and production.

The headings, descriptions, introductions and optional hero/call-to-action content for the Journal, Contributors and Topics pages are editable in **Pages**. Their documents live in `pages/02.blog.md`, `pages/04.team.md` and `pages/03.topics.md` beneath `content/`. These are direct page entries with no extra folder level. Their `path` fields keep the template routes fixed. Author profiles remain in **Authors**, topic records remain in **Categories**, and the Astro templates render those lists below each page's editable story.

`src/content.config.ts` is the native Astro contract. It includes required/optional fields, dates, a status enum, tags, booleans, bounded numbers, nested image and call-to-action objects, scalar and array collection references, and a cross-field date refinement. Website templates actually consume these fields; they are not just editor fixtures.

`studio.preview.json` maps the home page to `/` and author/topic records to their shared pages. New authors and topics inherit those shared preview destinations. Studio infers `/blog` from the dynamic Astro story route, and new ordinary pages use the root route. Renaming or moving the specially mapped home page also requires updating its mapping and home-page query.

Images live in `public/images/`. The `hero` field stores `{ src, alt }`, which Studio recognises as media; use `/images/...` paths when selecting or uploading. Markdown body images exercise the story editor's image support separately.

### Image optimization

`src/components/OptimizedImage.astro` uses Astro's `Image` for cards and video posters, and `Picture` for heroes, full photos, and Markdoc body images. It generates responsive widths, WebP images, and AVIF/WebP sources with JPEG fallbacks for pictures. Local metadata supplies the aspect ratio and caps generated widths at the original dimensions. The home hero loads eagerly; other images use Astro's lazy-loading default.

Studio's `/images/...` paths stay editable. `src/lib/images.ts` imports files from `public/images/` into Astro's asset pipeline; originals also remain available at their public URLs for downloads and copied image paths. Markdown and MDX body images are resolved to local imports by `src/lib/remark-images.mjs`, then optimized by Astro's native Markdown image support. Markdoc delegates to the shared image component. New uploads are discovered by Vite's image glob without maintaining a separate image list.

Optimized variants are generated at build time under `_astro/`, including the configured GitHub Pages base path. YouTube fallback posters are authorized through the narrow `i.ytimg.com/vi/**` remote pattern; builds that use these remote fallbacks need network access. Social sharing metadata and original download links continue to use the original images.


## Markdoc example

Open **Use reusable blocks without writing code** in **Blog**, or visit `/blog/reusable-blocks-with-markdoc/`. Its `.mdoc` file uses a `{% callout title="Before you publish" %}` block with ordinary Markdown inside. The visual editor keeps that body editable and preserves the tag attributes. **Insert component → Callout** adds a block from the project’s `studio.components.json` definition. **Edit properties** opens a form for its heading, style and compact spacing, with required-field validation and undo support. The same definition supplies the Astro Markdoc tag’s attributes. Conditional expressions and other unsupported constructs remain protected source blocks while surrounding prose stays editable.

The official `@astrojs/markdoc` integration is pinned to 1.0.0 for Astro 6. `markdoc.config.mjs` registers the callout component and derives its attributes from the editor definition. Link and image components apply the GitHub Pages base path. Astro renders Markdoc collection entries from `.mdoc`; simply adding Markdoc tags to an ordinary `.md` file does not enable Markdoc rendering in Astro.

## MDX example

Open **Give your stories room for richer content** in **Blog**, or visit `/blog/richer-stories-with-mdx/`. Its source is `content/blog/richer-stories-with-mdx.mdx`. It imports `src/components/WorkflowNote.astro`, exports a list of review steps, and renders the list and its count using JSX and expressions. Markdown links and images also exercise GitHub Pages base-path handling.

In Studio, edit the frontmatter in **Details** and the MDX in the story’s source editor. Change the component heading or a review step, preview, save, reopen, and discard a temporary edit to verify the original imports and JSX survive. Publish through the normal GitHub workflow to check the rendered component on the live site. The collection still creates ordinary Markdown stories by default; both file types share its schema and routes.

## Suggested acceptance session

1. Open **Your first content edit in Marpos Studio**. Change the title, description and opening paragraph; try visual/source switching and checklists. Preview, save, reopen, then verify the journal list and home page reflect the saved edit.
2. Change its nested hero image and alternative text. Preview both the story and journal list. Upload an image into `public/images/` and confirm the path still works after reopening.
3. Change its author, topics and related stories using reference pickers. Check the byline, topic links and **Keep reading** section. Edit the shared author's name and a topic's description; preview `/team/` and `/topics/` to see the data collections render.
4. Set the update date before the publication date and use **Revalidate**. Expect feedback on `updatedDate`; repair the date. Clear a required description and confirm a draft can retain incomplete work with validation feedback. An invalid changed document should block GitHub publication.
5. Create a new blog story with the required details, an existing author and at least one topic. Set status to `draft`. Preview its `/blog/<id>/` route. It should appear in development, while `npm run build` excludes it. Set status to `published`, rebuild, and confirm it appears in the static site and RSS.
6. Create an ordinary page, author and topic. Check the new page route and shared previews for the data records. Select the new author/topic on a story to exercise newly saved reference choices.
7. Temporarily change a story in page preview, then discard it. Confirm the saved page returns. Save another edit and confirm it survives reopening. With no unsaved editor changes, edit a content file or schema in your code editor and check Studio's local refresh.
8. With this repository added through GitHub, check review, online draft saving, reopening the draft, and publishing. Verify that only the intended content and media changes reach the default branch. Publishing to `main` automatically triggers the GitHub Pages workflow. Wait for its successful deployment, then check the live page.

A production build verifies Astro rendering and content contracts; it does not prove the whole desktop editing workflow. The steps above are the manual acceptance session for that workflow. Remote loaders, Vue islands and SSR adapters are not covered by this static reference.

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

## User manual and media library

The existing `/blog/` URLs now host an ordered user manual. The shared layout adds chapter navigation, a heading-based contents list, previous/next links, search, and related lessons while preserving the Markdown, MDX, Markdoc, draft filtering, RSS, and collection reference examples.

The media library at `/library/` contains 24 local CC0 photos and three externally hosted CMS tutorial videos. Search matches titles, descriptions, collections, and creators. Search and collection filters persist in the URL. Without JavaScript, the complete list and detail pages remain usable; video source/written-guide links also remain available.

- Photos: `public/images/library/`, with searchable metadata in `content/photos/` and `content/videos/`. Detail pages expose source credits, licenses, dimensions, alt text, image-path copying, and a local download.
- Videos: official WordPress.org and WordPress.com YouTube embeds. Players load only after pressing **Watch lesson**. Each has native playback controls and captions plus an original lesson/written-guide link. They demonstrate WordPress interfaces, clearly distinguished from Marpos instructions.
- Reuse a video: set a chapter’s `videos` reference array to an existing media ID. The template renders it under **Watch & learn**. Keep video records’ `youtubeId` to a valid 11-character YouTube ID.
- Edit media metadata in Studio’s **Photos** and **Videos** collections. The explicit preview mappings open each initial asset’s detail page. If adding a new record, add its mapping to `studio.preview.json` if route inference cannot find it.
- Keep source paths in content root-relative, such as `/images/library/room-to-grow.jpg`. `sitePath()` and the Markdown integrations apply the deployment base.

### Media provenance and licenses

All 24 photographs were retrieved from the [WordPress Photo Directory](https://wordpress.org/photos/), whose [directory policy](https://make.wordpress.org/photos/handbook/) releases submissions under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Each JSON record preserves the exact source entry, contributor/profile, original URL, downloaded dimensions, and modification note. Downloads use the directory’s resized image derivatives, with crops applied only in website previews. The photographs are sample editorial imagery and do not imply endorsement or depict the Marpos team.

Tutorials are embedded unchanged from official source pages. Video files are hosted by YouTube and are not copied into the repository. The website retains publisher attribution and links to the full original lessons and written guides:

| Lesson | Publisher | Source |
| --- | --- | --- |
| Getting to know the block editor | WordPress.com | [WordPress editor](https://wordpress.com/support/wordpress-editor/) |
| Using the media library | WordPress.org | [Using the Media Library](https://learn.wordpress.org/lesson/using-the-media-library-2/) |
| Working with images and alt text | WordPress.com | [Captions and ALT text](https://wordpress.com/support/wordpress-editor/blocks/image-block/image-caption-alt-text/) |

Local video posters come from each source video's YouTube thumbnail endpoint. Source credits accompany every player. No source lesson text or transcript has been copied.

Instrument Serif is locally hosted under the SIL Open Font License; its notice is in `public/fonts/instrument-serif-OFL.txt`. Atkinson and the original starter assets retain upstream attribution. The shared visual system is documented in `design.md` and `tokens.css`.

### Additional acceptance checks

1. Open `/library/`, search **trees**, filter **Nature**, and verify the single matching photo. Reset; filter **CMS tutorials** and verify three lessons. Reopen a filtered URL to confirm the controls restore.
2. Open a photo detail, copy its path, and use it as a chapter hero. Save, reopen, and preview both the chapter and manual index.
3. Open a video asset, load the player, play the video, enable captions, and follow its written-guide link. Verify the related chapter renders the same attribution.
4. Run `npm run check` and `npm run build`. Also run `ASTRO_BASE_PATH=/marpos-studio-astro-reference/ npm run build` to verify GitHub Pages links, images, fonts, and scripts.

### Native Studio photo and video libraries

The libraries are rooted at `content/` because Studio's built-in pickers resolve library folders relative to that directory. `content/.navigation.yml` declares the image and video libraries, and each folder's `.navigation.yml` selects the media view, upload directory, thumbnail ratio, and category/visibility filters.

- **Photos** uses `content/photos/*.json` and 24 real local images. The schema includes `image`, optional `thumbnail`, `categories`, `credit`, `visible`, and `order`, matching Studio's photo editor.
- **Videos** uses `content/videos/*.json` and three real `youtubeId` values from official source lessons. Optional thumbnails, visibility, categories, and ordering match Studio's video editor.
- Provenance fields are optional for new uploads, so Studio's native creation workflow does not require placeholder source or license claims. New assets show **Rights not recorded** until those details are supplied.
- Public gallery queries respect `visible`, saved `order`, and separate photo thumbnails. Hidden items remain available through existing chapter references and Studio pickers.
- Use **Choose image** and **Choose video** in a story to insert media from these libraries. Chapter `videos` references also render reusable lessons after the written instructions.

All editable collection records now live under the root `content/` directory. Pages, Blog, Authors, and Categories retain their collection IDs and public preview routes.

## Content location and collection order

All editable content is in the repository-root `content/` folder:

```text
content/
  .navigation.yml
  authors/
  blog/
  categories/
  pages/
  photos/
  videos/
src/
  content.config.ts
  components/
  layouts/
  pages/
```

Astro's collection declarations stay in `src/content.config.ts`. Each `glob()` loader explicitly points at its `content/` source. Moving content does not change public routes: collection IDs, generated entry IDs, references, and template routing stay the same. The MDX example imports its component from `../../src/components/WorkflowNote.astro`. Source-to-preview mappings live in `studio.preview.json` and use the new paths.

Studio's collection sidebar follows declaration order in the exported `collections` object in `src/content.config.ts`. To change the sidebar order, move each complete collection entry earlier or later in that object. For example, declaring `pages`, `blog`, `photos`, `videos`, `authors`, and `categories` in that order puts Pages first and Categories last. Preserve the collection keys so references continue to work. Then use **Refresh local content** in Studio.

This is separate from record order within a collection: manual chapters use `chapter`, topics use `order`, and media records use `order`. Studio's ordinary content browser follows numeric filename order; drag-and-drop media ordering updates media records' `order` fields. Astro's content API does not impose an editorial sort order; each website query must apply its own sort.

### Ordering pages in Studio

Regular content cards follow numeric filename order. The Pages collection demonstrates this with `01.home.md`, `02.blog.md`, `03.topics.md`, `04.team.md`, and `99.about.md`. Change these prefixes to change the displayed order; retain the descriptive part of the filename. For example, renaming `04.team.md` to `02.team.md` moves it earlier, with alphabetic ordering used to break equal-number ties. Renumber the other pages if you want a unique position for every page.

The Pages loader strips the numeric prefix when generating Astro entry IDs. `01.home.md` therefore remains entry `home`, and `99.about.md` remains entry `about`; public URLs and template lookups are unchanged. When renaming a mapped file, update its source filename in `studio.preview.json` too. Refresh local content in Studio after external file changes. New pages can be positioned by assigning an appropriate prefix; move About's prefix later again if newly generated numbers pass it.

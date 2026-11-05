# Marpos Studio + Astro showcase

The site demonstrates what an Astro website can do with content managed in Marpos Studio. The homepage invites visitors to explore real chapters, media, contributors, and topics; the manual remains a practical guide for editors.

## Visual identity

Navy, cyan, pale blue, and white follow the Marpos Studio application identity. The SVG in `public/favicon.svg` is a simplified variant of the three rounded strokes from the Studio app icon. The header, footer, and browser favicon share this asset. PNG favicons and the touch icon are rasterized from it.

Space Grotesk provides headings and the wordmark. Atkinson provides body text. Fonts are hosted locally, with the Space Grotesk license beside its font file. Shared color, type, spacing, and radius values live in `tokens.css`.

## Layout and behavior

`src/styles/global.css` styles navigation, reading pages, collection lists, directories, and the footer. `src/styles/showcase.css` styles the homepage: a photo collage, interactive content previews, an image gallery, and the publishing workflow.

The homepage tabs use native buttons with keyboard navigation and ARIA tab semantics. Without JavaScript all panels remain readable. Mobile navigation also remains available without JavaScript.

`src/styles/motion.css` adds short fades for page content, the hero collage, tabs, and the mobile menu. Content stays in its final position throughout these entrances; only the decorative sparkle and intentional hover interactions use transforms. `PageMotion.astro` fades below-fold sections and collection items in once, starting just before they enter the viewport, without staggered delays or persistent hidden states. All motion respects reduced-motion changes immediately, and scroll reveals finish when keyboard focus enters animated content. There are no looping animations or animation dependencies.

Titles, descriptions, and the main hero image remain in the editable home content record. Showcase previews come from the existing Astro collections. The manual's Markdown, MDX, and Markdoc examples, production draft filtering, media attribution, and collection search remain intact. Local links and icons use `sitePath` so root and GitHub Pages builds work consistently.

# Marpos Studio reference design

Audience: Marpos Studio editors. Main task: learn to edit, preview and publish website content.
Genre: warm editorial. Theme: Studio, using warm paper and forest green.

The home and manual index use Index-First; lessons use Long Document with chapter navigation; the media library uses Catalogue. All pages share a compact editorial masthead (N6) and mast-headed colophon (Ft1). No decorative motion.

Typography: locally hosted Instrument Serif (roman 400) for display and the existing Atkinson 400/700 for text. Source font names in tokens.css; all new colors consume OKLCH tokens. Existing starter CSS remains for provenance, followed by the active design layer. Spacing uses a 4-point scale. Focus rings are immediate; reduced motion disables transitions. Media is real CC0 photography; CMS videos retain source attribution and are loaded only on request.

Source of truth: tokens.css. Library credits live in each content/photos or content/videos JSON record. Preserve the existing blog URLs and Markdown, MDX and Markdoc integration examples.

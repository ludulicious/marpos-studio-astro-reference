---
title: "Give your Astro content a clear shape"
description: "Use native collection schemas to make titles, dates, references, and media understandable to both the website and its editors."
pubDate: "2026-10-22"
status: "published"
author: "studio-developers"
categories: ["astro", "editing"]
tags: ["Astro", "schemas"]
featured: false
readingMinutes: 6
hero: {"src": "/images/workspace.jpg", "alt": "A textured gold and amber gradient"}
---

An Astro collection is a contract between content and the website. A good contract makes common edits easy and catches mistakes while there is still time to fix them.

## Start with native collections

This website uses local `glob()` loaders. Markdown stories have a title, description, dates, author, topics, and optional media. JSON author records and YAML topic records have their own schemas.

```ts
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(5),
    author: reference('authors'),
    pubDate: z.coerce.date(),
  }),
});
```

## Describe editorial intent

Required fields should represent information the website actually needs. Optional fields should remain optional. A date rule can explain that an update must not precede publication, instead of leaving the editor to discover the problem after deployment.

## Keep routes explicit where needed

Astro content IDs and public URLs are different concepts. This site maps the home page to `/` and shared author and topic records to the pages where readers can see them. New journal entries use `/blog/<id>/`.

Use Markdown for ordinary stories and MDX when a story needs reusable components. [Give your stories room for richer content](/blog/richer-stories-with-mdx/) demonstrates an imported Astro component and expressions, with the story preserved in Studio’s source editor. Custom remote loaders remain outside this reference.

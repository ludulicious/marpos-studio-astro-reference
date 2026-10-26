---
title: "Understand your content fields"
description: "Use native collection schemas to make titles, dates, references, and media understandable to both the website and its editors."
pubDate: "2026-10-22"
status: "published"
author: "studio-developers"
categories: ["astro", "editing"]
tags: ["Astro", "schemas"]
featured: false
readingMinutes: 6
hero: {"src": "/images/library/carved-in-stone.jpeg", "alt": "A beautiful view of the Sun Temple\u2019s intricately carved entrance, featuring ornate stone pillars, detailed sculptures, and symmetrical architecture under a clear blue sky. Location: Sun Temple, Modhera, Mehsana district, Gujarat."}
chapter: 9
videos: []
---

An Astro collection is a contract between content and the website. A good contract makes common edits easy and catches mistakes while there is still time to fix them.

## Start with native collections

This website uses local `glob()` loaders. Markdown stories have a title, description, dates, author, topics, and optional media. JSON author records and YAML topic records have their own schemas.

```ts
import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './content/blog', pattern: '**/*.md' }),
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

## Read validation as a checklist

The reference requires a title, description, publication date, author, at least one topic, and reading time. Heroes contain `src` and `alt`. The optional `videos` list references Media Library records; `chapter` determines the manual order.

1. Make a small details change and use **Revalidate**.
2. If you set an update date, keep it on or after the publication date.
3. Repair invalid fields before publishing. An unfinished draft may retain feedback while you work.
4. Preview after changing a reference, because that record may affect more than one page.

**Check your result:** validation passes and the website shows the intended author, topics, and media.

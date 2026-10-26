---
title: "Add images that tell the story"
description: "Make image details part of the editorial routine, with local files and alternative text that belongs to the story."
pubDate: "2026-10-23"
status: "published"
author: "studio-editorial"
categories: ["editing"]
tags: ["accessibility", "media"]
featured: false
readingMinutes: 3
hero: {"src": "/images/library/light-through-the-trees.jpg", "alt": "Evening sunlight shining through a small forest of green trees."}
chapter: 3
videos: ["adding-and-removing-images"]
---

## Choose an image for the task

Use the [media library](/library/) to choose a photograph that supports the page. Open its detail view to inspect the complete image and its source before using the thumbnail as a guide.

## Add the image and description

1. Open a chapter’s **Details** in Marpos Studio.
2. In **hero**, select a local image or paste its `/images/library/...` path into **src**.
3. In **alt**, describe what matters to someone reading this chapter. This reference requires non-empty alternative text for hero images.
4. To insert a body image, use the visual editor’s image support, or add ordinary Markdown in source.

```md
![Sunlight filters through green trees beside a forest path.](/images/library/light-through-the-trees.jpg)
```

## Write for the context

Name the subject and the detail that matters. “Evening light passing through a stand of green trees” is more useful here than “image” or a file name. Avoid implying that a stock photograph shows the actual Marpos team or office.

A screenshot may need a description of the selected control and its effect. A complex chart may need a longer explanation in the surrounding text. Decorative images can use empty alt text in body content when appropriate; the hero schema in this reference deliberately requires a description.

## Check the crop and the saved file

1. Preview the chapter at a wide and a narrow window size.
2. Check the manual list, where the same photo is cropped more tightly.
3. Read the alternative text without looking at the photograph.
4. Save and reopen the chapter to verify its path and details.

**Check your result:** the file loads locally, its crop preserves the subject, and the description adds useful information. Credits and license details remain available in the [media library](/library/).

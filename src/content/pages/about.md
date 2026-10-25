---
title: A real content workflow, on a small website
description: This reference journal uses native Astro collections to demonstrate how Marpos Studio handles stories, structured details, and shared content.
callToAction:
  label: Meet the sample contributors
  href: /team/
---
This website is a working reference for Marpos Studio. It is adapted from the official Astro Blog starter and contains practical guides about writing, previewing, and reviewing website content.

The contributors are sample editorial profiles. This is a demonstration website, with no purchase flow, account registration, or customer endorsements.

## How the website is put together

Stories and pages live in Markdown. Author profiles live in JSON. Topics live in YAML. Astro’s content configuration defines their fields and relationships, while ordinary Astro components render the website.

Changing an author’s name updates their byline wherever that profile is referenced. Changing a topic description updates the topics page. A story’s title, summary, hero image, and publication date appear in the journal and on its own page.

## Designed for careful editing

Local projects save directly to your existing files. Connected GitHub projects add Studio’s online draft and publishing workflow. In both cases, checking a preview is separate from making the public website change.

Read [how review and publishing fit together](/blog/review-before-publishing/) before using a connected repository for a live website.

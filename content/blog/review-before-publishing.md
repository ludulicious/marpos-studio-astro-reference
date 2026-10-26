---
title: "Review and publish an update"
description: "Understand the difference between a local edit, an online draft, and a published website update."
pubDate: "2026-10-21"
status: "published"
author: "studio-editorial"
categories: ["workflow"]
tags: ["review", "publishing"]
featured: true
readingMinutes: 5
hero: {"src": "/images/library/an-open-workspace.jpg", "alt": "Spacious office with white desks and gray office chairs arranged in rows. Large windows with blinds allow natural light. Calm, modern atmosphere."}
chapter: 6
videos: []
---

A draft gives you room to think. Review gives you a chance to see the complete change before it leaves your workspace.

## Choose the workflow for your project

For an existing local repository, Studio writes to the files you opened. Stage, commit, push, and deploy with your normal development tools.

For a connected GitHub website, **Review & publish** shows the content and media changes that make up your update. Read the comparison as an editor: what changed, why does it help, and is anything missing?

## Keep unfinished work for later

On a GitHub project, **Save for later** saves the ongoing changes online. That gives the draft a place to wait without updating the website’s default branch.

## Publish deliberately

Check the title, story, references, and media before confirming publication. Publishing updates the repository’s default branch; the website’s deployment determines when the change is publicly visible.

---

A useful final question is simple: could another person understand this change from the review alone?

## Work through the review

1. Save your chapter, then open **Review & publish** on a connected GitHub project.
2. Read the content comparison. Check that it includes the intended chapter details, body text, and media changes.
3. If the work is incomplete, choose **Save for later** to keep an online draft without updating the default branch.
4. When the update is ready, use **Publish changes** and complete the publication confirmation.
5. Wait for the repository’s deployment workflow to succeed before checking the public website.

## Check the published website

This reference deploys through GitHub Pages when the default branch changes. Open the public chapter and check the edited sentence, image, and related links. If the update is missing, inspect the deployment result before publishing another change.

**Check your result:** the final public page matches the change you reviewed. A chapter with `status: draft` remains excluded from the production build even if its source is saved in Git.

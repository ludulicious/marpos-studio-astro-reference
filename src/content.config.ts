import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const media = z.object({
  src: z.string().startsWith('/images/'),
  alt: z.string().min(1, 'Describe the image for readers using a screen reader.'),
});
const pageFields = {
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(200),
};

const assetFields = {
  title: z.string().min(2), description: z.string().optional(),
  categories: z.array(z.string()).default([]), credit: z.string().default(''),
  visible: z.boolean().default(true), order: z.number().default(0),
  creator: z.string().optional(), creatorUrl: z.url().optional(), sourceUrl: z.url().optional(),
  originalUrl: z.url().optional(), license: z.string().optional(), licenseUrl: z.url().optional(),
  width: z.number().positive().optional(), height: z.number().positive().optional(),
  changes: z.string().optional(), duration: z.string().optional(), lesson: reference('blog').optional(),
};

export const collections = {
  pages: defineCollection({
    // Numeric filename prefixes control Studio order without changing entry IDs or URLs.
    loader: glob({
      base: './content/pages',
      pattern: '**/*.md',
      generateId: ({ entry }) => entry.replace(/\.md$/, '').split('/').map(part => part.replace(/^\d+\./, '')).join('/'),
    }),
    schema: z.object({
      ...pageFields,
      // Template-owned pages keep a fixed URL while their content stays editable.
      path: z.string().startsWith('/').optional(),
      hero: media.optional(),
      callToAction: z.object({ label: z.string().min(1), href: z.string().startsWith('/') }).optional(),
    }),
  }),
  blog: defineCollection({
    loader: glob({ base: './content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
    schema: z.object({
      ...pageFields,
      chapter: z.number().int().min(1).optional(),
      videos: z.array(reference('videos')).default([]),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      status: z.enum(['draft', 'published']).default('draft'),
      author: reference('authors'),
      categories: z.array(reference('categories')).min(1),
      tags: z.array(z.string().min(1)).default([]),
      featured: z.boolean().default(false),
      readingMinutes: z.number().int().min(1).max(60),
      hero: media.optional(),
      relatedPosts: z.array(reference('blog')).optional(),
    }).refine(data => !data.updatedDate || data.updatedDate >= data.pubDate, {
      message: 'The update date must be on or after the publication date.',
      path: ['updatedDate'],
    }),
  }),
  photos: defineCollection({
    loader: glob({ base: './content', pattern: 'photos/*.json', generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, '') }),
    schema: z.object({ ...assetFields, image: media, thumbnail: media.optional() }),
  }),
  videos: defineCollection({
    loader: glob({ base: './content', pattern: 'videos/*.json', generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, '') }),
    schema: z.object({ ...assetFields, image: media.optional(), youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/) }),
  }),
  authors: defineCollection({
    loader: glob({ base: './content/authors', pattern: '**/*.json' }),
    schema: z.object({
      name: z.string().min(2),
      role: z.string().min(2),
      bio: z.string().min(20),
      website: z.url().optional(),
    }),
  }),
  categories: defineCollection({
    loader: glob({ base: './content/categories', pattern: '**/*.yml' }),
    schema: z.object({
      title: z.string().min(2),
      description: z.string().min(20),
      order: z.number().int().min(1),
    }),
  }),
};

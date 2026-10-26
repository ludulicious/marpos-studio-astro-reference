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

export const collections = {
  pages: defineCollection({
    loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
    schema: z.object({
      ...pageFields,
      // Template-owned pages keep a fixed URL while their content stays editable.
      path: z.string().startsWith('/').optional(),
      hero: media.optional(),
      callToAction: z.object({ label: z.string().min(1), href: z.string().startsWith('/') }).optional(),
    }),
  }),
  blog: defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
    schema: z.object({
      ...pageFields,
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
  authors: defineCollection({
    loader: glob({ base: './src/data/authors', pattern: '**/*.json' }),
    schema: z.object({
      name: z.string().min(2),
      role: z.string().min(2),
      bio: z.string().min(20),
      website: z.url().optional(),
    }),
  }),
  categories: defineCollection({
    loader: glob({ base: './src/data/categories', pattern: '**/*.yml' }),
    schema: z.object({
      title: z.string().min(2),
      description: z.string().min(20),
      order: z.number().int().min(1),
    }),
  }),
};

import type { CollectionEntry } from 'astro:content';
export const chapterOrder = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => (a.data.chapter ?? 99) - (b.data.chapter ?? 99) || a.data.title.localeCompare(b.data.title);

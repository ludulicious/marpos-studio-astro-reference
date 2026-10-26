import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
export function mediaAsset(entry: CollectionEntry<'photos'> | CollectionEntry<'videos'>) {
 const video = entry.collection === 'videos';
 const image = entry.data.image;
 const youtubeId = entry.collection === 'videos' ? entry.data.youtubeId : undefined;
 return { ...entry, data: { ...entry.data,
  kind: video ? 'video' as const : 'photo' as const,
  src: image?.src ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
  alt: image?.alt || entry.data.title,
  previewSrc: entry.collection === 'photos' ? entry.data.thumbnail?.src ?? image?.src : image?.src ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
  category: entry.data.categories[0] ?? (video ? 'CMS tutorials' : 'Photos'),
  creator: entry.data.credit || entry.data.creator || 'Credit not recorded',
  width: entry.data.width ?? 1024, height: entry.data.height ?? 768,
  license: entry.data.license ?? 'Rights not recorded',
  changes: entry.data.changes ?? 'No modification details recorded.',
  embedUrl: video ? `https://www.youtube-nocookie.com/embed/${youtubeId}` : undefined,
 }};
}
export type MediaAsset = ReturnType<typeof mediaAsset>;
export async function getMedia() {
 const [photos, videos] = await Promise.all([getCollection('photos'), getCollection('videos')]);
 return [...photos, ...videos].filter(item => item.data.visible).map(mediaAsset).sort((a,b) => a.data.order-b.data.order || a.data.title.localeCompare(b.data.title));
}

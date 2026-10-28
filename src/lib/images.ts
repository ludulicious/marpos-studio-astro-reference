import type { ImageMetadata } from 'astro';

// Import public files as assets without changing Studio's editable /images/... URLs.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/public/images/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG}',
);

export async function imageSource(src: string): Promise<ImageMetadata | string> {
  if (!src.startsWith('/images/')) return src;
  const load = images[`/public${src}`];
  if (!load) throw new Error(`Image not found in public: ${src}`);
  return (await load()).default;
}

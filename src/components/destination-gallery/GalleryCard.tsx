'use client';

import OptimizedImage from '@/components/OptimizedImage';
import { GALLERY_CATEGORY_LABELS, type GalleryImage } from '@/data/types';

export function GalleryCard({
  image,
  destinationName,
  featured = false,
  onOpen,
}: {
  image: GalleryImage;
  destinationName: string;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl border border-teal/20 bg-slate text-left transition-colors hover:border-apricot/50 ${
        featured ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          featured ? 'aspect-[21/9] sm:aspect-[2/1]' : 'aspect-[4/3]'
        }`}
      >
        <OptimizedImage
          src={image.src}
          alt={`${image.title} — ${destinationName}`}
          fill
          sizes={
            featured
              ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        {image.category ? (
          <p className="coord-label mb-1.5 text-[0.6rem] text-apricot/90">
            {GALLERY_CATEGORY_LABELS[image.category]}
          </p>
        ) : null}
        <p className="font-display text-base font-semibold text-glacier md:text-lg">
          {image.title}
        </p>
        {image.caption ? (
          <p className="coord-label mt-1.5 text-[0.65rem] text-ice">
            {image.caption}
          </p>
        ) : null}
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-ice/70 opacity-0 transition-opacity group-hover:opacity-100">
          View full size
        </p>
      </div>
    </button>
  );
}

"use client";

import OptimizedImage from "@/components/OptimizedImage";
import {
  GALLERY_CATEGORY_LABELS,
  type GalleryImage,
} from "@/data/types";

export function GalleryLightbox({
  image,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: {
  image: GalleryImage;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} — full size photo`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full border border-teal/30 bg-slate px-4 py-2 text-sm text-ice transition-colors hover:border-apricot/50 hover:text-apricot md:right-8 md:top-8"
        aria-label="Close gallery"
      >
        Close
      </button>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-teal/30 bg-slate px-3 py-2 text-ice transition-colors hover:border-apricot/50 hover:text-apricot md:left-6 md:block"
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-teal/30 bg-slate px-3 py-2 text-ice transition-colors hover:border-apricot/50 hover:text-apricot md:right-6 md:block"
            aria-label="Next photo"
          >
            →
          </button>
        </>
      ) : null}

      <div
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-teal/20">
          <OptimizedImage
            src={image.src}
            alt={image.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-glacier md:text-2xl">
              {image.title}
            </p>
            {image.caption ? (
              <p className="coord-label mt-2">{image.caption}</p>
            ) : null}
            {image.category ? (
              <p className="mt-2 text-sm text-ice">
                {GALLERY_CATEGORY_LABELS[image.category]}
              </p>
            ) : null}
          </div>
          {total > 1 ? (
            <p className="coord-label text-ice">
              {index + 1} / {total}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/data/destinations";

type Props = {
  images: GalleryImage[];
  heroImage: string;
  destinationName: string;
};

export default function DestinationGallery({
  images,
  heroImage,
  destinationName,
}: Props) {
  const galleryImages = images.filter((item) => item.src !== heroImage);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex !== null ? galleryImages[activeIndex] : null;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length,
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  if (galleryImages.length === 0) return null;

  const [featured, ...rest] = galleryImages;

  return (
    <>
      <section className="border-t border-teal/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Gallery</p>
          <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
            Scenes from {destinationName}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ice md:text-base">
            Landmarks, viewpoints, and moments from the valley — tap any photo
            to view it full size.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <GalleryCard
              image={featured}
              destinationName={destinationName}
              featured
              onOpen={() => setActiveIndex(0)}
            />

            {rest.map((image, index) => (
              <GalleryCard
                key={image.src}
                image={image}
                destinationName={destinationName}
                onOpen={() => setActiveIndex(index + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeImage.title} — full size photo`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full border border-teal/30 bg-slate px-4 py-2 text-sm text-ice transition-colors hover:border-apricot/50 hover:text-apricot md:right-8 md:top-8"
            aria-label="Close gallery"
          >
            Close
          </button>

          {galleryImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
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
                  showNext();
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
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-xl font-semibold text-glacier md:text-2xl">
                  {activeImage.title}
                </p>
                {activeImage.caption ? (
                  <p className="coord-label mt-2">{activeImage.caption}</p>
                ) : null}
              </div>
              {galleryImages.length > 1 ? (
                <p className="coord-label text-ice">
                  {activeIndex + 1} / {galleryImages.length}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function GalleryCard({
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
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[21/9] sm:aspect-[2/1]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={image.src}
          alt={`${image.title} — ${destinationName}`}
          fill
          sizes={
            featured
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-base font-semibold text-glacier md:text-lg">
          {image.title}
        </p>
        {image.caption ? (
          <p className="coord-label mt-1.5 text-[0.65rem] text-apricot/90">
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

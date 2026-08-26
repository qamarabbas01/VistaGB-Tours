"use client";

import { FilterChip } from "@/components/destination-gallery/FilterChip";
import { GalleryCard } from "@/components/destination-gallery/GalleryCard";
import { GalleryLightbox } from "@/components/destination-gallery/GalleryLightbox";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  type GalleryCategory,
  type GalleryImage,
} from "@/data/types";

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
  const galleryImages = useMemo(
    () =>
      images.length > 0
        ? images
        : [{ src: heroImage, title: destinationName }],
    [images, heroImage, destinationName],
  );

  const availableCategories = useMemo(
    () =>
      GALLERY_CATEGORIES.filter((category) =>
        galleryImages.some((image) => image.category === category),
      ),
    [galleryImages],
  );

  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">(
    "all",
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeCategory);

  const activeImage =
    activeIndex !== null ? visibleImages[activeIndex] : null;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + visibleImages.length) % visibleImages.length,
    );
  }, [visibleImages.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % visibleImages.length,
    );
  }, [visibleImages.length]);

  useEffect(() => {
    setActiveIndex(null);
  }, [activeCategory]);

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

  const [featured, ...rest] = visibleImages;
  const showFilters = availableCategories.length >= 2;

  return (
    <>
      <section className="border-t border-teal/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Gallery</p>
          <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
            Scenes from {destinationName}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ice md:text-base">
            Mountains, lakes, villages, food, festivals, culture, hotels, and
            trekking routes — tap any photo to view it full size.
          </p>

          {showFilters ? (
            <div
              className="mt-8 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Gallery categories"
            >
              <FilterChip
                label="All"
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              />
              {availableCategories.map((category) => (
                <FilterChip
                  key={category}
                  label={GALLERY_CATEGORY_LABELS[category]}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </div>
          ) : null}

          {visibleImages.length === 0 ? (
            <p className="mt-10 text-sm text-ice">
              No photos in this category yet.
            </p>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured ? (
                <GalleryCard
                  image={featured}
                  destinationName={destinationName}
                  featured
                  onOpen={() => setActiveIndex(0)}
                />
              ) : null}

              {rest.map((image, index) => (
                <GalleryCard
                  key={`${image.src}-${image.title}-${index}`}
                  image={image}
                  destinationName={destinationName}
                  onOpen={() => setActiveIndex(index + 1)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {activeImage && activeIndex !== null ? (
        <GalleryLightbox
          image={activeImage}
          index={activeIndex}
          total={visibleImages.length}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </>
  );
}

import type {
  GalleryCategory,
  GalleryImage,
  Place,
  PlaceType,
} from "./types";

const PLACE_TYPE_CATEGORY: Record<PlaceType, GalleryCategory> = {
  Lake: "lakes",
  Waterfall: "lakes",
  Village: "villages",
  Town: "villages",
  Fort: "culture",
  Viewpoint: "mountains",
  Valley: "mountains",
  Pass: "mountains",
  Glacier: "mountains",
  Bridge: "culture",
  Meadow: "trekking",
  Desert: "mountains",
};

/** Merge a region's curated gallery with unique photos from its places. */
export function composeRegionGallery(
  regionGallery: GalleryImage[],
  places: Place[],
): GalleryImage[] {
  const seen = new Set<string>();
  const result: GalleryImage[] = [];

  const push = (image: GalleryImage) => {
    if (!image.src || seen.has(image.src)) return;
    seen.add(image.src);
    result.push(image);
  };

  for (const image of regionGallery) {
    push(image);
  }

  for (const place of places) {
    const inferred = PLACE_TYPE_CATEGORY[place.type];
    const source =
      place.gallery.length > 0
        ? place.gallery
        : [
            {
              src: place.image,
              title: place.name,
              caption: place.tagline,
            },
          ];

    for (const image of source) {
      push({
        ...image,
        category: image.category ?? inferred,
      });
    }
  }

  return result;
}

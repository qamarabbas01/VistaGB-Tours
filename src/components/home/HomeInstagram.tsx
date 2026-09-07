import OptimizedImage from '@/components/OptimizedImage';
import type { galleryImages } from '@/data/hero';

type GalleryImage = (typeof galleryImages)[number];

export function HomeInstagram({ images }: { images: readonly GalleryImage[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="coord-label mb-3">Instagram</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              From the road
            </h2>
            <p className="mt-4 max-w-xl text-ice">
              A curated photo feed from the same valleys — forts, glaciers, and
              highway light. We don&apos;t pipe the Instagram API here; follow
              the account for new frames.
            </p>
          </div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-apricot hover:underline"
          >
            @vistagbtours →
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={
                'relative overflow-hidden rounded-xl ' +
                (index === 0 || index === 5
                  ? 'aspect-square md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[360px]'
                  : 'aspect-square')
              }
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                <p className="coord-label">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

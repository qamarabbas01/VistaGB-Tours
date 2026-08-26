import OptimizedImage from "@/components/OptimizedImage";
import type { reviews } from "@/data/hero";

type Review = (typeof reviews)[number];

function reviewerInitials(name: string) {
  const parts = name.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  const letters = parts
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || name.slice(0, 1).toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <p
      className="flex gap-0.5 text-apricot"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </p>
  );
}

export function HomeReviews({ items }: { items: readonly Review[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">From The Road</p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          Customer Reviews
        </h2>
        <p className="mt-4 max-w-xl text-ice">
          Words — and frames — from travelers who trusted us with their first
          — or return — journey north.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((review) => (
            <blockquote
              key={`${review.name}-${review.trip}`}
              className="overflow-hidden rounded-2xl border border-teal/20 bg-slate"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <OptimizedImage
                  src={review.photo}
                  alt={review.photoAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate to-transparent" />
              </div>
              <div className="p-6">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-base leading-relaxed text-glacier">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-apricot/40 bg-night font-display text-sm text-apricot"
                    aria-hidden
                  >
                    {reviewerInitials(review.name)}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-glacier">
                      {review.name}
                    </p>
                    <p className="coord-label mt-1">
                      {review.from} · {review.trip}
                    </p>
                  </div>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

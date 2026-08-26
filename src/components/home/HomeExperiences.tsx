import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { experiences } from "@/data/hero";

type Experience = (typeof experiences)[number];

export function HomeExperiences({
  items,
}: {
  items: readonly Experience[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">Must See</p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          Top Experiences
        </h2>
        <p className="mt-4 max-w-xl text-ice">
          Places our travelers ask for again — lakes, forts, meadows, and
          ridges that stay with you.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Link
              key={item.slug}
              href={`/destinations/${item.slug}`}
              className={
                "group relative min-h-[300px] overflow-hidden rounded-2xl lg:min-h-[340px] " +
                (index === 0 ? "sm:col-span-2 lg:col-span-2" : "")
              }
            >
              <OptimizedImage
                src={item.image}
                alt={item.name}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="coord-label mb-2">{item.region}</p>
                <h3 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-ice">{item.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

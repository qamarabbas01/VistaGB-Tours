import OptimizedImage from "@/components/OptimizedImage";
import Button from "@/components/Button";
import Link from "next/link";
import type { packages } from "@/data/hero";

type TourPackage = (typeof packages)[number];

export function HomePackages({ items }: { items: readonly TourPackage[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="coord-label mb-3">Ready Routes</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              Tour Packages
            </h2>
            <p className="mt-4 max-w-xl text-ice">
              Starting points we tailor to your dates, pace, and the valleys
              you want most.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-sm font-medium text-apricot hover:underline"
          >
            Request a custom quote →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {items.map((pkg) => (
            <article
              key={pkg.name}
              className="overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/40"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <OptimizedImage
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                  <p className="coord-label">{pkg.days}</p>
                  <p className="font-mono text-xs text-apricot">{pkg.price}</p>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold text-glacier">
                  {pkg.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {pkg.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-teal"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contact"
                  className="mt-6 inline-block rounded-full border border-ice/30 px-6 py-2 text-center text-sm font-medium text-glacier transition-colors hover:border-apricot hover:text-apricot"
                >
                  Enquire
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

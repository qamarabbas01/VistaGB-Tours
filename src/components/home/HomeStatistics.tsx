import OptimizedImage from "@/components/OptimizedImage";
import type { statistics } from "@/data/hero";

type Statistic = (typeof statistics)[number];

export function HomeStatistics({ items }: { items: readonly Statistic[] }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <OptimizedImage
        src="/images/commons/112aa7ad11d28437.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
        aria-hidden
      />
      <div className="absolute inset-0 bg-night/80" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">By The Numbers</p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          Travel Statistics
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-5xl font-semibold text-apricot md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 font-display text-xl font-semibold text-glacier">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-ice">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

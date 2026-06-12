import Image from "next/image";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Destinations — VistaGB Tours",
};

export default function DestinationsPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">The Map</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Destinations
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            From terraced apricot valleys to the cold deserts beneath K2 —
            these are the places that define a trip to Gilgit-Baltistan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest) => (
              <article
                key={dest.slug}
                className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="coord-label mb-2">
                    {dest.region} · ALT {dest.altitude}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-glacier">
                    {dest.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-apricot">
                    {dest.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {dest.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

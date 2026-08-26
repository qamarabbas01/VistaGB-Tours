import OptimizedImage from "@/components/OptimizedImage";
import type { activities } from "@/data/hero";

type Activity = (typeof activities)[number];

export function HomeActivities({ items }: { items: readonly Activity[] }) {
  return (
    <section className="relative overflow-hidden bg-slate py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #d98e4a 0%, transparent 40%), radial-gradient(circle at 80% 80%, #5c7a8a 0%, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">On The Ground</p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          Adventure Activities
        </h2>
        <p className="mt-4 max-w-xl text-ice">
          How you move through the mountains — on foot, by jeep, through
          heritage sites, or behind a camera.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((activity) => (
            <article
              key={activity.title}
              className="group relative min-h-[280px] overflow-hidden rounded-2xl"
            >
              <OptimizedImage
                src={activity.image}
                alt={activity.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-scrim via-scrim/75 to-scrim/20" />
              <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                <p className="coord-label mb-3">{activity.mark}</p>
                <h3 className="font-display text-3xl font-semibold text-glacier">
                  {activity.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ice">
                  {activity.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

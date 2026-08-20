import { PageHeroSkeleton, CardGridSkeleton } from "@/components/skeletons";

export default function DestinationsLoading() {
  return (
    <div>
      <PageHeroSkeleton compact />
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CardGridSkeleton />
        </div>
      </section>
    </div>
  );
}

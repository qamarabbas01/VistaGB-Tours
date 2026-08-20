import { CardGridSkeleton, PageHeroSkeleton } from "@/components/skeletons";

export default function BlogLoading() {
  return (
    <div>
      <PageHeroSkeleton />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CardGridSkeleton />
        </div>
      </section>
    </div>
  );
}

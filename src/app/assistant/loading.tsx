import { PageHeroSkeleton, Skeleton } from "@/components/skeletons";

export default function AssistantLoading() {
  return (
    <div>
      <PageHeroSkeleton compact />
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-4xl space-y-4 px-6 md:px-10">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-12 rounded-xl" />
        </div>
      </section>
    </div>
  );
}

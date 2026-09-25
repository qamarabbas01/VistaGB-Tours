import { AssistantSkeleton, PageHeroSkeleton } from '@/components/skeletons';

export default function AssistantLoading() {
  return (
    <div>
      <PageHeroSkeleton compact />
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <AssistantSkeleton />
        </div>
      </section>
    </div>
  );
}

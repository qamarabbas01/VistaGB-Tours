import { NewsListSkeleton, PageHeroSkeleton } from '@/components/skeletons';

export default function NewsLoading() {
  return (
    <div>
      <PageHeroSkeleton />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <NewsListSkeleton />
        </div>
      </section>
    </div>
  );
}

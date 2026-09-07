import { Skeleton } from '@/components/skeletons';

export default function AboutLoading() {
  return (
    <div>
      <Skeleton className="h-[52vh] min-h-[320px] w-full" />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-3/4 rounded-md" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
          <Skeleton className="min-h-[340px] rounded-2xl" />
        </div>
      </section>
    </div>
  );
}

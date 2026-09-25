import {
  CardGridSkeleton,
  SearchFieldSkeleton,
  Skeleton,
} from '@/components/skeletons';

export default function DestinationsLoading() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Skeleton className="mb-4 h-3 w-28 rounded-full" />
          <Skeleton className="h-12 w-2/3 max-w-xl rounded-lg md:h-16" />
          <Skeleton className="mt-5 h-4 w-full max-w-md rounded-full" />
          <SearchFieldSkeleton />
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CardGridSkeleton />
        </div>
      </section>
    </div>
  );
}

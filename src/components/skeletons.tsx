"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden />;
}

export function PageHeroSkeleton({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <section
      className={`border-b border-teal/20 bg-slate px-6 md:px-10 ${
        compact ? "py-12 md:py-16" : "py-16 md:py-24"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mb-4 h-3 w-28 rounded-full" />
        <Skeleton className="h-12 w-2/3 max-w-xl rounded-lg md:h-16" />
        <Skeleton className="mt-5 h-4 w-full max-w-md rounded-full" />
      </div>
    </section>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-teal/20 bg-slate"
        >
          <Skeleton className="h-48 w-full" />
          <div className="space-y-3 p-6">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-5/6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-teal/20 bg-slate"
        >
          <Skeleton className="h-48 w-full md:h-56" />
          <div className="space-y-3 p-6 md:p-8">
            <Skeleton className="h-3 w-32 rounded-full" />
            <Skeleton className="h-7 w-4/5 rounded-md" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DestinationPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-[50vh] min-h-[360px] w-full" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:px-10 md:py-24">
        <div className="space-y-4 md:col-span-2">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-11/12 rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

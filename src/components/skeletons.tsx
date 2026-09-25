export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden />;
}

export function PageHeroSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`border-b border-teal/20 bg-slate px-6 md:px-10 ${
        compact ? 'py-12 md:py-16' : 'py-16 md:py-24'
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
    <div className="flex flex-col gap-5 md:gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-teal/20 bg-slate md:flex"
        >
          <Skeleton className="aspect-[16/10] w-full md:aspect-auto md:h-auto md:min-h-[200px] md:w-[280px]" />
          <div className="flex-1 space-y-3 p-6 md:p-7">
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

function MutedBar({ className }: { className: string }) {
  return <Skeleton className={`skeleton-muted ${className}`} />;
}

export function WeatherSkeleton({ framed = false }: { framed?: boolean }) {
  const body = (
    <div aria-busy="true" aria-live="polite" aria-label="Loading weather">
      <MutedBar className="mb-2 h-3 w-16 rounded-full" />
      <MutedBar className="h-6 w-40 rounded-md" />
      <MutedBar className="mt-5 h-12 w-24 rounded-lg" />
      <MutedBar className="mt-3 h-3 w-28 rounded-full" />
      <MutedBar className="mt-2 h-3 w-32 rounded-full" />
      <div className="mt-6 space-y-4">
        <WeatherDaySkeleton />
        <WeatherDaySkeleton />
      </div>
      <MutedBar className="mt-5 h-3 w-28 rounded-full" />
      <MutedBar className="mt-4 h-3 w-36 rounded-full" />
    </div>
  );

  if (!framed) return body;

  return (
    <div className="rounded-2xl border border-teal/20 bg-slate p-6">{body}</div>
  );
}

function WeatherDaySkeleton() {
  return (
    <div>
      <MutedBar className="h-3 w-16 rounded-full" />
      <div className="mt-2 flex items-center justify-between">
        <MutedBar className="h-4 w-16 rounded-full" />
        <MutedBar className="h-4 w-12 rounded-full" />
      </div>
    </div>
  );
}

export function MapCanvasSkeleton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`skeleton relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-teal/20 ${className}`}
      aria-busy="true"
      aria-label="Loading map"
    >
      <span className="skeleton-muted absolute left-[22%] top-[30%] h-3 w-3 rounded-full" />
      <span className="skeleton-muted absolute left-[41%] top-[46%] h-4 w-4 rounded-full" />
      <span className="skeleton-muted absolute left-[58%] top-[28%] h-3 w-3 rounded-full" />
      <span className="skeleton-muted absolute left-[67%] top-[58%] h-3.5 w-3.5 rounded-full" />
      <span className="skeleton-muted absolute bottom-4 left-4 h-3 w-24 rounded-full" />
    </div>
  );
}

export function TravelMapSkeleton() {
  return (
    <section
      className="bg-slate py-20 md:py-28"
      aria-busy="true"
      aria-label="Loading map"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <MutedBar className="mb-3 h-3 w-24 rounded-full" />
            <MutedBar className="h-10 w-52 rounded-lg md:h-14" />
            <MutedBar className="mt-4 h-4 w-full max-w-md rounded-full" />
            <MutedBar className="mt-2 h-4 w-4/5 max-w-sm rounded-full" />
            <div className="mt-8 space-y-1">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-teal/15 py-3"
                >
                  <MutedBar className="h-5 w-36 rounded-md" />
                  <MutedBar className="h-3 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <MapCanvasSkeleton className="aspect-[4/5] min-h-0 md:aspect-[5/4]" />
        </div>
      </div>
    </section>
  );
}

export function AssistantSkeleton({
  variant = 'page',
}: {
  variant?: 'page' | 'widget';
}) {
  const isWidget = variant === 'widget';

  return (
    <div
      className={`flex flex-col overflow-hidden border border-teal/25 bg-slate ${
        isWidget
          ? 'h-full min-h-0 rounded-none border-0'
          : 'min-h-[70vh] rounded-3xl shadow-2xl shadow-black/20'
      }`}
      aria-busy="true"
      aria-label="Loading travel guide"
    >
      {isWidget ? (
        <div className="flex flex-col items-center px-5 py-6 text-center">
          <MutedBar className="h-6 w-44 rounded-md" />
          <MutedBar className="mt-3 h-3 w-56 rounded-full" />
        </div>
      ) : (
        <div className="border-b border-teal/20 px-5 py-4 md:px-6">
          <MutedBar className="mb-2 h-3 w-20 rounded-full" />
          <MutedBar className="h-7 w-64 rounded-md" />
          <MutedBar className="mt-3 h-3 w-full max-w-md rounded-full" />
          <MutedBar className="mt-2 h-3 w-2/3 max-w-sm rounded-full" />
        </div>
      )}

      <div
        className={`flex flex-1 flex-wrap content-start justify-center gap-2.5 px-5 ${
          isWidget ? 'py-2' : 'py-8 md:py-10'
        }`}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <MutedBar
            key={index}
            className={`h-10 rounded-full ${index % 2 === 0 ? 'w-32' : 'w-40'}`}
          />
        ))}
      </div>

      <div className="mt-auto border-t border-teal/20 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-2 rounded-2xl border border-teal/30 bg-night/60 p-2 sm:flex-row">
          <MutedBar className="h-12 flex-1 rounded-xl" />
          <MutedBar className="h-12 w-full rounded-xl sm:w-24" />
        </div>
      </div>
    </div>
  );
}

export function AssistantReplySkeleton() {
  return (
    <div className="w-56 max-w-full space-y-2" aria-label="Guide is writing">
      <MutedBar className="h-3 w-full rounded-full" />
      <MutedBar className="h-3 w-11/12 rounded-full" />
      <MutedBar className="h-3 w-2/3 rounded-full" />
    </div>
  );
}

export function SearchFieldSkeleton() {
  return (
    <div className="mt-8 max-w-3xl" aria-busy="true" aria-label="Loading search">
      <div className="flex flex-col gap-2 rounded-2xl border border-teal/30 bg-night/70 p-2 sm:flex-row">
        <MutedBar className="h-12 flex-1 rounded-xl" />
        <MutedBar className="h-12 w-full rounded-xl sm:w-28" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <MutedBar className="h-7 w-24 rounded-full" />
        <MutedBar className="h-7 w-20 rounded-full" />
        <MutedBar className="h-7 w-28 rounded-full" />
        <MutedBar className="h-7 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading search results">
      <MutedBar className="mx-3 mb-2 h-3 w-16 rounded-full" />
      <div className="space-y-1 px-2">
        {Array.from({ length: count }, (_, index) => (
          <MutedBar
            key={index}
            className={`h-9 rounded-xl ${index % 2 === 0 ? 'w-3/5' : 'w-2/5'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading stories"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-teal/20 bg-slate"
        >
          <Skeleton className="h-48 w-full" />
          <div className="space-y-3 p-6">
            <MutedBar className="h-3 w-28 rounded-full" />
            <MutedBar className="h-6 w-4/5 rounded-md" />
            <MutedBar className="h-4 w-full rounded-full" />
            <MutedBar className="h-4 w-5/6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsArticleSkeleton() {
  return (
    <div
      className="mt-6 space-y-3"
      aria-busy="true"
      aria-label="Loading story"
    >
      {['w-full', 'w-full', 'w-11/12', 'w-4/5', 'w-full', 'w-2/3'].map(
        (width, index) => (
          <MutedBar key={index} className={`h-4 rounded-full ${width}`} />
        ),
      )}
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <section
      className="border-t border-teal/20 py-16 md:py-24"
      aria-busy="true"
      aria-label="Loading gallery"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <MutedBar className="mb-3 h-3 w-20 rounded-full" />
        <MutedBar className="h-8 w-72 max-w-full rounded-md md:h-9" />
        <MutedBar className="mt-4 h-4 w-full max-w-2xl rounded-full" />
        <MutedBar className="mt-2 h-4 w-2/3 max-w-xl rounded-full" />
        <div className="mt-8 flex flex-wrap gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <MutedBar
              key={index}
              className={`h-9 rounded-full ${index === 0 ? 'w-14' : 'w-24'}`}
            />
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="aspect-[21/9] rounded-2xl sm:col-span-2 sm:aspect-[2/1] lg:col-span-2" />
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <Skeleton className="aspect-[4/3] rounded-2xl" />
        </div>
      </div>
    </section>
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
          <WeatherSkeleton framed />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

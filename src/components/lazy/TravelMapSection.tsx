'use client';

import dynamic from 'next/dynamic';

export const LazyTravelMapSection = dynamic(
  () => import('@/components/TravelMapSection'),
  {
    ssr: false,
    loading: () => (
      <section className="bg-slate py-20 md:py-28">
        <div
          className="skeleton mx-auto h-[420px] max-w-7xl rounded-2xl"
          aria-label="Loading map"
        />
      </section>
    ),
  },
);

'use client';

import dynamic from 'next/dynamic';

export const LazyTravelAssistant = dynamic(
  () => import('@/components/TravelAssistant'),
  {
    ssr: false,
    loading: () => (
      <div
        className="skeleton h-[480px] w-full rounded-2xl"
        aria-label="Loading travel guide"
      />
    ),
  },
);

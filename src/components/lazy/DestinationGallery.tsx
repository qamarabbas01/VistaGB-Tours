'use client';

import dynamic from 'next/dynamic';

export const LazyDestinationGallery = dynamic(
  () => import('@/components/DestinationGallery'),
  {
    loading: () => (
      <div
        className="skeleton mx-auto my-16 h-80 max-w-7xl rounded-2xl"
        aria-label="Loading gallery"
      />
    ),
  },
);

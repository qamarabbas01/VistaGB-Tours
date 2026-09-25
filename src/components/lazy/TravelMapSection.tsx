'use client';

import dynamic from 'next/dynamic';
import { TravelMapSkeleton } from '@/components/skeletons';

export const LazyTravelMapSection = dynamic(
  () => import('@/components/TravelMapSection'),
  {
    ssr: false,
    loading: () => <TravelMapSkeleton />,
  },
);

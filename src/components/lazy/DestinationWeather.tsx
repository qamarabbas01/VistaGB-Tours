'use client';

import dynamic from 'next/dynamic';
import { WeatherSkeleton } from '@/components/skeletons';

export const LazyDestinationWeather = dynamic(
  () => import('@/components/DestinationWeather'),
  {
    loading: () => <WeatherSkeleton framed />,
  },
);

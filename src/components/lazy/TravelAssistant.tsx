'use client';

import dynamic from 'next/dynamic';
import { AssistantSkeleton } from '@/components/skeletons';

export const LazyTravelAssistant = dynamic(
  () => import('@/components/TravelAssistant'),
  {
    ssr: false,
    loading: () => <AssistantSkeleton />,
  },
);

'use client';

import dynamic from 'next/dynamic';
import { GallerySkeleton } from '@/components/skeletons';

export const LazyDestinationGallery = dynamic(
  () => import('@/components/DestinationGallery'),
  {
    loading: () => <GallerySkeleton />,
  },
);

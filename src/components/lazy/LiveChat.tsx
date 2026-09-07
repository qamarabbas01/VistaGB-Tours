'use client';

import dynamic from 'next/dynamic';

export const LazyLiveChat = dynamic(() => import('@/components/LiveChat'), {
  ssr: false,
});

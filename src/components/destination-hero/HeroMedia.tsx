'use client';

import OptimizedImage from '@/components/OptimizedImage';
import { useState } from 'react';
import type { DestinationVideo } from '@/data/types';

type Props = {
  name: string;
  image: string;
  video?: DestinationVideo;
};

export function HeroMedia({ name, image, video }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden md:h-[78vh] md:min-h-[520px]">
      {playing && video ? (
        <iframe
          title={video.title}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <OptimizedImage
            src={image}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {video ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-apricot/60 bg-night/70 text-glacier backdrop-blur-md transition-transform hover:scale-105"
              aria-label={`Play ${video.title}`}
            >
              <svg
                aria-hidden="true"
                className="ml-0.5 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
              </svg>
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}

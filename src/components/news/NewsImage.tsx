'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { BLUR_DATA_URL } from '@/lib/blur';

type Props = Omit<ImageProps, 'src'> & {
  src: string;
  alt: string;
};

export function NewsImage({
  src,
  alt,
  className = '',
  sizes,
  fill,
  priority,
  ...props
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-night text-ice/50 ${className}`}
        aria-hidden
      >
        <span className="coord-label">News</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

"use client";

import Image, { type ImageProps } from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";

function shouldSkipBlur(src: ImageProps["src"]): boolean {
  if (typeof src !== "string") return false;
  return src.endsWith(".svg") || src.startsWith("data:");
}

export default function OptimizedImage({
  placeholder,
  blurDataURL,
  quality = 75,
  src,
  ...props
}: ImageProps) {
  const skipBlur = shouldSkipBlur(src);

  return (
    <Image
      {...props}
      src={src}
      quality={quality}
      placeholder={skipBlur ? "empty" : (placeholder ?? "blur")}
      blurDataURL={skipBlur ? undefined : (blurDataURL ?? BLUR_DATA_URL)}
    />
  );
}

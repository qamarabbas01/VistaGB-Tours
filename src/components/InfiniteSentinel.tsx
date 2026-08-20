"use client";

import { useEffect, useRef } from "react";

type Props = {
  onVisible: () => void;
  disabled?: boolean;
};

export default function InfiniteSentinel({ onVisible, disabled = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  useEffect(() => {
    if (disabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onVisibleRef.current();
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled]);

  return <div ref={ref} className="h-1 w-full" aria-hidden />;
}

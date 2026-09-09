'use client';

import { useEffect, useState } from 'react';

export type SectionNavItem = {
  id: string;
  label: string;
};

type Props = {
  items: SectionNavItem[];
};

export function DestinationSectionNav({ items }: Props) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        const next = visible[0]?.target.id;
        if (next) setActive(next);
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--site-header-height)] z-40 border-y border-teal/20 bg-night/85 backdrop-blur-md"
    >
      <div className="scroll-row mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 md:px-10">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 border-b-2 px-3 py-3 text-sm transition-colors ${
                isActive
                  ? 'border-apricot text-apricot'
                  : 'border-transparent text-ice hover:text-glacier'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

import Link from 'next/link';
import TrekDifficultyBadge from '@/components/TrekDifficultyBadge';
import { getLocationBySlug } from '@/data';
import type { GuideListing } from '@/data/types';

function GuideLink({ item }: { item: GuideListing }) {
  const resolved = item.placeSlug
    ? getLocationBySlug(item.placeSlug)
    : undefined;

  if (!resolved) {
    return <span className="font-medium text-glacier">{item.name}</span>;
  }

  return (
    <Link
      href={`/destinations/${resolved.slug}`}
      className="font-medium text-glacier transition-colors hover:text-apricot"
    >
      {item.name}
    </Link>
  );
}

export function ListingGrid({
  label,
  heading,
  items,
}: {
  label: string;
  heading: string;
  items: GuideListing[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-teal/20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">{label}</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {heading}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={`${item.name}-${item.placeSlug ?? item.detail}`}
              className="rounded-xl border border-teal/20 bg-slate p-5"
            >
              <p className="font-display text-lg text-glacier">
                <GuideLink item={item} />
              </p>
              {item.difficulty ? (
                <p className="mt-2">
                  <TrekDifficultyBadge difficulty={item.difficulty} />
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-ice">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

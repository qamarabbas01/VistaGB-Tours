'use client';

import Link from 'next/link';
import CompareButton from '@/components/CompareButton';
import WishlistButton from '@/components/WishlistButton';

type Props = {
  slug: string;
  name: string;
  isRegion?: boolean;
};

export default function DestinationActions({
  slug,
  name,
  isRegion = false,
}: Props) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <WishlistButton slug={slug} />
      {isRegion ? <CompareButton slug={slug} /> : null}
      {isRegion ? (
        <Link
          href={`/plan?region=${slug}`}
          className="rounded-full border border-teal/40 bg-night/70 px-4 py-2 text-sm text-glacier backdrop-blur-md transition-colors hover:border-apricot hover:text-apricot"
        >
          Trip planner
        </Link>
      ) : null}
      <Link
        href={`/book?region=${slug}`}
        className="rounded-full bg-apricot px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Request dates
      </Link>
      <span className="sr-only">{name}</span>
    </div>
  );
}

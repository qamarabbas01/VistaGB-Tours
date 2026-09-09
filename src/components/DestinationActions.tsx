'use client';

import Link from 'next/link';
import { ShareButton } from '@/components/destination-hero/ShareButton';
import WishlistButton from '@/components/WishlistButton';

type Props = {
  slug: string;
  name: string;
  addToTripHref: string;
};

export default function DestinationActions({ slug, name, addToTripHref }: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <Link
        href={addToTripHref}
        className="rounded-full bg-apricot px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Add to Trip
      </Link>
      <WishlistButton slug={slug} labeled />
      <ShareButton title={name} />
    </div>
  );
}

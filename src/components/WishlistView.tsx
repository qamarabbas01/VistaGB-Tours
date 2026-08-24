"use client";

import DestinationCard from "@/components/DestinationCard";
import { usePreferences } from "@/components/PreferencesProvider";
import Link from "next/link";
import type { TravelLocation } from "@/data/types";

export default function WishlistView({
  locations,
}: {
  locations: TravelLocation[];
}) {
  const { wishlist, ready, t } = usePreferences();
  const items = locations.filter((location) => wishlist.includes(location.slug));

  if (!ready) {
    return <p className="text-ice">Loading saved places…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-teal/20 bg-slate p-8">
        <p className="text-ice">{t.wishlist.empty}</p>
        <Link
          href="/destinations"
          className="mt-4 inline-block text-sm font-medium text-apricot hover:underline"
        >
          {t.wishlist.browse} →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((location) => (
        <DestinationCard key={location.slug} location={location} />
      ))}
    </div>
  );
}

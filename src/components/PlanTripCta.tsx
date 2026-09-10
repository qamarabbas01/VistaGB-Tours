import Link from 'next/link';
import { planTripHref, tripPlaceName } from '@/lib/assistant/plan-trip';

type Props = {
  slug: string;
  name: string;
};

export function PlanTripCta({ slug, name }: Props) {
  const place = tripPlaceName(name);
  const label = `Plan a Trip to ${place}`;

  return (
    <Link
      href={planTripHref(slug, name)}
      className="no-print fixed bottom-5 left-5 z-50 inline-flex max-w-[calc(100vw-6.5rem)] items-center truncate rounded-full bg-apricot px-5 py-3 text-sm font-semibold text-ink shadow-lg shadow-black/30 transition-transform hover:scale-[1.02] md:max-w-md"
    >
      {label}
      <span aria-hidden="true">&nbsp;→</span>
    </Link>
  );
}

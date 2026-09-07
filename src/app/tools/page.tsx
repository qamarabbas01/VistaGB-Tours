import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import CurrencyConverter from '@/components/CurrencyConverter';
import CostCalculator from '@/components/CostCalculator';
import PackingChecklist from '@/components/PackingChecklist';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Travel tools',
  description:
    'Wishlist, compare destinations, trip planner, booking calendar, currency converter, cost calculator, packing checklist, alerts, and videos for Gilgit-Baltistan.',
  path: '/tools',
});

const tools = [
  {
    href: '/wishlist',
    label: 'Wishlist',
    detail: 'Save favourite valleys and places.',
  },
  {
    href: '/compare',
    label: 'Compare destinations',
    detail: 'Side-by-side for up to three regions.',
  },
  {
    href: '/plan',
    label: 'Trip planner',
    detail: 'Shape a day-by-day itinerary and print a PDF.',
  },
  {
    href: '/book',
    label: 'Booking calendar',
    detail: 'Pick dates and request a private tour.',
  },
  {
    href: '/alerts',
    label: 'Alerts & roads',
    detail: 'Travel notices and seasonal road status.',
  },
  {
    href: '/videos',
    label: 'YouTube videos',
    detail: 'Drone, trekking, jeep, snow, blossom, autumn.',
  },
];

export default function ToolsPage() {
  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
          ]),
          webPageJsonLd({
            name: 'Travel tools',
            description:
              'Planning tools for Gilgit-Baltistan trips with VistaGB Tours.',
            path: '/tools',
          }),
        ])}
      />
      <section className="border-b border-teal/20 bg-slate py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Plan the road</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Travel tools
          </h1>
          <p className="mt-4 max-w-2xl text-ice">
            Wishlist, compare, plan, and budget a Gilgit-Baltistan trip — then
            send dates to VistaGB. Chat is in the corner if you want a quick
            answer.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-teal/20 bg-slate p-6 transition-colors hover:border-apricot/50"
              >
                <h2 className="font-display text-xl font-semibold text-glacier">
                  {tool.label}
                </h2>
                <p className="mt-2 text-sm text-ice">{tool.detail}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <CurrencyConverter />
            <CostCalculator />
          </div>
          <div className="mt-6">
            <PackingChecklist />
          </div>
        </div>
      </section>
    </div>
  );
}

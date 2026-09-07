import BookingForm from '@/components/BookingForm';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { getPlacesForRegion, regions } from '@/data';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Book a trip',
  description:
    'Request dates for a private Gilgit-Baltistan tour. VistaGB confirms lodges, jeeps, and a quote — no card payment on this site.',
  path: '/book',
});

const regionOptions = [
  ...regions.map((region) => ({
    slug: region.slug,
    name: region.name,
    places: getPlacesForRegion(region.slug).map((place) => place.name),
  })),
  {
    slug: 'not-sure',
    name: 'Not sure yet — help me decide',
    places: [],
  },
];

type Props = {
  searchParams?: { region?: string | string[] };
};

export default function BookPage({ searchParams }: Props) {
  const raw = searchParams?.region;
  const defaultRegion = (Array.isArray(raw) ? raw[0] : (raw ?? '')).trim();

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: 'Book', path: '/book' },
          ]),
          webPageJsonLd({
            name: 'Book a trip',
            description: 'Request dates for a private VistaGB tour.',
            path: '/book',
          }),
        ])}
      />
      <PageHeader
        label="Online booking"
        title="Request your dates"
        intro="Choose a window on the calendar. This sends a private-tour inquiry — we come back with availability, a route, and a quote. There is no instant checkout."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <BookingForm
            regionOptions={regionOptions}
            defaultRegion={defaultRegion}
          />
        </div>
      </section>
    </div>
  );
}

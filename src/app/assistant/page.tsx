import JsonLd from '@/components/JsonLd';
import { LazyTravelAssistant } from '@/components/lazy/TravelAssistant';
import { getLocationBySlug } from '@/data';
import { assistantGuideCopy } from '@/lib/assistant/guide-ui';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

const ASSISTANT_DESCRIPTION =
  'Ask me anything about travelling through Gilgit-Baltistan — itineraries, places, budgets, packing, and when to go.';

export const metadata = buildPageMetadata({
  title: 'Your GB Travel Guide',
  description: ASSISTANT_DESCRIPTION,
  path: '/assistant',
});

type Props = {
  searchParams?: {
    destination?: string | string[];
  };
};

export default function AssistantPage({ searchParams }: Props) {
  const raw = searchParams?.destination;
  const slug = (Array.isArray(raw) ? raw[0] : (raw ?? '')).trim();
  const location = slug ? getLocationBySlug(slug) : undefined;
  const copy = assistantGuideCopy(location?.name);

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Your GB Travel Guide', path: '/assistant' },
          ]),
          webPageJsonLd({
            name: 'Your GB Travel Guide',
            description: ASSISTANT_DESCRIPTION,
            path: '/assistant',
          }),
        ])}
      />
      <section className="border-b border-teal/20 bg-gradient-to-b from-slate via-night to-night py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">VistaGB</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ice">
            {copy.intro}
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <LazyTravelAssistant
            destinationSlug={location?.slug}
            destinationName={location?.name}
          />
        </div>
      </section>
    </div>
  );
}

import CompareView from '@/components/CompareView';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { regions } from '@/data';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Compare destinations',
  description:
    'Compare Hunza, Skardu, Gilgit, Nagar and other Gilgit-Baltistan regions side by side.',
  path: '/compare',
});

export default function ComparePage() {
  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: 'Compare', path: '/compare' },
          ]),
          webPageJsonLd({
            name: 'Compare destinations',
            description: 'Side-by-side comparison of Gilgit-Baltistan regions.',
            path: '/compare',
          }),
        ])}
      />
      <PageHeader
        label="Side by side"
        title="Compare destinations"
        intro="Add up to three regions from destination cards. Altitude, season, access, and trek counts — then move into the planner."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CompareView regions={regions} />
        </div>
      </section>
    </div>
  );
}

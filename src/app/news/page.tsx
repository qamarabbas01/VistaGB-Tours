import { Breadcrumbs } from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { NewsListing } from '@/components/news/NewsListing';
import { fetchNewsPage } from '@/lib/news/scraper';
import type { NewsPageResult } from '@/lib/news/types';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  HOME_CRUMB,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

const NEWS_CRUMB = { name: 'News', path: '/news' };

const NEWS_DESCRIPTION =
  'Festivals, events, and developments from across Gilgit-Baltistan, sourced from the regional tourism department.';

export const metadata = buildPageMetadata({
  title: 'News',
  description: NEWS_DESCRIPTION,
  path: '/news',
});

export const revalidate = 3600;

type Props = {
  searchParams?: Promise<{
    page?: string | string[];
    story?: string | string[];
  }>;
};

function NewsHeader() {
  return (
    <section className="border-b border-teal/20 bg-slate py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Breadcrumbs items={[HOME_CRUMB, NEWS_CRUMB]} />
        <p className="coord-label mb-3 mt-6">Regional Updates</p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
          News from Gilgit-Baltistan
        </h1>
        <p className="mt-4 max-w-xl text-ice">
          Festivals, events, and developments from across the region, sourced
          from the Gilgit-Baltistan Tourism, Sports, Culture, Archaeology &amp;
          Museums Department.
        </p>
      </div>
    </section>
  );
}

function NewsSchema() {
  return (
    <JsonLd
      data={withJsonLdContext([
        breadcrumbJsonLd([HOME_CRUMB, NEWS_CRUMB]),
        webPageJsonLd({
          name: 'News from Gilgit-Baltistan',
          description: NEWS_DESCRIPTION,
          path: '/news',
        }),
      ])}
    />
  );
}

export default async function NewsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(1, parseInt(pageStr ?? '1', 10) || 1);
  const storyParam = resolvedSearchParams?.story;
  const initialStoryId = Array.isArray(storyParam) ? storyParam[0] : storyParam;

  let newsData: NewsPageResult | null = null;

  try {
    newsData = await fetchNewsPage(requestedPage);
  } catch {
    newsData = null;
  }

  if (!newsData || newsData.items.length === 0) {
    return (
      <div>
        <NewsSchema />
        <NewsHeader />
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
            <div className="rounded-2xl border border-teal/20 bg-slate px-6 py-12">
              <p className="font-display text-2xl font-semibold text-glacier">
                News is unavailable right now
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ice">
                We couldn&apos;t reach the official Gilgit-Baltistan tourism
                feed. Check back shortly, or visit the source site.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="/news"
                  className="rounded-full bg-apricot px-5 py-2 text-sm font-semibold text-ink"
                >
                  Try again
                </a>
                <a
                  href="https://visitgilgitbaltistan.gov.pk/public/pages/news"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-teal/30 px-5 py-2 text-sm text-ice hover:border-apricot/50 hover:text-apricot"
                >
                  Official news
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentPage = Math.min(requestedPage, Math.max(newsData.totalPages, 1));

  return (
    <div>
      <NewsSchema />
      <NewsHeader />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <NewsListing
            items={newsData.items}
            currentPage={currentPage}
            totalPages={newsData.totalPages}
            initialStoryId={initialStoryId}
          />

          <p className="mt-10 text-center text-xs text-ice">
            Source:{' '}
            <a
              href="https://visitgilgitbaltistan.gov.pk/public/pages/news"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apricot hover:underline"
            >
              Gilgit-Baltistan Tourism Department — Official News
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

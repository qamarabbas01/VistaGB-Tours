import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import NewsInfiniteRest from "@/components/NewsInfiniteRest";
import Pagination from "@/components/Pagination";
import { fetchNewsPage } from "@/lib/news/scraper";
import type { NewsPageResult } from "@/lib/news/types";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from "@/lib/seo";

const NEWS_DESCRIPTION =
  "Festivals, events, and developments from across Gilgit-Baltistan, sourced from the regional tourism department.";

export const metadata = buildPageMetadata({
  title: "News",
  description: NEWS_DESCRIPTION,
  path: "/news",
});

export const revalidate = 3600;

type Props = {
  searchParams?: Promise<{ page?: string | string[] }>;
};

function NewsSchema() {
  return (
    <JsonLd
      data={withJsonLdContext([
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ]),
        webPageJsonLd({
          name: "News from Gilgit-Baltistan",
          description: NEWS_DESCRIPTION,
          path: "/news",
        }),
      ])}
    />
  );
}

export default async function NewsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

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
        <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="coord-label mb-3">Regional Updates</p>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
              News from Gilgit-Baltistan
            </h1>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center text-ice md:px-10">
            <p>Unable to load news at the moment. Please try again later.</p>
          </div>
        </section>
      </div>
    );
  }

  const currentPage = Math.min(
    requestedPage,
    Math.max(newsData.totalPages, 1),
  );
  const { items } = newsData;

  return (
    <div>
      <NewsSchema />
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Regional Updates</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            News from Gilgit-Baltistan
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            Festivals, events, and developments from across the region,
            sourced from the Gilgit-Baltistan Tourism, Sports, Culture,
            Archaeology &amp; Museums Department.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {currentPage === 1 ? (
            <NewsInfiniteRest
              nextPage={2}
              totalPages={newsData.totalPages}
            />
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={newsData.totalPages}
              basePath="/news"
              className="mt-12"
            />
          )}

          <p className="mt-10 text-center text-xs text-ice">
            Source:{" "}
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

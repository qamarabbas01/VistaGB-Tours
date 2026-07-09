import Image from "next/image";
import Pagination from "@/components/Pagination";
import { fetchNewsPage } from "@/lib/news/scraper";
import type { NewsPageResult } from "@/lib/news/types";

export const metadata = {
  title: "News — VistaGB Tours",
};

export const revalidate = 3600;

type Props = {
  searchParams?: Promise<{ page?: string | string[] }>;
};

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
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50"
              >
                {item.image && (
                  <div className="relative h-48 w-full overflow-hidden md:h-56">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 896px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <p className="coord-label mb-3">
                    {item.date}
                    {item.time ? ` · ${item.time}` : ""}
                  </p>
                  <h2 className="font-display text-xl font-semibold leading-snug text-glacier transition-colors group-hover:text-apricot md:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {item.summary}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-apricot">
                    Read full story →
                  </span>
                </div>
              </a>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={newsData.totalPages}
            basePath="/news"
            className="mt-12"
          />

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

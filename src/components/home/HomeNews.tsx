import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { NewsItem } from "@/lib/news/types";

export function HomeNews({ items }: { items: readonly NewsItem[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="coord-label mb-3">Regional Updates</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              Latest News
            </h2>
            <p className="mt-4 max-w-xl text-ice">
              Festivals, events, and developments from across Gilgit-Baltistan.
            </p>
          </div>
          <Link
            href="/news"
            className="text-sm font-medium text-apricot hover:underline"
          >
            All news →
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50"
              >
                {item.image ? (
                  <div className="relative h-44 w-full overflow-hidden">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <p className="coord-label mb-2">
                    {item.date}
                    {item.time ? ` · ${item.time}` : ""}
                  </p>
                  <h3 className="font-display text-xl font-semibold leading-snug text-glacier transition-colors group-hover:text-apricot">
                    {item.title}
                  </h3>
                  {item.summary ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ice">
                      {item.summary}
                    </p>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-teal/20 bg-slate p-10 text-center">
            <p className="text-ice">
              News is temporarily unavailable.{" "}
              <Link href="/news" className="text-apricot hover:underline">
                Try the news page
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

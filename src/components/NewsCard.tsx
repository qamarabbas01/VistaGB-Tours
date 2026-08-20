"use client";

import type { NewsItem } from "@/lib/news/types";
import OptimizedImage from "@/components/OptimizedImage";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-teal/20 bg-slate transition-colors hover:border-apricot/50"
    >
      {item.image ? (
        <div className="relative h-48 w-full overflow-hidden md:h-56">
          <OptimizedImage
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="p-6 md:p-8">
        <p className="coord-label mb-3">
          {item.date}
          {item.time ? ` · ${item.time}` : ""}
        </p>
        <h2 className="font-display text-xl font-semibold leading-snug text-glacier transition-colors group-hover:text-apricot md:text-2xl">
          {item.title}
        </h2>
        {item.summary ? (
          <p className="mt-3 text-sm leading-relaxed text-ice">{item.summary}</p>
        ) : null}
        <span className="mt-4 inline-block text-sm font-medium text-apricot">
          Read full story →
        </span>
      </div>
    </a>
  );
}

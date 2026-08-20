"use client";

import { useCallback, useState } from "react";
import BlogCard from "@/components/BlogCard";
import InfiniteSentinel from "@/components/InfiniteSentinel";
import type { BlogPost } from "@/data/types";

const BATCH = 9;

export default function BlogInfiniteRest({ rest }: { rest: BlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const remaining = rest.slice(visibleCount);
  const done = remaining.length === 0;

  const loadMore = useCallback(() => {
    if (done) return;
    setVisibleCount((count) => Math.min(count + BATCH, rest.length));
  }, [done, rest.length]);

  const shown = rest.slice(0, visibleCount);

  if (rest.length === 0) return null;

  return (
    <>
      {shown.length > 0 ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      ) : null}

      {!done ? (
        <div className="mt-10 flex flex-col items-center gap-4">
          <InfiniteSentinel onVisible={loadMore} />
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-teal/20 px-6 py-2 text-sm font-medium text-ice transition-colors hover:border-apricot/50 hover:text-apricot"
          >
            Load more stories
          </button>
        </div>
      ) : null}
    </>
  );
}

"use client";

import type { BlogPost } from "@/data/types";
import OptimizedImage from "@/components/OptimizedImage";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate">
      <div className="relative h-48 w-full overflow-hidden">
        <OptimizedImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <p className="coord-label mb-2">
          {post.tag} · {post.date}
        </p>
        <h2 className="font-display text-xl font-semibold leading-snug text-glacier">
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ice">{post.excerpt}</p>
      </div>
    </article>
  );
}

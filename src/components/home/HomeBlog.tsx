import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { BlogPost } from "@/data/types";

export function HomeBlog({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="coord-label mb-3">Field Notes</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              From the Blog
            </h2>
            <p className="mt-4 max-w-xl text-ice">
              Guides, season tips, and stories from the road across northern
              Pakistan.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-apricot hover:underline"
          >
            Read the blog →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="coord-label mb-2">
                  {post.tag} · {post.date}
                </p>
                <h3 className="font-display text-xl font-semibold leading-snug text-glacier">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ice">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Pagination from "@/components/Pagination";
import { blogPosts } from "@/data";

export const metadata = {
  title: "Blog — VistaGB Tours",
};

const ITEMS_PER_PAGE = 9;

type Props = {
  searchParams?: { page?: string | string[] };
};

export default function BlogPage({ searchParams }: Props) {
  const pageParam = searchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Field Notes</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            The VistaGB Blog
          </h1>
          <p className="mt-4 max-w-xl text-ice">
            Stories, guides, and notes from the road across Gilgit-Baltistan —
            written by our guides and travelers.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-2xl border border-teal/20 bg-slate"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
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
                  <p className="mt-3 text-sm leading-relaxed text-ice">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-apricot">
                    Read more →
                  </span>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            className="mt-12"
          />
        </div>
      </section>
    </div>
  );
}

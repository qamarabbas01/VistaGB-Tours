import JsonLd from "@/components/JsonLd";
import BlogCard from "@/components/BlogCard";
import BlogInfiniteRest from "@/components/BlogInfiniteRest";
import Pagination from "@/components/Pagination";
import { blogPosts } from "@/data";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  collectionJsonLd,
  withJsonLdContext,
} from "@/lib/seo";

const BLOG_DESCRIPTION =
  "Guides, season tips, and stories from the road across Gilgit-Baltistan — written by VistaGB guides and travelers.";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: BLOG_DESCRIPTION,
  path: "/blog",
  image: "/images/commons/24a764cb8976da0d.jpg",
  imageAlt: "Eagle's Nest sunset above Hunza Valley",
});

const ITEMS_PER_PAGE = 9;

type Props = {
  searchParams?: { page?: string | string[] };
};

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function BlogPage({ searchParams }: Props) {
  const pageParam = searchParams?.page;
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(start, start + ITEMS_PER_PAGE);
  const useInfinite = currentPage === 1;
  const rest = useInfinite ? sortedPosts.slice(ITEMS_PER_PAGE) : [];

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          collectionJsonLd({
            name: "The VistaGB Blog",
            description: BLOG_DESCRIPTION,
            path: "/blog",
            items: sortedPosts.map((post) => ({
              name: post.title,
              path: "/blog",
            })),
          }),
        ])}
      />
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
              <BlogCard key={post.title} post={post} />
            ))}
          </div>

          {useInfinite ? <BlogInfiniteRest rest={rest} /> : null}

          {!useInfinite ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog"
              className="mt-12"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  pageParam?: string;
  className?: string;
};

function buildPageHref(
  basePath: string,
  page: number,
  pageParam: string
): string {
  if (page <= 1) return basePath;
  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}${pageParam}=${page}`;
}

function getVisiblePages(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  pageParam = "page",
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {prevDisabled ? (
        <span
          aria-disabled="true"
          className="rounded-full border border-teal/10 px-4 py-2 text-sm font-medium text-ice/40"
        >
          ← Prev
        </span>
      ) : (
        <Link
          href={buildPageHref(basePath, currentPage - 1, pageParam)}
          className="rounded-full border border-teal/20 px-4 py-2 text-sm font-medium text-ice transition-colors hover:border-apricot/50 hover:text-apricot"
          aria-label="Go to previous page"
        >
          ← Prev
        </Link>
      )}

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-ice/60"
              aria-hidden="true"
            >
              …
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              className="flex h-9 min-w-9 items-center justify-center rounded-full border border-apricot/50 bg-apricot/10 text-sm font-semibold text-apricot"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={buildPageHref(basePath, page, pageParam)}
              className="flex h-9 min-w-9 items-center justify-center rounded-full border border-teal/20 text-sm font-medium text-ice transition-colors hover:border-apricot/50 hover:text-apricot"
              aria-label={`Go to page ${page}`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {nextDisabled ? (
        <span
          aria-disabled="true"
          className="rounded-full border border-teal/10 px-4 py-2 text-sm font-medium text-ice/40"
        >
          Next →
        </span>
      ) : (
        <Link
          href={buildPageHref(basePath, currentPage + 1, pageParam)}
          className="rounded-full border border-teal/20 px-4 py-2 text-sm font-medium text-ice transition-colors hover:border-apricot/50 hover:text-apricot"
          aria-label="Go to next page"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}

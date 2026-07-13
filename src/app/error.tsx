"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-6 py-24 md:px-10">
      <p className="coord-label mb-3">Error</p>
      <h1 className="font-display text-4xl font-semibold text-glacier md:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-ice">
        We hit an unexpected problem loading this page. You can try again, or
        head back to the homepage.
      </p>
      {process.env.NODE_ENV === "development" && error?.message && (
        <p className="mt-3 max-w-xl font-mono text-xs text-ice/70">{error.message}</p>
      )}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-apricot px-6 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-apricot px-6 py-3 text-sm font-medium text-apricot transition-colors hover:bg-apricot hover:text-night"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

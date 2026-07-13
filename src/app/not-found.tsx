import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-6 py-24 md:px-10">
      <p className="coord-label mb-3">404</p>
      <h1 className="font-display text-4xl font-semibold text-glacier md:text-5xl">
        Trail not found
      </h1>
      <p className="mt-4 max-w-md text-ice">
        That page doesn&apos;t exist — it may have moved, or the link is out of
        date.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-full bg-apricot px-6 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
        >
          Back home
        </Link>
        <Link
          href="/destinations"
          className="rounded-full border border-apricot px-6 py-3 text-sm font-medium text-apricot transition-colors hover:bg-apricot hover:text-night"
        >
          Browse destinations
        </Link>
      </div>
    </div>
  );
}

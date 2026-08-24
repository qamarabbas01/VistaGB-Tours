import Link from "next/link";

type Props = {
  label: string;
  title: string;
  intro: string;
};

export default function PageHeader({ label, title, intro }: Props) {
  return (
    <section className="border-b border-teal/20 bg-slate py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Link
          href="/tools"
          className="coord-label mb-4 inline-block text-ice transition-colors hover:text-apricot"
        >
          ← Tools
        </Link>
        <p className="coord-label mb-3">{label}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-ice">{intro}</p>
      </div>
    </section>
  );
}

export function ProseSection({
  label,
  heading,
  body,
  alternate,
}: {
  label: string;
  heading: string;
  body: string;
  alternate?: boolean;
}) {
  return (
    <section
      className={
        alternate
          ? "border-t border-teal/20 bg-slate py-16 md:py-24"
          : "border-t border-teal/20 py-16 md:py-24"
      }
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">{label}</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ice md:text-base">
          {body}
        </p>
      </div>
    </section>
  );
}

type ContextBlock = { key: string; label: string; body: string };

export function ContextSection({
  sections,
  id,
}: {
  sections: ContextBlock[];
  id?: string;
}) {
  if (sections.length === 0) return null;

  const gridClass =
    sections.length === 1
      ? 'mt-10 grid gap-10'
      : sections.length === 2
        ? 'mt-10 grid gap-10 md:grid-cols-2'
        : 'mt-10 grid gap-10 md:grid-cols-3';

  const heading =
    sections.length === 1
      ? sections[0].label
      : sections.length === 2
        ? `${sections[0].label} & ${sections[1].label}`
        : 'History, culture & weather';

  return (
    <section
      id={id}
      className={`border-t border-teal/20 py-16 md:py-24 ${id ? 'destination-anchor' : ''}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">Know the place</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {heading}
        </h2>
        <div className={gridClass}>
          {sections.map((section) => (
            <div key={section.key}>
              <h3 className="coord-label mb-3">{section.label}</h3>
              <p className="text-sm leading-relaxed text-ice">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

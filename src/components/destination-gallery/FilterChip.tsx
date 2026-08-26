"use client";

export function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-apricot/60 bg-apricot/15 text-glacier"
          : "border-teal/30 bg-slate text-ice hover:border-apricot/40 hover:text-apricot"
      }`}
    >
      {label}
    </button>
  );
}

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-teal/20 bg-night/40 px-3 py-3">
      <p className="text-[10px] uppercase tracking-wider text-teal">{label}</p>
      <p className="mt-1 text-sm font-medium text-glacier">{value}</p>
    </div>
  );
}

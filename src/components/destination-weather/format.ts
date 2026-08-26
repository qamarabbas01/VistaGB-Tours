export function formatTemp(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatClock(isoLocal: string): string {
  const timePart = isoLocal.includes("T") ? isoLocal.split("T")[1] : isoLocal;
  if (!timePart) return "—";
  const [hours, minutes] = timePart.split(":");
  if (!hours || !minutes) return "—";

  const hour = Number.parseInt(hours, 10);
  if (!Number.isFinite(hour)) return "—";

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}

export function formatDayLabel(date: string, index: number): string {
  if (index === 0) return "Today";
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", { weekday: "short" });
}

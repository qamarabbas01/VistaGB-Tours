export function formatTemp(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatCondition(value: string): string {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatClock(isoLocal: string): string {
  const timePart = isoLocal.includes('T') ? isoLocal.split('T')[1] : isoLocal;
  if (!timePart) return '—';
  const [hours, minutes] = timePart.split(':');
  if (!hours || !minutes) return '—';

  const hour = Number.parseInt(hours, 10);
  if (!Number.isFinite(hour)) return '—';

  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}

export function formatDayLabel(date: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-GB', { weekday: 'short' });
}

export function formatUpdatedAgo(iso: string, now = Date.now()): string {
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return 'Last updated just now';

  const minutes = Math.max(0, Math.round((now - then) / 60_000));
  if (minutes < 1) return 'Last updated just now';
  if (minutes === 1) return 'Last updated 1 minute ago';
  if (minutes < 60) return `Last updated ${minutes} minutes ago`;

  const hours = Math.round(minutes / 60);
  if (hours === 1) return 'Last updated 1 hour ago';
  return `Last updated ${hours} hours ago`;
}

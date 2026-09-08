const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MAX_MONTHS_AHEAD = 18;
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export type CalendarMonth = {
  year: number;
  month: number;
};

export function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function currentMonth(today = new Date()): CalendarMonth {
  return { year: today.getFullYear(), month: today.getMonth() };
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): CalendarMonth {
  const next = new Date(year, month + delta, 1);
  return { year: next.getFullYear(), month: next.getMonth() };
}

export function monthsFromToday(
  year: number,
  month: number,
  today = new Date(),
) {
  return (year - today.getFullYear()) * 12 + (month - today.getMonth());
}

export function canGoPrevious(
  year: number,
  month: number,
  today = new Date(),
) {
  return monthsFromToday(year, month, today) > 0;
}

export function canGoNext(year: number, month: number, today = new Date()) {
  return monthsFromToday(year, month, today) < MAX_MONTHS_AHEAD;
}

export function formatMonthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatDayLabel(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${SHORT_MONTHS[month - 1]} ${year}`;
}

export function isPeakMonth(monthIndex: number) {
  return monthIndex >= 5 && monthIndex <= 8;
}

export function buildMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ];
}

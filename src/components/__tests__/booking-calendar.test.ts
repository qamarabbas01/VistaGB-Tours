import {
  MAX_MONTHS_AHEAD,
  buildMonthCells,
  canGoNext,
  canGoPrevious,
  currentMonth,
  formatDayLabel,
  formatMonthLabel,
  monthsFromToday,
  shiftMonth,
} from '@/components/booking-form/calendar';

describe('booking calendar helpers', () => {
  const today = new Date(2026, 8, 8);

  it('starts on the current month', () => {
    expect(currentMonth(today)).toEqual({ year: 2026, month: 8 });
    expect(formatMonthLabel(2026, 8)).toBe('September 2026');
  });

  it('pages forward and back by month', () => {
    expect(shiftMonth(2026, 8, 1)).toEqual({ year: 2026, month: 9 });
    expect(shiftMonth(2026, 0, -1)).toEqual({ year: 2025, month: 11 });
  });

  it('blocks months before today and caps how far ahead you can go', () => {
    expect(canGoPrevious(2026, 8, today)).toBe(false);
    expect(canGoPrevious(2026, 9, today)).toBe(true);
    expect(canGoNext(2026, 8, today)).toBe(true);
    const last = shiftMonth(2026, 8, MAX_MONTHS_AHEAD);
    expect(canGoNext(last.year, last.month, today)).toBe(false);
    expect(monthsFromToday(2026, 8, today)).toBe(0);
  });

  it('pads September 2026 so the 1st lands on Tuesday', () => {
    const cells = buildMonthCells(2026, 8);
    expect(cells[0]).toBeNull();
    expect(cells[1]).toBe(1);
    expect(cells[cells.length - 1]).toBe(30);
  });

  it('formats a calendar day for the start/end chips', () => {
    expect(formatDayLabel('2026-10-01')).toBe('1 Oct 2026');
  });
});

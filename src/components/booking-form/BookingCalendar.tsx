'use client';

import { useState } from 'react';
import {
  WEEKDAYS,
  buildMonthCells,
  canGoNext,
  canGoPrevious,
  currentMonth,
  formatDayLabel,
  formatMonthLabel,
  isPeakMonth,
  shiftMonth,
  toIso,
} from '@/components/booking-form/calendar';

type Props = {
  start: string;
  end: string;
  tripLengthLabel?: string | null;
  onPick: (iso: string) => void;
  onClear: () => void;
};

function ChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export default function BookingCalendar({
  start,
  end,
  tripLengthLabel,
  onPick,
  onClear,
}: Props) {
  const today = new Date();
  const todayIso = toIso(today);
  const initial = currentMonth(today);
  const [view, setView] = useState(initial);

  const prevEnabled = canGoPrevious(view.year, view.month, today);
  const nextEnabled = canGoNext(view.year, view.month, today);
  const cells = buildMonthCells(view.year, view.month);
  const peak = isPeakMonth(view.month);
  const monthLabel = formatMonthLabel(view.year, view.month);

  function go(delta: number) {
    setView((current) => shiftMonth(current.year, current.month, delta));
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!prevEnabled}
          onClick={() => go(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal/25 text-glacier transition-colors hover:border-apricot/50 hover:text-apricot disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-teal/25 disabled:hover:text-glacier"
        >
          <ChevronLeft />
        </button>
        <div className="min-w-0 text-center">
          <p
            className="font-display text-lg font-semibold text-glacier sm:text-xl"
            aria-live="polite"
          >
            {monthLabel}
          </p>
          {peak ? <p className="coord-label mt-1">Peak season</p> : null}
        </div>
        <button
          type="button"
          aria-label="Next month"
          disabled={!nextEnabled}
          onClick={() => go(1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal/25 text-glacier transition-colors hover:border-apricot/50 hover:text-apricot disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-teal/25 disabled:hover:text-glacier"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 text-center text-[0.65rem] uppercase tracking-wider text-ice/80">
        {WEEKDAYS.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1">
        {cells.map((day, index) => {
          if (!day) return <span key={`pad-${index}`} className="h-11" />;
          const iso = toIso(new Date(view.year, view.month, day));
          const past = iso < todayIso;
          const isStart = iso === start;
          const isEnd = iso === end;
          const selected = isStart || isEnd;
          const inRange = Boolean(start && end && iso > start && iso < end);
          const isToday = iso === todayIso;

          return (
            <button
              key={iso}
              type="button"
              disabled={past}
              onClick={() => onPick(iso)}
              aria-pressed={selected}
              aria-current={isToday ? 'date' : undefined}
              className={`h-11 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                selected
                  ? 'rounded-full bg-apricot font-semibold text-ink'
                  : inRange
                    ? 'bg-apricot/20 text-glacier'
                    : isToday
                      ? 'rounded-full text-apricot ring-1 ring-apricot/60 hover:bg-apricot/15'
                      : 'rounded-full text-glacier hover:bg-night'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-teal/20 bg-night/40 px-4 py-3">
          <p className="coord-label mb-1">Start</p>
          <p className="text-sm text-glacier">
            {start ? formatDayLabel(start) : 'Pick a day'}
          </p>
        </div>
        <div className="rounded-xl border border-teal/20 bg-night/40 px-4 py-3">
          <p className="coord-label mb-1">End</p>
          <p className="text-sm text-glacier">
            {end
              ? formatDayLabel(end)
              : start
                ? 'Then an end date'
                : '—'}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <p className="text-ice">
          {tripLengthLabel
            ? tripLengthLabel
            : start
              ? 'Now pick an end date. Use the arrows for later months.'
              : 'Tap a start date, then an end date.'}
        </p>
        {start ? (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 text-xs uppercase tracking-wider text-apricot hover:text-glacier"
          >
            Clear dates
          </button>
        ) : null}
      </div>
    </div>
  );
}

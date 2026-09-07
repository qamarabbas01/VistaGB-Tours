'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { RegionFormOption } from '@/components/ContactForm';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isPeakMonth(monthIndex: number) {
  return monthIndex >= 5 && monthIndex <= 8;
}

function MonthGrid({
  year,
  month,
  start,
  end,
  onPick,
}: {
  year: number;
  month: number;
  start: string;
  end: string;
  onPick: (iso: string) => void;
}) {
  const todayIso = toIso(new Date());
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ];
  const label = first.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <p className="coord-label mb-3">{label}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] uppercase tracking-wider text-ice">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <span key={`pad-${index}`} />;
          const iso = toIso(new Date(year, month, day));
          const past = iso < todayIso;
          const selected = iso === start || iso === end;
          const inRange = start && end && iso > start && iso < end;
          return (
            <button
              key={iso}
              type="button"
              disabled={past}
              onClick={() => onPick(iso)}
              className={`rounded-lg py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                selected
                  ? 'bg-apricot text-ink'
                  : inRange
                    ? 'bg-apricot/20 text-glacier'
                    : isPeakMonth(month)
                      ? 'bg-night text-glacier hover:bg-apricot/20'
                      : 'text-glacier hover:bg-night'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Props = {
  regionOptions: RegionFormOption[];
  defaultRegion?: string;
};

export default function BookingForm({ regionOptions, defaultRegion }: Props) {
  const now = new Date();
  const months = useMemo(
    () =>
      [0, 1, 2].map((offset) => {
        const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
        return { year: date.getFullYear(), month: date.getMonth() };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [region, setRegion] = useState(
    defaultRegion || regionOptions[0]?.slug || '',
  );
  const [groupSize, setGroupSize] = useState('2');
  const [duration, setDuration] = useState('6–7 days');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function pickDate(iso: string) {
    if (!start || (start && end)) {
      setStart(iso);
      setEnd('');
      return;
    }
    if (iso < start) {
      setEnd(start);
      setStart(iso);
      return;
    }
    setEnd(iso);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const selected = regionOptions.find((option) => option.slug === region);
    const destination = selected?.name ?? region;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          destination,
          places: '',
          travelFrom: start,
          travelTo: end,
          datesFlexible: 'no',
          travelMonth: '',
          duration,
          groupSize,
          message: message.trim()
            ? `[Online booking request]\n${message}`
            : '[Online booking request]',
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? 'Unable to send your request.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Unable to send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal/20 bg-slate p-8">
        <p className="coord-label mb-3">Request received</p>
        <h2 className="font-display text-2xl font-semibold text-glacier">
          We will confirm availability
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ice">
          Thanks — this is a private-tour inquiry, not an instant ticket.
          VistaGB will reply with a route, lodge options, and a quote for your
          dates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="rounded-2xl border border-teal/20 bg-slate p-6">
        <p className="coord-label mb-2">Booking calendar</p>
        <h2 className="font-display text-2xl font-semibold text-glacier">
          Choose travel dates
        </h2>
        <p className="mt-2 text-sm text-ice">
          Tap a start date, then an end date. June–September days are
          highlighted as peak season. We confirm lodges and jeeps after we
          receive the request.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {months.map((item) => (
            <MonthGrid
              key={`${item.year}-${item.month}`}
              year={item.year}
              month={item.month}
              start={start}
              end={end}
              onPick={pickDate}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-apricot">
          {start
            ? end
              ? `${start} → ${end}`
              : `Starting ${start} — pick an end date`
            : 'No dates selected yet'}
        </p>
      </div>

      <div className="rounded-2xl border border-teal/20 bg-slate p-6">
        <p className="coord-label mb-4">Trip details</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-ice">
            Region
            <select
              required
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
            >
              {regionOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-ice">
            Trip length
            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
            >
              {[
                '3 days',
                '4–5 days',
                '6–7 days',
                '8–10 days',
                '11–14 days',
                '2+ weeks',
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-ice">
            Travellers
            <input
              required
              value={groupSize}
              onChange={(event) => setGroupSize(event.target.value)}
              className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
            />
          </label>
          <label className="text-sm text-ice">
            Name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
            />
          </label>
          <label className="text-sm text-ice sm:col-span-2">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
            />
          </label>
          <label className="text-sm text-ice sm:col-span-2">
            Notes
            <textarea
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Lodges, treks, or airports you already have in mind…"
              className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
            />
          </label>
        </div>

        <p className="sr-only" aria-hidden="true">
          <input name="website" tabIndex={-1} autoComplete="off" />
        </p>

        {error ? (
          <p className="mt-4 text-sm text-apricot" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !start}
          className="mt-6 rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Sending…' : 'Request this booking'}
        </button>
        <p className="mt-3 text-xs text-ice">
          No card payment on this site — we confirm the itinerary and send a
          quote before anything is booked.
        </p>
      </div>
    </form>
  );
}

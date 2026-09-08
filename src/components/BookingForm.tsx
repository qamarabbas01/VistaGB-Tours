'use client';

import { FormEvent, useState } from 'react';
import BookingCalendar from '@/components/booking-form/BookingCalendar';
import type { RegionFormOption } from '@/components/ContactForm';
import {
  CONTACT_INPUT_CLASS,
  DURATION_OPTIONS,
  tripLengthFromDates,
} from '@/components/contact-form/inquiry';

type Props = {
  regionOptions: RegionFormOption[];
  defaultRegion?: string;
};

export default function BookingForm({ regionOptions, defaultRegion }: Props) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [region, setRegion] = useState(
    defaultRegion || regionOptions[0]?.slug || '',
  );
  const [groupSize, setGroupSize] = useState('');
  const [duration, setDuration] = useState('');
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

  function clearDates() {
    setStart('');
    setEnd('');
  }

  const computedTripLength =
    start && end ? tripLengthFromDates(start, end) : null;
  const durationToSend = computedTripLength?.label ?? duration;

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
          duration: durationToSend,
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
    <form
      onSubmit={onSubmit}
      className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start"
    >
      <div className="rounded-2xl border border-teal/20 bg-slate p-6 md:p-8">
        <p className="coord-label mb-2">Booking calendar</p>
        <h2 className="font-display text-2xl font-semibold text-glacier">
          Choose travel dates
        </h2>
        <p className="mt-2 text-sm text-ice">
          This month is shown first. Use the arrows to browse later months, then
          tap a start date and an end date.
        </p>
        <div className="mt-8">
          <BookingCalendar
            start={start}
            end={end}
            tripLengthLabel={computedTripLength?.label}
            onPick={pickDate}
            onClear={clearDates}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-teal/20 bg-slate p-6 md:p-8">
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
            {computedTripLength ? (
              <>
                Trip length
                <input
                  readOnly
                  value={computedTripLength.label}
                  className={`mt-2 ${CONTACT_INPUT_CLASS} border-apricot/40`}
                />
                <p className="mt-2 text-xs text-ice/80">
                  Counted from the dates you picked on the calendar.
                </p>
              </>
            ) : (
              <>
                Trip length
                <select
                  required
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
                >
                  <option value="" disabled>
                    How many days?
                  </option>
                  {DURATION_OPTIONS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </>
            )}
          </label>
          <label className="text-sm text-ice">
            Travellers
            <input
              required
              type="number"
              min={1}
              max={30}
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
          disabled={submitting || !start || !durationToSend || !groupSize.trim()}
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

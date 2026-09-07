'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ItineraryDay } from '@/data/types';

type PlannerDay = ItineraryDay & { included: boolean; notes: string };

type Props = {
  regions: {
    slug: string;
    name: string;
    itinerary: ItineraryDay[];
    duration?: string;
  }[];
  initialSlug?: string;
};

export default function TripPlanner({ regions: options, initialSlug }: Props) {
  const [slug, setSlug] = useState(
    options.some((item) => item.slug === initialSlug)
      ? initialSlug!
      : options[0]?.slug || '',
  );
  const selected = options.find((item) => item.slug === slug) ?? options[0];

  const seed = useMemo<PlannerDay[]>(
    () =>
      (selected?.itinerary ?? []).map((day) => ({
        ...day,
        included: true,
        notes: '',
      })),
    [selected],
  );
  const [days, setDays] = useState<PlannerDay[]>(seed);
  const [customTitle, setCustomTitle] = useState('');

  function loadRegion(nextSlug: string) {
    setSlug(nextSlug);
    const next = options.find((item) => item.slug === nextSlug);
    setDays(
      (next?.itinerary ?? []).map((day) => ({
        ...day,
        included: true,
        notes: '',
      })),
    );
  }

  function addDay() {
    const title = customTitle.trim() || 'Open day';
    setDays((current) => [
      ...current,
      {
        day: `Day ${current.length + 1}`,
        title,
        summary: 'Add stops, lodges, or a rest morning here.',
        included: true,
        notes: '',
      },
    ]);
    setCustomTitle('');
  }

  const included = days.filter((day) => day.included);

  return (
    <div>
      <div className="no-print mb-8 flex flex-col gap-4 rounded-2xl border border-teal/20 bg-slate p-6 sm:flex-row sm:items-end sm:justify-between">
        <label className="text-sm text-ice">
          Start from a suggested itinerary
          <select
            value={slug}
            onChange={(event) => loadRegion(event.target.value)}
            className="mt-2 w-full min-w-[16rem] rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          >
            {options.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-apricot px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Print / save PDF
          </button>
          <Link
            href={`/book?region=${slug}`}
            className="rounded-full border border-apricot px-5 py-2.5 text-sm font-medium text-apricot hover:bg-apricot hover:text-ink"
          >
            Request to book
          </Link>
        </div>
      </div>

      <article className="print-itinerary">
        <p className="coord-label mb-2">VistaGB itinerary</p>
        <h2 className="font-display text-3xl font-semibold text-glacier">
          {selected?.name ?? 'Custom trip'}
        </h2>
        {selected?.duration ? (
          <p className="mt-3 max-w-2xl text-sm text-ice">{selected.duration}</p>
        ) : null}

        <ol className="mt-10 space-y-4">
          {days.map((day, index) => (
            <li
              key={`${day.day}-${index}`}
              className={`grid gap-4 rounded-xl border border-teal/20 bg-slate p-5 md:grid-cols-[7rem_1fr] ${
                day.included ? '' : 'opacity-40'
              }`}
            >
              <div>
                <p className="coord-label pt-1">{day.day}</p>
                <label className="no-print mt-3 flex items-center gap-2 text-xs text-ice">
                  <input
                    type="checkbox"
                    checked={day.included}
                    onChange={() =>
                      setDays((current) =>
                        current.map((item, i) =>
                          i === index
                            ? { ...item, included: !item.included }
                            : item,
                        ),
                      )
                    }
                    className="accent-apricot"
                  />
                  Include
                </label>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-glacier">
                  {day.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ice">
                  {day.summary}
                </p>
                {day.stops && day.stops.length > 0 ? (
                  <p className="mt-3 text-xs text-apricot">
                    {day.stops.join(' · ')}
                  </p>
                ) : null}
                <textarea
                  value={day.notes}
                  onChange={(event) =>
                    setDays((current) =>
                      current.map((item, i) =>
                        i === index
                          ? { ...item, notes: event.target.value }
                          : item,
                      ),
                    )
                  }
                  placeholder="Your notes for this day…"
                  rows={2}
                  className="mt-3 w-full rounded-xl border border-teal/20 bg-night px-3 py-2 text-sm text-glacier outline-none focus:border-apricot"
                />
              </div>
            </li>
          ))}
        </ol>

        <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={customTitle}
            onChange={(event) => setCustomTitle(event.target.value)}
            placeholder="Add a custom day title"
            className="flex-1 rounded-xl border border-teal/30 bg-slate px-4 py-3 text-sm text-glacier outline-none focus:border-apricot"
          />
          <button
            type="button"
            onClick={addDay}
            className="rounded-full border border-teal/40 px-5 py-3 text-sm text-glacier hover:border-apricot hover:text-apricot"
          >
            Add day
          </button>
        </div>

        <p className="mt-6 text-sm text-ice">
          {included.length} day{included.length === 1 ? '' : 's'} in this draft.
        </p>
      </article>
    </div>
  );
}

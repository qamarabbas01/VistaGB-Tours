'use client';

import { FormEvent, useEffect, useState } from 'react';
import Button from '@/components/Button';
import { ContactFormFields } from '@/components/contact-form/ContactFormFields';
import {
  buildMonthOptions,
  placesSummary,
  tripLengthFromDates,
  type RegionFormOption,
  validateInquiry,
} from '@/components/contact-form/inquiry';

export type { RegionFormOption };

type ContactFormProps = {
  regionOptions: RegionFormOption[];
};

export default function ContactForm({ regionOptions }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegionSlug, setSelectedRegionSlug] = useState(
    regionOptions[0]?.slug ?? '',
  );
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [placesFlexible, setPlacesFlexible] = useState(false);
  const [datesFlexible, setDatesFlexible] = useState(false);
  const [travelFrom, setTravelFrom] = useState('');
  const [travelTo, setTravelTo] = useState('');
  const [monthOptions, setMonthOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    setMonthOptions(buildMonthOptions());
  }, []);

  const selectedRegion = regionOptions.find(
    (region) => region.slug === selectedRegionSlug,
  );
  const hasPlaces = Boolean(selectedRegion?.places.length);
  const computedTripLength =
    !datesFlexible && travelFrom && travelTo
      ? tripLengthFromDates(travelFrom, travelTo)
      : null;

  function handleTravelFromChange(value: string) {
    setTravelFrom(value);
    if (value && travelTo && !tripLengthFromDates(value, travelTo)) {
      setTravelTo('');
    }
  }

  function handleRegionChange(slug: string) {
    setSelectedRegionSlug(slug);
    setSelectedPlaces([]);
    setPlacesFlexible(false);
  }

  function togglePlace(place: string) {
    setPlacesFlexible(false);
    setSelectedPlaces((current) =>
      current.includes(place)
        ? current.filter((item) => item !== place)
        : [...current, place],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const startDate = String(formData.get('travelFrom') ?? '').trim();
    const endDate = String(formData.get('travelTo') ?? '').trim();
    const travelMonth = String(formData.get('travelMonth') ?? '').trim();
    const durationFromDates = tripLengthFromDates(startDate, endDate);
    const duration = (
      durationFromDates?.label ?? String(formData.get('duration') ?? '')
    ).trim();
    const groupSize = String(formData.get('groupSize') ?? '').trim();

    const validationError = validateInquiry({
      duration,
      datesFlexible,
      travelFrom: startDate,
      travelTo: endDate,
      travelMonth,
    });
    if (validationError) {
      setError(validationError);
      setSubmitting(false);
      return;
    }

    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      destination: selectedRegion?.name ?? '',
      places: placesSummary({
        placesFlexible,
        selectedPlaces,
        hasPlaces,
      }),
      travelFrom: datesFlexible ? '' : startDate,
      travelTo: datesFlexible ? '' : endDate,
      datesFlexible: datesFlexible ? 'yes' : 'no',
      travelMonth: datesFlexible ? travelMonth : '',
      duration,
      groupSize,
      message: String(formData.get('message') ?? '').trim(),
      website: String(formData.get('website') ?? ''),
      phone: String(formData.get('phone') ?? '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          result?.error ?? 'Something went wrong. Please try again.',
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-apricot/30 bg-night/50 px-6 py-12 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-apricot/15 text-apricot">
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <p className="coord-label mb-3">Message Sent</p>
        <p className="text-glacier">
          Thank you — we&apos;ll reply within 24 hours with a route and quote.
        </p>
      </div>
    );
  }

  return (
    <form className="relative flex flex-col gap-8" onSubmit={handleSubmit}>
      <ContactFormFields
        regionOptions={regionOptions}
        submitting={submitting}
        selectedRegionSlug={selectedRegionSlug}
        selectedPlaces={selectedPlaces}
        placesFlexible={placesFlexible}
        datesFlexible={datesFlexible}
        travelFrom={travelFrom}
        travelTo={travelTo}
        computedTripLength={computedTripLength}
        monthOptions={monthOptions}
        error={error}
        onRegionChange={handleRegionChange}
        onTogglePlace={togglePlace}
        onPlacesFlexible={(value) => {
          setPlacesFlexible(value);
          if (value) setSelectedPlaces([]);
        }}
        onDatesFlexible={setDatesFlexible}
        onTravelFromChange={handleTravelFromChange}
        onTravelToChange={setTravelTo}
      />
      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? 'Sending…' : 'Send Inquiry'}
      </Button>
    </form>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "./Button";

export type RegionFormOption = {
  slug: string;
  name: string;
  places: string[];
};

type ContactFormProps = {
  regionOptions: RegionFormOption[];
};

const DURATION_OPTIONS = [
  "3 days",
  "4–5 days",
  "6–7 days",
  "8–10 days",
  "11–14 days",
  "2+ weeks",
  "Not sure yet",
] as const;

function buildMonthOptions() {
  const options: { value: string; label: string }[] = [];
  const now = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    options.push({ value, label });
  }

  return options;
}

export default function ContactForm({ regionOptions }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegionSlug, setSelectedRegionSlug] = useState(regionOptions[0]?.slug ?? "");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [placesFlexible, setPlacesFlexible] = useState(false);
  const [datesFlexible, setDatesFlexible] = useState(false);
  const [monthOptions, setMonthOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    setMonthOptions(buildMonthOptions());
  }, []);
  const selectedRegion = regionOptions.find((region) => region.slug === selectedRegionSlug);
  const hasPlaces = Boolean(selectedRegion?.places.length);

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
    const travelFrom = String(formData.get("travelFrom") ?? "").trim();
    const travelTo = String(formData.get("travelTo") ?? "").trim();
    const travelMonth = String(formData.get("travelMonth") ?? "").trim();
    const duration = String(formData.get("duration") ?? "").trim();
    const groupSize = String(formData.get("groupSize") ?? "").trim();

    if (!duration) {
      setError("Please select how long you want to travel.");
      setSubmitting(false);
      return;
    }

    if (!datesFlexible && !travelFrom) {
      setError("Please choose when you want to travel, or mark your dates as flexible.");
      setSubmitting(false);
      return;
    }

    if (datesFlexible && !travelMonth) {
      setError("Please choose the month you are hoping to travel.");
      setSubmitting(false);
      return;
    }

    const placesSummary = placesFlexible
      ? "Please suggest places for me"
      : selectedPlaces.length > 0
        ? selectedPlaces.join(", ")
        : hasPlaces
          ? "No specific places selected"
          : "";

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      destination: selectedRegion?.name ?? "",
      places: placesSummary,
      travelFrom: datesFlexible ? "" : travelFrom,
      travelTo: datesFlexible ? "" : travelTo,
      datesFlexible: datesFlexible ? "yes" : "no",
      travelMonth: datesFlexible ? travelMonth : "",
      duration,
      groupSize,
      message: String(formData.get("message") ?? "").trim(),
      // Honeypot — leave empty; bots that fill it are rejected server-side.
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <p className="coord-label mb-3">Message Sent</p>
        <p className="text-glacier">
          Thank you — we&apos;ll reply within 24 hours with a route and quote.
        </p>
      </div>
    );
  }

  const inputClassName =
    "w-full rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60";

  return (
    <form className="relative flex flex-col gap-8" onSubmit={handleSubmit}>
      {/* Honeypot field — hidden from users, visible to naive bots */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <fieldset className="flex flex-col gap-5 border-0 p-0">
        <legend className="coord-label mb-1">Where</legend>

        <div className="flex flex-col gap-2">
          <label htmlFor="destination" className="text-sm text-ice">
            Main region or valley
          </label>
          <select
            id="destination"
            name="destination"
            value={selectedRegionSlug}
            disabled={submitting}
            onChange={(event) => handleRegionChange(event.target.value)}
            className={inputClassName}
          >
            {regionOptions.map((region) => (
              <option key={region.slug} value={region.slug}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {hasPlaces && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-ice">Specific places in {selectedRegion?.name}</p>
              <p className="text-xs text-ice/80">
                Pick as many as you like — we&apos;ll shape the route around them.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-teal/20 bg-night/40 px-4 py-3 text-sm text-ice transition-colors hover:border-apricot/40">
              <input
                type="checkbox"
                checked={placesFlexible}
                disabled={submitting}
                onChange={(event) => {
                  setPlacesFlexible(event.target.checked);
                  if (event.target.checked) setSelectedPlaces([]);
                }}
                className="h-4 w-4 rounded border-teal/40 bg-night accent-apricot"
              />
              Not sure yet — help me choose places
            </label>

            {!placesFlexible && (
              <div className="max-h-52 overflow-y-auto rounded-xl border border-teal/20 bg-night/30 p-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {selectedRegion?.places.map((place) => (
                    <label
                      key={place}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-glacier transition-colors hover:bg-slate/60"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlaces.includes(place)}
                        disabled={submitting}
                        onChange={() => togglePlace(place)}
                        className="h-4 w-4 shrink-0 rounded border-teal/40 bg-night accent-apricot"
                      />
                      <span>{place}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-5 border-0 border-t border-teal/15 pt-8 p-0">
        <legend className="coord-label mb-1">When &amp; How Long</legend>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-teal/20 bg-night/40 px-4 py-3 text-sm text-ice transition-colors hover:border-apricot/40">
          <input
            type="checkbox"
            checked={datesFlexible}
            disabled={submitting}
            onChange={(event) => setDatesFlexible(event.target.checked)}
            className="h-4 w-4 rounded border-teal/40 bg-night accent-apricot"
          />
          My travel dates are flexible
        </label>

        {datesFlexible ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="travelMonth" className="text-sm text-ice">
              Which month are you hoping to travel?
            </label>
            <select
              id="travelMonth"
              name="travelMonth"
              disabled={submitting}
              defaultValue=""
              className={inputClassName}
            >
              <option value="" disabled>
                Select a month
              </option>
              {monthOptions.map((month) => (
                <option key={month.value} value={month.label}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="travelFrom" className="text-sm text-ice">
                Start date
              </label>
              <input
                id="travelFrom"
                name="travelFrom"
                type="date"
                disabled={submitting}
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="travelTo" className="text-sm text-ice">
                End date <span className="text-xs text-ice/70">(optional)</span>
              </label>
              <input
                id="travelTo"
                name="travelTo"
                type="date"
                disabled={submitting}
                className={inputClassName}
              />
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="duration" className="text-sm text-ice">
              Trip length
            </label>
            <select
              id="duration"
              name="duration"
              required
              disabled={submitting}
              defaultValue=""
              className={inputClassName}
            >
              <option value="" disabled>
                How many days?
              </option>
              {DURATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="groupSize" className="text-sm text-ice">
              Number of travelers
            </label>
            <input
              id="groupSize"
              name="groupSize"
              type="number"
              min={1}
              max={30}
              defaultValue={2}
              required
              disabled={submitting}
              className={inputClassName}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5 border-0 border-t border-teal/15 pt-8 p-0">
        <legend className="coord-label mb-1">Your Details</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-ice">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={120}
              disabled={submitting}
              className={inputClassName}
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-ice">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              disabled={submitting}
              className={inputClassName}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-ice">
            Anything else? <span className="text-xs text-ice/70">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={4000}
            disabled={submitting}
            className={inputClassName}
            placeholder="Fitness level, budget, kids traveling with you, must-see spots..."
          />
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Send Inquiry"}
      </Button>
    </form>
  );
}

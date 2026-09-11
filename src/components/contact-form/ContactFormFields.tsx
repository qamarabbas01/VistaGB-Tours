import {
  CONTACT_INPUT_CLASS,
  DURATION_OPTIONS,
  type RegionFormOption,
} from '@/components/contact-form/inquiry';
import { useMemo } from 'react';

type MonthOption = { value: string; label: string };

type TripLength = {
  days: number;
  label: string;
};

type Props = {
  regionOptions: RegionFormOption[];
  submitting: boolean;
  selectedRegionSlug: string;
  selectedPlaces: string[];
  placesFlexible: boolean;
  datesFlexible: boolean;
  travelFrom: string;
  travelTo: string;
  computedTripLength: TripLength | null;
  monthOptions: MonthOption[];
  error: string | null;
  onRegionChange: (slug: string) => void;
  onTogglePlace: (place: string) => void;
  onPlacesFlexible: (value: boolean) => void;
  onDatesFlexible: (value: boolean) => void;
  onTravelFromChange: (value: string) => void;
  onTravelToChange: (value: string) => void;
};

function getTripLength(from: string, to: string): TripLength | null {
  if (!from || !to) return null;
  const fromDate = new Date(from + "T00:00:00Z");
  const toDate = new Date(to + "T00:00:00Z");
  if (isNaN(fromDate.valueOf()) || isNaN(toDate.valueOf())) return null;
  const diffMs = toDate.getTime() - fromDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays < 1) return null;
  return { days: diffDays, label: `${diffDays} day${diffDays > 1 ? 's' : ''}` };
}

export function ContactFormFields({
  regionOptions,
  submitting,
  selectedRegionSlug,
  selectedPlaces,
  placesFlexible,
  datesFlexible,
  travelFrom,
  travelTo,
  monthOptions,
  error,
  onRegionChange,
  onTogglePlace,
  onPlacesFlexible,
  onDatesFlexible,
  onTravelFromChange,
  onTravelToChange,
}: Props) {
  const selectedRegion = regionOptions.find(
    (region) => region.slug === selectedRegionSlug,
  );
  const hasPlaces = Boolean(selectedRegion?.places.length);

  const calendarTripLength = useMemo(
    () => getTripLength(travelFrom, travelTo),
    [travelFrom, travelTo],
  );

  const isEndDateInvalid =
    travelFrom && travelTo && getTripLength(travelFrom, travelTo) === null;

  return (
    <>
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
            onChange={(event) => onRegionChange(event.target.value)}
            className={CONTACT_INPUT_CLASS}
          >
            {regionOptions.map((region) => (
              <option key={region.slug} value={region.slug}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {hasPlaces ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-ice">
                Specific places in {selectedRegion?.name}
              </p>
              <p className="text-xs text-ice/80">
                Pick as many as you like — we&apos;ll shape the route around
                them.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-teal/20 bg-night/40 px-4 py-3 text-sm text-ice transition-colors hover:border-apricot/40">
              <input
                type="checkbox"
                checked={placesFlexible}
                disabled={submitting}
                onChange={(event) => onPlacesFlexible(event.target.checked)}
                className="h-4 w-4 rounded border-teal/40 bg-night accent-apricot"
              />
              Not sure yet — help me choose places
            </label>

            {!placesFlexible ? (
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
                        onChange={() => onTogglePlace(place)}
                        className="h-4 w-4 shrink-0 rounded border-teal/40 bg-night accent-apricot"
                      />
                      <span>{place}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </fieldset>

      <fieldset className="flex flex-col gap-5 border-0 border-t border-teal/15 p-0 pt-8">
        <legend className="coord-label mb-1">When &amp; How Long</legend>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-teal/20 bg-night/40 px-4 py-3 text-sm text-ice transition-colors hover:border-apricot/40">
          <input
            type="checkbox"
            checked={datesFlexible}
            disabled={submitting}
            onChange={(event) => onDatesFlexible(event.target.checked)}
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
              className={CONTACT_INPUT_CLASS}
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
                value={travelFrom}
                disabled={submitting}
                onChange={(event) => {
                  if (travelTo && getTripLength(event.target.value, travelTo) === null) {
                    onTravelToChange('');
                  }
                  onTravelFromChange(event.target.value);
                }}
                className={CONTACT_INPUT_CLASS}
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
                value={travelTo}
                min={travelFrom || undefined}
                disabled={submitting || !travelFrom}
                onChange={(event) => {
                  if (travelFrom && event.target.value) {
                    if (getTripLength(travelFrom, event.target.value) === null) {
                      onTravelToChange('');
                      return;
                    }
                  }
                  onTravelToChange(event.target.value);
                }}
                className={CONTACT_INPUT_CLASS + (isEndDateInvalid ? ' border-rose-400' : '')}
              />
              {isEndDateInvalid ? (
                <span className="text-xs text-red-400">
                  End date can&apos;t be before Start date.
                </span>
              ) : null}
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            {!datesFlexible ? (
              calendarTripLength ? (
                <>
                  <label htmlFor="duration" className="text-sm text-ice">
                    Trip length
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    readOnly
                    value={calendarTripLength.label}
                    className={`${CONTACT_INPUT_CLASS} border-apricot/40`}
                  />
                  <p className="text-xs text-ice/80">
                    Counted from your start and end dates.
                  </p>
                </>
              ) : (
                <>
                  <label htmlFor="duration" className="text-sm text-ice">
                    Trip length
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    required
                    disabled={submitting}
                    defaultValue=""
                    className={CONTACT_INPUT_CLASS}
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
                </>
              )
            ) : (
              <>
                <label htmlFor="duration" className="text-sm text-ice">
                  Trip length
                </label>
                <select
                  id="duration"
                  name="duration"
                  required
                  disabled={submitting}
                  defaultValue=""
                  className={CONTACT_INPUT_CLASS}
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
              </>
            )}
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
              required
              disabled={submitting}
              className={CONTACT_INPUT_CLASS}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5 border-0 border-t border-teal/15 p-0 pt-8">
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
              className={CONTACT_INPUT_CLASS}
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
              className={CONTACT_INPUT_CLASS}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-ice">
            Phone number{' '}
            <span className="text-xs text-ice/70">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            disabled={submitting}
            className={CONTACT_INPUT_CLASS}
            placeholder="+92 300 1234567"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-ice">
            Anything else?{' '}
            <span className="text-xs text-ice/70">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={4000}
            disabled={submitting}
            className={CONTACT_INPUT_CLASS}
            placeholder="Fitness level, budget, kids traveling with you, must-see spots..."
          />
        </div>
      </fieldset>
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

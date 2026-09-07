'use client';

import { useEffect, useState } from 'react';
import { usePreferences } from '@/components/PreferencesProvider';
import {
  CURRENCIES,
  convert,
  fallbackRates,
  fetchLiveRates,
  formatMoney,
  type CurrencyCode,
  type RateTable,
} from '@/lib/currency';

export default function CurrencyConverter() {
  const { currency, setCurrency } = usePreferences();
  const [amount, setAmount] = useState('25000');
  const [from, setFrom] = useState<CurrencyCode>('PKR');
  const [to, setTo] = useState<CurrencyCode>(
    currency === 'PKR' ? 'USD' : currency,
  );
  const [rates, setRates] = useState<RateTable>(fallbackRates);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchLiveRates().then((next) => {
      if (!next || cancelled) return;
      setRates(next);
      setLive(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const numeric = Number.parseFloat(amount.replace(/,/g, '')) || 0;
  const converted = convert(numeric, from, to, rates);

  return (
    <div className="rounded-2xl border border-teal/20 bg-slate p-6">
      <p className="coord-label mb-2">Currency</p>
      <h2 className="font-display text-2xl font-semibold text-glacier">
        Converter
      </h2>
      <p className="mt-2 text-sm text-ice">
        Useful for lodge quotes and jeep day rates.{' '}
        {live
          ? 'Live mid-market rates.'
          : 'Using fallback mid-market estimates.'}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-ice">
          Amount
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="decimal"
            className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          />
        </label>
        <label className="text-sm text-ice">
          From
          <select
            value={from}
            onChange={(event) => setFrom(event.target.value as CurrencyCode)}
            className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
          >
            {CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm text-ice">
        To
        <select
          value={to}
          onChange={(event) => {
            const next = event.target.value as CurrencyCode;
            setTo(next);
            setCurrency(next);
          }}
          className="mt-2 w-full rounded-xl border border-teal/30 bg-night px-4 py-3 text-glacier outline-none focus:border-apricot"
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>

      <p className="mt-6 font-display text-3xl text-apricot">
        {formatMoney(converted, to)}
      </p>
      <p className="mt-1 text-xs text-ice">
        Display currency for other tools: {currency}
      </p>
    </div>
  );
}

export const CURRENCIES = ["PKR", "USD", "EUR", "GBP"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

/** PKR per 1 unit of foreign currency — used as a fallback if live rates fail. */
export const FALLBACK_PKR_PER: Record<Exclude<CurrencyCode, "PKR">, number> = {
  USD: 278,
  EUR: 305,
  GBP: 355,
};

export type RateTable = Record<CurrencyCode, number>;

export function fallbackRates(): RateTable {
  return {
    PKR: 1,
    USD: 1 / FALLBACK_PKR_PER.USD,
    EUR: 1 / FALLBACK_PKR_PER.EUR,
    GBP: 1 / FALLBACK_PKR_PER.GBP,
  };
}

export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: RateTable,
): number {
  if (from === to) return amount;
  const inPkr = from === "PKR" ? amount : amount / rates[from];
  return to === "PKR" ? inPkr : inPkr * rates[to];
}

export function formatMoney(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat(currency === "PKR" ? "en-PK" : "en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PKR" ? 0 : 2,
  }).format(amount);
}

type OpenErApiResponse = {
  result?: string;
  rates?: Record<string, number>;
};

export async function fetchLiveRates(): Promise<RateTable | null> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/PKR", {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = (await response.json()) as OpenErApiResponse;
    if (data.result !== "success" || !data.rates) return null;
    const usd = data.rates.USD;
    const eur = data.rates.EUR;
    const gbp = data.rates.GBP;
    if (!usd || !eur || !gbp) return null;
    return { PKR: 1, USD: usd, EUR: eur, GBP: gbp };
  } catch {
    return null;
  }
}

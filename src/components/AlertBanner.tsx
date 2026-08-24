"use client";

import Link from "next/link";
import { featuredAlert } from "@/data/alerts";
import { usePreferences } from "@/components/PreferencesProvider";

export default function AlertBanner() {
  const alert = featuredAlert();
  const { t } = usePreferences();

  if (!alert) return null;

  return (
    <div className="no-print border-b border-apricot/30 bg-apricot/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-2.5 text-sm text-ice md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          <span className="coord-label me-3 inline text-[0.6rem]">{t.alerts.label}</span>
          <span className="text-glacier">{alert.title}</span>
        </p>
        <Link
          href="/alerts"
          className="shrink-0 text-sm font-medium text-apricot hover:underline"
        >
          {t.alerts.more} →
        </Link>
      </div>
    </div>
  );
}

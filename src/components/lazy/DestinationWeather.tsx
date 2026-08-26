"use client";

import dynamic from "next/dynamic";

export const LazyDestinationWeather = dynamic(
  () => import("@/components/DestinationWeather"),
  {
    loading: () => (
      <div
        className="skeleton h-64 w-full rounded-2xl"
        aria-label="Loading weather"
      />
    ),
  },
);

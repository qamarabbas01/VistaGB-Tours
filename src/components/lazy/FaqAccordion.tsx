"use client";

import dynamic from "next/dynamic";

export const LazyFaqAccordion = dynamic(
  () => import("@/components/FaqAccordion"),
  {
    loading: () => (
      <div className="skeleton h-48 w-full rounded-xl" aria-label="Loading FAQs" />
    ),
  },
);

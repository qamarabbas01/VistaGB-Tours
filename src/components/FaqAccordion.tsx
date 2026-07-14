"use client";

import { useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

type Props = {
  items: readonly Faq[];
};

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-teal/20 border-y border-teal/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-apricot"
            >
              <span className="font-display text-lg font-semibold leading-snug text-glacier md:text-xl">
                {item.question}
              </span>
              <span
                className={`mt-1 shrink-0 font-mono text-sm text-apricot transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-sm leading-relaxed text-ice md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import TravelAssistant from "@/components/TravelAssistant";
import { usePreferences } from "@/components/PreferencesProvider";

export default function LiveChat() {
  const pathname = usePathname();
  const { t } = usePreferences();
  const [open, setOpen] = useState(false);

  if (pathname === "/assistant") return null;

  return (
    <div className="no-print fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <div className="flex h-[min(70vh,560px)] w-[min(calc(100vw-2.5rem),380px)] flex-col overflow-hidden rounded-2xl border border-teal/30 bg-slate shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-teal/20 px-4 py-2">
            <p className="coord-label">{t.chat.title}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-ice hover:text-apricot"
              aria-label={t.chat.close}
            >
              Close
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <TravelAssistant variant="widget" />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? t.chat.close : t.chat.open}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-apricot text-ink shadow-lg shadow-black/30 transition-transform hover:scale-[1.04]"
      >
        {open ? (
          <span className="text-xl leading-none">×</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4.5 3.5V6.5z" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { packingSections } from '@/data/packing';

const STORAGE_KEY = 'vistagb-packing';

export default function PackingChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setChecked(
            parsed.filter((item): item is string => typeof item === 'string'),
          );
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function toggle(id: string) {
    setChecked((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  const total = packingSections.reduce(
    (sum, section) => sum + section.items.length,
    0,
  );

  return (
    <div className="rounded-2xl border border-teal/20 bg-slate p-6">
      <p className="coord-label mb-2">Kit</p>
      <h2 className="font-display text-2xl font-semibold text-glacier">
        Packing checklist
      </h2>
      <p className="mt-2 text-sm text-ice">
        Altitude and big day/night swings — tick items as you pack. Saved on
        this device.
        {ready ? ` ${checked.length} of ${total} packed.` : ''}
      </p>

      <div className="mt-6 space-y-8">
        {packingSections.map((section) => (
          <div key={section.id}>
            <p className="coord-label mb-3">{section.title}</p>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const on = checked.includes(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-teal/20 bg-night/40 px-4 py-3 text-sm text-ice hover:border-apricot/40">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(item.id)}
                        className="mt-0.5 accent-apricot"
                      />
                      <span
                        className={
                          on ? 'text-glacier line-through opacity-70' : ''
                        }
                      >
                        {item.label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

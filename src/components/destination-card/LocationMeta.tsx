import type { ReactNode } from 'react';
import {
  formatAltitude,
  formatBestTime,
  formatLocationLabel,
} from '@/components/destination-card/meta';

type Props = {
  altitude: string;
  region: string;
  bestTime: string;
};

function MetaIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal/25 bg-night/50 text-apricot">
      {children}
    </span>
  );
}

function MountainIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19h18L14.5 6.5 11 12 8.5 8.5 3 19z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="3.2" />
      <path
        strokeLinecap="round"
        d="M12 3v2.2M12 18.8V21M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M3 12h2.2M18.8 12H21M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
      />
    </svg>
  );
}

export function LocationMeta({ altitude, region, bestTime }: Props) {
  const items = [
    {
      key: 'altitude',
      icon: <MountainIcon />,
      label: formatAltitude(altitude),
    },
    {
      key: 'region',
      icon: <PinIcon />,
      label: formatLocationLabel(region),
    },
    {
      key: 'bestTime',
      icon: <SunIcon />,
      label: `Best: ${formatBestTime(bestTime)}`,
    },
  ];

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li
          key={item.key}
          className="flex items-center gap-2.5 text-sm text-ice"
        >
          <MetaIcon>{item.icon}</MetaIcon>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

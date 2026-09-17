type Kind = 'condition' | 'rain' | 'moon';

type Props = {
  kind: Kind;
  code?: number;
  className?: string;
};

function pathForCondition(code: number) {
  if (code === 0 || code === 1) {
    return (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path
          strokeLinecap="round"
          d="M12 3v2.2M12 18.8V21M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M3 12h2.2M18.8 12H21M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
        />
      </>
    );
  }

  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
    return (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 10.5a4.5 4.5 0 0 1 8.6-1.8A3.5 3.5 0 0 1 18 15.5H8.2A3.2 3.2 0 0 1 7 10.5z"
        />
        <path strokeLinecap="round" d="M9 18.2v.2M12 17.4v.2M15 18.2v.2" />
      </>
    );
  }

  if (
    code === 51 ||
    code === 53 ||
    code === 55 ||
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 80 ||
    code === 81 ||
    code === 82 ||
    code === 95 ||
    code === 96 ||
    code === 99
  ) {
    return (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 10.5a4.5 4.5 0 0 1 8.6-1.8A3.5 3.5 0 0 1 18 15.5H8.2A3.2 3.2 0 0 1 7 10.5z"
        />
        <path strokeLinecap="round" d="M9.5 18.5l.8 2M12.5 18.5l.8 2" />
      </>
    );
  }

  return (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 13a4.5 4.5 0 0 1 8.6-1.8A3.5 3.5 0 0 1 18 18H8.2A3.2 3.2 0 0 1 7 13z"
      />
      <circle cx="8" cy="8" r="2.2" />
    </>
  );
}

export function WeatherGlyph({ kind, code = 2, className = 'h-4 w-4' }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      {kind === 'rain' ? (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3.5c2.4 3.4 6 8.2 6 11.2A6 6 0 0 1 6 14.7C6 11.7 9.6 6.9 12 3.5z"
          />
        </>
      ) : kind === 'moon' ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.5 4.2A7.5 7.5 0 1 0 20 14.8 6 6 0 0 1 15.5 4.2z"
        />
      ) : (
        pathForCondition(code)
      )}
    </svg>
  );
}

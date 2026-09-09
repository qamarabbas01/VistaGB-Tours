type Props = {
  score: number;
  count: number;
};

function Star({ fill, index }: { fill: number; index: number }) {
  const clipped = Math.min(1, Math.max(0, fill));
  const clipId = `destination-star-${index}`;

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-apricot"
      viewBox="0 0 24 24"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={24 * clipped} height="24" />
        </clipPath>
      </defs>
      <path
        d="M12 3.6 14.5 9l6 .9-4.3 4.2 1 6-5.2-2.7L6.8 20.1l1-6L3.5 9.9l6-.9L12 3.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.6 14.5 9l6 .9-4.3 4.2 1 6-5.2-2.7L6.8 20.1l1-6L3.5 9.9l6-.9L12 3.6z"
        fill="currentColor"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

export function StarRating({ score, count }: Props) {
  const rounded = Math.round(score * 10) / 10;
  const label = `${rounded.toFixed(1)} out of 5 from ${count} ${
    count === 1 ? 'review' : 'reviews'
  }`;

  return (
    <p className="flex items-center gap-2 text-sm text-glacier" aria-label={label}>
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} index={index} fill={rounded - index} />
        ))}
      </span>
      <span className="font-medium">{rounded.toFixed(1)}</span>
      <span className="text-ice">({count})</span>
    </p>
  );
}

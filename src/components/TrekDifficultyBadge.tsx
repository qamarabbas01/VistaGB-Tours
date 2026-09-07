import { TREK_DIFFICULTY_LABELS, type TrekDifficulty } from '@/data/types';

const STYLES: Record<TrekDifficulty, string> = {
  easy: 'border-teal/40 text-ice',
  moderate: 'border-apricot/50 text-apricot',
  challenging: 'border-apricot bg-apricot/10 text-apricot',
  strenuous: 'border-glacier/40 bg-glacier/10 text-glacier',
};

export default function TrekDifficultyBadge({
  difficulty,
}: {
  difficulty: TrekDifficulty;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ${STYLES[difficulty]}`}
    >
      {TREK_DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}

const MONTH_ABBREVIATIONS: [RegExp, string][] = [
  [/January/gi, 'Jan'],
  [/February/gi, 'Feb'],
  [/March/gi, 'Mar'],
  [/April/gi, 'Apr'],
  [/May/gi, 'May'],
  [/June/gi, 'Jun'],
  [/July/gi, 'Jul'],
  [/August/gi, 'Aug'],
  [/September/gi, 'Sep'],
  [/October/gi, 'Oct'],
  [/November/gi, 'Nov'],
  [/December/gi, 'Dec'],
];

export function formatAltitude(altitude: string) {
  return altitude.replace(/M$/i, 'm').trim();
}

export function formatBestTime(bestTime: string) {
  const firstClause = bestTime.split(/[;.(]/)[0]?.trim() ?? bestTime.trim();
  return MONTH_ABBREVIATIONS.reduce(
    (value, [pattern, short]) => value.replace(pattern, short),
    firstClause,
  );
}

export function formatLocationLabel(region: string) {
  const trimmed = region.trim();
  if (/gilgit-baltistan|\bGB\b/i.test(trimmed)) return trimmed;
  return `${trimmed}, Gilgit-Baltistan`;
}

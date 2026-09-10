const PROMPT_MAX = 500;

export function tripPlaceName(name: string) {
  return name.replace(/\s+Valley$/i, '').trim();
}

export function planTripPrompt(name: string) {
  return `Help me plan a trip to ${tripPlaceName(name)}.`;
}

export function planTripHref(slug: string, name: string) {
  const params = new URLSearchParams({
    destination: slug,
    prompt: planTripPrompt(name),
  });
  return `/assistant?${params.toString()}`;
}

export function readAssistantPrompt(raw: string | string[] | undefined) {
  const value = (Array.isArray(raw) ? raw[0] : (raw ?? '')).trim();
  if (!value) return undefined;
  return value.slice(0, PROMPT_MAX);
}

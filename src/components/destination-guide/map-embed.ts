export function isTrustedMapEmbed(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const isGoogleMapsHost =
      host === 'maps.google.com' ||
      host === 'www.google.com' ||
      host === 'www.google.co.uk' ||
      host.endsWith('.google.com');
    const looksLikeEmbed =
      parsed.searchParams.get('output') === 'embed' ||
      parsed.pathname.includes('/maps/embed') ||
      parsed.pathname.includes('/maps');
    return isGoogleMapsHost && looksLikeEmbed;
  } catch {
    return false;
  }
}

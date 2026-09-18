export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vista-gb-tours.vercel.app'
).replace(/\/$/, '');

export const site = {
  name: 'VistaGB Tours',
  shortName: 'VistaGB',
  title: 'VistaGB Tours — Gilgit-Baltistan',
  description:
    'Discover the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan with VistaGB Tours — curated journeys, treks and stays across northern Pakistan.',
  ogDescription:
    'Curated journeys through the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan.',
  locale: 'en_PK',
  defaultOgImage: '/images/commons/bd7ddfea0e6ee033.jpg',
  defaultOgAlt: 'Snow-capped peaks of the Karakoram range above Hunza Valley',
} as const;

function readPublicUrl(value: string | undefined): string {
  return value?.trim() ?? '';
}

/** Configured profile URLs only — empty when unset so we do not claim generic homepages. */
export function getSocialProfiles(): {
  instagram: string;
  facebook: string;
  youtube: string;
} {
  return {
    instagram: readPublicUrl(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    facebook: readPublicUrl(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    youtube: readPublicUrl(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
  };
}

/** Links shown in the footer; fall back to the network homepages when no profile is set. */
export function getSocialLinks(): {
  instagram: string;
  facebook: string;
  youtube: string;
} {
  const profiles = getSocialProfiles();
  return {
    instagram: profiles.instagram || 'https://www.instagram.com/',
    facebook: profiles.facebook || 'https://www.facebook.com/',
    youtube: profiles.youtube || 'https://www.youtube.com/',
  };
}

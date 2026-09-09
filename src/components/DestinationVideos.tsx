import Link from 'next/link';
import { VideoCard } from '@/components/VideoCard';
import type { DestinationVideo } from '@/data/types';

type Props = {
  videos: DestinationVideo[];
  destinationName?: string;
  label?: string;
  heading?: string;
  intro?: string;
  moreHref?: string;
  moreLabel?: string;
};

export default function DestinationVideos({
  videos,
  destinationName,
  label = 'On film',
  heading,
  intro,
  moreHref,
  moreLabel = 'All videos →',
}: Props) {
  if (videos.length === 0) return null;

  const title =
    heading ??
    (destinationName
      ? `${destinationName} on film`
      : 'Gilgit-Baltistan on film');
  const description =
    intro ??
    'Short clips — drone views, treks, jeep tracks, snow, blossom, and autumn colour.';

  return (
    <section
      id="videos"
      className="destination-anchor border-t border-teal/20 bg-slate py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">{label}</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ice md:text-base">
          {description}
        </p>
        {moreHref ? (
          <Link
            href={moreHref}
            className="mt-3 inline-block text-sm font-medium text-apricot hover:underline"
          >
            {moreLabel}
          </Link>
        ) : null}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={`${video.theme}-${video.youtubeId}`}
              video={video}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

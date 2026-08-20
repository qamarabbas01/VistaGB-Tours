"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { useState } from "react";
import { VIDEO_THEME_LABELS, type DestinationVideo } from "@/data/types";

type Props = {
  videos: DestinationVideo[];
  destinationName?: string;
  label?: string;
  heading?: string;
  intro?: string;
};

export default function DestinationVideos({
  videos,
  destinationName,
  label = "On film",
  heading,
  intro,
}: Props) {
  if (videos.length === 0) return null;

  const title =
    heading ??
    (destinationName ? `${destinationName} on film` : "Gilgit-Baltistan on film");
  const description =
    intro ??
    "Short clips — drone views, treks, jeep tracks, snow, blossom, and autumn colour.";

  return (
    <section className="border-t border-teal/20 bg-slate py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="coord-label mb-3">{label}</p>
        <h2 className="font-display text-2xl font-semibold text-glacier md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ice md:text-base">
          {description}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={`${video.theme}-${video.youtubeId}`} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: DestinationVideo }) {
  const [playing, setPlaying] = useState(false);
  const poster =
    video.poster ?? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <article className="overflow-hidden rounded-2xl border border-teal/20 bg-night">
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block h-full w-full"
            aria-label={`Play ${video.title}`}
          >
            <OptimizedImage
              src={poster}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-night/35 transition-colors group-hover:bg-night/20" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-apricot/50 bg-night/70 text-glacier transition-transform group-hover:scale-110">
              <span className="ml-0.5 text-lg" aria-hidden>
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <p className="coord-label mb-2">{VIDEO_THEME_LABELS[video.theme]}</p>
        <h3 className="font-display text-lg font-semibold text-glacier">
          {video.title}
        </h3>
        {video.caption ? (
          <p className="mt-2 text-sm leading-relaxed text-ice">{video.caption}</p>
        ) : null}
      </div>
    </article>
  );
}

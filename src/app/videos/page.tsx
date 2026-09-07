import DestinationVideos from '@/components/DestinationVideos';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { regions } from '@/data';
import { featuredVideos } from '@/data/videos';
import type { DestinationVideo } from '@/data/types';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Travel videos',
  description:
    'YouTube films from Gilgit-Baltistan — drone footage, trekking, jeep safari, snowfall, cherry blossom, and autumn colour.',
  path: '/videos',
});

function collectVideos() {
  const seen = new Set<string>();
  const list: DestinationVideo[] = [];
  for (const video of featuredVideos) {
    if (seen.has(video.youtubeId)) continue;
    seen.add(video.youtubeId);
    list.push(video);
  }
  for (const region of regions) {
    for (const video of region.videos ?? []) {
      if (seen.has(video.youtubeId)) continue;
      seen.add(video.youtubeId);
      list.push(video);
    }
  }
  return list;
}

export default function VideosPage() {
  const videos = collectVideos();

  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: 'Videos', path: '/videos' },
          ]),
          webPageJsonLd({
            name: 'Travel videos',
            description: 'YouTube travel films from Gilgit-Baltistan.',
            path: '/videos',
          }),
        ])}
      />
      <PageHeader
        label="On film"
        title="YouTube travel videos"
        intro="Click to play on youtube-nocookie. Themes cover drone views, treks, jeep tracks, snowfall, blossom, and autumn."
      />
      <DestinationVideos
        videos={videos}
        heading="The reel"
        intro="A growing index of films we use on destination pages — plus the homepage reel."
      />
    </div>
  );
}

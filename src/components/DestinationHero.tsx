import { Breadcrumbs } from '@/components/Breadcrumbs';
import DestinationActions from '@/components/DestinationActions';
import { HeroFacts } from '@/components/destination-hero/HeroFacts';
import { HeroMedia } from '@/components/destination-hero/HeroMedia';
import { StarRating } from '@/components/destination-hero/StarRating';
import { ratingForSlug } from '@/data/ratings';
import type { DestinationVideo } from '@/data/types';
import type { BreadcrumbItem } from '@/lib/seo';

type Props = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  location: string;
  altitude: string;
  addToTripHref: string;
  crumbs: BreadcrumbItem[];
  weatherSlug?: string;
  video?: DestinationVideo;
};

export function DestinationHero({
  slug,
  name,
  tagline,
  image,
  location,
  altitude,
  addToTripHref,
  crumbs,
  weatherSlug,
  video,
}: Props) {
  const rating = ratingForSlug(slug);

  return (
    <header>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-glacier md:text-6xl">
          {name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg font-medium text-apricot md:text-xl">
          {tagline}
        </p>
      </div>

      <HeroMedia name={name} image={image} video={video} />

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
        {rating ? (
          <div className="mb-4">
            <StarRating score={rating.score} count={rating.count} />
          </div>
        ) : null}
        <HeroFacts
          location={location}
          altitude={altitude}
          weatherSlug={weatherSlug}
        />
        <DestinationActions
          slug={slug}
          name={name}
          addToTripHref={addToTripHref}
        />
      </div>
    </header>
  );
}

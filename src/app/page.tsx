import JsonLd from "@/components/JsonLd";
import { HomeActivities } from "@/components/home/HomeActivities";
import { HomeBlog } from "@/components/home/HomeBlog";
import { HomeCta, HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeInstagram } from "@/components/home/HomeInstagram";
import { HomeNews } from "@/components/home/HomeNews";
import { HomePackages } from "@/components/home/HomePackages";
import { HomePopularDestinations } from "@/components/home/HomePopularDestinations";
import { HomeExperiences } from "@/components/home/HomeExperiences";
import { HomeReviews } from "@/components/home/HomeReviews";
import { HomeStatistics } from "@/components/home/HomeStatistics";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { SectionDivider } from "@/components/home/SectionDivider";
import { LazyTravelMapSection } from "@/components/lazy/TravelMapSection";
import DestinationVideos from "@/components/DestinationVideos";
import { blogPosts, regions } from "@/data";
import {
  activities,
  experiences,
  faqs,
  galleryImages,
  mapPins,
  packages,
  reviews,
  statistics,
} from "@/data/hero";
import { featuredVideos } from "@/data/videos";
import { fetchNewsPage } from "@/lib/news/scraper";
import { faqJsonLd, withJsonLdContext } from "@/lib/seo";

export const revalidate = 3600;

const popularDestinations = regions.slice(0, 6);

const latestPosts = [...blogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default async function Home() {
  let latestNews: Awaited<ReturnType<typeof fetchNewsPage>>["items"] = [];
  try {
    const news = await fetchNewsPage(1);
    latestNews = news.items.slice(0, 3);
  } catch {
    latestNews = [];
  }

  return (
    <div>
      <JsonLd data={withJsonLdContext(faqJsonLd(faqs))} />
      <HomeHero />
      <HomeWhyChoose />
      <HomePopularDestinations destinations={popularDestinations} />
      <SectionDivider />
      <HomeExperiences items={experiences} />
      <HomeActivities items={activities} />
      <HomePackages items={packages} />
      <SectionDivider />
      <HomeReviews items={reviews} />
      <HomeStatistics items={statistics} />
      <LazyTravelMapSection locations={mapPins} />
      <HomeNews items={latestNews} />
      <SectionDivider />
      <HomeBlog posts={latestPosts} />
      <DestinationVideos
        videos={featuredVideos}
        label="On Film"
        heading="Short films from the Karakoram"
        intro="Drone views, trekking clips, jeep safari, snowfall, cherry blossom, and autumn colour — a sense of the road before you go."
        moreHref="/videos"
        moreLabel="YouTube travel videos →"
      />
      <HomeInstagram images={galleryImages} />
      <HomeFaq items={faqs} />
      <HomeCta />
    </div>
  );
}

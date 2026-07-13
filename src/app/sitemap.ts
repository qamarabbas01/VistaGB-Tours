import type { MetadataRoute } from "next";
import { getAllStaticSlugs } from "@/data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vista-gb-tours.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/destinations",
    "/blog",
    "/news",
    "/contact",
    "/about",
    "/privacy",
    "/terms",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === "" || path === "/destinations" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/destinations" || path === "/contact" ? 0.9 : 0.6,
    })),
    ...getAllStaticSlugs().map((slug) => ({
      url: `${SITE_URL}/destinations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

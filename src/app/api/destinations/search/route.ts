import { NextResponse } from "next/server";
import { searchLocations } from "@/data";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`search:${ip}`, { limit: 60, windowMs: 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (!q.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 },
    );
  }

  if (q.length > 120) {
    return NextResponse.json(
      { error: "Query is too long." },
      { status: 400 },
    );
  }

  const result = searchLocations(q);

  return NextResponse.json({
    query: result.query,
    regions: result.regions.map((r) => ({
      slug: r.slug,
      name: r.name,
      tagline: r.tagline,
      description: r.description,
      image: r.image,
      placeCount: r.placeSlugs.length,
    })),
    places: result.places.map((p) => ({
      slug: p.slug,
      name: p.name,
      parentSlug: p.parentSlug,
      type: p.type,
      tagline: p.tagline,
      description: p.description,
      image: p.image,
      activities: p.activities,
      bestTime: p.bestTime,
      duration: p.duration,
      altitude: p.altitude,
    })),
    placesByRegion: Object.fromEntries(
      Object.entries(result.placesByRegion).map(([slug, places]) => [
        slug,
        places.map((p) => p.slug),
      ]),
    ),
  });
}

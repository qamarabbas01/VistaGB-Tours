import { NextResponse } from "next/server";
import { getCoordinatesForSlug } from "@/data/coordinates";
import { fetchDestinationWeather } from "@/lib/weather/fetch";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const revalidate = 1800;

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`weather:${ip}`, {
    limit: 40,
    windowMs: 60 * 1000,
  });

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
  const slug = (searchParams.get("slug") ?? "").trim();

  if (!slug) {
    return NextResponse.json(
      { error: "Query parameter 'slug' is required" },
      { status: 400 },
    );
  }

  if (slug.length > 80 || !/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ error: "Invalid destination slug" }, { status: 400 });
  }

  if (!getCoordinatesForSlug(slug)) {
    return NextResponse.json(
      { error: "Weather is not available for this destination yet" },
      { status: 404 },
    );
  }

  try {
    const weather = await fetchDestinationWeather(slug);
    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load weather";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

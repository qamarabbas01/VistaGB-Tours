import { NextResponse } from "next/server";
import { fetchNewsPage } from "@/lib/news/scraper";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  try {
    const result = await fetchNewsPage(page);

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to scrape news";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}

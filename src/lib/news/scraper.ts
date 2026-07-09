import type { NewsItem, NewsPageResult } from "./types";

const NEWS_BASE_URL =
  "https://visitgilgitbaltistan.gov.pk/public/pages/news";

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(text: string): string {
  return decodeHtmlEntities(text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function parseTotalPages(html: string): number {
  const pageNumbers = [...html.matchAll(/pages\/news\?page=(\d+)/g)].map((match) =>
    Number(match[1]),
  );

  return pageNumbers.length > 0 ? Math.max(...pageNumbers) : 1;
}

function parseNewsItems(html: string): NewsItem[] {
  const items: NewsItem[] = [];
  const blogBoxRegex =
    /<div class="blog-box row">([\s\S]*?)<\/div>\s*<!-- end blog-box -->/g;

  for (const match of html.matchAll(blogBoxRegex)) {
    const block = match[1];

    const titleMatch = block.match(
      /<div class="blog-meta[^"]*">[\s\S]*?<h4>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/,
    );
    if (!titleMatch) continue;

    const url = titleMatch[1];
    const title = stripTags(titleMatch[2]);
    const id = url.match(/\/news\/(\d+)/)?.[1] ?? url;

    const imageMatch = block.match(/<img[^>]+src="([^"]+)"/);
    const image = imageMatch?.[1] ?? "";

    const summaryMatch = block.match(
      /<div class="blog-meta[^"]*">[\s\S]*?<p>([\s\S]*?)<\/p>/,
    );
    const summary = summaryMatch ? stripTags(summaryMatch[1]) : "";

    const metaMatch = block.match(/<div class="blog-meta[^"]*">([\s\S]*?)<\/div>/);
    const metaBlock = metaMatch?.[1] ?? "";
    const smallLinks = [...metaBlock.matchAll(/<small>\s*<a[^>]*>([\s\S]*?)<\/a>/g)].map(
      (smallMatch) => stripTags(smallMatch[1]),
    );

    const date = smallLinks[0] ?? "";
    const time = smallLinks[1] ?? "";
    const views = Number(smallLinks[2]?.replace(/[^\d]/g, "") || 0);

    items.push({
      id,
      title,
      summary,
      date,
      time,
      views,
      image,
      url,
    });
  }

  return items;
}

export async function fetchNewsPage(page = 1): Promise<NewsPageResult> {
  const url = page > 1 ? `${NEWS_BASE_URL}?page=${page}` : NEWS_BASE_URL;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "VistaGB-Tours/1.0 (news aggregator)",
      Accept: "text/html",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news (HTTP ${response.status})`);
  }

  const html = await response.text();

  return {
    items: parseNewsItems(html),
    page,
    totalPages: parseTotalPages(html),
    source: NEWS_BASE_URL,
  };
}

import type { NewsItem, NewsPageResult } from './types';

export const NEWS_BASE_URL =
  'https://visitgilgitbaltistan.gov.pk/public/pages/news';

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(?:x([\da-fA-F]+)|(\d+));/g, (_, hex, dec) =>
      String.fromCharCode(hex ? parseInt(hex, 16) : parseInt(dec, 10)),
    );
}

function collapseSpaces(text: string): string {
  return text.replace(/[ \t\f\v]+/g, ' ').trim();
}

export function htmlToPlainText(html: string): string {
  return collapseSpaces(
    decodeHtmlEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' '),
  );
}

export function htmlToParagraphs(html: string): string[] {
  const prepared = decodeHtmlEntities(
    html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n'),
  ).replace(/<[^>]+>/g, ' ');

  const blocks = prepared
    .split(/\n{2,}/)
    .map((block) => collapseSpaces(block.replace(/\s+/g, ' ')))
    .filter(Boolean);

  return blocks.length > 0 ? blocks : [];
}

function absoluteUrl(raw: string): string {
  const trimmed = decodeHtmlEntities(raw.trim());
  if (!trimmed) return '';
  try {
    return new URL(trimmed, NEWS_BASE_URL).href;
  } catch {
    return '';
  }
}

export function parseNewsItems(html: string): NewsItem[] {
  const items: NewsItem[] = [];
  const blogBoxRegex =
    /<div class="blog-box row">([\s\S]*?)<\/div>\s*<!-- end blog-box -->/g;

  for (const match of html.matchAll(blogBoxRegex)) {
    const item = parseBlogBox(match[1]);
    if (item) items.push(item);
  }

  return items;
}

function parseBlogBox(block: string): NewsItem | null {
  const titleMatch = block.match(
    /<div class="blog-meta[^"]*">[\s\S]*?<h4>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/,
  );
  if (!titleMatch) return null;

  const url = absoluteUrl(titleMatch[1]);
  const title = htmlToPlainText(titleMatch[2]);
  const id = url.match(/\/news\/(\d+)/)?.[1] ?? url;
  if (!title || !url) return null;

  const imageMatch = block.match(
    /<div class="post-media">[\s\S]*?<img[^>]+src="([^"]+)"/i,
  );
  const image = imageMatch?.[1] ? absoluteUrl(imageMatch[1]) : '';

  const summaryMatch = block.match(
    /<div class="blog-meta[^"]*">[\s\S]*?<p>([\s\S]*?)<\/p>/,
  );
  const paragraphs = summaryMatch ? htmlToParagraphs(summaryMatch[1]) : [];
  const body = paragraphs.join('\n\n');
  const summary = paragraphs[0] ?? '';

  const metaMatch = block.match(
    /<div class="blog-meta[^"]*">([\s\S]*?)<\/div>/,
  );
  const metaBlock = metaMatch?.[1] ?? '';
  const smallLinks = [
    ...metaBlock.matchAll(/<small>\s*<a[^>]*>([\s\S]*?)<\/a>/g),
  ].map((smallMatch) => htmlToPlainText(smallMatch[1]));

  const date = smallLinks[0] ?? '';
  const time = smallLinks[1] ?? '';
  const views = Number(smallLinks[2]?.replace(/[^\d]/g, '') || 0);

  return {
    id,
    title,
    summary,
    body,
    date,
    time,
    views,
    image,
    url,
  };
}

function parseTotalPages(html: string): number {
  const pageNumbers = [...html.matchAll(/\bnews\?page=(\d+)/g)].map((match) =>
    Number(match[1]),
  );

  return pageNumbers.length > 0 ? Math.max(...pageNumbers) : 1;
}

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'VistaGB-Tours/1.0 (news aggregator)',
      Accept: 'text/html',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news (HTTP ${response.status})`);
  }

  return response.text();
}

export async function fetchNewsPage(page = 1): Promise<NewsPageResult> {
  const url = page > 1 ? `${NEWS_BASE_URL}?page=${page}` : NEWS_BASE_URL;
  const html = await fetchHtml(url);

  return {
    items: parseNewsItems(html),
    page,
    totalPages: parseTotalPages(html),
    source: NEWS_BASE_URL,
  };
}

export async function fetchNewsArticle(id: string): Promise<NewsItem | null> {
  if (!/^\d+$/.test(id)) return null;

  const html = await fetchHtml(`${NEWS_BASE_URL}/${id}`);
  const [item] = parseNewsItems(html);
  if (!item) return null;

  return item;
}

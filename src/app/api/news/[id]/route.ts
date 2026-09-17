import { NextResponse } from 'next/server';
import { fetchNewsArticle } from '@/lib/news/scraper';

export const revalidate = 3600;

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  try {
    const item = await fetchNewsArticle(id);
    if (!item) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load story';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

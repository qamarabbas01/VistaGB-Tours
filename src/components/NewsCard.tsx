import type { NewsItem } from '@/lib/news/types';
import { NewsImage } from '@/components/news/NewsImage';

type Props = {
  item: NewsItem;
  onOpen: (item: NewsItem) => void;
  layout?: 'row' | 'tile';
  headingLevel?: 'h2' | 'h3';
};

export default function NewsCard({
  item,
  onOpen,
  layout = 'row',
  headingLevel = 'h2',
}: Props) {
  const isTile = layout === 'tile';
  const TitleTag = headingLevel;

  return (
    <article>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className={`group w-full overflow-hidden rounded-2xl border border-teal/20 bg-slate text-left transition-colors hover:border-apricot/50 ${
          isTile ? 'block' : 'flex flex-col md:flex-row md:items-stretch'
        }`}
      >
        <div
          className={
            isTile
              ? 'relative aspect-[16/10] w-full bg-night'
              : 'relative aspect-[16/10] w-full bg-night md:min-h-[240px] md:w-[280px] md:shrink-0 md:aspect-auto lg:w-[320px]'
          }
        >
          <NewsImage
            src={item.image}
            alt={item.title}
            fill
            sizes={
              isTile
                ? '(max-width: 768px) 100vw, 33vw'
                : '(max-width: 768px) 100vw, 320px'
            }
            className="object-contain p-1"
          />
        </div>
        <div
          className={isTile ? 'p-6' : 'flex min-w-0 flex-1 flex-col p-6 md:p-7'}
        >
          <p className="coord-label mb-3">
            {item.date}
            {item.time ? ` · ${item.time}` : ''}
          </p>
          <TitleTag
            className={`font-display font-semibold leading-snug text-glacier transition-colors group-hover:text-apricot ${
              isTile ? 'text-xl' : 'text-xl md:text-2xl'
            }`}
          >
            {item.title}
          </TitleTag>
          {item.summary ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ice">
              {item.summary}
            </p>
          ) : null}
          <span className="mt-4 inline-block text-sm font-medium text-apricot">
            Read story →
          </span>
        </div>
      </button>
    </article>
  );
}

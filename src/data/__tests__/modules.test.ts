import {
  featuredAlert,
  roadStatuses,
  ROAD_STATUS_LABELS,
  travelAlerts,
} from '@/data/alerts';
import { blogPosts } from '@/data/blog';
import { composeRegionGallery } from '@/data/gallery';
import { packingSections } from '@/data/packing';
import {
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  TREK_DIFFICULTIES,
  TREK_DIFFICULTY_LABELS,
  VIDEO_THEME_LABELS,
  VIDEO_THEMES,
  type Place,
} from '@/data/types';

describe('supporting data modules', () => {
  it('exposes a label for every gallery, video, and trek category', () => {
    expect(
      GALLERY_CATEGORIES.every((key) => GALLERY_CATEGORY_LABELS[key]),
    ).toBe(true);
    expect(VIDEO_THEMES.every((key) => VIDEO_THEME_LABELS[key])).toBe(true);
    expect(TREK_DIFFICULTIES.every((key) => TREK_DIFFICULTY_LABELS[key])).toBe(
      true,
    );
  });

  it('keeps packing list ids unique and non-empty', () => {
    const sectionIds = packingSections.map((section) => section.id);
    const itemIds = packingSections.flatMap((section) =>
      section.items.map((item) => item.id),
    );

    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(new Set(itemIds).size).toBe(itemIds.length);
    expect(
      packingSections.every((section) =>
        section.items.every((item) => item.label.trim().length > 0),
      ),
    ).toBe(true);
  });

  it('surfaces the highest-priority travel alert and valid road statuses', () => {
    expect(featuredAlert()?.id).toBe('kkh-slides');
    expect(featuredAlert()?.severity).toBe('watch');
    expect(
      roadStatuses.every((status) => status.status in ROAD_STATUS_LABELS),
    ).toBe(true);
    expect(new Set(travelAlerts.map((alert) => alert.id)).size).toBe(
      travelAlerts.length,
    );
  });

  it('keeps blog posts complete', () => {
    expect(blogPosts.length).toBeGreaterThan(0);
    expect(
      blogPosts.every(
        (post) =>
          post.title && post.excerpt && post.date && post.tag && post.image,
      ),
    ).toBe(true);
  });

  it('merges region and place photos without duplicate sources', () => {
    const place: Place = {
      slug: 'sample-lake',
      name: 'Sample Lake',
      parentSlug: 'test-valley',
      type: 'Lake',
      tagline: 'Glacial water',
      description: 'A test lake.',
      image: '/images/sample-lake.jpg',
      gallery: [
        {
          src: '/images/shared.jpg',
          title: 'Shared view',
          category: 'mountains',
        },
        {
          src: '/images/lake-only.jpg',
          title: 'Lake shore',
        },
      ],
      overview: 'Overview',
      highlights: [],
      activities: [],
      bestTime: 'June–September',
      altitude: '3,000M',
      gettingThere: 'Jeep',
      nearby: [],
    };

    const gallery = composeRegionGallery(
      [
        {
          src: '/images/shared.jpg',
          title: 'Region view',
          category: 'culture',
        },
        {
          src: '/images/region.jpg',
          title: 'Region only',
          category: 'villages',
        },
      ],
      [place],
    );

    expect(gallery.map((image) => image.src)).toEqual([
      '/images/shared.jpg',
      '/images/region.jpg',
      '/images/lake-only.jpg',
    ]);
    expect(gallery[2]).toMatchObject({
      src: '/images/lake-only.jpg',
      category: 'lakes',
    });
  });
});

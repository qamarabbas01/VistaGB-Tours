import { searchDiscovery } from '@/lib/search/discovery';

describe('searchDiscovery', () => {
  it('groups Hunza results into destinations, places, and matching guides', () => {
    const result = searchDiscovery('hunza');

    expect(result.groups.map((group) => group.name)).toEqual(
      expect.arrayContaining(['Destinations', 'Places', 'Guides']),
    );
    expect(
      result.groups
        .find((group) => group.name === 'Destinations')
        ?.hits.some((hit) => hit.label === 'Hunza Valley'),
    ).toBe(true);
    expect(
      result.groups
        .find((group) => group.name === 'Places')
        ?.hits.some((hit) => hit.href.startsWith('/destinations/')),
    ).toBe(true);
    expect(
      result.groups
        .find((group) => group.name === 'Guides')
        ?.hits.some((hit) => /hunza/i.test(hit.label)),
    ).toBe(true);
  });

  it('finds landmark places by name', () => {
    const attabad = searchDiscovery('Attabad');
    expect(
      attabad.hits.some(
        (hit) =>
          hit.group === 'Places' &&
          hit.label === 'Attabad Lake' &&
          hit.href === '/destinations/attabad-lake',
      ),
    ).toBe(true);

    const fort = searchDiscovery('Baltit');
    expect(
      fort.hits.some(
        (hit) =>
          hit.group === 'Places' &&
          hit.label === 'Baltit Fort' &&
          hit.href === '/destinations/baltit-fort',
      ),
    ).toBe(true);
  });

  it('includes matching news stories when provided', () => {
    const result = searchDiscovery('festival', [
      {
        id: '1',
        title: 'Shandur Polo Festival dates announced',
        summary: 'The highland arena opens in July.',
        url: 'https://example.com/festival',
      },
      {
        id: '2',
        title: 'Road status on the KKH',
        summary: 'Landslide buffer days remain in effect.',
        url: 'https://example.com/kkh',
      },
    ]);

    const news = result.groups.find((group) => group.name === 'News');
    expect(news?.hits).toHaveLength(1);
    expect(news?.hits[0]).toMatchObject({
      label: 'Shandur Polo Festival dates announced',
      href: '/news?story=1',
    });
  });

  it('returns no groups for a query with no matches', () => {
    expect(searchDiscovery('xyzzy-not-a-place').hits).toEqual([]);
    expect(searchDiscovery('   ').groups).toEqual([]);
  });
});

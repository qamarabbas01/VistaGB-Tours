import {
  formatAltitude,
  formatBestTime,
  formatLocationLabel,
} from '@/components/destination-card/meta';

describe('destination card meta', () => {
  it('normalises altitude to metres', () => {
    expect(formatAltitude('2,438M')).toBe('2,438m');
    expect(formatAltitude('2,400m')).toBe('2,400m');
  });

  it('shortens the first clause of the best-travel window', () => {
    expect(
      formatBestTime(
        'April–October; blossom in spring, harvest colours in autumn',
      ),
    ).toBe('Apr–Oct');
    expect(formatBestTime('May–October for road access; July–August')).toBe(
      'May–Oct for road access',
    );
  });

  it('places the valley inside Gilgit-Baltistan', () => {
    expect(formatLocationLabel('Hunza')).toBe('Hunza, Gilgit-Baltistan');
    expect(formatLocationLabel('Gilgit-Baltistan')).toBe('Gilgit-Baltistan');
  });
});

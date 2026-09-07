import {
  getCoordinatesForSlug,
  parseCoordinateString,
} from '@/data/coordinates';

describe('coordinates', () => {
  it('parses display strings with hemisphere suffixes', () => {
    expect(parseCoordinateString('36.316°N, 74.650°E')).toEqual({
      lat: 36.316,
      lng: 74.65,
    });
    expect(parseCoordinateString('12.5 S, 45.25 W')).toEqual({
      lat: -12.5,
      lng: -45.25,
    });
    expect(parseCoordinateString('not a coordinate')).toBeNull();
  });

  it('resolves coordinates for known regions, places, and unknown slugs', () => {
    const hunza = getCoordinatesForSlug('hunza-valley');
    expect(hunza).toMatchObject({
      lat: 36.3167,
      lng: 74.65,
      label: 'Hunza Valley',
    });

    const karimabad = getCoordinatesForSlug('karimabad');
    expect(karimabad).toMatchObject({
      lat: 36.316,
      lng: 74.65,
      label: 'Karimabad',
    });

    expect(getCoordinatesForSlug('missing-destination')).toBeNull();
  });
});

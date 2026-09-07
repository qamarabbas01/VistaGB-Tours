import { screen } from '@testing-library/react';
import { HomeExploreByExperience } from '@/components/home/HomeExploreByExperience';
import { EXPERIENCE_CATEGORIES, experienceHref } from '@/data';
import { renderWithPreferences } from '@/test-utils';

describe('HomeExploreByExperience', () => {
  it('renders every experience category as a destination search link', () => {
    renderWithPreferences(<HomeExploreByExperience />);

    expect(
      screen.getByRole('heading', { name: 'Explore by Experience' }),
    ).toBeInTheDocument();

    for (const category of EXPERIENCE_CATEGORIES) {
      const link = screen.getByRole('link', { name: new RegExp(category.name) });
      expect(link).toHaveAttribute('href', experienceHref(category.slug));
    }

    expect(screen.getAllByRole('link')).toHaveLength(
      EXPERIENCE_CATEGORIES.length,
    );
  });
});

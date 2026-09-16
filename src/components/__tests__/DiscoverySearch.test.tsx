import { fireEvent, render, screen, within } from '@testing-library/react';
import { DiscoverySearch } from '@/components/DiscoverySearch';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('DiscoverySearch', () => {
  beforeEach(() => {
    push.mockClear();
  });
  it('shows grouped discovery results as the query is typed', () => {
    render(<DiscoverySearch newsItems={[]} />);

    const input = screen.getByRole('combobox', { name: /search vistagb/i });
    fireEvent.change(input, { target: { value: 'hunza' } });

    const listbox = screen.getByRole('listbox', { name: /search suggestions/i });
    expect(within(listbox).getByText('Destinations')).toBeInTheDocument();
    expect(within(listbox).getByText('Places')).toBeInTheDocument();
    expect(within(listbox).getByText('Guides')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Hunza Valley' }),
    ).toHaveAttribute('href', '/destinations/hunza-valley');
  });

  it('shows an empty state with suggestions when nothing matches', () => {
    render(<DiscoverySearch newsItems={[]} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'xyzzy-not-a-place' },
    });

    expect(
      screen.getByText('No places found for “xyzzy-not-a-place”'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Hunza Valley' }),
    ).toHaveAttribute('href', '/destinations/hunza-valley');
    expect(screen.getByRole('link', { name: 'Skardu' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Attabad Lake' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Baltit Fort' }),
    ).toBeInTheDocument();
  });

  it('moves the highlighted option with the arrow keys and closes on Escape', () => {
    render(<DiscoverySearch newsItems={[]} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'hunza' } });

    const first = screen.getByRole('option', { name: 'Hunza Valley' });
    expect(first).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(first).toHaveAttribute('aria-selected', 'false');
    expect(screen.getAllByRole('option')[1]).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the highlighted result on Enter', () => {
    render(<DiscoverySearch newsItems={[]} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'hunza' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(push).toHaveBeenCalledWith('/destinations/hunza-valley');
  });
});

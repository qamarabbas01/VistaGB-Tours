import { fireEvent, render, screen } from '@testing-library/react';
import BookingForm from '@/components/BookingForm';
import { mockRegionOptions } from '@/test-utils';

describe('BookingForm calendar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 8, 8, 12));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows only the current month until the next arrow is used', () => {
    render(<BookingForm regionOptions={mockRegionOptions} />);

    expect(screen.getByText('September 2026')).toBeInTheDocument();
    expect(screen.queryByText('October 2026')).not.toBeInTheDocument();
    expect(screen.queryByText('November 2026')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous month/i })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /next month/i }));

    expect(screen.getByText('October 2026')).toBeInTheDocument();
    expect(screen.queryByText('September 2026')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous month/i })).toBeEnabled();
  });

  it('fills start and end chips from a single month', () => {
    render(<BookingForm regionOptions={mockRegionOptions} />);

    const day = (label: string) =>
      screen.getAllByRole('button').find((button) => button.textContent === label)!;

    fireEvent.click(day('10'));
    fireEvent.click(day('16'));

    expect(screen.getByText('10 Sep 2026')).toBeInTheDocument();
    expect(screen.getByText('16 Sep 2026')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('7 days').length).toBeGreaterThan(0);
  });
});

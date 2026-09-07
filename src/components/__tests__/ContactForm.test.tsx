import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';
import { mockRegionOptions } from '@/test-utils';

function renderForm() {
  return render(<ContactForm regionOptions={mockRegionOptions} />);
}

async function fillTravelerDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/^email$/i), 'ada@example.com');
}

describe('ContactForm', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('renders inquiry fields, region options, and a hidden honeypot', () => {
    const { container } = renderForm();

    expect(
      screen.getByRole('button', { name: /send inquiry/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/main region or valley/i)).toHaveValue(
      'hunza-valley',
    );
    expect(screen.getByLabelText('Karimabad')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeRequired();
    expect(screen.getByLabelText(/^email$/i)).toBeRequired();

    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="website"]',
    );
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute('tabIndex', '-1');
    expect(honeypot).toHaveValue('');
    expect(honeypot?.closest("[aria-hidden='true']")).not.toBeNull();
  });

  it('requires a trip length before submitting', () => {
    const { container } = renderForm();

    fireEvent.submit(container.querySelector('form')!);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please select how long you want to travel.',
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('requires a start date unless dates are marked flexible', async () => {
    const user = userEvent.setup();
    const { container } = renderForm();

    await user.selectOptions(screen.getByLabelText(/trip length/i), '3 days');
    await fillTravelerDetails(user);
    fireEvent.submit(container.querySelector('form')!);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please choose when you want to travel, or mark your dates as flexible.',
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('requires a hoped-for month when dates are flexible', async () => {
    const user = userEvent.setup();
    const { container } = renderForm();

    await user.click(screen.getByLabelText(/my travel dates are flexible/i));
    expect(
      await screen.findByLabelText(/which month are you hoping to travel/i),
    ).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/trip length/i), '6–7 days');
    await fillTravelerDetails(user);
    fireEvent.submit(container.querySelector('form')!);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please choose the month you are hoping to travel.',
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits a valid inquiry with an empty honeypot and shows the success state', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    renderForm();

    await user.click(screen.getByLabelText('Karimabad'));
    await user.selectOptions(screen.getByLabelText(/trip length/i), '6–7 days');
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2026-09-12' },
    });
    await fillTravelerDetails(user);
    await user.type(
      screen.getByLabelText(/anything else/i),
      'Traveling with kids.',
    );
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.any(String),
    });

    const payload = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body as string,
    );
    expect(payload).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      destination: 'Hunza Valley',
      places: 'Karimabad',
      travelFrom: '2026-09-12',
      travelTo: '',
      datesFlexible: 'no',
      travelMonth: '',
      duration: '6–7 days',
      groupSize: '2',
      message: 'Traveling with kids.',
      website: '',
    });

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we.ll reply within 24 hours with a route and quote/i),
    ).toBeInTheDocument();
  });

  it('still posts the honeypot value when a bot fills the hidden website field', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    const { container } = renderForm();
    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="website"]',
    )!;
    fireEvent.change(honeypot, { target: { value: 'https://spam.example' } });

    await user.selectOptions(screen.getByLabelText(/trip length/i), '3 days');
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2026-10-01' },
    });
    await fillTravelerDetails(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const payload = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body as string,
    );
    expect(payload.website).toBe('https://spam.example');
  });

  it('shows a server error when the contact API rejects the request', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Please provide a valid email address.' }),
    });

    renderForm();
    await user.selectOptions(screen.getByLabelText(/trip length/i), '3 days');
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2026-09-01' },
    });
    await fillTravelerDetails(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Please provide a valid email address.',
    );
    expect(screen.getByRole('button', { name: /send inquiry/i })).toBeEnabled();
  });

  it('resets selected places when the region changes', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByLabelText('Karimabad'));
    expect(screen.getByLabelText('Karimabad')).toBeChecked();

    await user.selectOptions(
      screen.getByLabelText(/main region or valley/i),
      'skardu',
    );

    expect(screen.queryByLabelText('Karimabad')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Shangrila')).not.toBeChecked();
    expect(screen.getByLabelText('Deosai Plains')).not.toBeChecked();
  });

  it('hides place checkboxes when the traveler asks for suggestions', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(
      screen.getByLabelText(/not sure yet — help me choose places/i),
    );

    expect(screen.queryByLabelText('Karimabad')).not.toBeInTheDocument();
  });
});

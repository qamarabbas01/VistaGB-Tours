import { expect, test } from '@playwright/test';

test.describe('core visitor flows', () => {
  test('loads the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VistaGB/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /discover\s*gilgit-baltistan/i,
    );
    await expect(
      page.getByText(
        /explore destinations, plan your journey, discover hidden places, and experience the mountains/i,
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Explore Destinations' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Plan Your Trip' }),
    ).toBeVisible();
  });

  test('opens a destination from the destinations index', async ({ page }) => {
    await page.goto('/destinations');
    await expect(
      page.getByRole('heading', { name: 'Destinations' }),
    ).toBeVisible();

    await page
      .getByRole('link', { name: /hunza valley/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/destinations\/hunza-valley/);
    await expect(
      page.getByRole('heading', { name: 'Hunza Valley', level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /all destinations/i }),
    ).toBeVisible();
  });

  test('submits the contact form against a mocked API', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      expect(route.request().method()).toBe('POST');
      const payload = route.request().postDataJSON() as {
        name: string;
        email: string;
        website: string;
        duration: string;
      };
      expect(payload.name).toBe('Ada Lovelace');
      expect(payload.email).toBe('ada@example.com');
      expect(payload.website).toBe('');
      expect(payload.duration).toBe('6–7 days');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/contact');
    await expect(
      page.getByRole('heading', { name: /plan your trip/i }),
    ).toBeVisible();

    await page.getByLabel(/trip length/i).selectOption('6–7 days');
    await page.getByLabel(/start date/i).fill('2026-09-12');
    await page.getByLabel(/number of travelers/i).fill('2');
    await page.getByLabel(/full name/i).fill('Ada Lovelace');
    await page.getByLabel(/^email$/i).fill('ada@example.com');
    await page.getByRole('button', { name: /send inquiry/i }).click();

    await expect(page.getByText(/message sent/i)).toBeVisible();
    await expect(
      page.getByText(/we.ll reply within 24 hours with a route and quote/i),
    ).toBeVisible();
  });
});

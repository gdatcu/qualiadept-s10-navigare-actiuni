import { test, expect } from '@playwright/test';

test.describe('Opțiunile lui goto()', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
  });

  test('serverul răspunde cu 200 și trimite un document HTML', async ({ page }) => {
    const raspuns = await page.goto('/');
    expect(raspuns?.status()).toBe(200);
    expect(raspuns?.headers()['content-type']).toContain('text/html');
  });

  test('navigare la domcontentloaded, urmată de o asertare web-first', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Nu așteptăm „rețeaua liniștită”: așteptăm exact starea de care avem nevoie
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });
});

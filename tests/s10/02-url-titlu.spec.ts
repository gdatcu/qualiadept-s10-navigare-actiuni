import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
});

test('pagina principală are titlul și antetul corecte', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Task Tracker/);
  await expect(page.locator('#logo')).toHaveText('QA Task Tracker');
  await expect(page.locator('#network-status')).toHaveText('API Online');
});

test('un link de campanie își păstrează parametrul', async ({ page }) => {
  await page.goto('/?utm_source=newsletter');
  await expect(page).toHaveURL(/utm_source=newsletter/);
  await expect(page).toHaveTitle('QA Task Tracker Pro');
});

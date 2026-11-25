import { test, expect } from '@playwright/test';

test('pagina deschisă dintr-un link de test se încarcă complet', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/?sursa=test');
  await expect(page).toHaveURL(/\?sursa=test$/);
  await expect(page).toHaveTitle('QA Task Tracker Pro');
  await expect(page.locator('#logo')).toHaveText('QA Task Tracker');
  await expect(page.getByTestId('loading-spinner')).toBeHidden();
});

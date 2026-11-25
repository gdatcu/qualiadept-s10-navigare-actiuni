import { test, expect } from '@playwright/test';

test('mă opresc exact înainte de ștergere', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  await page.getByTestId('checkbox-task-1').check();

  await page.pause();   // DOAR LOCAL: aici te uiți la pagină, cu Pick locator

  await page.getByTestId('delete-btn-1').click();
  await expect(page.getByTestId('delete-btn-1')).not.toBeAttached();
});

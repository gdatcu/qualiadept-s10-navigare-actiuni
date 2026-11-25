import { test, expect } from '@playwright/test';

test('trei task-uri salvate cu Enter apar în ordine', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const randuri = page.getByTestId('task-list').locator('.task-item');
  await expect(randuri).toHaveCount(5);

  const nume = ['Unu', 'Doi', 'Trei'];
  const input = page.getByTestId('input-task-name');
  for (const n of nume) {
    await input.fill(n);
    await input.press('Enter');
    await expect(page.getByTestId('task-list')).toContainText(n);
  }

  await expect(randuri).toHaveCount(8);
  await expect(randuri.nth(5)).toContainText('Unu');
  await expect(randuri.nth(6)).toContainText('Doi');
  await expect(randuri.nth(7)).toContainText('Trei');
});

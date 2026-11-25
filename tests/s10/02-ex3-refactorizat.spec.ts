import { test, expect } from '@playwright/test';

test('pagina principală rămâne corectă după reîncărcare', async ({ page, baseURL }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  const randuri = page.getByTestId('task-list').locator('.task-item');

  await page.goto('/');
  await expect(page).toHaveURL(`${baseURL}/`);
  await expect(randuri).toHaveCount(5);

  await page.reload();
  await expect(page).toHaveTitle('QA Task Tracker Pro');
  await expect(randuri).toHaveCount(5);
});

import { test, expect } from '@playwright/test';

test('task-ul trimis din formular apare în listă', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);

  await page.getByTestId('input-task-name').fill('Task PR');
  await page.getByTestId('submit-task-btn').click();

  await expect(page.getByTestId('task-list')).toContainText('Task PR');
  await expect(page.getByTestId('input-task-name')).toHaveValue('');
});

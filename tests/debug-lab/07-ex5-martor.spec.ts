import { test, expect } from '@playwright/test';

test('task-ul urgent apare cu eticheta corectă', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  await page.getByTestId('input-task-name').fill('Martorul Inspector');
  await page.getByTestId('select-task-priority').selectOption('high');
  await page.getByTestId('submit-task-btn').click();
  const ultimul = page.getByTestId('task-list').locator('.task-item').last();
  await expect(ultimul.locator('.priority-badge')).toHaveText('Mare');
  await page.getByTestId('checkbox-task-6').check();
});

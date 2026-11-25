import { test, expect } from '@playwright/test';

test('fluxul de salvare reușește fără force și fără hard wait', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);

  await page.getByTestId('input-task-name').fill('Fără scurtături');
  await page.getByTestId('submit-task-btn').click();   // așteaptă singur să fie activ

  await expect(page.getByTestId('task-list')).toContainText('Fără scurtături');
});

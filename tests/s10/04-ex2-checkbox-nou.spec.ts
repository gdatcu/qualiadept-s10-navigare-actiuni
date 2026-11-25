import { test, expect } from '@playwright/test';

test('checkbox-ul unui task nou funcționează ca la cele inițiale', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const randuri = page.getByTestId('task-list').locator('.task-item');
  await expect(randuri).toHaveCount(5);

  await page.getByTestId('input-task-name').fill('Bifez ce am adăugat');
  await page.getByTestId('submit-task-btn').click();

  const randNou = randuri.last();
  await expect(randNou).toContainText('Bifez ce am adăugat');
  await randNou.locator('.task-check').check();
  await expect(randNou.locator('.task-check')).toBeChecked();
  await expect(randNou.locator('.task-title')).toHaveClass(/completed/);
});

import { test, expect } from '@playwright/test';

test('după ștergerea task-ului 2, rândurile se reordonează', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const randuri = page.getByTestId('task-list').locator('.task-item');
  await expect(randuri).toHaveCount(5);

  await page.getByTestId('delete-btn-2').click();

  await expect(page.getByTestId('delete-btn-2')).not.toBeAttached();
  await expect(randuri).toHaveCount(4);
  await expect(randuri.nth(1)).toContainText('fugiat veniam minus');
});

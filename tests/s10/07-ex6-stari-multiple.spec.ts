import { test, expect } from '@playwright/test';

test('starea fiecărui task urmează setul de date', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);

  const stari = [true, false, true, false, true];
  for (const [i, finalizat] of stari.entries()) {
    await page.getByTestId(`checkbox-task-${i + 1}`).setChecked(finalizat);
  }

  await expect(page.locator('.task-title')).toHaveClass(
    stari.map((finalizat) => (finalizat ? /completed/ : /^task-title$/)),
  );
  await expect(page.locator('.task-title.completed')).toHaveCount(3);
});

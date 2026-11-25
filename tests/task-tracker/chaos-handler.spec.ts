import { test, expect } from '@playwright/test';
import { inchidePromoAutomat } from '../helpers/chaos';

test.describe('Task Tracker – pop-up-ul Chaos', () => {
  for (const moment of [2_000, 4_000, 6_000]) {
    test(`fluxul reușește și când timpul avansează ${moment} ms`, async ({ page }) => {
      await page.clock.install();
      await inchidePromoAutomat(page);
      await page.goto('/');
      await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);

      await page.clock.fastForward(moment);
      await page.getByTestId('input-task-name').fill(`Rezist la ${moment} ms`);
      await page.getByTestId('select-task-priority').selectOption('high');
      await page.getByTestId('submit-task-btn').click();
      await expect(page.getByTestId('task-list')).toContainText(`Rezist la ${moment} ms`);
    });
  }

  test('fără handler, fill și selectOption merg, dar click-ul este blocat', async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
    await page.clock.fastForward(6_000);
    await expect(page.getByTestId('promo-overlay')).toBeVisible();

    await page.getByTestId('input-task-name').fill('Sub overlay');          // nu verifică „primește evenimente”
    await page.getByTestId('select-task-priority').selectOption('low');     // nici selectOption
    await expect(page.getByTestId('submit-task-btn').click({ timeout: 2_000 })).rejects.toThrow();

    await page.getByTestId('close-promo-btn').click();
    await page.getByTestId('submit-task-btn').click();
    await expect(page.getByTestId('task-list')).toContainText('Sub overlay');
  });
});

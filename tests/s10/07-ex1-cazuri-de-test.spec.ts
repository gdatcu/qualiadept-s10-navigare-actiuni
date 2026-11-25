import { test, expect } from '@playwright/test';

test.describe('Cazurile de test TC-101…TC-103', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('TC-101: prioritatea Scăzută apare pe rândul nou', async ({ page }) => {
    const select = page.getByTestId('select-task-priority');
    await page.getByTestId('input-task-name').fill('Citesc documentația');
    await select.selectOption({ label: 'Scăzută' });
    await page.getByTestId('submit-task-btn').click();

    const ultimul = page.getByTestId('task-list').locator('.task-item').last();
    await expect(ultimul.locator('.priority-badge')).toHaveText('Scăzută');
    await expect(select).toHaveValue('medium');
  });

  test('TC-102: bifarea finalizează doar task-ul ales', async ({ page }) => {
    await page.getByTestId('checkbox-task-2').check();
    await expect(page.locator('.task-title').nth(1)).toHaveCSS('text-decoration-line', 'line-through');
    await expect(page.locator('.task-title.completed')).toHaveCount(1);
  });

  test('TC-103: câmpul golit nu permite salvarea', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Ceva');
    await input.clear();
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('submit-task-btn')).toBeDisabled();
  });
});

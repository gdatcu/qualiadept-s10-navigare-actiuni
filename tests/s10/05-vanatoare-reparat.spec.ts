import { test, expect } from '@playwright/test';

test('utilizatorul salvează un task cu prioritate scăzută', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  await page.getByTestId('input-task-name').fill('Găsește bug-urile');
  await page.getByTestId('select-task-priority').selectOption({ label: 'Scăzută' });
  await page.getByTestId('submit-task-btn').click();

  const ultimul = page.getByTestId('task-list').locator('.task-item').last();
  await expect(ultimul).toContainText('Găsește bug-urile');
  await expect(ultimul).toHaveAttribute('data-priority', 'low');
});

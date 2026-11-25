import { test, expect } from '@playwright/test';

test('un task urgent, parcurs pas cu pas în Inspector', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');                                                   // pasul 1
  await page.getByTestId('input-task-name').fill('Depanat în Inspector'); // pasul 2
  await page.getByTestId('select-task-priority').selectOption('high');    // pasul 3
  await page.getByTestId('submit-task-btn').click();                      // pasul 4
  const ultimul = page.getByTestId('task-list').locator('.task-item').last();
  await expect(ultimul).toContainText('Depanat în Inspector');             // pasul 5
  await ultimul.locator('.task-check').check();                           // pasul 6
  await expect(ultimul.locator('.task-title')).toHaveClass(/completed/);  // pasul 7
});

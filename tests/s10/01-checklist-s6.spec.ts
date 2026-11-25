import { test, expect } from '@playwright/test';

test.describe('Checklist S6 automatizat', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('testul 1: spinner-ul dispare și apar 5 task-uri', async ({ page }) => {
    await expect(page.getByTestId('loading-spinner')).toBeHidden();
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('testul 2: câmpul golit blochează butonul și afișează eroarea', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Scriu ceva');
    await input.fill('');
    await expect(page.getByTestId('submit-task-btn')).toBeDisabled();
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toHaveText('Numele task-ului nu poate fi gol!');
  });
});

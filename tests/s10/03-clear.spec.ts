import { test, expect } from '@playwright/test';

test.describe('Golirea câmpului', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('clear() afișează eroarea și blochează salvarea', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Text temporar');
    await expect(page.getByTestId('submit-task-btn')).toBeEnabled();

    await input.clear();

    await expect(input).toBeEmpty();
    await expect(page.getByTestId('error-message')).toHaveText('Numele task-ului nu poate fi gol!');
    await expect(page.getByTestId('submit-task-btn')).toBeDisabled();
  });

  test('spațiile din jurul numelui sunt eliminate la salvare', async ({ page }) => {
    const randuri = page.getByTestId('task-list').locator('.task-item');
    await expect(randuri).toHaveCount(5);

    await page.getByTestId('input-task-name').fill('   Task cu spații   ');
    await page.getByTestId('submit-task-btn').click();

    const titlu = randuri.last().locator('.task-title');
    await expect(titlu).toHaveJSProperty('textContent', 'Task cu spații');
  });
});

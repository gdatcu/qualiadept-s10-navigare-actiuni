import { test, expect } from '@playwright/test';

test.describe('fill și pressSequentially', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('fill scrie tot textul și activează butonul', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Scris cu fill');
    await expect(input).toHaveValue('Scris cu fill');
    await expect(page.getByTestId('submit-task-btn')).toBeEnabled();
  });

  test('pressSequentially tastează literă cu literă', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.pressSequentially('Abc', { delay: 100 });   // 100 ms între taste
    await expect(input).toHaveValue('Abc');
    await expect(page.getByTestId('submit-task-btn')).toBeEnabled();
  });

  test('un al doilea fill înlocuiește textul', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Prima variantă');
    await input.fill('A doua variantă');
    await expect(input).toHaveValue('A doua variantă');
  });

  test('ștergerea literă cu literă afișează eroarea', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.pressSequentially('Test');
    for (let i = 0; i < 4; i++) {
      await input.press('Backspace');
    }
    await expect(input).toHaveValue('');
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('submit-task-btn')).toBeDisabled();
  });
});

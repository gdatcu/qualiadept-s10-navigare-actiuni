import { test, expect } from '@playwright/test';

test.describe('Tastatura în formular', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('Enter în câmp salvează task-ul', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Salvat cu Enter');
    await input.press('Enter');
    await expect(page.getByTestId('task-list')).toContainText('Salvat cu Enter');
  });

  test('ControlOrMeta+A și Delete golesc câmpul', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Text de șters');
    await input.press('ControlOrMeta+a');
    await input.press('Delete');
    await expect(input).toBeEmpty();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

  test('Tab mută focusul de la câmp la selectul de prioritate', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Pe WebKit, ordinea Tab pentru controale diferă');
    await page.getByTestId('input-task-name').focus();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('select-task-priority')).toBeFocused();
  });

  test('un task poate fi salvat doar de la tastatură', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Pe WebKit, ordinea Tab pentru controale diferă');
    await page.getByTestId('input-task-name').focus();
    await page.keyboard.type('Doar tastatura');
    await page.keyboard.press('Tab');                 // select-task-priority
    await page.keyboard.press('Tab');                 // submit-task-btn
    await expect(page.getByTestId('submit-task-btn')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('task-list')).toContainText('Doar tastatura');
  });
});

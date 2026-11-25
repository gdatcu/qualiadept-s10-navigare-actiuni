import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://demo.playwright.dev/todomvc/' });

test.describe('TodoMVC – editarea unui element', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Text inițial');
    await input.press('Enter');
  });

  test('Enter salvează textul editat', async ({ page }) => {
    await page.getByTestId('todo-item').dblclick();
    const editor = page.getByTestId('todo-item').getByRole('textbox', { name: 'Edit' });
    await editor.fill('Text editat');
    await editor.press('Enter');
    await expect(page.getByTestId('todo-title')).toHaveText(['Text editat']);
  });

  test('Escape anulează editarea', async ({ page }) => {
    await page.getByTestId('todo-item').dblclick();
    const editor = page.getByTestId('todo-item').getByRole('textbox', { name: 'Edit' });
    await editor.fill('Nu trebuie salvat');
    await editor.press('Escape');
    await expect(page.getByTestId('todo-title')).toHaveText(['Text inițial']);
  });
});

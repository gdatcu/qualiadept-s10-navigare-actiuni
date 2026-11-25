import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://demo.playwright.dev/todomvc/' });

test('bifarea „Mark all as complete” finalizează toate elementele', async ({ page }) => {
  await page.goto('./');
  const input = page.getByPlaceholder('What needs to be done?');
  for (const text of ['Unu', 'Doi', 'Trei']) {
    await input.fill(text);
    await input.press('Enter');
  }

  const toate = page.getByLabel('Mark all as complete');
  await toate.check();
  await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);

  await toate.uncheck();
  await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
});

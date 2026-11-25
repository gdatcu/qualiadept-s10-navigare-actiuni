import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://demo.playwright.dev/todomvc/' });

test('aplicația TodoMVC se deschide pe adresa corectă', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/TodoMVC/);
  await expect(page).toHaveURL(/\/todomvc\//);
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
});

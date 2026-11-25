import { test, expect } from '@playwright/test';

test('aplicația publicată este Task Tracker v1.1', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('QA Task Tracker Pro');
  await expect(page.locator('body')).toHaveAttribute('data-app-version', '1.1');
  await expect(page.getByTestId('select-task-priority')).toBeVisible();
});

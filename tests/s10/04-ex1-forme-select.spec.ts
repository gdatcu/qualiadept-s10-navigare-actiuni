import { test, expect } from '@playwright/test';

test('prioritatea Ridicată poate fi aleasă în trei forme', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const select = page.getByTestId('select-task-priority');

  for (const optiune of ['Ridicată', { value: 'high' }, { index: 2 }]) {
    await select.selectOption('medium');
    await select.selectOption(optiune);
    await expect(select).toHaveValue('high');
  }
});

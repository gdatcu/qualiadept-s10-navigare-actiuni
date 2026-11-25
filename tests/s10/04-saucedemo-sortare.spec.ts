import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com', testIdAttribute: 'data-test' });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('sortarea după preț crescător pune primul cel mai ieftin produs', async ({ page }) => {
  const sortare = page.getByTestId('product-sort-container');
  await sortare.selectOption('lohi');
  await expect(sortare).toHaveValue('lohi');
  await expect(page.getByTestId('inventory-item-price').first()).toHaveText('$7.99');
});

test('sortarea după nume Z–A, aleasă după etichetă', async ({ page }) => {
  await page.getByTestId('product-sort-container').selectOption({ label: 'Name (Z to A)' });
  await expect(page.getByTestId('inventory-item-name').first())
    .toHaveText('Test.allTheThings() T-Shirt (Red)');
});

test('sortarea după preț descrescător pune primul cel mai scump produs', async ({ page }) => {
  const sortare = page.getByTestId('product-sort-container');
  await sortare.selectOption({ label: 'Price (high to low)' });
  await expect(sortare).toHaveValue('hilo');
  await expect(page.getByTestId('inventory-item-price').first()).toHaveText('$49.99');
});

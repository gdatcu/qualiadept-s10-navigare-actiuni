import { test, expect, type Page } from '@playwright/test';

// SauceDemo folosește atributul data-test (vezi testIdAttribute în config)
const login = async (page: Page, utilizator: string): Promise<void> => {
  await page.goto('/');
  await page.getByTestId('username').fill(utilizator);
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('password').press('Enter');
};

test.describe('SauceDemo – autentificare', () => {
  test('login cu Enter duce la lista de produse', async ({ page }) => {
    await login(page, 'standard_user');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('utilizatorul blocat primește un mesaj de eroare', async ({ page }) => {
    await login(page, 'locked_out_user');
    await expect(page.getByTestId('error')).toContainText('locked out');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});

test.describe('SauceDemo – produse și coș', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('sortarea după preț crescător', async ({ page }) => {
    await page.getByTestId('product-sort-container').selectOption('lohi');
    await expect(page.getByTestId('inventory-item-price').first()).toHaveText('$7.99');
  });

  test('adăugarea și eliminarea din coș actualizează insigna', async ({ page }) => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('remove-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).not.toBeAttached();
  });

  test('din coș, butonul Înapoi revine la produse', async ({ page }) => {
    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await page.goBack();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});

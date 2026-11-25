import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com', testIdAttribute: 'data-test' });

test('utilizatorul cumpără rucsacul de la început până la final', async ({ page }) => {
  await test.step('Login', async () => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('password').press('Enter');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('Adaug produsul și deschid coșul', async () => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart\.html/);
  });

  await test.step('Completez datele de livrare', async () => {
    await page.getByTestId('checkout').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await page.getByTestId('firstName').fill('Ana');
    await page.getByTestId('lastName').fill('Popescu');
    await page.getByTestId('postalCode').fill('010101');
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  await test.step('Finalizez comanda', async () => {
    await page.getByTestId('finish').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  });
});

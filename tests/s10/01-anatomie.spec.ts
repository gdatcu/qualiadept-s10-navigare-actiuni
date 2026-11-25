import { test, expect } from '@playwright/test';

test('utilizatorul adaugă un task și îl vede la finalul listei', async ({ page }) => {
  // ARRANGE – pop-up-ul Chaos (S6) apare oricând între 2 și 6 s: îl închidem automat
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const randuri = page.getByTestId('task-list').locator('.task-item');
  await expect(randuri).toHaveCount(5);              // datele inițiale au sosit

  // ACT
  await page.getByTestId('input-task-name').fill('Primul test scris de mână');
  await page.getByTestId('submit-task-btn').click();

  // ASSERT
  await expect(randuri).toHaveCount(6);
  await expect(randuri.last()).toContainText('Primul test scris de mână');
});

test('butonul Salvează pornește dezactivat și se activează la prima literă', async ({ page }) => {
  // ARRANGE
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const salveaza = page.getByTestId('submit-task-btn');
  await expect(salveaza).toBeDisabled();

  // ACT
  await page.getByTestId('input-task-name').fill('A');

  // ASSERT
  await expect(salveaza).toBeEnabled();
  await expect(page.getByTestId('error-message')).toBeHidden();
});

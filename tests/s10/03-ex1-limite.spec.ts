import { test, expect } from '@playwright/test';

const cazuri = [
  { valoare: '', activ: false },
  { valoare: ' ', activ: false },
  { valoare: 'a', activ: true },
  { valoare: '  a  ', activ: true },
];

test.describe('Validarea numelui la limită', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  for (const { valoare, activ } of cazuri) {
    test(`valoarea „${valoare}” face butonul ${activ ? 'activ' : 'inactiv'}`, async ({ page }) => {
      await page.getByTestId('input-task-name').fill('x');      // pornim de la o stare cu text
      await page.getByTestId('input-task-name').fill(valoare);
      const salveaza = page.getByTestId('submit-task-btn');
      if (activ) {
        await expect(salveaza).toBeEnabled();
      } else {
        await expect(salveaza).toBeDisabled();
      }
    });
  }
});

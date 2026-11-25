import { test, expect } from '@playwright/test';

test.describe('Actionability pe butonul Salvează', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('click-ul pe butonul dezactivat așteaptă și apoi expiră', async ({ page }) => {
    const salveaza = page.getByTestId('submit-task-btn');
    await expect(salveaza).toBeDisabled();
    // Demonstrație: timeout scurt doar pentru acest click
    await expect(salveaza.click({ timeout: 2_000 })).rejects.toThrow(/Timeout 2000ms exceeded/);
  });

  test('același click reușește imediat ce butonul devine activ', async ({ page }) => {
    await page.getByTestId('input-task-name').fill('Butonul s-a activat');
    await page.getByTestId('submit-task-btn').click();
    await expect(page.getByTestId('task-list')).toContainText('Butonul s-a activat');
  });

  test('butonul activ trece verificările fără să trimită formularul', async ({ page }) => {
    const randuri = page.getByTestId('task-list').locator('.task-item');
    await expect(randuri).toHaveCount(5);

    await page.getByTestId('input-task-name').fill('Doar verific');
    await page.getByTestId('submit-task-btn').click({ trial: true });

    await expect(randuri).toHaveCount(5);
    await expect(page.getByTestId('input-task-name')).toHaveValue('Doar verific');
  });
});

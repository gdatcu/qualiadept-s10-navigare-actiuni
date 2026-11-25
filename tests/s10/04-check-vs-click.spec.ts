import { test, expect } from '@playwright/test';

test.describe('check() vs. click() pe checkbox', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('check() de două ori lasă task-ul bifat', async ({ page }) => {
    const bifa = page.getByTestId('checkbox-task-1');
    await bifa.check();
    await bifa.check();          // deja bifat: nu face nimic
    await expect(bifa).toBeChecked();
  });

  test('click() de două ori îl debifează', async ({ page }) => {
    const bifa = page.getByTestId('checkbox-task-1');
    await bifa.click();
    await bifa.click();          // a doua comutare
    await expect(bifa).not.toBeChecked();
  });

  test('cu click(): starea se inversează și testul pică', async ({ page }) => {
    test.fail();   // demonstrație: comportament așteptat al testului greșit
    await page.locator('.task-title', { hasText: 'et porro tempora' }).click();   // Arrange
    await page.getByTestId('checkbox-task-4').click();
    await expect(page.getByTestId('checkbox-task-4')).toBeChecked();
  });

  test('cu check(): intenția este respectată', async ({ page }) => {
    await page.locator('.task-title', { hasText: 'et porro tempora' }).click();   // Arrange
    await page.getByTestId('checkbox-task-4').check();
    await expect(page.getByTestId('checkbox-task-4')).toBeChecked();
  });
});

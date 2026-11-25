import { test, expect } from '@playwright/test';

test.describe('Checkbox-ul de finalizare (v1.1)', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('check() bifează task-ul și îl marchează ca finalizat', async ({ page }) => {
    const bifa = page.getByTestId('checkbox-task-1');
    const titlu = page.locator('.task-title', { hasText: 'delectus aut autem' });
    await expect(bifa).not.toBeChecked();

    await bifa.check();

    await expect(bifa).toBeChecked();
    await expect(titlu).toHaveClass(/completed/);
  });

  test('uncheck() anulează finalizarea', async ({ page }) => {
    const bifa = page.getByTestId('checkbox-task-1');
    await bifa.check();
    await bifa.uncheck();
    await expect(bifa).not.toBeChecked();
    await expect(page.locator('.task-title').first()).not.toHaveClass(/completed/);
  });

  test('setChecked() primește starea dorită ca parametru', async ({ page }) => {
    const bifa = page.getByTestId('checkbox-task-2');
    for (const stare of [true, false, true]) {
      await bifa.setChecked(stare);
      await expect(bifa).toBeChecked({ checked: stare });
    }
  });

  test('click-ul pe titlu sincronizează checkbox-ul', async ({ page }) => {
    const titlu = page.locator('.task-title', { hasText: 'fugiat veniam minus' });
    const bifa = page.getByTestId('checkbox-task-3');

    await titlu.click();
    await expect(titlu).toHaveClass(/completed/);
    await expect(bifa).toBeChecked();

    await titlu.click();
    await expect(titlu).not.toHaveClass(/completed/);
    await expect(bifa).not.toBeChecked();
  });
});

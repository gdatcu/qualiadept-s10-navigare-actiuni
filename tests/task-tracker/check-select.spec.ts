import { test, expect } from '@playwright/test';
import { inchidePromoAutomat } from '../helpers/chaos';

test.describe('Task Tracker – checkbox și select', () => {
  test.beforeEach(async ({ page }) => {
    await inchidePromoAutomat(page);
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('setChecked aplică o configurație întreagă', async ({ page }) => {
    const stari = [false, true, true, false, true];
    for (const [i, stare] of stari.entries()) {
      await page.getByTestId(`checkbox-task-${i + 1}`).setChecked(stare);
    }
    for (const [i, stare] of stari.entries()) {
      await expect(page.getByTestId(`checkbox-task-${i + 1}`)).toBeChecked({ checked: stare });
    }
    await expect(page.locator('.task-title.completed')).toHaveCount(3);
  });

  test('check() este idempotent, click() comută', async ({ page }) => {
    const bifa = page.getByTestId('checkbox-task-4');
    await bifa.check();
    await bifa.check();
    await expect(bifa).toBeChecked();
    await bifa.click();
    await expect(bifa).not.toBeChecked();
  });

  test('selectOption acceptă toate formele', async ({ page }) => {
    const select = page.getByTestId('select-task-priority');
    const forme = [
      { optiune: 'low', asteptat: 'low' },
      { optiune: 'Ridicată', asteptat: 'high' },
      { optiune: { value: 'medium' }, asteptat: 'medium' },
      { optiune: { label: 'Scăzută' }, asteptat: 'low' },
      { optiune: { index: 2 }, asteptat: 'high' },
    ];
    for (const { optiune, asteptat } of forme) {
      await select.selectOption(optiune);
      await expect(select).toHaveValue(asteptat);
    }
  });

  test('selectOption întoarce valoarea selectată', async ({ page }) => {
    const valori = await page.getByTestId('select-task-priority').selectOption({ label: 'Medie' });
    expect(valori).toEqual(['medium']);
  });
});

import { test, expect } from '@playwright/test';

test.describe('Selectul de prioritate (v1.1)', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('prioritatea implicită este Medie', async ({ page }) => {
    const select = page.getByTestId('select-task-priority');
    await expect(select).toHaveValue('medium');
    await expect(select.locator('option:checked')).toHaveText('Medie');
  });

  test('selectOption acceptă valoare, etichetă sau index', async ({ page }) => {
    const select = page.getByTestId('select-task-priority');
    await select.selectOption('high');
    await expect(select).toHaveValue('high');
    await select.selectOption({ label: 'Scăzută' });
    await expect(select).toHaveValue('low');
    await select.selectOption({ index: 1 });
    await expect(select).toHaveValue('medium');
  });

  test('task-ul nou primește prioritatea aleasă', async ({ page }) => {
    const select = page.getByTestId('select-task-priority');
    await page.getByTestId('input-task-name').fill('Bug critic în producție');
    await select.selectOption('high');
    await page.getByTestId('submit-task-btn').click();

    const ultimul = page.getByTestId('task-list').locator('.task-item').last();
    await expect(ultimul).toContainText('Bug critic în producție');
    await expect(ultimul).toHaveAttribute('data-priority', 'high');
    await expect(ultimul.locator('.priority-badge')).toHaveText('Ridicată');
    await expect(select).toHaveValue('medium');     // formularul revine la valoarea implicită
  });

  test('fiecare prioritate este afișată corect pe rândul nou', async ({ page }) => {
    const randuri = page.getByTestId('task-list').locator('.task-item');
    const cazuri = [
      { valoare: 'low', eticheta: 'Scăzută' },
      { valoare: 'medium', eticheta: 'Medie' },
      { valoare: 'high', eticheta: 'Ridicată' },
    ];

    for (const [i, caz] of cazuri.entries()) {
      await page.getByTestId('input-task-name').fill(`Task ${caz.eticheta}`);
      await page.getByTestId('select-task-priority').selectOption(caz.valoare);
      await page.getByTestId('submit-task-btn').click();
      await expect(randuri).toHaveCount(6 + i);

      const rand = randuri.nth(5 + i);
      await expect(rand).toContainText(`Task ${caz.eticheta}`);
      await expect(rand).toHaveAttribute('data-priority', caz.valoare);
      await expect(rand.locator('.priority-badge')).toHaveText(caz.eticheta);
    }
  });
});

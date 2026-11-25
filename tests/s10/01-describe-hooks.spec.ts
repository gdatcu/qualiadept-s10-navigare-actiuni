import { test, expect } from '@playwright/test';

test.describe('Task Tracker – formularul de adăugare', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`[${testInfo.status}] ${testInfo.title} – URL final: ${page.url()}`);
  });

  test('butonul Salvează pornește dezactivat', async ({ page }) => {
    await expect(page.getByTestId('submit-task-btn')).toBeDisabled();
  });

  test('un task valid este salvat și câmpul se golește', async ({ page }) => {
    await page.getByTestId('input-task-name').fill('Organizez testele cu describe');
    await page.getByTestId('submit-task-btn').click();
    await expect(page.getByTestId('task-list')).toContainText('Organizez testele cu describe');
    await expect(page.getByTestId('input-task-name')).toHaveValue('');
  });

  test.describe('cu un task adăugat de mine', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('input-task-name').fill('Task pregătit în hook');
      await page.getByTestId('submit-task-btn').click();
      await expect(page.getByTestId('task-list')).toContainText('Task pregătit în hook');
    });

    test('task-ul apare ultimul în listă', async ({ page }) => {
      const randuri = page.getByTestId('task-list').locator('.task-item');
      await expect(randuri).toHaveCount(6);
      await expect(randuri.last()).toContainText('Task pregătit în hook');
    });

    test('task-ul poate fi marcat ca finalizat', async ({ page }) => {
      const titlu = page.locator('.task-title', { hasText: 'Task pregătit în hook' });
      await titlu.click();
      await expect(titlu).toHaveClass(/completed/);
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach('captura la eșec', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    }
  });
});

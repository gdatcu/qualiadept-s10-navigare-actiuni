import { test, expect } from '@playwright/test';

test.describe('Reîncărcarea paginii', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
  });

  test('după reload, lista revine la cele 5 task-uri de pe server', async ({ page }) => {
    const randuri = page.getByTestId('task-list').locator('.task-item');
    await expect(randuri).toHaveCount(5);

    await page.getByTestId('input-task-name').fill('Task care dispare');
    await page.getByTestId('submit-task-btn').click();
    await expect(randuri).toHaveCount(6);

    await page.reload();

    await expect(randuri).toHaveCount(5);
    await expect(page.getByTestId('task-list')).not.toContainText('Task care dispare');
  });

  test('două task-uri adăugate dispar după reload', async ({ page }) => {
    const randuri = page.getByTestId('task-list').locator('.task-item');
    await expect(randuri).toHaveCount(5);

    for (const nume of ['Primul temporar', 'Al doilea temporar']) {
      await page.getByTestId('input-task-name').fill(nume);
      await page.getByTestId('submit-task-btn').click();
      await expect(page.getByTestId('task-list')).toContainText(nume);
    }
    await expect(randuri).toHaveCount(7);

    await page.reload();

    await expect(randuri).toHaveCount(5);
    await expect(randuri.first()).toContainText('delectus aut autem');
  });
});

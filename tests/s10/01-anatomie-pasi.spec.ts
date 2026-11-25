import { test, expect } from '@playwright/test';

test('utilizatorul adaugă un task (pași în raport)', async ({ page }) => {
  const randuri = page.getByTestId('task-list').locator('.task-item');

  await test.step('Pregătesc aplicația', async () => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(randuri).toHaveCount(5);
  });

  await test.step('Adaug task-ul', async () => {
    await page.getByTestId('input-task-name').fill('Task cu pași');
    await page.getByTestId('submit-task-btn').click();
  });

  await test.step('Verific lista', async () => {
    await expect(randuri).toHaveCount(6);
    await expect(randuri.last()).toContainText('Task cu pași');
  });
});

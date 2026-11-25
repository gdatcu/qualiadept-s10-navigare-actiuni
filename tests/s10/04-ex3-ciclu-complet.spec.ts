import { test, expect } from '@playwright/test';

test('un task urgent este creat, finalizat, redeschis și șters', async ({ page }) => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
  await page.goto('/');
  const randuri = page.getByTestId('task-list').locator('.task-item');
  await expect(randuri).toHaveCount(5);

  await test.step('Creez task-ul urgent', async () => {
    await page.getByTestId('input-task-name').fill('Ciclu complet');
    await page.getByTestId('select-task-priority').selectOption('high');
    await page.getByTestId('submit-task-btn').click();
    await expect(randuri.last()).toHaveAttribute('data-priority', 'high');
  });

  const bifa = randuri.last().locator('.task-check');
  await test.step('Îl finalizez și îl redeschid', async () => {
    await bifa.check();
    await expect(bifa).toBeChecked();
    await bifa.uncheck();
    await expect(bifa).not.toBeChecked();
  });

  await test.step('Îl șterg', async () => {
    await randuri.last().getByRole('button', { name: 'Șterge' }).click();
    await expect(randuri).toHaveCount(5);
    await expect(page.getByTestId('task-list')).not.toContainText('Ciclu complet');
  });
});

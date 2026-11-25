import { test, expect } from '@playwright/test';
import { inchidePromoAutomat } from '../helpers/chaos';

test.describe('Task Tracker – CRUD v1.1', () => {
  test.beforeEach(async ({ page }) => {
    await inchidePromoAutomat(page);
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('task-ul nou trimite prioritatea către API', { tag: '@smoke' }, async ({ page }) => {
    const raspunsPromis = page.waitForResponse(
      (raspuns) => raspuns.url().includes('/todos') && raspuns.request().method() === 'POST',
    );
    await page.getByTestId('input-task-name').fill('Task cu prioritate');
    await page.getByTestId('select-task-priority').selectOption('high');
    await page.getByTestId('submit-task-btn').click();

    const raspuns = await raspunsPromis;
    expect(raspuns.status()).toBe(201);
    expect(raspuns.request().postDataJSON()).toMatchObject({
      title: 'Task cu prioritate',
      completed: false,
      priority: 'high',
    });
    const ultimul = page.getByTestId('task-list').locator('.task-item').last();
    await expect(ultimul).toHaveAttribute('data-priority', 'high');
  });

  test('checkbox-ul finalizează task-ul', async ({ page }) => {
    await page.getByTestId('checkbox-task-1').check();
    await expect(page.getByTestId('checkbox-task-1')).toBeChecked();
    await expect(page.locator('.task-title').first()).toHaveClass(/completed/);
  });

  test('ștergerea elimină rândul', async ({ page }) => {
    await page.getByTestId('delete-btn-3').click();
    await expect(page.getByTestId('delete-btn-3')).not.toBeAttached();
    await expect(page.getByTestId('task-list')).not.toContainText('fugiat veniam minus');
  });

  test('ciclul complet: creez, finalizez, șterg', async ({ page }) => {
    const randuri = page.getByTestId('task-list').locator('.task-item');
    await page.getByTestId('input-task-name').fill('Ciclu de viață');
    await page.getByTestId('submit-task-btn').click();
    await expect(randuri).toHaveCount(6);

    const randNou = randuri.last();
    await randNou.locator('.task-check').check();
    await expect(randNou.locator('.task-title')).toHaveClass(/completed/);
    await randNou.getByRole('button', { name: 'Șterge' }).click();
    await expect(randuri).toHaveCount(5);
  });

  test('un task finalizat poate fi șters', async ({ page }) => {
    await page.getByTestId('checkbox-task-2').check();
    await expect(page.locator('.task-title').nth(1)).toHaveClass(/completed/);
    await page.getByTestId('delete-btn-2').click();
    await expect(page.getByTestId('delete-btn-2')).not.toBeAttached();
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(4);
  });
});

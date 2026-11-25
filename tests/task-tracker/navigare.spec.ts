import { test, expect } from '@playwright/test';
import { inchidePromoAutomat } from '../helpers/chaos';

test.describe('Task Tracker – navigare', { tag: '@smoke' }, () => {
  test.beforeEach(async ({ page }) => {
    await inchidePromoAutomat(page);
  });

  test('pagina principală se deschide relativ la baseURL', async ({ page, baseURL }) => {
    const raspuns = await page.goto('/');
    expect(raspuns?.status()).toBe(200);
    await expect(page).toHaveURL(`${baseURL}/`);
    await expect(page).toHaveTitle('QA Task Tracker Pro');
    await expect(page.locator('body')).toHaveAttribute('data-app-version', '1.1');
  });

  test('parametrii din adresă nu schimbă conținutul', async ({ page }) => {
    await page.goto('/?utm_source=laborator');
    await expect(page).toHaveURL(/utm_source=laborator/);
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('reload-ul readuce lista de pe server', async ({ page }) => {
    await page.goto('/');
    const randuri = page.getByTestId('task-list').locator('.task-item');
    await expect(randuri).toHaveCount(5);
    await page.getByTestId('input-task-name').fill('Temporar');
    await page.getByTestId('submit-task-btn').click();
    await expect(randuri).toHaveCount(6);

    await page.reload();
    await expect(randuri).toHaveCount(5);
    await expect(randuri.first()).toContainText('delectus aut autem');
  });
});

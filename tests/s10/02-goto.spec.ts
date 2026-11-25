import { test, expect } from '@playwright/test';

test.describe('Navigarea relativă pe Task Tracker', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
  });

  test('goto("/") deschide pagina principală', async ({ page, baseURL }) => {
    await page.goto('/');
    await expect(page).toHaveURL(`${baseURL}/`);
    await expect(page).toHaveTitle('QA Task Tracker Pro');
  });

  test('parametrii din adresă sunt păstrați', async ({ page }) => {
    await page.goto('/?sursa=curs&sesiune=10');
    await expect(page).toHaveURL(/\?sursa=curs&sesiune=10$/);
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });
});

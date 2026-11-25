import { test, expect } from '@playwright/test';

test.describe('Task Tracker v1.1 – regresie S10', () => {
  test.beforeEach(async ({ page }) => {
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test.describe('navigare', () => {
    test('pagina are titlul corect și rulează versiunea 1.1', async ({ page }) => {
      await expect(page).toHaveTitle('QA Task Tracker Pro');
      await expect(page.locator('body')).toHaveAttribute('data-app-version', '1.1');
    });

    test('reload-ul readuce cele 5 task-uri de pe server', async ({ page }) => {
      await page.getByTestId('input-task-name').fill('Dispare la reload');
      await page.getByTestId('submit-task-btn').click();
      await expect(page.getByTestId('task-list')).toContainText('Dispare la reload');
      await page.reload();
      await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
    });
  });

  test.describe('formular', () => {
    test('câmpul golit afișează eroarea', async ({ page }) => {
      const input = page.getByTestId('input-task-name');
      await input.fill('x');
      await input.clear();
      await expect(page.getByTestId('error-message')).toHaveText('Numele task-ului nu poate fi gol!');
      await expect(page.getByTestId('submit-task-btn')).toBeDisabled();
    });

    test('Enter salvează task-ul cu prioritatea aleasă', async ({ page }) => {
      const select = page.getByTestId('select-task-priority');
      await page.getByTestId('input-task-name').fill('Salvat cu Enter');
      await select.selectOption('low');
      await page.getByTestId('input-task-name').press('Enter');

      const ultimul = page.getByTestId('task-list').locator('.task-item').last();
      await expect(ultimul).toContainText('Salvat cu Enter');
      await expect(ultimul).toHaveAttribute('data-priority', 'low');
      await expect(select).toHaveValue('medium');
      await expect(page.getByTestId('input-task-name')).toHaveValue('');
    });
  });

  test.describe('listă', () => {
    test('checkbox-ul finalizează și redeschide un task', async ({ page }) => {
      const bifa = page.getByTestId('checkbox-task-3');
      await bifa.check();
      await expect(page.locator('.task-title').nth(2)).toHaveClass(/completed/);
      await bifa.uncheck();
      await expect(page.locator('.task-title').nth(2)).not.toHaveClass(/completed/);
    });

    test('click-ul pe titlu bifează checkbox-ul', async ({ page }) => {
      await page.locator('.task-title').first().click();
      await expect(page.getByTestId('checkbox-task-1')).toBeChecked();
    });

    test('ștergerea elimină rândul din DOM', async ({ page }) => {
      await page.getByTestId('delete-btn-5').click();
      await expect(page.getByTestId('delete-btn-5')).not.toBeAttached();
      await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(4);
    });
  });
});

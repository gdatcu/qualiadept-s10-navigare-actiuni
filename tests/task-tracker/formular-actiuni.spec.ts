import { test, expect } from '@playwright/test';
import { inchidePromoAutomat } from '../helpers/chaos';

test.describe('Task Tracker – acțiunile din formular', () => {
  test.beforeEach(async ({ page }) => {
    await inchidePromoAutomat(page);
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });

  test('fill activează butonul, clear îl dezactivează din nou', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    const salveaza = page.getByTestId('submit-task-btn');
    await expect(salveaza).toBeDisabled();
    await input.fill('Text');
    await expect(salveaza).toBeEnabled();
    await input.clear();
    await expect(salveaza).toBeDisabled();
    await expect(page.getByTestId('error-message')).toHaveText('Numele task-ului nu poate fi gol!');
  });

  test('pressSequentially produce același rezultat ca un om care tastează', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.pressSequentially('Tastat', { delay: 50 });
    await expect(input).toHaveValue('Tastat');
    await expect(page.getByTestId('submit-task-btn')).toBeEnabled();
  });

  test('Enter salvează, iar câmpul se golește', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('Salvat din tastatură');
    await input.press('Enter');
    await expect(page.getByTestId('task-list')).toContainText('Salvat din tastatură');
    await expect(input).toHaveValue('');
  });

  test('selectarea întregului text și Delete golesc câmpul', async ({ page }) => {
    const input = page.getByTestId('input-task-name');
    await input.fill('De șters');
    await input.press('ControlOrMeta+a');
    await input.press('Delete');
    await expect(input).toBeEmpty();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

  test('click cu trial verifică butonul fără să trimită formularul', async ({ page }) => {
    await page.getByTestId('input-task-name').fill('Doar verific');
    await page.getByTestId('submit-task-btn').click({ trial: true });
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
  });
});

import { test, expect } from '@playwright/test';

test.describe('click, dblclick și hover', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();             // timpul paginii este controlat de test
    const promo = page.getByTestId('close-promo-btn');
    await page.addLocatorHandler(promo, async (buton) => {
      await buton.click();
    });
    await page.goto('/');
    await expect(page.getByTestId('task-list').locator('.task-item')).toHaveCount(5);
    await page.clock.fastForward(6_000);    // pop-up-ul Chaos apare acum, nu în mijlocul testului
    await expect(page.getByTestId('promo-overlay')).toHaveCount(0);   // handler-ul l-a închis
  });

  test('click pe titlu marchează task-ul ca finalizat', async ({ page }) => {
    const titlu = page.locator('.task-title').first();
    await titlu.click();
    await expect(titlu).toHaveClass(/completed/);
    await expect(titlu).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('dublu-click pe titlu comută starea de două ori', async ({ page }) => {
    const titlu = page.locator('.task-title').first();
    await titlu.dblclick();                 // click + click = finalizat, apoi nefinalizat
    await expect(titlu).not.toHaveClass(/completed/);
  });

  test('hover pe butonul Salvează activ schimbă culoarea', async ({ page }) => {
    const salveaza = page.getByTestId('submit-task-btn');
    await page.getByTestId('input-task-name').fill('Hover');
    await expect(salveaza).toHaveCSS('background-color', 'rgb(52, 152, 219)');   // #3498db
    await salveaza.hover();
    await expect(salveaza).toHaveCSS('background-color', 'rgb(41, 128, 185)');   // #2980b9
  });

  test('hover pe Șterge afișează roșu închis', async ({ page }) => {
    test.fail();   // Bug TT-58: la hover, butonul Șterge devine albastru
    const sterge = page.getByTestId('delete-btn-1');
    await expect(sterge).toHaveCSS('background-color', 'rgb(231, 76, 60)');      // #e74c3c
    await sterge.hover();
    await expect(sterge).toHaveCSS('background-color', 'rgb(192, 57, 43)');      // #c0392b
  });
});

import { test, expect } from '@playwright/test';

// Doar acest fișier rulează pe TodoMVC. Atenție la / de la final (vezi 2.1)
test.use({ baseURL: 'https://demo.playwright.dev/todomvc/' });

test('butoanele Înapoi și Înainte schimbă filtrul afișat', async ({ page }) => {
  await page.goto('./');
  const input = page.getByPlaceholder('What needs to be done?');
  for (const text of ['Scriu teste', 'Citesc documentația']) {
    await input.fill(text);
    await input.press('Enter');
  }
  await page.getByTestId('todo-item').first().getByRole('checkbox').check();
  const elemente = page.getByTestId('todo-item');

  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page).toHaveURL(/#\/active$/);
  await expect(elemente).toHaveCount(1);

  await page.goBack();
  await expect(page).toHaveURL(/#\/$/);
  await expect(elemente).toHaveCount(2);

  await page.goForward();
  await expect(page).toHaveURL(/#\/active$/);
  await expect(elemente).toHaveCount(1);
});

test('două pași înapoi trec prin Active și ajung la All', async ({ page }) => {
  await page.goto('./');
  const input = page.getByPlaceholder('What needs to be done?');
  for (const text of ['Scriu teste', 'Citesc documentația', 'Rulez în CI']) {
    await input.fill(text);
    await input.press('Enter');
  }
  await page.getByTestId('todo-item').first().getByRole('checkbox').check();
  const elemente = page.getByTestId('todo-item');

  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page).toHaveURL(/#\/completed$/);
  await expect(elemente).toHaveCount(1);

  await page.goBack();
  await expect(page).toHaveURL(/#\/active$/);
  await expect(elemente).toHaveCount(2);

  await page.goBack();
  await expect(page).toHaveURL(/#\/$/);
  await expect(elemente).toHaveCount(3);
});

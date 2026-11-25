import { test, expect, type Page } from '@playwright/test';

const adauga = async (page: Page, texte: string[]): Promise<void> => {
  const input = page.getByPlaceholder('What needs to be done?');
  for (const text of texte) {
    await input.fill(text);
    await input.press('Enter');
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto('./');          // baseURL: https://demo.playwright.dev/todomvc/
});

test.describe('TodoMVC – editare', () => {
  test('dublu-click, fill și Enter salvează textul nou', async ({ page }) => {
    await adauga(page, ['Text vechi']);
    await page.getByTestId('todo-item').dblclick();
    const editor = page.getByTestId('todo-item').getByRole('textbox', { name: 'Edit' });
    await editor.fill('Text nou');
    await editor.press('Enter');
    await expect(page.getByTestId('todo-title')).toHaveText(['Text nou']);
  });

  test('Escape anulează editarea', async ({ page }) => {
    await adauga(page, ['Text vechi']);
    await page.getByTestId('todo-item').dblclick();
    const editor = page.getByTestId('todo-item').getByRole('textbox', { name: 'Edit' });
    await editor.fill('Nu se salvează');
    await editor.press('Escape');
    await expect(page.getByTestId('todo-title')).toHaveText(['Text vechi']);
  });
});

test.describe('TodoMVC – finalizare', () => {
  test.beforeEach(async ({ page }) => {
    await adauga(page, ['Unu', 'Doi', 'Trei']);
  });

  test('Mark all as complete bifează și debifează tot', async ({ page }) => {
    const toate = page.getByLabel('Mark all as complete');
    await toate.check();
    await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
    await toate.uncheck();
    await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
  });

  test('Clear completed elimină doar elementele finalizate', async ({ page }) => {
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByTestId('todo-title')).toHaveText(['Unu', 'Trei']);
  });

  test('filtrele și butonul Înapoi', async ({ page }) => {
    await page.getByTestId('todo-item').first().getByRole('checkbox').check();
    await page.getByRole('link', { name: 'All' }).click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page).toHaveURL(/#\/completed$/);
    await expect(page.getByTestId('todo-title')).toHaveText(['Unu']);

    await page.goBack();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('contorul scade după bifare', async ({ page }) => {
    await expect(page.getByTestId('todo-count')).toContainText('3 items left');
    await page.getByTestId('todo-item').first().getByRole('checkbox').check();
    await expect(page.getByTestId('todo-count')).toContainText('2 items left');
  });
});

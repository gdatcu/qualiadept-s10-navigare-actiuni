import { test, expect } from '@playwright/test';

// Acest fișier conține 4 greșeli intenționate. Rulează-l cu --debug și găsește-le.
test('utilizatorul salvează un task cu prioritate scăzută', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('submit-task-btn').click();
  await page.getByTestId('input-task').fill('Găsește bug-urile');
  await page.getByTestId('select-task-priority').selectOption('Scazuta');
  await expect(page.getByTestId('task-list')).toContainText('Găsește bug-urile');
});

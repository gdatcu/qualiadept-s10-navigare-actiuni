import { test, expect } from '@playwright/test';

test('o pagină inexistentă întoarce un status de eroare', async ({ page }) => {
  const raspuns = await page.goto('/pagina-care-nu-exista.html');
  expect(raspuns?.status()).toBeGreaterThanOrEqual(400);
});

import type { Page } from '@playwright/test';

// Pop-up-ul Chaos (S6) apare la 2-6 secunde după încărcare și acoperă pagina.
// Handler-ul îl închide automat, oricând ar apărea, înaintea oricărei acțiuni sau asertări.
export const inchidePromoAutomat = async (page: Page): Promise<void> => {
  const promo = page.getByTestId('close-promo-btn');
  await page.addLocatorHandler(promo, async (buton) => {
    await buton.click();
  });
};

// Modulul 10 – Primul tău test E2E scris manual (fără Codegen!)
// Completează TODO-urile în ordine. Cerințele sunt în Capitolul 6 al materialului.
import { test, expect } from '@playwright/test';

// TODO 2: grupează toate testele într-un test.describe cu un titlu descriptiv.

// TODO 3: adaugă un test.beforeEach care:
//   - înregistrează handler-ul pentru butonul close-promo-btn;
//   - navighează relativ la pagina principală.

test('test', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // TODO 10: pauza de debug trebuie ștearsă înainte de Submit

  // TODO 4: verifică faptul că submit-task-btn pornește dezactivat.
  // TODO 5: completează input-task-name și alege prioritatea high din select-task-priority.
  // TODO 4 + 6: verifică butonul activ, salvează, apoi verifică lista și câmpul golit.
});

// TODO 7: un test pentru checkbox-task-1 (bifare și debifare, cu verificarea stării).
// TODO 8: un test pentru ștergerea task-ului 1 (delete-btn-1) și dispariția lui.
// TODO 9: minimum 3 teste, fiecare cu un titlu descriptiv (nu 'test').

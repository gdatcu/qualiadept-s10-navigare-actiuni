# QualiAdept QA Automation Bootcamp – Sesiunea 10: Navigare și acțiuni de bază

Repository-ul Sesiunii 10 (Modulul 4 – Playwright Fundamentals): primele teste E2E **scrise manual**,
acțiunile de bază (`goto`, `fill`, `clear`, `press`, `click`, `check`, `uncheck`, `selectOption`)
și depanarea cu **Playwright Inspector**.

Aplicația testată: **Task Tracker v1.1**, publicată la <https://tasktracker.qualiadept.eu>
(select de prioritate și checkbox de finalizare). Copia locală identică este în `task-tracker/`.

## Pornire rapidă

```bash
git clone https://github.com/gdatcu/qualiadept-s10-navigare-actiuni.git
cd qualiadept-s10-navigare-actiuni
npm install
npx playwright install
npm test
```

Cerințe: Node.js 22, 24 sau 26 și `@playwright/test` 1.65 (din `package.json`).

## Ce conține

| Folder / fișier | Conținut |
|---|---|
| `tests/s10/` | Exemplele și rezolvările din capitolele 1–7 ale materialului |
| `tests/task-tracker/` | Suita A – Task Tracker v1.1, pe Chromium, Firefox și WebKit |
| `tests/todomvc/` | Suita B – TodoMVC (aplicație publică de antrenament) |
| `tests/saucedemo/` | Suita C – SauceDemo (aplicație publică de antrenament) |
| `tests/debug-lab/` | Teste pentru Inspector, **cu greșeli intenționate** (rulează doar la cerere) |
| `tests/tema/` | Starter-ul temei (Modulul 10 pe certify.qualiadept.eu) |
| `scripts/check-hygiene.mjs` | Inspector Hygiene Policy: fără `page.pause()`, hard waits, `force`, URL-uri absolute |
| `task-tracker/` | Copia locală a aplicației v1.1 (`BASE_URL=http://localhost:3000`) |

## Scripturi

| Comandă | Ce face |
|---|---|
| `npm test` | Proiectele implicite (Suita A × 3 browsere, exemplele, TodoMVC, SauceDemo) |
| `npm run test:tracker` | Doar Suita A |
| `npm run test:exemple` | Doar exemplele din material |
| `npm run test:todomvc` / `npm run test:saucedemo` | Suitele publice |
| `npm run debug:lab` | Testele pentru Inspector, cu `--debug` |
| `npm run test:tema` | Starter-ul temei (după ce ai rezolvat TODO-urile) |
| `npm run check:hygiene` | Verifică regulile de cod curat în `tests/` |
| `npm run report` | Deschide raportul HTML |

Proiectele `debug-lab` și `tema` au `default: false` (Playwright 1.64+): nu rulează la `npm test`.

## Varianta locală

```bash
# PowerShell
$env:BASE_URL="http://localhost:3000"; npx playwright test --project=task-tracker-chromium
# bash
BASE_URL=http://localhost:3000 npx playwright test --project=task-tracker-chromium
```

Config-ul pornește automat `npx serve task-tracker -l 3000` când `BASE_URL` conține `localhost`.

## Atenție

TodoMVC (<https://demo.playwright.dev/todomvc/>) și SauceDemo (<https://www.saucedemo.com>) sunt
întreținute de alte echipe și se pot schimba fără anunț. Testele pe ele sunt doar pentru antrenament
și nu intră în CI-ul echipei.

Soluția temei nu este publicată aici: tema se predă pe <https://certify.qualiadept.eu>.

---
© QualiAdept – material de curs pentru cursanții bootcamp-ului.

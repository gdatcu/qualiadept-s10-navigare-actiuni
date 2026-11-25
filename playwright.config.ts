import { defineConfig, devices } from '@playwright/test';

const TASK_TRACKER_URL = process.env.BASE_URL ?? 'https://tasktracker.qualiadept.eu';
const RULARE_LOCALA = /localhost|127\.0\.0\.1/.test(TASK_TRACKER_URL);
const TASK_TRACKER = { baseURL: TASK_TRACKER_URL, testIdAttribute: 'data-testid' };

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },

  projects: [
    // Suita A – Task Tracker v1.1, pe cele trei motoare de browser
    {
      name: 'task-tracker-chromium',
      testDir: './tests/task-tracker',
      use: { ...devices['Desktop Chrome'], ...TASK_TRACKER },
    },
    {
      name: 'task-tracker-firefox',
      testDir: './tests/task-tracker',
      use: { ...devices['Desktop Firefox'], ...TASK_TRACKER },
    },
    {
      name: 'task-tracker-webkit',
      testDir: './tests/task-tracker',
      use: { ...devices['Desktop Safari'], ...TASK_TRACKER },
    },
    // Exemplele și rezolvările din capitolele 1–7, doar pe Chromium
    {
      name: 's10-exemple',
      testDir: './tests/s10',
      use: { ...devices['Desktop Chrome'], ...TASK_TRACKER },
    },
    // Suita B – TodoMVC (baseURL cu cale: atenție la / final)
    {
      name: 'todomvc',
      testDir: './tests/todomvc',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demo.playwright.dev/todomvc/' },
    },
    // Suita C – SauceDemo, care folosește atributul data-test
    {
      name: 'saucedemo',
      testDir: './tests/saucedemo',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com', testIdAttribute: 'data-test' },
    },
    // Rulează doar la cerere (default: false): teste pentru Inspector și starter-ul temei
    {
      name: 'debug-lab',
      testDir: './tests/debug-lab',
      default: false,
      use: { ...devices['Desktop Chrome'], ...TASK_TRACKER },
    },
    {
      name: 'tema',
      testDir: './tests/tema',
      default: false,
      use: { ...devices['Desktop Chrome'], ...TASK_TRACKER },
    },
  ],

  // Doar în varianta locală (BASE_URL=http://localhost:3000) pornim copia din ./task-tracker
  webServer: RULARE_LOCALA
    ? {
        command: 'npx serve task-tracker -l 3000',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
});

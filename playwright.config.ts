import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60 * 1000* 25,
  expect: { timeout: 5000 },
  // fullyParallel: true,
  retries: 0,
  reporter:  'html',
  workers: 1,
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] ,
      },
    },
  ],
});

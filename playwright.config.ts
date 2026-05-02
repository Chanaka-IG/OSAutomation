import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';


const config = defineConfig({
  globalSetup: require.resolve('./tests/masterDataScripts/Masterdata.ts'),
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  workers: 1,
  reporter: 'html',
  timeout: 15 * 10000,
  snapshotDir: './data/Screenshots',
  retries: 1,
  use: {
    baseURL: process.env.SYSTEM_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: "retain-on-failure"
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        trace: 'on',
        video: "retain-on-failure",
      },
      retries: 1,

    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        ...devices['Desktop Safari'],
        trace: 'on',
        video: "retain-on-failure"
      },
      retries: 1,
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
        trace: 'on',
        video: "retain-on-failure"
      },
      retries: 1,
    },
  ],

  expect: {
    timeout: 5000,

    toHaveScreenshot: {
      maxDiffPixels: 10,
    },

  },

});

export default config
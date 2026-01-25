import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';


const config =  defineConfig({
  globalSetup: require.resolve('./tests/masterDataScripts/Masterdata.ts'),
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 1,
  reporter: 'html',
  timeout: 30000,
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
      use: { ...devices['Desktop Chrome'] },
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
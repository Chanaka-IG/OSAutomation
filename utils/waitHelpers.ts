import { Page } from '@playwright/test';

export async function waitForNavigation(page: Page) {
  await page.waitForLoadState('networkidle');
}

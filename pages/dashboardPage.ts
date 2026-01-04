import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  async goto() { await this.page.goto('/dashboard'); }

  async getWelcomeText() { return this.page.locator('h1').textContent(); }
}

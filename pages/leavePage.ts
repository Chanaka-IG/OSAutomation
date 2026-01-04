import { Page, Locator } from '@playwright/test';

export class LeavePage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  async goto() { await this.page.goto('/leave'); }

  async applyLeave(data: { type: string; days: number }) {
    await this.page.click('text=Apply Leave');
    await this.page.selectOption('#type', data.type);
    await this.page.fill('#days', String(data.days));
    await this.page.click('text=Submit');
  }

  list(): Locator { return this.page.locator('.leave-list .item'); }
}

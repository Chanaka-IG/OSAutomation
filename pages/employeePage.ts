import { Page } from '@playwright/test';

export class EmployeePage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  async goto() { await this.page.goto('/employees'); }

  async addEmployee(data: { name: string; role: string }) {
    await this.page.click('text=Add Employee');
    await this.page.fill('#name', data.name);
    await this.page.fill('#role', data.role);
    await this.page.click('text=Save');
  }

  async viewEmployee(name: string) {
    await this.page.click(`text=${name}`);
  }
}

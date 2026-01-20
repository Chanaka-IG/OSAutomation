import { Page,Locator,expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage'

export class PimAccessPage extends BasePage {
  
private readonly pimMenu:Locator;


  constructor(page: Page) {
    super(page)
    this.pimMenu = page.getByRole('link', {name : 'PIM'})
  }

  async validateUIasAdmin() {
    expect (this.pimMenu).toBeVisible();
  }
    async validateUIasESS() {
    expect (this.pimMenu).not.toBeVisible();
  }
}

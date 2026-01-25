import { Page,Locator,expect,test } from '@playwright/test';
import { BasePage } from '../Base/BasePage'

export class PimAccessPage extends BasePage {
  
private readonly pimMenu:Locator;
private readonly log: (msg: string) => void = () => {}

  constructor(page: Page, log: any) {
    super(page)
    this.log = log;
    this.pimMenu = page.getByRole('link', {name : 'PIM'})
  }

  async validateUIasAdmin() {
    await this.pageStep ("Check the visibility of PIM module for admin", async () => {
      expect (this.pimMenu).toBeVisible();
    })
    
  }
    async validateUIasESS() {
      await this.pageStep ("Check the visibility of PIM module for ESS", async () => {
      expect (this.pimMenu).not.toBeVisible();
    })
  }
}

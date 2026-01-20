import { Page,Locator } from '@playwright/test';
import 'dotenv/config';

export class BasePage {
  private readonly page: Page;
  private readonly adminUsername: any;
  private readonly adminPassword: any;
  private readonly essUsername: any ;
  private readonly essPassword: any;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminUsername = process.env.ADMIN_USERNAME;
    this.adminPassword = process.env.ADMIN_PASSWORD;
    this.essUsername = process.env.ESS_USERNAME;
    this.essPassword = process.env.ESS_PASSWORD;
    this.userNameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.submitButton = this.page.getByRole('button', {name:' Login '})
  }


  async loginasAdmin(): Promise<void> {
    await this.userNameInput.fill(this.adminUsername);
    await this.passwordInput.fill(this.adminPassword);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }


  async loginasESS(): Promise<void> {
    await this.userNameInput.fill(this.essUsername);
    await this.passwordInput.fill(this.essPassword);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

    async loginasCustomAdmin(Username:string,Password:string): Promise<void> {
    await this.userNameInput.fill(Username);
    await this.passwordInput.fill(Password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

    async loginasCustomESS(Username:string,Password:string): Promise<void> {
    await this.userNameInput.fill(Username);
    await this.passwordInput.fill(Password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

}





import { Page, Locator, test } from '@playwright/test';
import 'dotenv/config';

export class BasePage {
  protected page: Page;
  private readonly adminUsername: any;
  private readonly adminPassword: any;
  private readonly essUsername: any;
  private readonly essPassword: any;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly successToastContent: Locator;
  private readonly successHeader: Locator;
  private readonly successToastMsg: Locator;


  constructor(page: Page) {
    this.page = page;
    this.adminUsername = process.env.ADMIN_USERNAME;
    this.adminPassword = process.env.ADMIN_PASSWORD;
    this.essUsername = process.env.ESS_USERNAME;
    this.essPassword = process.env.ESS_PASSWORD;
    this.userNameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.submitButton = this.page.getByRole('button', { name: ' Login ' })
    this.successToastContent = this.page.locator("#oxd-toaster_1")
    this.successHeader = this.page.getByText("Success", {exact:true})
    this.successToastMsg = this.page.getByText("Successfully Saved", {exact:true})


  }

  async pageStep<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return await test.step(name, fn);
  }

  async loginasAdmin(): Promise<void> {

    return await this.pageStep("Login as Admin", async () => {
      await this.userNameInput.fill(this.adminUsername);
      await this.passwordInput.fill(this.adminPassword);
      await this.submitButton.click();
      await this.page.waitForLoadState('networkidle');
    })

  }


  async loginasESS(): Promise<void> {
    return await this.pageStep('Login as System Admin', async () => {
      await this.userNameInput.fill(this.essUsername);
      await this.passwordInput.fill(this.essPassword);
      await this.submitButton.click();
      await this.page.waitForLoadState('networkidle');
    })

  }

  async loginasCustomAdmin(Username: string, Password: string): Promise<void> {
    return await this.pageStep('Login as Custom System Admin', async () => {
      await this.userNameInput.fill(Username);
      await this.passwordInput.fill(Password);
      await this.submitButton.click();
      await this.page.waitForLoadState('networkidle');
    })

  }

  async loginasCustomESS(Username: string, Password: string): Promise<void> {
    return await this.pageStep('Login as Custom ESS', async () => {
      await this.userNameInput.fill(Username);
      await this.passwordInput.fill(Password);
      await this.submitButton.click();
      await this.page.waitForLoadState('networkidle');
    })

  }

  async verifySuccessToast(): Promise<void> {
    return await this.pageStep('Login as Custom ESS', async () => {
        await this.successToastContent.waitFor({ state: 'visible'}).then (async () => {
            await test.expect(this.successHeader).toBeVisible();
            await test.expect(this.successToastMsg).toBeVisible();
        })
    })

  }

}





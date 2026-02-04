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
  private readonly successToastMsgForDelete: Locator;
  private readonly waitLoader: Locator;
  private readonly successToastMsgForUpdate: Locator;
  private readonly celenderPicker: Locator;
  private readonly monthDropDownIcon: Locator;
  private readonly yearDropDownIcon: Locator;


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
    this.successHeader = this.page.getByText("Success", { exact: true })
    this.successToastMsg = this.page.getByText("Successfully Saved", { exact: true })
    this.successToastMsgForDelete = this.page.getByText("Successfully Deleted", { exact: true })
    this.successToastMsgForUpdate = this.page.getByText("Successfully Updated", { exact: true })
    this.waitLoader = this.page.locator(".oxd-table-loader")
    this.celenderPicker = page.locator(".oxd-date-input-calendar")
    this.monthDropDownIcon = page.locator('.oxd-icon.bi-caret-down-fill.oxd-icon-button__icon').first()
    this.yearDropDownIcon = page.locator(".oxd-icon.bi-caret-down-fill.oxd-icon-button__icon").nth(1)


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
    return await this.pageStep('Login as ESS user', async () => {
      await this.userNameInput.fill(this.essUsername);
      await this.passwordInput.fill(this.essPassword);
      await this.submitButton.click();
      await this.page.waitForLoadState('networkidle');
    })

  }

  async loginasCustomAdmin(Username: string, Password: string): Promise<void> {
    return await this.pageStep('Login as Custom Admin', async () => {
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
    return await this.pageStep('Verify Success toast message', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsg).toBeVisible();
      })
    })

  }

  async verifySuccessToastForUpdate(): Promise<void> {
    return await this.pageStep('Verify Success toast message for update', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsgForUpdate).toBeVisible();
      })
    })

  }

  async verifySuccessToastforDeletion(): Promise<void> {
    return await this.pageStep('Verify Success toast message for deletion', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsgForDelete).toBeVisible();
      })
    })

  }

  async waitUntilLoaderDissapear(): Promise<void> {
    return await this.pageStep('Login as Custom ESS', async () => {
      await this.waitLoader.waitFor({ state: 'detached' });

    })

  }

  async pickDateFromDatePicker(expiryDate: string, dateField: Locator,): Promise<void> {
    return await this.pageStep("Select the date from the date picker", async () => {
      const [year, month, day] = expiryDate.split('-');
      const monthMap: Record<string, string> = {
        "01": 'January',
        "02": 'February',
        "03": 'March',
        "04": 'April',
        "05": 'May',
        "06": 'June',
        "07": 'July',
        "08": 'August',
        "09": 'September',
        "10": 'October',
        "11": 'November',
        "12": 'December',
      };
      await dateField.click();
      await this.celenderPicker.waitFor({ state: 'visible' })
      await this.monthDropDownIcon.click();
      await this.page.getByText(monthMap[month], { exact: true }).click();
      await this.yearDropDownIcon.click();
      await this.page.getByText(year, { exact: true }).click();
      await this.page.getByText(String(Number(day)), { exact: true }).click();
    })
  }

}





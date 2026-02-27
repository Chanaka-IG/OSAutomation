import { Page, Locator, test,expect } from '@playwright/test';
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
  private readonly successToastMsgForSave: Locator;
  private readonly successToastMsgForDelete: Locator;
  private readonly closeIconForToast: Locator;
  private readonly waitForTableLoader: Locator;
  private readonly waitFormLoader: Locator;
  private readonly successToastMsgForUpdate: Locator;
  private readonly celenderPicker: Locator;
  private readonly monthDropDownIcon: Locator;
  private readonly monthDropDownList: Locator;
  private readonly yearDropDownIcon: Locator;
  private readonly yearDropDownList: Locator;
  private readonly dateContent: Locator;



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
    this.successToastMsgForSave = this.page.getByText("Successfully Saved", { exact: true })
    this.successToastMsgForDelete = this.page.getByText("Successfully Deleted", { exact: true })
    this.successToastMsgForUpdate = this.page.getByText("Successfully Updated", { exact: true })
    this.waitForTableLoader = this.page.locator(".oxd-table-loader")
    this.waitFormLoader = this.page.locator(".oxd-loading-spinner")
    this.celenderPicker = page.locator(".oxd-date-input-calendar")
    this.monthDropDownIcon = page.locator('.oxd-icon.bi-caret-down-fill.oxd-icon-button__icon').first()
    this.monthDropDownList = page.locator('.oxd-calendar-selector-month ul')
    this.yearDropDownIcon = page.locator(".oxd-icon.bi-caret-down-fill.oxd-icon-button__icon").nth(1)
    this.yearDropDownList = page.locator('.oxd-calendar-selector-year ul')
    this.dateContent = page.locator(".oxd-calendar-dates-grid")
    this.closeIconForToast = page.locator(".oxd-toast-close oxd-toast-close--success")

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

  async verifySuccessToastForSave(): Promise<void> {
    return await this.pageStep('Verify Success toast message', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsgForSave).toBeVisible();
      })
    })

  }

  async verifySuccessToastAndClose(): Promise<void> {
    return await this.pageStep('Verify Success toast message', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsgForSave).toBeVisible();
        await this.closeIconForToast.click();
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

  async verifySuccessToastForUpdateAndClose(): Promise<void> {
    return await this.pageStep('Verify Success toast message for update', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsgForUpdate).toBeVisible();
        await this.closeIconForToast.click();
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

  async verifySuccessToastforDeletionAndClose(): Promise<void> {
    return await this.pageStep('Verify Success toast message for deletion', async () => {
      await this.successToastContent.waitFor({ state: 'visible' }).then(async () => {
        await test.expect(this.successHeader).toBeVisible();
        await test.expect(this.successToastMsgForDelete).toBeVisible();
        await this.closeIconForToast.click();
      })
    })

  }

  async waitUntilTableLoaderDissapear(): Promise<void> {
    return await this.pageStep('Wait untill the Table loaded dissapear', async () => {
      await this.waitForTableLoader.waitFor({ state: 'detached' });

    })

  }

  async waitUntilMultipleTableLoaderDissapear(): Promise<void> {
  return await this.pageStep('Wait until all table loaders disappear', async () => {
    const loaders = this.page.locator('.oxd-table-loader');
    await expect(loaders).toHaveCount(0);
  });
}

  async waitUntilFormLoaderDissapear(): Promise<void> {
    return await this.pageStep('Wait untill the Form loaded dissapear', async () => {
      await this.waitFormLoader.waitFor({ state: 'visible'})
      if (await this.waitFormLoader.isVisible()) {
        await this.waitFormLoader.waitFor({ state: 'detached' });

      }
    })

  }

  async pickDateFromDatePicker(inputDate: string, dateField: Locator,): Promise<void> {
    return await this.pageStep("Select the date from the date picker", async () => {
      const [year, month, day] = inputDate.split('-');
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
      await this.monthDropDownList.getByText(monthMap[month], { exact: true }).click();
      await this.yearDropDownIcon.click();
      await this.yearDropDownList.getByText(year, { exact: true }).click();
      await this.dateContent.getByText(String(Number(day)), { exact: true }).click();
    })
  }

}





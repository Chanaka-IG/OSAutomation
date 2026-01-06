import { Page,Locator } from '@playwright/test';
import { ENV } from '../../config/env';

/**
 * BasePage provides common helpers and exposes environment values.
 * Pages should extend this class so they can use `this.baseUrl` and `this.goto()`.
 */
export class BasePage {
  private readonly page: Page;
  private readonly username: string ;
  private readonly password: string;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = ENV.adminUsername;
    this.password = ENV.adminPassword;
    this.userNameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.submitButton = this.page.getByRole('button', {name:' Login '})
  }

  /**
   * Navigate to a path relative to the configured baseUrl, or to an absolute URL.
   * Examples:
   *   await this.goto(); // goes to baseUrl
   *   await this.goto('/login'); // goes to `${baseUrl}/login`
   *   await this.goto('https://example.com'); // goes to absolute URL
   */
//   async goto(path = '') {
//     let url = path;
//     await this.page.goto(url);
//   }

  getEnv(key: keyof typeof ENV) {
    return ENV[key];
  }

  /**
   * Perform login using admin credentials from ENV and navigate to login page.
   */
  async loginasAdmin(): Promise<void> {
    console.log(this.username, this.password);
    await this.userNameInput.fill(this.username);
    await this.passwordInput.fill(this.password);
    await this.submitButton.click();
    // wait for navigation/idle to ensure login completed
    await this.page.waitForLoadState('networkidle');
  }
}





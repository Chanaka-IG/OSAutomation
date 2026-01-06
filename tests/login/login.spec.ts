import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';


test("Log as SysAdmin", async ({page}) : Promise<void> => {
  const login = new LoginPage(page);
  await page.goto('/');
  await login.loginasAdmin();
  await expect(page).toHaveURL(/dashboard/);
})
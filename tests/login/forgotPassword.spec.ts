import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test('forgot password flow', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.clickForgotPassword();
  await expect(page.locator('text=Reset your password')).toBeVisible();
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe('Login tests', () => {
  test('valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('admin', 'password');
    await expect(page).toHaveURL(/dashboard/);
  });
});

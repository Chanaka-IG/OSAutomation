import { test, expect, request } from '@playwright/test';
import { EmployeeMaster } from '../../api/masterdata/EmployeeMaster'

import { EmployeePage } from '../../pages/employeePage';

test('add employee', async ({ page }) => {
  
  await page.goto('/');
  await page.fill('input[name="username"]', process.env.ADMIN_USERNAME!);
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD!);

});

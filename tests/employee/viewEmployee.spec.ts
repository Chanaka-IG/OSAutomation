import { test, expect } from '@playwright/test';
import { EmployeePage } from '../../pages/employeePage';

test('view employee details', async ({ page }) => {
  const emp = new EmployeePage(page);
  await emp.goto();
  await emp.viewEmployee('Jane Doe');
  await expect(page.locator('text=Employee Details')).toBeVisible();
});

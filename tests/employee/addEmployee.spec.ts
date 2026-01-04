import { test, expect } from '@playwright/test';
import { EmployeePage } from '../../pages/employeePage';

test('add employee', async ({ page }) => {
  const emp = new EmployeePage(page);
  await emp.goto();
  await emp.addEmployee({ name: 'Jane Doe', role: 'Engineer' });
  await expect(page.locator('text=Jane Doe')).toBeVisible();
});

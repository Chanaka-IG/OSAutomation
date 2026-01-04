import { test, expect } from '@playwright/test';
import { LeavePage } from '../../pages/leavePage';

test('apply for leave', async ({ page }) => {
  const leave = new LeavePage(page);
  await leave.goto();
  await leave.applyLeave({ type: 'Annual', days: 2 });
  await expect(page.locator('text=Request submitted')).toBeVisible();
});

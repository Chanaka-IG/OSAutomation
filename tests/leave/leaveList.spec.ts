import { test, expect } from '@playwright/test';
import { LeavePage } from '../../pages/leavePage';

test('leave list shows requests', async ({ page }) => {
  const leave = new LeavePage(page);
  await leave.goto();
  await expect(leave.list()).not.toHaveCount(0);
});

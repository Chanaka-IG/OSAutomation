import { test, expect,request,APIRequestContext } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { EmployeeUtils } from '../../api/masterdata/EmployeeMaster';

test("Login and take the token as admmin", async ({ request }) => {

  const employeeutils = new EmployeeUtils();
//  await employeeutils.loginAsAdmin(request);
   await employeeutils.getEmployees(request);
})


test.skip("Log as SysAdmin", async ({page}) : Promise<void> => {
  const login = new LoginPage(page);
  await page.goto('/');
  await login.loginasAdmin();
  await expect(page).toHaveURL(/dashboard/);
})
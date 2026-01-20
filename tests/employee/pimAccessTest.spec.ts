import { test, request } from '@playwright/test';
import { PimAccessPage } from '../../pages/PIM/PimAccessPage';
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { AddUsers } from '../../api/Admin/AddUsers'


import { PIM_DATA } from '../../data/PIM'


test.describe("PIM Validation", async () => {

  let employeeAccessPage: PimAccessPage;

  test.beforeAll(async ({ browser }) => {
    const apiContext = await request.newContext();
    const employee = new AddEmployee(apiContext);
    const users = new AddUsers(apiContext);
    await employee.loginAsAdmin();
    await employee.addEmployees(PIM_DATA.API_date.employee);
    await users.addUsers(PIM_DATA.API_date.user)
  })


  test.beforeEach(async ({ page }) => {
    employeeAccessPage = new PimAccessPage(page);
    await page.goto('/');
  })


  test('1. Validate Admin has the access to view the PIM', async () => {
    await employeeAccessPage.loginasCustomAdmin(PIM_DATA.API_date.user[0].username,PIM_DATA.API_date.user[0].password);
    await employeeAccessPage.validateUIasAdmin()

  });


  test('2. Validate ESS has no access to view the PIM', async () => {
    await employeeAccessPage.loginasCustomESS(PIM_DATA.API_date.user[1].username,PIM_DATA.API_date.user[1].password);
    await employeeAccessPage.validateUIasESS()

  });

})


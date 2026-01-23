import { test, expect } from '../../Fixtures/logger.fixtures';
import { PimAccessPage } from '../../pages/PIM/PimAccessPage';
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { AddUsers } from '../../api/Admin/AddUsers'
import { Database } from '../../utils/db';


import { PIM_DATA } from '../../data/PIM'


test.describe("PIM Validation", () => {

  let employeeAccessPage: PimAccessPage;
  let employee: AddEmployee;
  let users: AddUsers;

  test.beforeAll(async ({ request, logger }) => {
    employee = new AddEmployee(request);
    users = new AddUsers(request);
    await employee.loginAsAdmin();
    await employee.addEmployees(PIM_DATA.API_date.employee);
    await users.addUsers(PIM_DATA.API_date.user)
  })

  test.beforeEach(async ({ page, logger }) => {
    logger.log('Navigate to the system');
    employeeAccessPage = new PimAccessPage(page);
    await page.goto('/');
  })


  test('1. Validate Admin has the access to view the PIM', async ({ logger }) => {
    await test.step("Log as Admin and validate the access", async () => {
      await employeeAccessPage.loginasCustomAdmin(PIM_DATA.API_date.user[0].username, PIM_DATA.API_date.user[0].password);
      await employeeAccessPage.validateUIasAdmin()
    })


  });


  test('2. Validate ESS has no access to view the PIM', async ({ logger }) => {

    await test.step("Log as ESS and validate the access", async () => {
      await employeeAccessPage.loginasCustomESS(PIM_DATA.API_date.user[1].username, PIM_DATA.API_date.user[1].password);
      await employeeAccessPage.validateUIasESS()
    })


  });

})


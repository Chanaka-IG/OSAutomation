import { test, expect } from '../../Fixtures/logger.fixtures';
import { PimAccessPage } from '../../pages/PIM/PimAccessPage';
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { AddUsers } from '../../api/Admin/AddUsers'
import { Database } from '../../utils/db';


import { PIM_DATA } from '../../data/PIM/addNewEMployee'


test.describe("PIM Validation", () => {

  let employeeAccessPage: PimAccessPage;
  let employee: AddEmployee;
  let users: AddUsers;

  // test.beforeAll(async ({ request, logger }) => {
  //   employee = new AddEmployee(request);
  //   users = new AddUsers(request);
  //   await employee.loginAsAdmin();
  //   await employee.addEmployees(PIM_DATA.API_date.employee);
  //   await users.addUsers(PIM_DATA.API_date.user)
  // })

  test.beforeEach(async ({ page, logger }) => {
    employeeAccessPage = new PimAccessPage(page, logger.log);
    await page.goto('/');
    logger.log("-------------------Directing to the URL----------------------")
  })


  test('1. Validate Admin has the access to view the PIM', async ({ logger }) => {
      await employeeAccessPage.loginasCustomAdmin(PIM_DATA.API_DATA.User[0].username, PIM_DATA.API_DATA.User[0].password);
      await employeeAccessPage.validateUIasAdmin()

  });


  test('2. Validate ESS has no access to view the PIM', async ({ logger }) => {
      await employeeAccessPage.loginasCustomESS(PIM_DATA.API_DATA.User[1].username, PIM_DATA.API_DATA.User[1].password);
      await employeeAccessPage.validateUIasESS()
  });

})


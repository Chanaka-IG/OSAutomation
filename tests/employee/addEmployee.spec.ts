import { test, expect,request } from '../../Fixtures/logger.fixtures';
import { AddEmployeePage } from '../../pages/PIM/AddEmployeePage';
import { PIM_DATA } from '../../data/PIM';
import {AddEmployee} from '../../api/Employee/AddEmployee';
import path from 'node:path';


test.describe("Adding employees VIA UI", () => {

  let addEmployeePage: AddEmployeePage;
  let addEmployee : AddEmployee;
  const validProfilePath='../../data/Images/profilepic.jpg';
  const inValidProfilePath='../../data/Images/test_invalid.pdf';


  // test.beforeAll(async () => {
  //   const apiContext = await request.newContext();
  //   addEmployee = new AddEmployee(apiContext);
  //   await addEmployee.loginAsAdmin();
  //   await addEmployee.addEmployees(PIM_DATA.API_DATA.Employee);

  // })

  test.beforeEach(async ({ page }) => {
    addEmployeePage = new AddEmployeePage(page);
    await page.goto("/")
    await addEmployeePage.loginasAdmin();
    await addEmployeePage.navigateToPim();
  })


  test('1. Verify mandatory field validation', async ({logger }) => {

    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.validateRequireFields();

  });

  test('2. Verifiy optional Fields accept empty values', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizard(PIM_DATA.UI_DATA.Employee[0]);
    await addEmployeePage.clickonSave()
    await addEmployeePage.verifySuccessToast();
  })

  test('3. Verify Employee ID auto generation', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.validateEmployeeIDInput();
  })

  test('4. Add employee with mandatory fields only', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizard(PIM_DATA.UI_DATA.Employee[1]);
    await addEmployeePage.clickonSave()
    await addEmployeePage.verifySuccessToast();
  })

  test('5. Add employee with all fields', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizard(PIM_DATA.UI_DATA.Employee[2]);
    await addEmployeePage.clickonSave()
    await addEmployeePage.verifySuccessToast();
  })

    test('6. Add employee with a profile picture', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizardWithProfilePic(PIM_DATA.UI_DATA.Employee[3],validProfilePath);
    await addEmployeePage.clickonSave()
    await addEmployeePage.verifySuccessToast();
  })

   test('7. Add employee with login credentials', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizardWithProfilePic(PIM_DATA.UI_DATA.EmployeeWithUser[0],validProfilePath);
    await addEmployeePage.createLogin(PIM_DATA.UI_DATA.EmployeeWithUser[0]);
    await addEmployeePage.clickonSave()
    await addEmployeePage.verifySuccessToast();
  })

     test('8. Verify duplicate Employee ID validation', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizard(PIM_DATA.UI_DATA.Employee[4]);
    await addEmployeePage.validateUniqueIdError();
  })

    test.only('9. Verify duplicate Employee ID validation', async () => {
    await addEmployeePage.clickOnAddButton();
    await addEmployeePage.addEmployeeViaWizardWithProfilePic(PIM_DATA.UI_DATA.Employee[4],inValidProfilePath);
    await addEmployeePage.validateProfilePicType();
  })

})



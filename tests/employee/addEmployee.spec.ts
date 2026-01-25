import { test, expect } from '../../Fixtures/logger.fixtures';
import { AddEmployeePage } from '../../pages/PIM/AddEmployeePage';
import { PIM_DATA } from '../../data/PIM';


test.describe("Adding employees VIA UI", () => {

  let addEmployeePage: AddEmployeePage;

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
    await addEmployeePage.addEmployeeViaWizardWithProfilePic(PIM_DATA.UI_DATA.Employee[3]);
    await addEmployeePage.clickonSave()
    await addEmployeePage.verifySuccessToast();
  })

})



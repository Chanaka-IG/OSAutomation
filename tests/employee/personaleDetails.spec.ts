import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { personalData } from '../../data/PIM/personalDetails'
import { PersonalDetailsPage } from '../../pages/PIM/PersonalDetailsPage'


test.describe("Test cases for update data in Personal Details tab", () => {


    let logAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let personalDetailsPage: PersonalDetailsPage;
    const attachmentPath = '../../data/Attachments/test-upload-attacgment.pdf';

    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAdmin = new LogAsAdmin(apiContext)
        addEmployee = new AddEmployee(apiContext)
        // await logAdmin.loginAsAdmin();
        // await addEmployee.addEmployees(personalData.AddEmployee);

    })
    test.beforeEach(async ({ page, logger }) => {
        personalDetailsPage = new PersonalDetailsPage(page, logger);
        await page.goto("/")
        await personalDetailsPage.loginasAdmin();
        await personalDetailsPage.navigateToPim();
    })

    test("1. Update data in perosnal tab and save", async ({ page }) => {
        await personalDetailsPage.navigateToEMployeeProfile(personalData.AddEmployee[0])
        await personalDetailsPage.waitUntilLoaderDissapear();
        await personalDetailsPage.fillPersonalDetails(personalData.PersonalDetails[0], attachmentPath);
        await personalDetailsPage.clickOnSave();
        await personalDetailsPage.verifySuccessToastForUpdate();
    })

    test.only("2. Update data in perosnal tab and Verify", async ({ page }) => {
        await personalDetailsPage.navigateToEMployeeProfile(personalData.AddEmployee[1])
        await personalDetailsPage.waitUntilLoaderDissapear();
        await personalDetailsPage.fillPersonalDetails(personalData.PersonalDetails[1], attachmentPath);
        await personalDetailsPage.clickOnSave();
        await personalDetailsPage.verifySuccessToastForUpdate();
        const isValidated = await personalDetailsPage.validatePersonalDetails(personalData.PersonalDetails[1]);
        expect (isValidated).toBeTruthy();
    
    })
})

import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { ContactDetailsPage } from '../../pages/PIM/ContactDetailsPage';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { addEmployeeData, contactDetails } from '../../data/PIM/contactDetails';
import { AddEmployee } from '../../api/Employee/AddEmployee';

test.describe(() => {

    let contactDetailsPage: ContactDetailsPage;
    let addEmployee: AddEmployee;
    let logAsAdmin: LogAsAdmin;
    const attachmentPath = '../../data/Attachments/test-upload-attachment.pdf'

    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        addEmployee = new AddEmployee(apiContext);
        logAsAdmin = new LogAsAdmin(apiContext);
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(addEmployeeData)

    })

    test.beforeEach(async ({ page, logger }) => {
        contactDetailsPage = new ContactDetailsPage(page, logger);
        await page.goto("/");
        await contactDetailsPage.loginasAdmin()
        await contactDetailsPage.navigateToPim();

    })

    test("1. Update contact Details and save", async () => {
        await contactDetailsPage.navigateToEMployeeProfile(addEmployeeData[0]);
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.navigateToContactDetailsMenu();
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.fillContactDetails(contactDetails[0])
        await contactDetailsPage.clickOnSaveforContactDetails();
        await contactDetailsPage.verifySuccessToastForUpdate();

    })

    test("2. Update contact Details and Attachment section", async () => {
        await contactDetailsPage.navigateToEMployeeProfile(addEmployeeData[1]);
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.navigateToContactDetailsMenu();
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.fillContactDetails(contactDetails[1])
        await contactDetailsPage.clickOnSaveforContactDetails();
        await contactDetailsPage.verifySuccessToastForUpdate();
        await contactDetailsPage.fillAttachmentSection(contactDetails[1], attachmentPath)
        await contactDetailsPage.clickOnSaveforAttachmentSection();
        await contactDetailsPage.verifySuccessToastForUpdate();
        expect(await contactDetailsPage.validateAddedDetails(contactDetails[1])).toBeTruthy();
    })

    test("3. Validate lengthy valiadtion message for streets", async () => {
        await contactDetailsPage.navigateToEMployeeProfile(addEmployeeData[2]);
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.navigateToContactDetailsMenu();
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.fillContactDetails(contactDetails[2])
        await contactDetailsPage.validateLengthyErrors()

    })

    test("4. Validate character values for phone numbers", async () => {
        await contactDetailsPage.navigateToEMployeeProfile(addEmployeeData[2]);
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.navigateToContactDetailsMenu();
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.fillContactDetails(contactDetails[3])
        await contactDetailsPage.validateTpNumbers()

    })


    test("5. Validate email field", async () => {
        await contactDetailsPage.navigateToEMployeeProfile(addEmployeeData[2]);
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.navigateToContactDetailsMenu();
        await contactDetailsPage.waitUntilLoaderDissapear();
        await contactDetailsPage.fillContactDetails(contactDetails[4])
        await contactDetailsPage.validateEmailErrors()

    })


})
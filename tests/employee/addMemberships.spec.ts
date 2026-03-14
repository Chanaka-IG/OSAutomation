import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { MembershipsPage } from '../../pages/PIM/MemebershipsPage'
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { MembershipData, AddEmployeeData, MembershipDataAfterDelete,MembershipUpdateData } from '../../data/PIM/membership'



test.describe('Add Memberships', () => {

    let membershipPage: MembershipsPage;
    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;


    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(apiContext);
        addEmployee = new AddEmployee(apiContext);
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(AddEmployeeData);
    })
    test.beforeEach(async ({ page, logger }) => {
        await page.goto("/");
        membershipPage = new MembershipsPage(page, logger);
        await membershipPage.loginasAdmin();
        await membershipPage.navigateToPim();
    })

    test('1. Fill membership details', async () => {
        await membershipPage.navigateToEMployeeProfile(AddEmployeeData[0]);
        await membershipPage.waitUntilTableLoaderDissapear();
        await membershipPage.navigateToMembershipsMenu();
        await membershipPage.fillMembershipDetails(MembershipData[0]);
        await membershipPage.clickOnSaveBtn();
        await membershipPage.verifySuccessToastForSave();
        await membershipPage.verifyMembershipDetails(MembershipData[0]);
    })

    test.only('2. Fill multiple membership details', async () => {
        await membershipPage.navigateToEMployeeProfile(AddEmployeeData[1]);
        await membershipPage.waitUntilTableLoaderDissapear();
        await membershipPage.navigateToMembershipsMenu();
        await membershipPage.fillMultipleDetailsAndVerify(MembershipData);

    })

    test('3. Delete one record from multiple membership details', async () => {
        await membershipPage.navigateToEMployeeProfile(AddEmployeeData[2]);
        await membershipPage.waitUntilTableLoaderDissapear();
        await membershipPage.navigateToMembershipsMenu();
        await membershipPage.fillMultipleDetailsAndVerify(MembershipData);
        await membershipPage.selectAndDeleteRecord(MembershipData[1]);
        await membershipPage.verifyMembershipDetails(MembershipDataAfterDelete);


    })

    test('4. When the edit is ongoing validate whether other records checkbox are in readonly mode', async () => {
        await membershipPage.navigateToEMployeeProfile(AddEmployeeData[3]);
        await membershipPage.waitUntilTableLoaderDissapear();
        await membershipPage.navigateToMembershipsMenu();
        await membershipPage.fillMultipleDetailsAndVerify(MembershipData);
        await membershipPage.selectAndClickOnEdit(MembershipData[1]);
        await membershipPage.verifyReadonlyModeForCheckBox(MembershipDataAfterDelete);


    })

    test('5. Update one record from multiple membership details', async () => {
        await membershipPage.navigateToEMployeeProfile(AddEmployeeData[4]);
        await membershipPage.waitUntilTableLoaderDissapear();
        await membershipPage.navigateToMembershipsMenu();
        await membershipPage.fillMultipleDetailsAndVerify(MembershipData);
        await membershipPage.selectAndClickOnEdit(MembershipData[1]);
        await membershipPage.fillUpdateData(MembershipUpdateData);


    })
})
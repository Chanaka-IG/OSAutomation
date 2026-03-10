import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { MembershipsPage } from '../../pages/PIM/MemebershipsPage'
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { MembershipData, AddEmployeeData } from '../../data/PIM/membership'



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

    test('Fill membership details', async () => {
        await membershipPage.navigateToEMployeeProfile(AddEmployeeData[0]);
        await membershipPage.waitUntilTableLoaderDissapear();
        await membershipPage.navigateToMembershipsMenu();
        await membershipPage.fillMembershipDetails(MembershipData[0]);
    })

})
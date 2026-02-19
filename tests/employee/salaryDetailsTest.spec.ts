import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { SalaryDetailsPage } from '../../pages/PIM/SalaryDetailsPage'
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { salarydata } from '../../data/PIM/salaryDetails'

test.describe("Test cases for Salary details related scenarios", () => {

    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let salaryDetailsPage: SalaryDetailsPage;


    test.beforeAll(async () => {
        const apiContext = await request.newContext()
        logAsAdmin = new LogAsAdmin(apiContext);
        addEmployee = new AddEmployee(apiContext)
        // await logAsAdmin.loginAsAdmin();
        // await addEmployee.addEmployees(salarydata.employee)
    })

    test.beforeEach(async ({ page, logger }) => {
        salaryDetailsPage = new SalaryDetailsPage(page, logger);
        await page.goto('/');
        await salaryDetailsPage.loginasAdmin();
        await salaryDetailsPage.navigateToPim();
    })

    test("1. Update salary component without direct deposit details - variant A", async () => {
        await salaryDetailsPage.navigateToEMployeeProfile(salarydata.employee[0]);
        await salaryDetailsPage.waitUntilLoaderDissapear();
        await salaryDetailsPage.navigateToSalaryMenu();
        await salaryDetailsPage.fillSalaryDetails(salarydata.salaryComponent[0]);
        await salaryDetailsPage.clickOnSave();
        await salaryDetailsPage.verifySuccessToastForSave();

    })

    test.only("2. Update salary component with direct deposit details - variant A", async () => {
        await salaryDetailsPage.navigateToEMployeeProfile(salarydata.employee[1]);
        await salaryDetailsPage.waitUntilLoaderDissapear();
        await salaryDetailsPage.navigateToSalaryMenu();
        await salaryDetailsPage.fillSalaryDetails(salarydata.salaryComponent[1]);
        await salaryDetailsPage.clickOnSave();
        await salaryDetailsPage.verifySuccessToastForSave();

    })
})
import { test, expect } from '../../Fixtures/logger.fixtures';
import { ReportPage } from '../../pages/PIM/ReportPage';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { ReportData } from '../../data/PIM/report'


test.describe("Test cases for Report page in PIM module", () => {

    let logAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let reportPage: ReportPage;

    test.beforeAll(async ({ request }) => {
        logAdmin = new LogAsAdmin(request)
        addEmployee = new AddEmployee(request)
        // await logAdmin.loginAsAdmin();
        // await addEmployee.addEmployees(ReportData.AddEmployee);
    })

    test.beforeEach(async ({ page, logger }) => {
        reportPage = new ReportPage(page, logger);
        await page.goto("/")
        await reportPage.loginasAdmin();
        await reportPage.navigateToPim();
        
    })

    test("1. Validate Report page with a screenshot", async ({ page }) => {
        await reportPage.navigateToReportPage();
        await reportPage.validateReportPageWithSS();
    })

    test("2. Validate Report page UI elements", async ({ page }) => {
        await reportPage.navigateToReportPage();
        await reportPage.validateReportPageUIElements();
    })

    test.only("3. Add report test", async ({ page }) => {
        await reportPage.navigateToReportPage();
        await reportPage.waitUntilTableLoaderDissapear();
        await reportPage.clickOnAddBtn();
        await reportPage.waitUntilFormLoaderDissapear();
        await reportPage.fillReportForm(ReportData.AddReport[0]);
    })


})
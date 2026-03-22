import { test, expect } from '../../Fixtures/logger.fixtures';
import { ReportPage } from '../../pages/PIM/ReportPage';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { ReportData } from '../../data/PIM/report'
import { UpdateEmployee } from '../../api/Employee/UpdateEMployee'


test.describe("Test cases for Report page in PIM module", () => {

    let logAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let reportPage: ReportPage;
    let updateEmployee: UpdateEmployee;

    test.beforeAll(async ({ request }) => {
        logAdmin = new LogAsAdmin(request)
        addEmployee = new AddEmployee(request)
        updateEmployee = new UpdateEmployee(request)
        await logAdmin.loginAsAdmin();
        await addEmployee.addEmployees(ReportData.AddEmployee);
        const employeeSet = await addEmployee.getEmployees();
        const empSet = employeeSet.data;
        const updateEmpData = ReportData.UpdateEmployeeData;

        for (const updateEmp of updateEmpData) {
            for (const empSystem of empSet) {
                if (updateEmp.employeeId === empSystem.employeeId) {
                    await updateEmployee.updateEmployeeJobDetails(empSystem.empNumber, updateEmp)
                    await updateEmployee.updateEmployeePersonalDetails(empSystem.empNumber, updateEmp)
                }
            }
        }

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

    test("3. Add report ", async ({ page }) => {
        await reportPage.navigateToReportPage();
        await reportPage.waitUntilTableLoaderDissapear();
        await reportPage.clickOnAddBtn();
        await reportPage.waitUntilFormLoaderDissapear();
        await reportPage.fillReportForm(ReportData.AddReport[0]);
        await reportPage.clickOnSaveBtn();
        await reportPage.verifySuccessToastForSave();
        await reportPage.waitUntilFormLoaderDissapear();
    })

    test("4. Add report with Job Title as select criteria and validate data", async ({ page }) => {
        await reportPage.navigateToReportPage();
        await reportPage.waitUntilTableLoaderDissapear();
        await reportPage.clickOnAddBtn();
        await reportPage.waitUntilFormLoaderDissapear();
        await reportPage.fillReportForm(ReportData.AddReport[0]);
        await reportPage.clickOnSaveBtn();
        await reportPage.verifySuccessToastForSave();
        await reportPage.waitUntilFormLoaderDissapear();
        await reportPage.validateInReport(ReportData.validateReportForJobTitle);
    })

        test.only("5. Add report with Employment Status as select criteria and validate data", async ({ page }) => {
        await reportPage.navigateToReportPage();
        await reportPage.waitUntilTableLoaderDissapear();
        await reportPage.clickOnAddBtn();
        await reportPage.waitUntilFormLoaderDissapear();
        await reportPage.fillReportForm(ReportData.AddReport[1]);
        await reportPage.clickOnSaveBtn();
        await reportPage.verifySuccessToastForSave();
        await reportPage.waitUntilFormLoaderDissapear();
        await reportPage.validateInReport(ReportData.validateReportForEmpStatus);
    })

})
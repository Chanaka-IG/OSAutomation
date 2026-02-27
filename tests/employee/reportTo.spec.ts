import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { ReportToPage } from '../../pages/PIM/ReportToPage'
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { reportToData } from '../../data/PIM/reportTo'
import { ReportTo } from '../../api/Employee/ReportTo';

test.describe('Test cases for assigning supervisors and subordinates', () => {

    let reportToPage: ReportToPage;
    let addEmployee: AddEmployee;
    let logAsAdmin: LogAsAdmin;
    let reportTo: ReportTo;


    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(apiContext);
        reportTo = new ReportTo(apiContext);
        addEmployee = new AddEmployee(apiContext);
        await logAsAdmin.loginAsAdmin()
        await addEmployee.addEmployees(reportToData.AddEmployee)
        const employeeList = await addEmployee.getEmployees();
        const supervisor = employeeList.data.find(
            (emp: any) => emp.employeeId === reportToData.apiSupervisor[0].employeeId);

        const subordinate = employeeList.data.find(
            (emp: any) => emp.employeeId === reportToData.apiSubordinate[0].employeeId);

        await reportTo.assignSupervisor(reportToData.apiSupervisor[0],subordinate,supervisor)
    })

    test.beforeEach(async ({ page, logger }) => {
        reportToPage = new ReportToPage(page, logger);
        await page.goto('/');
        await reportToPage.loginasAdmin();
        await reportToPage.navigateToPim();

    })

    test('Assign supervisor to an employee', async () => {
        await reportToPage.navigateToEMployeeProfile(reportToData.SelectEmployee[0]);
        await reportToPage.waitUntilTableLoaderDissapear();
        await reportToPage.navigateToReportTo();
        await reportToPage.assignSupervisor(reportToData.Supervisor[0]);
        await reportToPage.verifySuccessToastForSave();
    })

    test.only('Assign multiple supervisors to an employee', async () => {
        await reportToPage.navigateToEMployeeProfile(reportToData.SelectEmployee[1]);
        await reportToPage.waitUntilTableLoaderDissapear();
        await reportToPage.navigateToReportTo();
        await reportToPage.assignMultipleSupervisors(reportToData.MultipleSupervisors);
        await reportToPage.validateReportToData(reportToData.MultipleSupervisors);
    })
})




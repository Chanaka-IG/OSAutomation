import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { ReportToPage } from '../../pages/PIM/ReportToPage'
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { reportToData } from '../../data/PIM/reportTo'
import { ReportTo } from '../../api/Employee/ReportTo';
import { CustomUsers } from '../../api/masterdata/CustomUsers';

test.describe('Test cases for assigning supervisors and subordinates', () => {

    let reportToPage: ReportToPage;
    let addEmployee: AddEmployee;
    let logAsAdmin: LogAsAdmin;
    let reportTo: ReportTo;
    let customUsers: CustomUsers;


    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(apiContext);
        reportTo = new ReportTo(apiContext);
        addEmployee = new AddEmployee(apiContext);
        customUsers = new CustomUsers(apiContext);
        await logAsAdmin.loginAsAdmin()
        await addEmployee.addEmployees(reportToData.AddEmployee)
        const employeeList = await addEmployee.getEmployees();
        const subordinate = employeeList.data.find(
            (emp: any) => emp.employeeId === reportToData.apiSubordinate[0].employeeId);

        const supervisorList = employeeList.data.filter((emp: any) =>
            reportToData.apiSupervisors.some(
                (sup: any) => sup.employeeId === emp.employeeId
            )
        );
        await reportTo.assignSupervisor(reportToData.apiSupervisors, subordinate, supervisorList)
        for (const supervisor of supervisorList) {
            if (supervisor.employeeId === reportToData.apiSupervisors[0].employeeId) {
                await customUsers.addUsers(supervisor, reportToData.userList[0])
            }
        }
        await customUsers.addUsers(subordinate, reportToData.userList[1])

    })

    test.beforeEach(async ({ page, logger }, testInfo) => {
        reportToPage = new ReportToPage(page, logger);
        if (testInfo.title.includes('Log as Supervisor')) {
            logger.log("Logging in as Supervisor, skipping login steps in beforeEach hook");
            await page.goto('/');
        }
        else if (testInfo.title.includes('Log as ESS')) {
            logger.log("Logging in as ESS, skipping login steps in beforeEach hook");
            await page.goto('/');
        }
        else {
            await page.goto('/');
            await reportToPage.loginasAdmin();
            await reportToPage.navigateToPim();
        }


    })

    test('1. Assign supervisor to an employee', async () => {
        await reportToPage.navigateToEMployeeProfile(reportToData.SelectEmployee[0]);
        await reportToPage.waitUntilTableLoaderDissapear();
        await reportToPage.navigateToReportTo();
        await reportToPage.assignSupervisor(reportToData.Supervisor[0]);
        await reportToPage.verifySuccessToastForSave();
    })

    test('2. Assign multiple supervisors to an employee', async () => {
        await reportToPage.navigateToEMployeeProfile(reportToData.SelectEmployee[1]);
        await reportToPage.waitUntilTableLoaderDissapear();
        await reportToPage.navigateToReportTo();
        await reportToPage.assignMultipleSupervisors(reportToData.MultipleSupervisors);
        await reportToPage.validateReportToData(reportToData.MultipleSupervisors);
    })

    test('3. Log as Supervisor and validate report to data', async () => {
        await reportToPage.loginasCustomUser(reportToData.userList[0].username, reportToData.userList[0].password);
        await reportToPage.navigateToPim();
        await reportToPage.validateSubordinatesInList(reportToData.apiSubordinate);
        await reportToPage.navigateToEMployeeProfile(reportToData.SelectEmployee[0]);
        await reportToPage.navigateToReportTo();
        await reportToPage.validateReportToData(reportToData.apiSupervisorsValidate[0]);
    })

    test('4. Log as ESS and validate report to data', async () => {
        await reportToPage.loginasCustomUser(reportToData.userList[1].username, reportToData.userList[1].password);
        await reportToPage.navigateToMyInfo();
        await reportToPage.navigateToReportTo();
        await reportToPage.validateReportToData(reportToData.apiSupervisorsValidate[0]);
    })
})




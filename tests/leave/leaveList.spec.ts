import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { LogAsESS } from '../../api/logAsEss'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { AddUsers } from '../../api/Admin/AddUsers';
import { LeaveListPage } from '../../pages/Leave/LeaveListPage'
import { leaveListData } from '../../data/Leave/leaveList'
import { AddEntitlements } from '../../api/Leave/AddEntitlements'
import { LeaveList } from '../../api/Leave/LeaveList';
import { AssignLeave } from '../../api/Leave/assignLeave'
import { TestStateManager } from '../../utils/testStateManager';
import { UpdateEmployee } from '../../api/Employee/UpdateEMployee'
import { TerminateEmployee } from '../../api/Employee/TerminateEmployee'

const SUITE_ID = 'my leave-test';

test.describe("Test cases for my leave", () => {

    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let addUsers: AddUsers;
    let leaveListPage: LeaveListPage;
    let addEntitlements: AddEntitlements;
    let leaveList: LeaveList;
    let logAsESS: LogAsESS;
    let assignLeave: AssignLeave;
    let updateEmployee: UpdateEmployee;
    let terminateEmployee: TerminateEmployee;
    let validateArray = [];

    test.beforeAll(async ({ browser, logger }) => {
        test.setTimeout(250000);
        const state = TestStateManager.getState(SUITE_ID);
        if (state.prerequisitesAdded) {

            return;
        }
        const apiContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(apiContext);
        addEmployee = new AddEmployee(apiContext);
        addUsers = new AddUsers(apiContext);
        addEntitlements = new AddEntitlements(apiContext)
        assignLeave = new AssignLeave(apiContext)
        updateEmployee = new UpdateEmployee(apiContext)


        const employeeData = leaveListData.apiData.AddEmployeeData;
        const userData = leaveListData.apiData.AddUserData;
        const TerminateData = leaveListData.apiData.TerminateEmployeeData;
        const entitementData = leaveListData.apiData.AddEntitlements;
        const applyLeaveData = leaveListData.apiData.applyLeave;
        const assignLeaveData = leaveListData.apiData.assignLeave;
        const subUnitData = leaveListData.apiData.updatetJobData;
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(employeeData);
        const employeeSet = await addEmployee.getEmployees();
        const empSet = employeeSet.data;
        for (const updateEmp of userData) {
            for (const empSystem of empSet) {
                if (updateEmp.employeeId === empSystem.employeeId) {
                    await addUsers.addUsersasSingle(empSystem.empNumber, updateEmp)
                }
            }
        }

        for (const updateEnt of entitementData) {
            for (const empSystem of empSet) {
                if (updateEnt.employeeId === empSystem.employeeId) {
                    await addEntitlements.addEntitlements(empSystem.empNumber, updateEnt)
                }
            }
        }

        for (const asiggnLeave of assignLeaveData) {
            for (const empSystem of empSet) {
                if (asiggnLeave.employeeId === empSystem.employeeId) {
                    await assignLeave.assignLeave(empSystem.empNumber, asiggnLeave)
                }
            }
        }

        for (const subUnitDataSet of subUnitData) {
            for (const empSystem of empSet) {
                if (subUnitDataSet.employeeId === empSystem.employeeId) {
                    await updateEmployee.updateEmployeeJobDetails(empSystem.empNumber, subUnitDataSet)
                }
            }
        }

        await apiContext.dispose();

        for (const users of userData) {
            for (const applyLeave of applyLeaveData) {
                if (applyLeave.employeeId === users.employeeId) {
                    const newApiContext = await request.newContext();
                    logAsESS = new LogAsESS(newApiContext)
                    leaveList = new LeaveList(newApiContext)
                    await logAsESS.loginAsESS(users.username, users.password);
                    await leaveList.submitLeaveRequest(applyLeave)
                    await newApiContext.dispose();
                }
            }
        }

        const newApiContextForTerminate = await request.newContext();
        logAsAdmin = new LogAsAdmin(newApiContextForTerminate);
        terminateEmployee = new TerminateEmployee(newApiContextForTerminate)
        await logAsAdmin.loginAsAdmin();

        for (const terminateEmp of TerminateData) {
            for (const empSystem of empSet) {
                if (terminateEmp.employeeId === empSystem.employeeId) {
                    await terminateEmployee.terminateEMployee(empSystem.empNumber, terminateEmp)
                }
            }
        }
        state.prerequisitesAdded = true;
        TestStateManager.saveState(SUITE_ID, state);
    })
    test.beforeEach(async ({ page, logger }) => {
        leaveListPage = new LeaveListPage(page, logger)
        await page.goto('/');
        await leaveListPage.loginasAdmin();
        await leaveListPage.navigateToLeave();

    })

    test("1. Filter data from pending approval status and validate", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[0])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheTable(leaveListData.uiData.validateData[0]);
    })
    test("2. Filter data from shedule status and validate", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[1])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheTable(leaveListData.uiData.validateData[1]);
    })
    test("3. Filter data from shedule and penidng approval status together and validate", async () => {
        validateArray.push(leaveListData.uiData.validateData[2], leaveListData.uiData.validateData[3])
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[2])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheTable(validateArray);
    })
    test("4. Filter data from department + penidng approval status together and validate", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[3])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheTable(leaveListData.uiData.validateData[0]);
    })
    test("5. Validate no records found toast", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[4])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.VerifyNoRecords();
    })
    test("6. Filter data for terminated employees and validate", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[5])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheTable(leaveListData.uiData.validateData[4]);
    })
    test("7. Approve a single pending approval leave and validate", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[6])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.approveLeave(leaveListData.uiData.validateData[5]);
    })
    test("8. Approve a multiple pending approval leave and validate", async () => {
        const validateArrayForMultipleApproval = [];
        validateArrayForMultipleApproval.push(leaveListData.uiData.validateData[6], leaveListData.uiData.validateData[7], leaveListData.uiData.validateData[8])
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[7])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.approveLeave(validateArrayForMultipleApproval);
    })
    test("9. Reject a single pending approval leave and validate", async () => {
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[8])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.rejectLeave(leaveListData.uiData.validateData[9]);
    })
    test("10. Approve a multiple pending approval leave and validate", async () => {
        const validateArrayForMultipleApproval = [];
        validateArrayForMultipleApproval.push(leaveListData.uiData.validateData[10], leaveListData.uiData.validateData[11], leaveListData.uiData.validateData[12])
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[9])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.rejectLeave(validateArrayForMultipleApproval);
    })
    test("11. Add a comment for already applied leave request", async () => {
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.selectAndClickOnDots(leaveListData.uiData.selectData[0]);
        await leaveListPage.waitUntilFormLoaderDissapear();
        await leaveListPage.clickOnAddComment();
        await leaveListPage.addCommentAndSave(leaveListData.uiData.selectData[0].updateComment);
        await leaveListPage.waitUntilFormLoaderDissapear();
        await leaveListPage.validateDataIntheTable(leaveListData.uiData.validateData[13]);
    })
    test("12. View Leave details", async () => {
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.selectAndClickOnDots(leaveListData.uiData.selectData[1]);
        await leaveListPage.waitUntilFormLoaderDissapear();
        await leaveListPage.clickviewLeaveDetails();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheFullView(leaveListData.uiData.validateData[14]);
    })

    test.only("13. Navigate to the PIM for selected employee", async () => {
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.selectAndClickOnDots(leaveListData.uiData.selectData[2]);
        await leaveListPage.waitUntilFormLoaderDissapear();
        await leaveListPage.viewPimInfor();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.waitUntilFormLoaderDissapear();
        await leaveListPage.validatePIMScreen(leaveListData.uiData.selectData[2].name);
    })
})

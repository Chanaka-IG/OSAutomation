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
    let validateArray = [];

    test.beforeAll(async ({ browser, logger }) => {

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

        const employeeData = leaveListData.apiData.AddEmployeeData;
        const userData = leaveListData.apiData.AddUserData;
        const entitementData = leaveListData.apiData.AddEntitlements;
        const applyLeaveData = leaveListData.apiData.applyLeave;
        const assignLeaveData = leaveListData.apiData.assignLeave;
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
    test.only("3. Filter data from shedule and penidng approval status together and validate", async () => {
        validateArray.push(leaveListData.uiData.validateData[2],leaveListData.uiData.validateData[3])
        await leaveListPage.fillFilterValues(leaveListData.uiData.filterData[2])
        await leaveListPage.clickOnSearchBtn();
        await leaveListPage.waitUntilTableLoaderDissapear();
        await leaveListPage.validateDataIntheTable(validateArray);
    })

})

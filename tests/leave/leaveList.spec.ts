import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { LogAsESS } from '../../api/logAsEss'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { AddUsers } from '../../api/Admin/AddUsers';
import { LeaveListPage } from '../../pages/Leave/LeaveListPage'
import { leaveListData } from '../../data/Leave/leaveList'
import { AddEntitlements } from '../../api/Leave/AddEntitlements'
import { LeaveList } from '../../api/Leave/LeaveList';
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

        const employeeData = leaveListData.AddEmployeeData;
        const userData = leaveListData.AddUserData;
        const entitementData = leaveListData.AddEntitlements;
        const applyLeaveData = leaveListData.applyLeave;
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
    test.beforeEach(async () => {

    })

    test("Filter data", async () => {
        console.log("test")
    })

})

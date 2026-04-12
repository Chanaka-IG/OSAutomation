import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { AddUsers } from '../../api/Admin/AddUsers';
import { ApplyLeavePage } from '../../pages/Leave/ApplyLeavePage'
import { ApplyLeaveData } from '../../data/Leave/applyLeave'
import { AddEntitlements } from '../../api/Leave/AddEntitlements'
import { TestStateManager } from '../../utils/testStateManager';

const SUITE_ID = 'entitlementList-test';


test.describe("Test cases for apply leave", () => {

  let logAsAdmin: LogAsAdmin;
  let addEmployee: AddEmployee;
  let addUsers: AddUsers;
  let applyLeavePage: ApplyLeavePage;
  let addEntitlements: AddEntitlements;

  test.beforeAll(async () => {

    const state = TestStateManager.getState(SUITE_ID);
    if (state.prerequisitesAdded) {
      return;
    }
    const apiContext = await request.newContext();
    logAsAdmin = new LogAsAdmin(apiContext);
    addEmployee = new AddEmployee(apiContext);
    addUsers = new AddUsers(apiContext);
    addEntitlements = new AddEntitlements(apiContext)

    const employeeData = ApplyLeaveData.AddEmployeeData;
    const userData = ApplyLeaveData.AddUserData;
    const entitementData = ApplyLeaveData.AddEntitlements;
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
    state.prerequisitesAdded = true;
    TestStateManager.saveState(SUITE_ID, state);
  })

  test.beforeEach(async ({ page, logger }) => {
    applyLeavePage = new ApplyLeavePage(page, logger);
    await page.goto('/');
    await applyLeavePage.loginasCustomUser(ApplyLeaveData.AddUserData[0].username, ApplyLeaveData.AddUserData[0].password);
    await applyLeavePage.navigateToLeave();
    await applyLeavePage.navigateToApplyLeave();
    await applyLeavePage.waitUntilFormLoaderDissapear();


  })

  test("1. Validate leave balance label without applying any leave", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.ValidateData[0].leaveBalance.leaveType)
    await applyLeavePage.validateLeaveBalance(ApplyLeaveData.ValidateData[0].leaveBalance.leaveBalance)
  })

  test("2. Validate Leave Balance Details popup without applying any leave", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.ValidateData[0].leaveBalance.leaveType)
    await applyLeavePage.validateLeaveBalancePopup(ApplyLeaveData.ValidateData[0].leaveBalancePopup)
  })


  test("3. Apply a full day leave for a past date", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.applyLeave[0].pastFullday.leaveType)
    await applyLeavePage.fillApplyLeaveForm(ApplyLeaveData.applyLeave[0].pastFullday)
    await applyLeavePage.clickOnApplyBtn()
    await applyLeavePage.verifySuccessToastForSave();
    await applyLeavePage.waitUntilFormLoaderDissapear();
  })

  test("4. Apply a full day leave for a future date", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.applyLeave[0].pastFullday.leaveType)
    await applyLeavePage.fillApplyLeaveForm(ApplyLeaveData.applyLeave[0].futureFullday)
    await applyLeavePage.clickOnApplyBtn()
    await applyLeavePage.verifySuccessToastForSave();
    await applyLeavePage.waitUntilFormLoaderDissapear();
  })

    test ("5. Apply a full day leave for today", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.applyLeave[0].pastFullday.leaveType)
    await applyLeavePage.fillApplyLeaveForm(ApplyLeaveData.applyLeave[0].todayFullday)
    await applyLeavePage.clickOnApplyBtn()
    await applyLeavePage.verifySuccessToastForSave();
    await applyLeavePage.waitUntilFormLoaderDissapear();
  })

    test.only("5. Apply a half day morining leave for a past date", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.applyLeave[0].pastFullday.leaveType)
    await applyLeavePage.fillApplyLeaveForm(ApplyLeaveData.applyLeave[0].pastHalfdayMorning)
    await applyLeavePage.clickOnApplyBtn()
    await applyLeavePage.verifySuccessToastForSave();
    await applyLeavePage.waitUntilFormLoaderDissapear();
  })
      test.only("6. Apply a half day afternoon leave for future date", async () => {
    await applyLeavePage.selectLeaveType(ApplyLeaveData.applyLeave[0].pastFullday.leaveType)
    await applyLeavePage.fillApplyLeaveForm(ApplyLeaveData.applyLeave[0].todayHalfdayAfternoon)
    await applyLeavePage.clickOnApplyBtn()
    await applyLeavePage.verifySuccessToastForSave();
    await applyLeavePage.waitUntilFormLoaderDissapear();
  })

})
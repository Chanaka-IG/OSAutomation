import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { AddEntitlements } from '../../pages/Leave/AddEntitlements';
import { addEntitlementData,AddEmployeeData } from '../../data/Leave/addEntitlement';
import { TestStateManager } from '../../utils/testStateManager';

const SUITE_ID = 'addEmployee-test';

test.describe("Add Entitlements for Employee", () => {
    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let addEntitlements: AddEntitlements;

    test.beforeAll(async ({ }) => {
        const state = TestStateManager.getState(SUITE_ID);
        if (state.prerequisitesAdded) {
            return;
        }
        const requestContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(requestContext);
        addEmployee = new AddEmployee(requestContext);
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(AddEmployeeData);
        state.prerequisitesAdded = true;
        TestStateManager.saveState(SUITE_ID, state);
    })
    test.beforeEach(async ({ page, logger }) => {
        await page.goto("/");
        addEntitlements = new AddEntitlements(page, logger);
        await addEntitlements.loginasAdmin();
        await addEntitlements.navigateToLeave();
        await addEntitlements.navigateToEntitlements();
        await addEntitlements.addEntitlements(addEntitlementData[0]);
    
    })
})
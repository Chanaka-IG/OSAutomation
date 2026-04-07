import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { AddEntitlementsPage } from '../../pages/Leave/AddEntitlementsPage';
import { entitlementData } from '../../data/Leave/addEntitlement';
import { TestStateManager } from '../../utils/testStateManager';
import { UpdateEmployee } from '../../api/Employee/UpdateEMployee';

const SUITE_ID = 'addEmployee-test';

test.describe("Add Entitlements for Employee", () => {
    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let addEntitlements: AddEntitlementsPage;
    let updateEmployee: UpdateEmployee;

    test.beforeAll(async ({ }) => {
        const state = TestStateManager.getState(SUITE_ID);
        if (state.prerequisitesAdded) {
            return;
        }
        const requestContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(requestContext);
        addEmployee = new AddEmployee(requestContext);
        updateEmployee = new UpdateEmployee(requestContext);
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(entitlementData.AddEmployeeData);
        const UpdateEmployeeData = entitlementData.apiUpdateEmployeeData;
        const employeeSet = await addEmployee.getEmployees();
        const empSet = employeeSet.data;
        for (const updateEmp of UpdateEmployeeData) {
            for (const empSystem of empSet) {
                if (updateEmp.employeeId === empSystem.employeeId) {
                    await updateEmployee.updateEmployeeJobDetails(empSystem.empNumber, updateEmp)
                }
            }
        }
        state.prerequisitesAdded = true;
        TestStateManager.saveState(SUITE_ID, state);
    })
    test.beforeEach(async ({ page, logger }) => {
        await page.goto("/");
        addEntitlements = new AddEntitlementsPage(page, logger);
        await addEntitlements.loginasAdmin();
        await addEntitlements.navigateToLeave();
        await addEntitlements.navigateToEntitlements();

    })

    test("1. Add Entitlements for Employee", async () => {
        await addEntitlements.addEntitlements(entitlementData.addEntitlementDataforIndividual, entitlementData.AddEmployeeData[0]);
        await addEntitlements.validateConfirmationPopup(entitlementData.addEntitlementDataforIndividual[0].entitlements);
        await addEntitlements.verifySuccessToastForSave();
    })

    test("2. Add Entitlements for Employee and Validate in enetitlement list", async () => {
        await addEntitlements.addEntitlements([entitlementData.addEntitlementDataforIndividual[0]], entitlementData.AddEmployeeData[1]);
        await addEntitlements.validateConfirmationPopup(entitlementData.addEntitlementDataforIndividual[0].entitlements);
        await addEntitlements.verifySuccessToastForSave();
        await addEntitlements.waitUntilFormLoaderDissapear();
        await addEntitlements.validateEntitlementTable(entitlementData.addEntitlementDataforIndividual[0]);
    })
    test.only("3. Validate the employee count according to the location", async () => {
        await addEntitlements.addEntitlements(entitlementData.addEntitlementDataforMultipleForLocation);
        await addEntitlements.validateCount(entitlementData.validateMultiplePopupforJobTItle.length);
    })

    test("4. Add Entitlements for Employee as bulk based on the location", async () => {
        await addEntitlements.addEntitlements(entitlementData.addEntitlementDataforMultipleForLocation);
        await addEntitlements.validateConfirmationPopupForMultiple(entitlementData.validateMultiplePopupforJobTItle);
        await addEntitlements.verifyCustomToast(`Entitlement added to ${entitlementData.validateMultiplePopupforJobTItle.length} employees`);
        await addEntitlements.waitUntilFormLoaderDissapear();
    })
    test("5. Add Entitlements for Employee as bulk based on the sub Unit", async () => {
        await addEntitlements.addEntitlements(entitlementData.addEntitlementDataforMultipleForSubunit);
        await addEntitlements.validateConfirmationPopupForMultiple(entitlementData.validateMultiplePopupforSubUnit);
        await addEntitlements.verifyCustomToast(`Entitlement added to ${entitlementData.validateMultiplePopupforSubUnit.length} employees`);
        await addEntitlements.waitUntilFormLoaderDissapear();
    })


})
import { test, Logger, request } from "../../Fixtures/logger.fixtures";
import { EmployeeEntitlementPage } from "../../pages/Leave/EmployeeEntitlementPage";
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { TestStateManager } from '../../utils/testStateManager';
import { entitlementData } from "../../data/Leave/employeeEntitlement";
import { AddEntitlements } from "../../api/Leave/AddEntitlements";


const SUITE_ID = 'entitlementList-test';

test.describe("Employee Entitlement List", () => {

    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let employeeEntitlementPage: EmployeeEntitlementPage;
    let addEntitlementsAPI: AddEntitlements;

    test.beforeAll(async () => {
        const state = TestStateManager.getState(SUITE_ID);
        if (state.prerequisitesAdded) {
            return;
        }
        const requestContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(requestContext);
        addEmployee = new AddEmployee(requestContext);
        addEntitlementsAPI = new AddEntitlements(requestContext);
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(entitlementData.addEmployeeData);
        const employeeSet = await addEmployee.getEmployees();
        const empSet = employeeSet.data;
        const UpdateEmployeeDataWithEntitlements = entitlementData.addEntitlements;
        for (const updateEmp of UpdateEmployeeDataWithEntitlements) {
            for (const empSystem of empSet) {
                if (updateEmp.employeeId === empSystem.employeeId) {
                    await addEntitlementsAPI.addEntitlements(empSystem.empNumber, updateEmp)
                }
            }
        }

        state.prerequisitesAdded = true;
        TestStateManager.saveState(SUITE_ID, state);
    });

    test.beforeEach(async ({ page,logger }) => {
        await page.goto("/");
        employeeEntitlementPage = new EmployeeEntitlementPage(page,logger);
        await employeeEntitlementPage.loginasAdmin();
        await employeeEntitlementPage.navigateToLeave();
        await employeeEntitlementPage.navigateToEmplloyeeEntitlements();
    });

    test("1. Filter entitlement list based on the name", async ({ page, logger }) => {
        await employeeEntitlementPage.fillFilterValues(entitlementData.filterWithName[0]);
        await employeeEntitlementPage.clickOnSearchBtn();
        await employeeEntitlementPage.waitUntilTableLoaderDissapear();
        await employeeEntitlementPage.validateEntitlementTable(entitlementData.EntitlementData[0]);

    })

    test("2. Filter entitlement list based on the name and leave type", async ({ page, logger }) => {
        await employeeEntitlementPage.fillFilterValues(entitlementData.filterWithName[0]);
        await employeeEntitlementPage.clickOnSearchBtn();
        await employeeEntitlementPage.waitUntilTableLoaderDissapear();
        await employeeEntitlementPage.validateEntitlementTable(entitlementData.EntitlementData[0]);

    })
});
import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { FilterAndSearchPage } from '../../pages/PIM/FilterAndSearchPage';
import { PIM_DATA } from '../../data/PIM/addNewEMployee';
import { LogAsAdmin } from '../../api/logAsAdmin';
import { UPDATE_JOB_DATA } from '../../data/PIM/updateJob';
import { PIM_FILTER_DATA } from '../../data/PIM/employeeFilter';
import { UpdateEmployee } from '../../api/Employee/UpdateEMployee';
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { LoggerFn } from '../../Fixtures/logger.fixtures';



test.describe("Filter and search Employees", () => {

    let filterAndSearchPage: FilterAndSearchPage;
    let logAdmin: LogAsAdmin;
    let updateEmployee: UpdateEmployee;
    let addEmployee: AddEmployee;

    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAdmin = new LogAsAdmin(apiContext);
        updateEmployee = new UpdateEmployee(apiContext);
        addEmployee = new AddEmployee(apiContext);
        await logAdmin.loginAsAdmin();
        await addEmployee.addEmployees(PIM_DATA.API_DATA.EmployeeforFilter);
    })

    test.beforeEach(async ({ page, logger }) => {
        filterAndSearchPage = new FilterAndSearchPage(page, logger);
        await page.goto("/")
        await filterAndSearchPage.loginasAdmin();
        await filterAndSearchPage.navigateToPim();
    })

    test("0. Update employees via API as test data", async ({ page }) => {
        for (let i = 0; i < 2; i++) {
            await filterAndSearchPage.navigateToPim();
            await filterAndSearchPage.searchAndNavigatetoProfile(PIM_DATA.API_DATA.EmployeeforFilter[i]);
            const url = page.url();
            console.log(url);
            const empNumber = Number(url.split('/').pop());
            console.log("Employee Number :" + empNumber);
            await updateEmployee.updateEmployeeJobDetails(empNumber, UPDATE_JOB_DATA[i]);
        }
    })

    test("1.Search by Employee Name", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_FILTER_DATA.EmployeeFilter[0]);
        await filterAndSearchPage.clickSearch();
        await filterAndSearchPage.waitUntilTableLoaderDissapear();
        const isVerified = await filterAndSearchPage.verifyEmployeeDetails(PIM_FILTER_DATA.EmployeeFilterValidation[0]);
        expect(isVerified).toBeTruthy();
    })

    test("2.Search by Employee ID", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_FILTER_DATA.EmployeeFilter[1]);
        await filterAndSearchPage.clickSearch();
        await filterAndSearchPage.waitUntilTableLoaderDissapear();
        const isVerified = await filterAndSearchPage.verifyEmployeeDetails(PIM_FILTER_DATA.EmployeeFilterValidation[0]);
        expect(isVerified).toBeTruthy();
    })

    test("3.Filter by Job Title, Status, Sub Unit", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_FILTER_DATA.EmployeeFilter[2]);
        await filterAndSearchPage.clickSearch();
        await filterAndSearchPage.waitUntilTableLoaderDissapear();
        const isVerified = await filterAndSearchPage.verifyEmployeeDetails(PIM_FILTER_DATA.EmployeeFilterValidation[0]);
        expect(isVerified).toBeTruthy();
    })

    test("4.Combine multiple filters", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_FILTER_DATA.EmployeeFilter[2]);
        await filterAndSearchPage.clickSearch();
        await filterAndSearchPage.waitUntilTableLoaderDissapear();
        const isVerified = await filterAndSearchPage.verifyEmployeeDetails(PIM_FILTER_DATA.EmployeeFilterValidation[0]);
        expect(isVerified).toBeTruthy();
    })
    test("5.Reset filter functionality", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_FILTER_DATA.EmployeeFilter[2]);
        await filterAndSearchPage.clickReset();
        await filterAndSearchPage.waitUntilTableLoaderDissapear();
        const isVerified = await filterAndSearchPage.validateEmptyFilters();
        expect(isVerified).toBeTruthy();
    })

    test("6.Records found text verification", async () => {
        await filterAndSearchPage.validateRecordsFoundText();
    })

    test("7.Delete one employee from the PIM list", async () => {
        await filterAndSearchPage.searchAndDelete(PIM_DATA.API_DATA.EmployeeforFilter[2].employeeId);
        await filterAndSearchPage.clickDeleteOnPupup();
        await filterAndSearchPage.verifySuccessToastforDeletion();
    })

    test("8.Delete multiple employees from the list", async () => {
        await filterAndSearchPage.searchAndSelectMultiple(PIM_DATA.EmployeeIdListForDelete);
        await filterAndSearchPage.clickDeleteSelected();
        await filterAndSearchPage.clickDeleteOnPupup()
        await filterAndSearchPage.verifySuccessToastforDeletion(); 
    })


})
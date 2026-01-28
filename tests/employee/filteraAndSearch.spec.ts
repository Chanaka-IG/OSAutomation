import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { FilterAndSearchPage } from '../../pages/PIM/FilterAndSearchPage';
import { PIM_DATA } from '../../data/PIM';
import { AddEmployee } from '../../api/Employee/AddEmployee';


test.describe("Filter and search Employees", () => {

    let filterAndSearchPage: FilterAndSearchPage;
    let addEmployee: AddEmployee;

    // test.beforeAll(async () => {
    //     const apiContext = await request.newContext();
    //     addEmployee = new AddEmployee(apiContext);
    //     await addEmployee.loginAsAdmin();
    //     await addEmployee.addEmployees(PIM_DATA.API_DATA.EmployeeforFilter);
    // })

    test.beforeEach(async ({ page,logger }) => {
        filterAndSearchPage = new FilterAndSearchPage(page, logger);
        await page.goto("/")
        await filterAndSearchPage.loginasAdmin();
        await filterAndSearchPage.navigateToPim();
    })

    test("1.Search by Employee Name", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_DATA.UI_DATA.EmployeeFilter[0]);
        await filterAndSearchPage.clickSearch();
        await filterAndSearchPage.waitUntilLoaderDissapear();
        const isVerified = await filterAndSearchPage.verifyEmployeeDetails(PIM_DATA.UI_DATA.EmployeeFilterValidation[0]);
        expect(isVerified).toBeTruthy();
    })


})
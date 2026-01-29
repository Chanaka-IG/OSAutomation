import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { FilterAndSearchPage } from '../../pages/PIM/FilterAndSearchPage';
import { PIM_DATA } from '../../data/PIM/addNewEMployee';
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { UPDATE_JOB_DATA } from '../../data/PIM/updateJob';
import { PIM_FILTER_DATA } from '../../data/PIM/employeeFilter';
import {UpdateEmployee} from '../../api/Employee/UpdateEMployee';



test.describe("Filter and search Employees", () => {

    let filterAndSearchPage: FilterAndSearchPage;
    let addEmployee: AddEmployee;
    let updateEmployee: UpdateEmployee;

    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        addEmployee = new AddEmployee(apiContext);
        updateEmployee = new UpdateEmployee(apiContext);
        await addEmployee.loginAsAdmin();
//        await addEmployee.addEmployees(PIM_DATA.API_DATA.EmployeeforFilter);
        await updateEmployee.updateEmployeeDetails(8, UPDATE_JOB_DATA.firstEMployee[0]);
    })

    test.beforeEach(async ({ page,logger }) => {
        filterAndSearchPage = new FilterAndSearchPage(page, logger);
        await page.goto("/")
        await filterAndSearchPage.loginasAdmin();
        await filterAndSearchPage.navigateToPim();
    })

    test("1.Search by Employee Name", async () => {
        await filterAndSearchPage.fillFilterValues(PIM_FILTER_DATA.EmployeeFilter[0]);
        await filterAndSearchPage.clickSearch();
        await filterAndSearchPage.waitUntilLoaderDissapear();
        const isVerified = await filterAndSearchPage.verifyEmployeeDetails(PIM_FILTER_DATA.EmployeeFilterValidation[0]);
        expect(isVerified).toBeTruthy();
    })


})
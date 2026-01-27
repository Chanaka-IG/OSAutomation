import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import type { EmployeeFilter, Employee } from '../../data/PIM';


export class FilterAndSearchPage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly employeeNameInput: Locator;
    private readonly employeeIdInput: Locator;
    private readonly employeeStatusDropdown: Locator;
    private readonly includeDropdown: Locator;
    private readonly supervisorNameInput: Locator;
    private readonly jobTitleDropdown: Locator;
    private readonly subUnitDropdown: Locator;
    private readonly searchBtn: Locator;
    private readonly resetBtn: Locator;
    private readonly employeeListTable: Locator;
    private readonly filterHeader: Locator;
    private readonly recordCount: Locator;
    private readonly employeeListtable: Locator;



    constructor(page: Page) {
        super(page);
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.employeeNameInput = page.locator("(//label[text()='Employee Name']/following::input)[1]")
        this.employeeIdInput = page.locator("(//label[normalize-space(text())='Employee Id']/following::input)[1]")
        this.employeeStatusDropdown = page.locator("(//div[@class='oxd-select-text-input'])[1]")
        this.includeDropdown = page.locator("(//div[@class='oxd-select-text-input'])[2]")
        this.supervisorNameInput = page.locator("(//label[normalize-space(text())='Supervisor Name']/following::input)[1]")
        this.jobTitleDropdown = page.locator("(//div[@class='oxd-select-text-input'])[3]")
        this.subUnitDropdown = page.locator("(//div[@class='oxd-select-text-input'])[4]")
        this.searchBtn = page.getByRole("button", { name: 'Search' })
        this.resetBtn = page.getByRole("button", { name: 'Reset' })
        this.employeeListTable = page.locator("//table[@class='oxd-table']")
        this.filterHeader = page.getByText("Employee Information", { exact: true })
        this.recordCount = page.getByText("Records Found")
        this.employeeListtable = page.locator(".orangehrm-employee-list")

    }

    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async fillFilterValues(employeeFilter: EmployeeFilter): Promise<void> {

        await this.pageStep("Fill filter values and search", async () => {
            await this.filterHeader.waitFor({ state: 'visible' });
            await this.fillEmployeeName(employeeFilter.employeeName);
            await this.fillEmployeeID(employeeFilter.employeeId);
            await this.fillEmployeeStatus(employeeFilter.employeeStatus);
            await this.fillInclude(employeeFilter.include);
            await this.fillSupervisorName(employeeFilter.supervisorName);
            await this.fillJobTitle(employeeFilter.jobTitle);
            await this.fillSubUnit(employeeFilter.subUnit);

        })


    }

    async fillEmployeeName(employeeName: string): Promise<void> {
        return await this.pageStep("Fill Employee Name", async () => {
            if (employeeName == "") {
                return;
            }
            else {
                await this.employeeNameInput.fill(employeeName).then(async () => {
                    await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-autocomplete-dropdown').getByText(employeeName).click();
                })
            }

        }
        )
    }
    async fillEmployeeID(employeeId: string): Promise<void> {
        if (employeeId == "") {
            return;
        }
        else {
            return await this.pageStep("Fill Employee ID", async () => {
                await this.employeeIdInput.fill(employeeId);

            })
        }

    }
    async fillEmployeeStatus(employeeStatus: string): Promise<void> {
        return await this.pageStep("Fill Employee Status", async () => {
            if (employeeStatus == "") {
                return;
            }
            else {
                await this.employeeStatusDropdown.click().then(async () => {
                    await this.page.locator('.oxd-select-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-select-dropdown').getByText(employeeStatus).click();
                });
            }

        }
        )
    }
    async fillInclude(include: string): Promise<void> {
        return await this.pageStep("Fill Include", async () => {
            if (include == "") {
                return;
            }
            else {
                await this.includeDropdown.click().then(async () => {
                    await this.page.locator('.oxd-select-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-select-dropdown').getByText(include).click();
                });
            }
        }
        )
    }
    async fillSupervisorName(supervisorName: string): Promise<void> {
        return await this.pageStep("Fill Supervisor Name", async () => {
            if (supervisorName == "") {
                return;
            }
            else {
                await this.supervisorNameInput.fill(supervisorName).then(async () => {
                    await this.page.locator('.oxd-select-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-select-dropdown').getByText(supervisorName).click();
                })
            }

        }
        )
    }
    async fillJobTitle(jobTitle: string): Promise<void> {
        return await this.pageStep("Fill Job Title", async () => {
            if (jobTitle == "") {
                return;
            }
            else {
                await this.jobTitleDropdown.click().then(async () => {
                    await this.page.locator('.oxd-select-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-select-dropdown').getByText(jobTitle).click();
                });
            }
        }
        )
    }
    async fillSubUnit(subUnit: string): Promise<void> {
        return await this.pageStep("Fill Sub Unit", async () => {
            if (subUnit == "") {
                return;
            }
            else {
                await this.subUnitDropdown.click().then(async () => {
                    await this.page.locator('.oxd-select-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-select-dropdown').getByText(subUnit).click();
                });
            }
        }
        )
    }

    async clickSearch(): Promise<void> {
        return await this.pageStep("Click Search", async () => {
            await this.searchBtn.click();
        }
        )
    }

    async verifyEmployeeDetails(empData: EmployeeFilter): Promise<boolean> {
        return await this.pageStep("Set employee profile picture", async () => {
            const parts = empData.employeeName.split(' ');
            const firstName = parts.slice(0, 2).join(' ');
           const lastName = parts[parts.length - 1];
            await this.employeeListtable.waitFor({ state: 'visible' });
            const employeeName = `${empData.employeeName}`.trim().replace(/\s+/g, ' ');
            const empId = empData.employeeId;
            const row = this.page.locator(".oxd-table-row").filter({ hasText: empId });
            const fandm = row.locator('.oxd-table-cell:nth-child(3) div');
            const lastN = row.locator('.oxd-table-cell:nth-child(4) div');
            const jobtitle = row.locator('.oxd-table-cell:nth-child(5) div');
            const empstatus = row.locator('.oxd-table-cell:nth-child(6) div');
            const subunit = row.locator('.oxd-table-cell:nth-child(7) div');
            const supervisor = row.locator('.oxd-table-cell:nth-child(8) div');
            if (firstName === await fandm.textContent() && lastName === await lastN.textContent()) {
                return true;
            }
            else {
                return false;
            }
        })
    }
}
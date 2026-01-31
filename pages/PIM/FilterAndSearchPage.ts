import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import type { EmployeeFilter, Employee, EmployeeIdList } from '../../data/PIM/addNewEMployee';
import { Logger } from '../../Fixtures/logger.fixtures';



export class FilterAndSearchPage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly pimCard: Locator;
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
    protected readonly logger: Logger;
    private readonly deleteModalPopup: Locator;
    private readonly yesDeleteBtn: Locator;
    private readonly deleteSelectedBtn : Locator;



    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
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
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.deleteModalPopup = page.locator(".oxd-sheet")
        this.yesDeleteBtn = page.getByRole("button", { name: ' Yes, Delete ' })
        this.deleteSelectedBtn = page.getByRole("button", { name: ' Delete Selected ' })
    }

    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async fillFilterValues(employeeFilter: EmployeeFilter): Promise<void> {

        await this.pageStep("Fill filter values and search", async () => {
            this.logger.log("Filling filter values");
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

    async clickReset(): Promise<void> {

        return await this.pageStep("Click Reset", async () => {
            await this.resetBtn.click();
        }
        )
    }

    async verifyEmployeeDetails(empData: EmployeeFilter): Promise<boolean> {
        return await this.pageStep("Validate full employee details in the table", async () => {
            let flag = true;
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
            if (firstName !== await fandm.textContent() && lastName !== await lastN.textContent()) {
                this.logger.error(`Job Title does not match. Expected: ${firstName} ${lastName}, Actual: ${await fandm.textContent()} ${await lastN.textContent()}  `);
                flag = false;
            }

            if (empData.jobTitle !== await jobtitle.textContent()) {
                this.logger.error(`Job Title does not match. Expected: ${empData.jobTitle}, Actual: ${await jobtitle.textContent()}`);
                this.logger.log(`Expected: ${empData.jobTitle}, Actual: ${await jobtitle.textContent()}`);
                flag = false;
            }
            if (empData.employeeStatus !== await empstatus.textContent()) {
                this.logger.error(`Employee Status does not match. Expected: ${empData.employeeStatus}, Actual: ${await empstatus.textContent()}`);
                flag = false;
            }
            if (empData.subUnit !== await subunit.textContent()) {
                this.logger.error(`Sub Unit does not match. Expected: ${empData.subUnit}, Actual: ${await subunit.textContent()}`);
                flag = false;
            }
            // if (empData.supervisorName !== await supervisor.textContent()) {
            //     this.logger.error(`Supervisor Name does not match. Expected: ${empData.supervisorName}, Actual: ${await supervisor.textContent()}`);
            //     this.logger.error("Supervisor Name does not match");
            //     flag = false;
            // }

            return flag;
        })
    }

    async searchAndNavigatetoProfile(employeeData: Employee): Promise<void> {
        return await this.pageStep("Search and navigate tot the employee profile", async () => {
            await this.pimCard.waitFor({ state: 'visible' });
            const row = this.page.locator(".oxd-table-row").filter({ hasText: employeeData.employeeId });
            console.log(row)
            const empId = row.locator('.oxd-table-cell:nth-child(2) div')
            if (await empId.textContent() !== " ") {
                await empId.click();
            }
        })
    }

    async validateEmptyFilters(): Promise<boolean> {
        return await this.pageStep("Validate all filter fields are empty", async () => {
            let flag = true;
            const employeeName = await this.employeeNameInput.textContent();
            const employeeId = await this.employeeIdInput.textContent();
            const employeeStatus = await this.employeeStatusDropdown.textContent();
            const inclideDropdown = await this.includeDropdown.textContent();
            const supervisorName = await this.supervisorNameInput.textContent();
            const jobTitle = await this.jobTitleDropdown.textContent();
            const subUnit = await this.subUnitDropdown.textContent();
            console.log(employeeStatus, jobTitle, subUnit);
            if (employeeName !== "") {
                this.logger.error("Employee Name filter has not reset");
                flag = false;
            }
            if (employeeId !== "") {
                this.logger.error("Employee ID filter field has not reset");
                flag = false;
            }
            if (jobTitle !== "-- Select --") {
                this.logger.error("Job Title filter field has not reset");
                flag = false;
            }
            if (employeeStatus !== "-- Select --") {
                this.logger.error("Employee Status filter field has not reset");
                flag = false;
            }
            if (subUnit !== "-- Select --") {
                this.logger.error("Sub Unit filter field has not reset");
                flag = false;
            }
            if (inclideDropdown !== "Current Employees Only") {
                this.logger.error("Include filter field has not reset");
                flag = false;
            }
            if (supervisorName !== "") {
                this.logger.error("Supervisor Name filter field has not reset");
                flag = false;
            }
            return flag;
        })
    }

    async validateRecordsFoundText(): Promise<void> {
        return await this.pageStep("Validate record count", async () => {
            let recordCount: any;
            const recordCountText = await this.recordCount.textContent();
            if (recordCountText) {
                recordCount = Number(recordCountText.match(/\d+/)?.[0]);
            }
            const recordCountInTable = await this.page.locator(".oxd-table-row").count();

            expect(recordCount).toBe(recordCountInTable - 1);

        })
    }

    async searchAndDelete(employeeID: string): Promise<void> {
        return await this.pageStep("Delete one employee from the employee list", async () => {
            await this.pimCard.waitFor({ state: 'visible' });
            const row = this.page.locator(".oxd-table-row").filter({ hasText: employeeID })
            const deleteIcon = row.locator("button:has(i.bi-trash)")
            await deleteIcon.waitFor({ state: 'visible' })
            if (await deleteIcon.isVisible()) {
                await deleteIcon.click();
            }
            else {
                this.logger.log(`Employee was not found with the EployeeID of ${employeeID}`)
            }

        })
    }

    async searchAndSelectMultiple(employeeIDList: any): Promise<void> {
        return await this.pageStep("Delete multiple employees from the employee list", async () => {
            await this.pimCard.waitFor({ state: 'visible' });
            for (const empId of employeeIDList) {
                const row = this.page.locator(".oxd-table-row").filter({ hasText: empId.employeeId })
                 await row.locator('.oxd-checkbox-input').click();
            }

        })
    }

    async clickDeleteOnPupup(): Promise<void> {
        return await this.pageStep("Click on Delete button in opened popub box", async () => {
            await this.deleteModalPopup.waitFor({ state: 'visible' });
            await this.yesDeleteBtn.click();

        })
    }

    async clickDeleteSelected(): Promise <void>{
        return await this.pageStep("Click on Delete Selected Button", async () => {
            await this.deleteSelectedBtn.click();
        })
    }
}
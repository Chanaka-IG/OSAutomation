
import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import { Logger } from '../../Fixtures/logger.fixtures';
import { AddEmployee, Supervisor } from '../../data/PIM/reportTo'
import { execArgv } from 'node:process';

export class ReportToPage extends BasePage {

    private logger: Logger;
    private readonly PIMmenu: Locator;
    private readonly reportToMenu: Locator;
    private readonly pimCard: Locator;
    private readonly reportToCard: Locator;
    private readonly addAssignSupervisorBtn: Locator;
    private readonly supervisorName: Locator;
    private readonly reportMethod: Locator;
    private readonly supervisorSaveBtn: Locator;



    constructor(page: Page, logger: Logger) {
        super(page)
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.reportToMenu = page.getByRole("link", { name: 'Report-to' })
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.reportToCard = page.locator(".orangehrm-card-container")
        this.addAssignSupervisorBtn = page.locator("(//h6[text()='Assigned Supervisors']/following::button)[1]")
        this.supervisorName = page.locator("(//label[text()='Name']/following::input)[1]")
        this.reportMethod = page.locator("(//label[text()='Reporting Method']/following::div)[1]")
        this.supervisorSaveBtn = page.getByRole("button", { name: "Save" }).nth(0)

    }

    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async navigateToReportTo(): Promise<void> {

        return await this.pageStep("Navigate to Report To section", async () => {
            await this.reportToMenu.click();
        })

    }

    async navigateToEMployeeProfile(employeeData: AddEmployee): Promise<void> {

        return await this.pageStep("Search and navigate tot the employee profile", async () => {
            await this.pimCard.waitFor({ state: 'visible' });
            const row = this.page.locator(".oxd-table-row").filter({ hasText: employeeData.employeeId });
            const empId = row.locator('.oxd-table-cell:nth-child(2) div')
            if (await empId.textContent() !== " ") {
                await empId.click();
            }
        })

    }

    async assignSupervisor(supervisorData: Supervisor): Promise<void> {

        return await this.pageStep("Assign a supervisor to an employee", async () => {
            await this.reportToCard.waitFor({ state: 'visible' });
            await this.waitUntilMultipleTableLoaderDissapear();
            await this.page.waitForTimeout(3000)
            await this.addAssignSupervisorBtn.click();
            await this.supervisorName.fill(supervisorData.firstName + " " + supervisorData.middleName + " " + supervisorData.lastName).then(async () => {
                await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
                await this.page.locator('.oxd-autocomplete-dropdown').getByText(supervisorData.firstName + " " + supervisorData.middleName + " " + supervisorData.lastName).click();
            })
            await this.reportMethod.click();
            await this.page.getByRole("option", { name: supervisorData.reportMethod, exact: true },).click();
            await this.supervisorSaveBtn.click();supervisorData
        })

    }

    async assignMultipleSupervisors(supervisorData: any): Promise<void> {

        return await this.pageStep("Assign multiple supervisors to an employee", async () => {
            const supervisorArray = Array.isArray(supervisorData)
                ? supervisorData
                : [supervisorData];

            for (const supervisor of supervisorArray) {
                await this.reportToCard.waitFor({ state: 'visible' });
                await this.waitUntilMultipleTableLoaderDissapear();
                await this.addAssignSupervisorBtn.click();
                await this.supervisorName.fill(supervisor.firstName + " " + supervisor.middleName + " " + supervisor.lastName).then(async () => {
                    await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-autocomplete-dropdown').getByText(supervisor.firstName + " " + supervisor.middleName + " " + supervisor.lastName).click();
                })
                await this.reportMethod.click();
                await this.page.getByRole("option", { name: supervisor.reportMethod, exact: true }).click();
                await this.supervisorSaveBtn.click();
                await this.verifySuccessToastForSave();
                await this.waitUntilTableLoaderDissapear();
                await this.waitUntilFormLoaderDissapear();
            }
        })

    }

    async validateReportToData(supervisorData: any): Promise<void> {

        return await this.pageStep("Validate supervisor data in the table", async () => {

            await this.page.waitForTimeout(3000);
            for (const supervisorValue of supervisorData) {
                const row = this.page.locator(".oxd-table-row")
                    .filter({ hasText: supervisorValue.firstName + " " + supervisorValue.lastName })
                    .filter({ hasText: supervisorValue.reportMethod })

                const rowCount = await row.count();

                if (rowCount !== 1) {
                    this.logger.error(`Mismatch found with following set - ${supervisorValue.firstName} ${supervisorValue.middleName} ${supervisorValue.lastName} ${supervisorValue.reportMethod}`
                    )
                }
                await expect(row).toHaveCount(1);
            }
        })



    }
}




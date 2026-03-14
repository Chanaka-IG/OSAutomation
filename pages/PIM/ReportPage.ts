import { Page, Locator, test, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import { Logger } from '../../Fixtures/logger.fixtures';
import type { AddReport } from '../../data/PIM/report';


export class ReportPage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly reportMenu: Locator;
    private readonly EmployeeReportFilterSection: Locator;
    private readonly reportSection: Locator;
    private readonly headerText: Locator;
    private readonly resetBtn: Locator;
    private readonly searchBtn: Locator;
    private readonly addBtn: Locator;
    private readonly reportNameLabel: Locator;
    private readonly tableContainer: Locator;
    private readonly reportName: Locator;
    private readonly criteriaDropdown: Locator;
    private readonly criteriaPlus: Locator;
    private readonly include: Locator;
    private readonly fieldGroup: Locator;
    private readonly displayField: Locator;
    private readonly displayFieldPlus: Locator;



    constructor(page: Page, logger: Logger) {
        super(page);
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.reportMenu = page.getByRole("link", { name: 'Reports' })
        this.EmployeeReportFilterSection = page.locator(".oxd-table-filter-area")
        this.reportSection = page.locator(".orangehrm-paper-container")
        this.headerText = page.getByText("Employee Reports", { exact: true })
        this.resetBtn = page.getByRole("button", { name: 'Reset' })
        this.searchBtn = page.getByRole("button", { name: 'Search' })
        this.addBtn = page.getByRole("button", { name: 'Add' })
        this.reportNameLabel = page.getByLabel("Report Name", { exact: true })
        this.tableContainer = page.locator(".orangehrm-container")
        this.reportName = page.getByPlaceholder("Type here ...")
        this.criteriaDropdown = page.locator("(//label[text()='Selection Criteria']/following::div)[1]")
        this.criteriaPlus = page.locator("(//label[text()='Selection Criteria']/following::i)[2]")
        this.include = page.locator("(//label[text()='Include']/following::div)[1]")
        this.fieldGroup = page.locator("//label[normalize-space(text())='Select Display Field Group']/following::div").nth(1);
        this.displayField = page.locator("//label[normalize-space(text())='Select Display Field']/following::div").nth(1);
        this.displayFieldPlus = page.locator("(//i[@class='oxd-icon bi-plus'])[2]")
    }

    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async navigateToReportPage(): Promise<void> {

        return await this.pageStep("Navigate to Report page", async () => {
            await this.reportMenu.click();
        })

    }

    async validateReportPageWithSS(): Promise<void> {

        return await this.pageStep("Validate UI with screenshots", async () => {
            await expect(this.EmployeeReportFilterSection).toHaveScreenshot('employee-filter.png', { animations: 'disabled' });
            await expect(this.reportSection).toHaveScreenshot('employee-report.png', { animations: 'disabled' });
        })

    }

    async validateReportPageUIElements(): Promise<void> {

        return await this.pageStep("Validate UI of Report page", async () => {
            await expect(this.headerText).toBeVisible();
            await expect(this.resetBtn).toBeVisible();
            await expect(this.searchBtn).toBeVisible();
            await expect(this.addBtn).toBeVisible();
            await expect(this.reportNameLabel).toBeVisible();
            await expect(this.tableContainer).toBeVisible();
        })

    }

    async clickOnAddBtn(): Promise<void> {

        return await this.pageStep("Click on Add button", async () => {
            await this.addBtn.click();
        })

    }

    async fillReportForm(reportData: AddReport): Promise<void> {

        return await this.pageStep("Click on Add button", async () => {
            await this.reportName.fill(reportData.reportName);
            await this.selectCriteria(reportData.criteria);
            await this.include.click();
            await this.page.getByRole('option', { name: reportData.include }).click();
            await this.fillDisplayFields(reportData.displayFields);

        })

    }

    async selectCriteria(criteria: { criteriaName: string, values: string }[]): Promise<void> {

        return await this.pageStep("Fill select criteria", async () => {
            for (const criterias of criteria) {
                if (criterias.criteriaName === "Employee Name") {
                    await this.criteriaDropdown.click();
                    await this.page.getByRole('option', { name: criterias.criteriaName }).click();
                    await this.criteriaPlus.click();
                    await this.page.locator(`//label[text()=${criterias.criteriaName}]/following::input[1]`).fill(criterias.values);
                }

                else {
                    await this.criteriaDropdown.click();
                    await this.page.getByRole('option', { name: criterias.criteriaName }).click();
                    await this.criteriaPlus.click();
                    await this.page.locator(`//label[text()='${criterias.criteriaName}']/following::div[1]`).click();
                    await this.page.getByRole('option', { name: criterias.values }).click();
                }
            }
        });
    }

    async fillDisplayFields(displayFields: { group: string, field: string[], includeHeader: boolean }[]): Promise<void> {
        return await this.pageStep("Fill display fields", async () => {
            for (const displayFieldSet of displayFields) {
                const fieldsets = displayFieldSet.field;
                await this.fieldGroup.click();
                await this.page.getByRole('option', { name: displayFieldSet.group }).click();
                for (const settingfield of fieldsets) {
                    await this.displayField.click();
                    await this.page.getByRole('option',{name :settingfield}).click();
                    await this.displayFieldPlus.click();

                }
            }

        });
    }

}

import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import { Logger } from '../../Fixtures/logger.fixtures';
import type { employee, salaryComponent } from '../../data/PIM/salaryDetails'


export class SalaryDetailsPage extends BasePage {

    private readonly logger: Logger;
    private readonly PIMmenu: Locator;
    private readonly salaryMenu: Locator;
    private readonly pimCard: Locator;
    private readonly addSalaryBtn: Locator;
    private readonly salaryDetailsCard: Locator;
    private readonly salaryComponent: Locator;
    private readonly payGrade: Locator;
    private readonly payFrequency: Locator;
    private readonly currency: Locator;
    private readonly amount: Locator;
    private readonly comment: Locator;
    private readonly directDepositToggle: Locator;
    private readonly accountNumber: Locator;
    private readonly accountType: Locator;
    private readonly routingNumber: Locator;
    private readonly amountDeposit: Locator;
    private readonly saveBtn: Locator;


    constructor(page: Page, logger: Logger) {
        super(page)
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.salaryMenu = page.getByRole('link', { name: 'Salary' })
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.addSalaryBtn = page.locator("(//h6[text()='Assigned Salary Components']/following::button)[1]")
        this.salaryDetailsCard = page.locator(".orangehrm-edit-employee-content")
        this.salaryComponent = page.locator("(//label[text()='Salary Component']/following::input)[1]")
        this.payGrade = page.locator("(//label[text()='Pay Grade']/following::div)[1]")
        this.payFrequency = page.locator("(//label[text()='Pay Frequency']/following::div)[1]")
        this.currency = page.locator("(//label[text()='Currency']/following::div)[1]")
        this.amount = page.locator("(//label[text()='Amount']/following::input)[1]")
        this.comment = page.locator("(//label[text()='Comments']/following::textarea)[1]")
        this.directDepositToggle = page.locator("(//input[@type='checkbox']/following-sibling::span)[1]")
        this.accountNumber = page.locator("(//label[text()='Account Number']/following::input)[1]")
        this.accountType = page.locator("(//label[text()='Account Type']/following::div)[1]")
        this.routingNumber = page.locator("(//label[text()='Routing Number']/following::input)[1]")
        this.amountDeposit = page.locator("(//label[text()='Routing Number']/following::input)[2]")
        this.saveBtn = page.getByRole('button', { name: 'Save' })

    }


    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async navigateToSalaryMenu(): Promise<void> {
        return await this.pageStep("Navigate to the salary details menu on selected emplpoyee", async () => {
            await this.salaryMenu.click();
        })
    }

    async navigateToEMployeeProfile(employeeData: employee): Promise<void> {

        return await this.pageStep("Search and navigate tot the employee profile", async () => {
            await this.pimCard.waitFor({ state: 'visible' });
            const row = this.page.locator(".oxd-table-row").filter({ hasText: employeeData.employeeId });
            const empId = row.locator('.oxd-table-cell:nth-child(2) div')
            if (await empId.textContent() !== " ") {
                await empId.click();
            }
        })

    }

    async fillSalaryDetails(salaryData: salaryComponent): Promise<void> {

        return await this.pageStep("Fill salary data", async () => {
            await this.salaryDetailsCard.waitFor({ state: 'visible' })
            await this.addSalaryBtn.click();
            await this.salaryComponent.fill(salaryData.component);
            await this.payGrade.click().then(async () => {
                await this.page.getByText(salaryData.payGrade, { exact: true }).click();
            })
            await this.payFrequency.click().then(async () => {
                await this.page.getByText(salaryData.payFrequency, { exact: true }).click();
            })
            await this.currency.click().then(async () => {
                await this.page.getByText(salaryData.Currency, { exact: true }).click();
            })

            await this.amount.fill(salaryData.amount);

            await this.comment.fill(salaryData.comment);

            if (salaryData.directDeposit) {
                const depositCheck = await this.directDepositToggle.isChecked();
                if (!depositCheck){
                    await this.directDepositToggle.click();
                }
                await this.accountNumber.fill(salaryData.accountNumber)
                
                await this.accountType.click().then(async () => {
                    await this.page.getByText(salaryData.accountType, { exact: true }).click();
                })

                await this.routingNumber.fill(salaryData.routingNumber)
            
                await this.amountDeposit.fill(salaryData.amountVal)
            }
        })

    }

        async clickOnSave(): Promise<void> {
        return await this.pageStep("Click on Save after filling salary data", async () => {
            await this.saveBtn.click();
        })
    }

}




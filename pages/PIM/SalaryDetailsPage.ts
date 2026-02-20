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
    private readonly errorForAmount: Locator;
    private readonly componentRequireMsg: Locator;
    private readonly currencyRequireMsg: Locator;
    private readonly amountRequireMsg: Locator;
    private readonly accountNumberRequireMsg: Locator;
    private readonly accountTypeRequireMsg: Locator;
    private readonly routingNumberRequireMsg: Locator;
    private readonly amountDirectRequireMsg: Locator;

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
        this.errorForAmount = page.getByText('Should be within Min/Max values', { exact: true })
        this.componentRequireMsg = page.locator("(//label[text()='Salary Component']/following::span)[1]")
        this.currencyRequireMsg = page.locator("(//label[text()='Currency']/following::span)[1]")
        this.amountRequireMsg = page.locator("(//label[text()='Amount']/following::span)[1]")
        this.accountNumberRequireMsg = page.locator("(//label[text()='Account Number']/following::span)[1]")
        this.accountTypeRequireMsg = page.locator("(//label[text()='Account Type']/following::span)[1]")
        this.routingNumberRequireMsg = page.locator("(//label[text()='Routing Number']/following::span)[1]")
        this.amountDirectRequireMsg = page.locator("(//label[text()='Routing Number']/following::span)[2]")
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

    async fillSalaryDetailsAndSave(salaryData: any): Promise<void> {

        return await this.pageStep("Fill salary data", async () => {

            const salaryArray = Array.isArray(salaryData)
                ? salaryData
                : [salaryData];

            for (const salartVal of salaryArray) {
                await this.salaryDetailsCard.waitFor({ state: 'visible' })
                await expect(this.addSalaryBtn).toBeVisible();
                await this.addSalaryBtn.click();
                await this.salaryComponent.fill(salartVal.component);
                if (salartVal.payGrade !== "") {
                    await this.payGrade.click().then(async () => {
                        await this.page.getByText(salartVal.payGrade, { exact: true }).click();
                    })
                }

                if (salartVal.payFrequency !== "") {
                    await this.payFrequency.click().then(async () => {
                        await this.page.getByText(salartVal.payFrequency, { exact: true }).click();
                    })
                }


                if (salartVal.Currency !== "") {
                    await this.currency.click().then(async () => {
                        await this.page.getByText(salartVal.Currency, { exact: true }).click();
                    })

                }

                await this.amount.fill(salartVal.amount);

                await this.comment.fill(salartVal.comment);

                if (salartVal.directDeposit) {
                    const depositCheck = await this.directDepositToggle.isChecked();
                    if (!depositCheck) {
                        await this.directDepositToggle.click();
                    }
                    await this.accountNumber.fill(salartVal.accountNumber)

                    if (salartVal.accountType !== "") {
                        await this.accountType.click().then(async () => {
                            await this.page.getByText(salartVal.accountType, { exact: true }).click();
                        })
                    }


                    await this.routingNumber.fill(salartVal.routingNumber)

                    await this.amountDeposit.fill(salartVal.amountVal)
                }

                await this.saveBtn.click();
            }

        })

    }

    async clickOnSave(): Promise<void> {
        return await this.pageStep("Click on Save after filling salary data", async () => {
            await this.saveBtn.click();
        })
    }

    async validateErrorForAmount(): Promise<void> {
        return await this.pageStep("Validate error message when the amont balance is more than maximum", async () => {
            await expect(this.errorForAmount).toBeVisible();
        })
    }

    async validateErrorForRequiredFields(): Promise<void> {
        return await this.pageStep("Validate error message when the amont balance is more than maximum", async () => {
            let flag = true;

            await expect(this.componentRequireMsg).toHaveText("Required");

            if (await this.componentRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for SalaryComponent is not visible")
            }
            if (await this.currencyRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for Currency is not visible")
            }
            if (await this.amountRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for Amount is not visible")
            }
            if (await this.accountNumberRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for Account Number is not visible")
            }
            if (await this.accountTypeRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for Account type is not visible")
            }
            if (await this.routingNumberRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for Routing number is not visible")
            }
            if (await this.amountDirectRequireMsg.textContent() !== "Required") {
                flag = false;
                this.logger.error("Required message for Amount is not visible")
            }

            expect(flag).toBeTruthy();
        })
    }

}




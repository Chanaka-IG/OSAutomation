import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import { Logger } from '../../Fixtures/logger.fixtures';
import type { employee, salaryComponent } from '../../data/PIM/salaryDetails'
import path from 'path/win32';



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
    private readonly saveBtnForAttchment: Locator;
    private readonly errorForAmount: Locator;
    private readonly componentRequireMsg: Locator;
    private readonly currencyRequireMsg: Locator;
    private readonly amountRequireMsg: Locator;
    private readonly accountNumberRequireMsg: Locator;
    private readonly accountTypeRequireMsg: Locator;
    private readonly routingNumberRequireMsg: Locator;
    private readonly amountDirectRequireMsg: Locator;
    private readonly salaryComponentTable: Locator;
    private readonly deleteSelectedBtn: Locator;
    private readonly browseBtn: Locator;
    private readonly addAttachmentBtn: Locator;
    private readonly attachmentTable: Locator;



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
        this.saveBtnForAttchment = page.getByRole('button', { name: 'Save' }).nth(1);
        this.errorForAmount = page.getByText('Should be within Min/Max values', { exact: true })
        this.componentRequireMsg = page.locator("(//label[text()='Salary Component']/following::span)[1]")
        this.currencyRequireMsg = page.locator("(//label[text()='Currency']/following::span)[1]")
        this.amountRequireMsg = page.locator("(//label[text()='Amount']/following::span)[1]")
        this.accountNumberRequireMsg = page.locator("(//label[text()='Account Number']/following::span)[1]")
        this.accountTypeRequireMsg = page.locator("(//label[text()='Account Type']/following::span)[1]")
        this.routingNumberRequireMsg = page.locator("(//label[text()='Routing Number']/following::span)[1]")
        this.amountDirectRequireMsg = page.locator("(//label[text()='Routing Number']/following::span)[2]")
        this.salaryComponentTable = page.locator(".oxd-table-decorator-card")
        this.deleteSelectedBtn = page.getByRole('button', { name: ' Delete Selected ' })
        this.browseBtn = page.getByText('Browse', { exact: true })
        this.addAttachmentBtn = page.locator("(//h6[text()='Attachments']/following::button)[1]")
        this.attachmentTable = page.locator(".oxd-table-body").nth(1)
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
                        await this.page.getByRole('option', { name: salartVal.payGrade, exact: true }).click();
                    })
                }

                if (salartVal.payFrequency !== "") {
                    await this.payFrequency.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.payFrequency, exact: true }).click();
                    })
                }


                if (salartVal.Currency !== "") {
                    await this.currency.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.Currency, exact: true }).click();
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
                            await this.page.getByRole('option', { name: salartVal.accountType, exact: true }).click();
                        })
                    }


                    await this.routingNumber.fill(salartVal.routingNumber)

                    await this.amountDeposit.fill(salartVal.amountVal)
                }

                await this.saveBtn.click();
            }

        })

    }

    async updateDetailsAndSave(salaryData: any): Promise<void> {

        return await this.pageStep("Fill salary data", async () => {


            const salaryArray = Array.isArray(salaryData)
                ? salaryData
                : [salaryData];

            await this.page.waitForTimeout(3000)

            for (const salartVal of salaryArray) {
                await this.salaryDetailsCard.waitFor({ state: 'visible' })
                await this.salaryComponent.fill(salartVal.component);
                if (salartVal.payGrade !== "") {
                    await this.payGrade.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.payGrade, exact: true }).click();
                    })
                }

                if (salartVal.payFrequency !== "") {
                    await this.payFrequency.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.payFrequency, exact: true }).click();
                    })
                }


                if (salartVal.Currency !== "") {
                    await this.currency.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.Currency, exact: true }).click();
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
                            await this.page.getByRole('option', { name: salartVal.accountType, exact: true }).click();
                        })
                    }


                    await this.routingNumber.fill(salartVal.routingNumber)

                    await this.amountDeposit.fill(salartVal.amountVal)
                }

                await this.saveBtn.click();
            }

        })

    }

    async fillMultipleSalaryDetailsAndSave(salaryData: any): Promise<void> {

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
                        await this.page.getByRole('option', { name: salartVal.payGrade, exact: true }).click();
                    })
                }

                if (salartVal.payFrequency !== "") {
                    await this.payFrequency.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.payFrequency, exact: true }).click();
                    })
                }


                if (salartVal.Currency !== "") {
                    await this.currency.click().then(async () => {
                        await this.page.getByRole('option', { name: salartVal.Currency, exact: true }).click();
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
                            await this.page.getByRole('option', { name: salartVal.accountType, exact: true }).click();
                        })
                    }
                    await this.routingNumber.fill(salartVal.routingNumber)

                    await this.amountDeposit.fill(salartVal.amountVal)
                }

                await this.saveBtn.click();
                await this.verifySuccessToastForSave();
                await this.waitUntilTableLoaderDissapear();
                await this.waitUntilFormLoaderDissapear();
            }

        })

    }

    async clickOnSaveBtn(): Promise<void> {
        return await this.pageStep("Click on Save after filling salary data", async () => {
            await this.saveBtn.click();
        })
    }

    async clickOnSaveforAttachment(): Promise<void> {
        return await this.pageStep("Click on Save after filling attachment", async () => {
            await this.saveBtnForAttchment.click();
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


    async validateSalaryData(salaryData: any): Promise<void> {

        return await this.pageStep("Validate salary data in the table", async () => {

            await this.page.waitForTimeout(3000);
            for (const salaryValue of salaryData) {
                const row = this.page.locator(".oxd-table-row")
                    .filter({ hasText: salaryValue.component })
                    .filter({ hasText: salaryValue.amount })
                    .filter({ hasText: salaryValue.Currency })
                    .filter({ hasText: salaryValue.payFrequency })
                    .filter({ hasText: salaryValue.amountVal })

                const rowCount = await row.count();

                if (rowCount !== 1) {
                    this.logger.error(`Mismatch found with following set - ${salaryValue.component}`
                    )
                }
                await expect(row).toHaveCount(1);
            }
        })



    }

    async deleteSalaryComponent(salaryComponent: any): Promise<void> {

        return await this.pageStep("Delete one salary componenet from the table", async () => {
            await this.page.waitForTimeout(4000)

            const selectedRow = this.page.locator(".oxd-table-row")
                .filter({ hasText: salaryComponent.component })
                .filter({ hasText: salaryComponent.amount })
                .filter({ hasText: salaryComponent.Currency })
                .filter({ hasText: salaryComponent.payFrequency })
                .filter({ hasText: salaryComponent.amountVal });


            await selectedRow.locator('button:has(.bi-trash)').click();
            await this.clickYesDeleteBtn();
        })


    }

    async clickOnEditIcon(salaryComponent: any): Promise<void> {

        return await this.pageStep("Click on Edit icon for salary componenet from the table", async () => {
            await this.page.waitForTimeout(4000)

            const selectedRow = this.page.locator(".oxd-table-row")
                .filter({ hasText: salaryComponent.component })
                .filter({ hasText: salaryComponent.amount })
                .filter({ hasText: salaryComponent.Currency })
                .filter({ hasText: salaryComponent.payFrequency })
                .filter({ hasText: salaryComponent.amountVal });


            await selectedRow.locator('button:has(.bi-pencil-fill)').click();
        })


    }

    async clickYesDeleteBtn(): Promise<void> {
        return await this.pageStep("Click on yesDelete button", async () => {
            const confirmPopup = this.page.locator(".oxd-sheet")
            await confirmPopup.waitFor({ state: 'visible' })
            await confirmPopup.getByRole('button', { name: ' Yes, Delete ' }).click();
        })
    }


    async deleteMultipleSalaryComponent(salaryComponent: any): Promise<void> {

        return await this.pageStep("Delete one multiple componenet from the table", async () => {
            await this.page.waitForTimeout(4000)

            const salaryArray = Array.isArray(salaryComponent)
                ? salaryComponent
                : [salaryComponent];

            for (const salVal of salaryArray) {

                const selectedRow = this.page.locator(".oxd-table-row")
                    .filter({ hasText: salVal.component })
                    .filter({ hasText: salVal.amount })
                    .filter({ hasText: salVal.Currency })
                    .filter({ hasText: salVal.payFrequency })
                    .filter({ hasText: salVal.amountVal });

                await selectedRow.locator("//i[contains(@class,'oxd-icon bi-check')]").click();
            }
        })


    }

    async validateAfterDeletion(salaryComponent: any): Promise<void> {

        return await this.pageStep("Validate the salary component in the table after deletion", async () => {

            await this.waitUntilTableLoaderDissapear();
            const salaryArray = Array.isArray(salaryComponent)
                ? salaryComponent
                : [salaryComponent];

            let selectedRowcount: number = 0;

            for (const salVal of salaryArray) {
                let selectedRow = this.page.locator(".oxd-table-row")
                    .filter({ hasText: salVal.component })
                    .filter({ hasText: salVal.amount })
                    .filter({ hasText: salVal.Currency })
                    .filter({ hasText: salVal.payFrequency })
                    .filter({ hasText: salVal.amountVal });

                if (await selectedRow.isVisible()) {
                    selectedRowcount++;
                }

            }
            expect(selectedRowcount).toBe(0);
        })


    }


    async clickDeleteSelectedBtn(): Promise<void> {
        return await this.pageStep("Click on delete selected button", async () => {
            await this.deleteSelectedBtn.click();
        })
    }

    async uploadAttachment(attachmentPath: string): Promise<void> {
        return await this.pageStep("Upload an attachment", async () => {
            await this.addAttachmentBtn.click();
            const [fileChoose] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.browseBtn.click()

            ])
            const filePath = path.join(__dirname, attachmentPath).replace(/\\/g, '/');
            await fileChoose.setFiles(filePath)
        })
    }

    async validateAttachmentArea(): Promise<void> {
        return await this.pageStep("Attachment area validation", async () => {
            const fileName = "test-upload-attachment.pdf";

            await this.attachmentTable.waitFor({state: 'visible'});
            const attachmentTable = this.page.locator(".oxd-table-body").nth(1);
            const row = await attachmentTable.locator(".oxd-table-row").filter({hasText: fileName}).count();
            expect (row).toBe(1);
        })
    }


}




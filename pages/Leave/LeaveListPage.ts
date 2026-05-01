import { BasePage } from "../Base/BasePage";
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { Locator, Page } from "playwright-core";
import type { FilterData, ValidateData } from '../../data/Leave/leaveList'

export class LeaveListPage extends BasePage {

    private logger: Logger;
    private readonly leaveMenu: Locator;
    private readonly filterArea: Locator;
    private readonly fromDatePicker: Locator;
    private readonly toDatePicker: Locator;
    private readonly statusDropdwon: Locator;
    private readonly leaveTypeDropdown: Locator;
    private readonly subUnitDropdown: Locator;
    private readonly includePastEmployees: Locator;
    private readonly nameInput: Locator;
    private readonly searchBtn: Locator;
    private readonly addCommentBtn: Locator;
    private readonly viewLeaveBtn: Locator;
    private readonly viewPimInfoBtn: Locator;
    private readonly commentSectionHeader: Locator;
    private readonly pendingApprovalRemove: Locator;
    private readonly commentInput: Locator;
    private readonly saveButton: Locator;
    private readonly pimContent: Locator;


    constructor(page: Page, logger: Logger) {
        super(page)
        this.logger = logger;
        this.leaveMenu = page.getByRole("link", { name: 'Leave' })
        this.filterArea = page.locator(".oxd-table-filter-area")
        this.fromDatePicker = page.locator('//label[text()="From Date"]//following::i').first();
        this.toDatePicker = page.locator('//label[text()="To Date"]//following::i').first();
        this.statusDropdwon = page.locator('//label[text()="Show Leave with Status"]//following::div').nth(2)
        this.leaveTypeDropdown = page.locator('//label[text()="Leave Type"]//following::div').first();
        this.subUnitDropdown = page.locator('//label[text()="Sub Unit"]//following::div').first();
        this.includePastEmployees = page.locator("(//input[@type='checkbox']/following-sibling::span)[1]")
        this.nameInput = page.locator("//label[text()='Employee Name']/following::input").nth(0)
        this.searchBtn = page.getByRole('button', { name: "Search" })
        this.pendingApprovalRemove = page.locator("//span[normalize-space(text())='Pending Approval']//following::i").first();
        this.addCommentBtn = page.getByText('Add Comment', { exact: true })
        this.commentSectionHeader = page.getByText('Leave Request Comments', { exact: true })
        this.commentInput = page.getByRole('textbox', { name: 'Comment here' });
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.viewLeaveBtn = page.getByText('View Leave Details', { exact: true })
        this.viewPimInfoBtn = page.getByText('View PIM Info', { exact: true })
        this.pimContent = page.locator('.orangehrm-edit-employee')
    }

    async navigateToLeave(): Promise<void> {
        return await this.pageStep("Navigate to Leave Page", async () => {
            await this.leaveMenu.click();
        })
    }


    async fillFilterValues(filterValues: FilterData): Promise<void> {
        return await this.pageStep("Fill the filter values", async () => {
            await this.filterArea.waitFor({ state: 'visible' })
            await this.pickDateFromDatePicker(filterValues.fromDate, this.fromDatePicker);
            await this.pickDateFromDatePicker(filterValues.toDate, this.toDatePicker);

            if (filterValues.includePastEmployee) {
                await this.onPastEmployees();
            }

            if (filterValues.status.length > 0) {
                await this.selectLeaveStatus(filterValues.status);
            }
            if (filterValues.leaveType !== "") {
                await this.selectLeaveType(filterValues.leaveType);
            }
            if (filterValues.employeeName !== "") {
                await this.selectName(filterValues.employeeName);
            }
            if (filterValues.subUnit !== "") {
                await this.selectSubUnit(filterValues.subUnit);
            }

        })
    }

    async selectLeaveStatus(status: string[]): Promise<void> {
        return await this.pageStep("Select leave status", async () => {
            await this.pendingApprovalRemove.click();
            for (const statusListValues of status) {
                await this.statusDropdwon.click();
                await this.page.getByRole('option', { name: statusListValues }).click();
            }
        })
    }

    async selectLeaveType(leaveType: string): Promise<void> {
        return await this.pageStep("Select leave type", async () => {
            await this.leaveTypeDropdown.click();
            await this.page.getByRole('option', { name: leaveType }).click();
        })
    }

    async selectName(name: string): Promise<void> {
        return await this.pageStep("Select employee name", async () => {
            await this.nameInput.fill(name);
            await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
            await this.page.locator('.oxd-autocomplete-dropdown').getByText(name).click();
        })
    }


    async selectSubUnit(subUnit: string): Promise<void> {
        return await this.pageStep("Select sub unit", async () => {
            await this.subUnitDropdown.click();
            await this.page.getByRole('option', { name: subUnit }).click();
        })
    }

    async onPastEmployees(): Promise<void> {
        return await this.pageStep("Turn on past employee check", async () => {
            await this.includePastEmployees.click()
        })
    }

    async clickOnSearchBtn(): Promise<void> {
        return await this.pageStep("Turn on past employee check", async () => {
            await this.searchBtn.click()
        })
    }

    async validateDataIntheTable(validateValues: any): Promise<void> {
        return await this.pageStep("Turn on past employee check", async () => {
            let values = Array.isArray(validateValues) ? validateValues : [validateValues];
            for (const val of values) {
                const row = await this.page.getByRole("row")
                    .filter({ hasText: val.date })
                    .filter({ hasText: val.name })
                    .filter({ hasText: val.leaveType })
                    .filter({ hasText: val.balance })
                    .filter({ hasText: val.days })
                    .filter({ hasText: val.validateStatus })
                    .filter({ hasText: val.comment }).count()
                expect(row).toBe(1);
            }
        })
    }
    async approveLeave(validateValues: any): Promise<void> {
        return await this.pageStep("Appr", async () => {
            let values = Array.isArray(validateValues) ? validateValues : [validateValues];
            await this.page.getByRole('table').waitFor({ state: 'visible' })
            for (const val of values) {
                const row = this.page.getByRole("row")
                    .filter({ hasText: val.date })
                    .filter({ hasText: val.name })
                    .filter({ hasText: val.leaveType })
                    .filter({ hasText: val.balance })
                    .filter({ hasText: val.days })
                    .filter({ hasText: val.validateStatus })

                if (await row.isVisible()) {
                    await row.getByRole('button', { name: 'Approve' }).click();
                }
                await this.waitUntilTableLoaderDissapear();
                this.verifySuccessToastForUpdateAndClose();
            }

        })
    }

    async rejectLeave(validateValues: any): Promise<void> {
        return await this.pageStep("Click on reject leave", async () => {
            let values = Array.isArray(validateValues) ? validateValues : [validateValues];
            await this.page.getByRole('table').waitFor({ state: 'visible' })
            for (const val of values) {
                const row = this.page.getByRole("row")
                    .filter({ hasText: val.date })
                    .filter({ hasText: val.name })
                    .filter({ hasText: val.leaveType })
                    .filter({ hasText: val.balance })
                    .filter({ hasText: val.days })
                    .filter({ hasText: val.validateStatus })

                if (await row.isVisible()) {
                    await row.getByRole('button', { name: 'Reject' }).click();
                }
                await this.waitUntilTableLoaderDissapear();
                this.verifySuccessToastForUpdateAndClose();
            }

        })
    }
    async selectAndClickOnDots(validateValues: any): Promise<void> {
        return await this.pageStep("Select and click on dots", async () => {
            let values = Array.isArray(validateValues) ? validateValues : [validateValues];
            await this.page.getByRole('table').waitFor({ state: 'visible' })
            for (const val of values) {
                const row = this.page.getByRole("row")
                    .filter({ hasText: val.date })
                    .filter({ hasText: val.name })
                    .filter({ hasText: val.leaveType })
                    .filter({ hasText: val.balance })
                    .filter({ hasText: val.days })
                    .filter({ hasText: val.validateStatus })

                if (await row.isVisible()) {
                    await row.locator('.bi-three-dots-vertical').click();
                }
                await this.waitUntilTableLoaderDissapear();
            }

        })
    }

    async validateDataIntheFullView(validateValues: any): Promise<void> {
        return await this.pageStep("Select and click on dots", async () => {
            await expect(
                this.page.locator("(//p[contains(@class,'oxd-text oxd-text--p')])[1]")
            ).toHaveText(validateValues.name);

            await expect(
                this.page.locator("(//p[contains(@class,'oxd-text oxd-text--p')])[2]")
            ).toHaveText(validateValues.leaveRequest);
            let values = Array.isArray(validateValues) ? validateValues : [validateValues];
            await this.page.getByRole('table').waitFor({ state: 'visible' })
            for (const val of values) {
                const row = await this.page.getByRole("row")
                    .filter({ hasText: val.date })
                    .filter({ hasText: val.leaveType })
                    .filter({ hasText: val.balance })
                    .filter({ hasText: val.duration })
                    .filter({ hasText: val.validateStatus }).count();

                expect(row).toBe(1);
            }
        })
    }

    async clickOnAddComment(): Promise<void> {
        return await this.pageStep("Click on add comment", async () => {
            await this.addCommentBtn.waitFor({ state: 'visible' }).then(async () => {
                await this.addCommentBtn.click()
            })
        })
    }

    async clickviewLeaveDetails(): Promise<void> {
        return await this.pageStep("Click on view details menu", async () => {
            await this.viewLeaveBtn.waitFor({ state: 'visible' }).then(async () => {
                await this.viewLeaveBtn.click()
            })
        })
    }

    async viewPimInfor(): Promise<void> {
        return await this.pageStep("Click on pim information", async () => {
            await this.viewPimInfoBtn.waitFor({ state: 'visible' }).then(async () => {
                await this.viewPimInfoBtn.click()
            })
        })
    }

    async validatePIMScreen(employeeName: string): Promise<void> {
        return await this.pageStep("Click on pim information", async () => {
            await this.pimContent.waitFor({ state: 'visible' }).then(async () => {
                await expect(this.pimContent).toBeVisible();
            })
        })
    }

    async addCommentAndSave(comment: string): Promise<void> {
        return await this.pageStep("Add comment and save", async () => {
            await this.commentSectionHeader.waitFor({ state: 'visible' }).then(async () => {
                await this.commentInput.fill(comment)
                await this.saveButton.click();
            })
        })
    }
}

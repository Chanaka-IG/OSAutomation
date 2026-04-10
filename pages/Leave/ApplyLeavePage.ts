import { BasePage } from "../Base/BasePage";
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { Locator, Page } from "playwright-core";
import type { LeaveBalancePopup, ApplyLeave } from '../../data/Leave/applyLeave'

export class ApplyLeavePage extends BasePage {

    private readonly logger: Logger;
    private readonly leaveMenu: Locator;
    private readonly applyMenu: Locator;
    private readonly leaveTypeDropdown: Locator;
    private readonly leaveBalance: Locator;
    private readonly popupQuestion: Locator;
    private readonly leavePopup: Locator;
    private readonly formDate: Locator;
    private readonly toDate: Locator;
    private readonly durationDropdown: Locator;
    private readonly comment: Locator;
    private readonly applyBtn: Locator;

    constructor(page: Page, logger: Logger) {
        super(page)
        this.logger = logger;
        this.leaveMenu = page.getByRole("link", { name: 'Leave' })
        this.applyMenu = page.getByRole('link', { name: 'Apply', exact: true })
        this.leaveTypeDropdown = page.locator('(//label[text()="Leave Type"]/following::div[1])').nth(0);
        this.leaveBalance = page.locator('(//label[text()="Leave Balance"]/following::p)').nth(0);
        this.popupQuestion = page.locator('//label[text()="Leave Balance"]/following::i').nth(0)
        this.leavePopup = page.locator(".oxd-sheet");
        this.formDate = page.locator('(//label[text()="From Date"]/following::div[1])');
        this.toDate = page.locator('(//label[text()="To Date"]/following::div[1])');
        this.durationDropdown = page.locator('//label[text()="Duration"]/following::div[1]')
        this.comment = page.locator('//label[text()="Comments"]/following::textarea')
        this.applyBtn = page.getByRole('button', { name: 'Apply' })
    }

    async navigateToLeave(): Promise<void> {
        return await this.pageStep("Navigate to Leave Page", async () => {
            await this.leaveMenu.click();
        })
    }


    async navigateToApplyLeave(): Promise<void> {
        return await this.pageStep("Navigate to Apply screen", async () => {
            await this.applyMenu.click();
        })
    }

    async fillApplyLeaveForm(leaveData: ApplyLeave): Promise<void> {
        return await this.pageStep("Fill apply leave form", async () => {
            await this.selectLeaveType(leaveData.leaveType);
            await this.selectDates(leaveData.period);
            await this.selectDuration(leaveData.duration);
            await this.fillComment(leaveData.comment);
        })
    }

    async selectLeaveType(leaveType: string): Promise<void> {
        return await this.pageStep("Select the leave type from the dropdown", async () => {
            await this.leaveTypeDropdown.click();
            await this.page.getByRole('option', { name: leaveType }).click();
        })
    }

    async selectDates(period: string): Promise<void> {
        return await this.pageStep("Select dates from the date picker", async () => {
            if (period === "Past-same date only") {
                const today = new Date();
                const twoWeeksAgo = new Date(today);
                twoWeeksAgo.setDate(today.getDate() - 14);
                const formattedFromTODate = twoWeeksAgo.toISOString().split('T')[0];  //get the date in yyyy-mm-dd format exactly two week before date
                await this.pickDateFromDatePicker(formattedFromTODate, this.formDate);
                await this.pickDateFromDatePicker(formattedFromTODate, this.toDate);
            }
            else if (period === "Future-same date only") {
                const today = new Date();
                const twoWeeksAfter = new Date(today);
                twoWeeksAfter.setDate(today.getDate() + 14);
                const formattedFromTODate = twoWeeksAfter.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedFromTODate, this.formDate);
                await this.pickDateFromDatePicker(formattedFromTODate, this.toDate);
            }
            else if (period === "Today-only"){
                const today = new Date();
                const formattedTodayDate = today.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedTodayDate, this.formDate);
                await this.pickDateFromDatePicker(formattedTodayDate, this.toDate);
            }
        })
    }

    async selectDuration(duration: string): Promise<void> {
        return await this.pageStep("Select duration from the dropdown", async () => {
            if (duration === "Full Day") {
                await this.durationDropdown.click();
                await this.page.getByRole('option', { name: 'Full Day' }).click();
            }
            else if (duration === "Half Day - Morning") {
                await this.durationDropdown.click();
                await this.page.getByRole('option', { name: 'Half Day - Morning' }).click();
            }
            else if (duration === "Half Day - Afternoon") {
                await this.durationDropdown.click();
                await this.page.getByRole('option', { name: 'Half Day - Afternoon' }).click();
            }
            else {
                //will add it later
            }
        })
    }


    async fillComment(comment: string): Promise<void> {
        return await this.pageStep("Fill the comment section", async () => {
            await this.comment.fill(comment)

        })
    }

    async validateLeaveBalance(leaveBalance: number): Promise<void> {
        return await this.pageStep("Select the leave type from the dropdown", async () => {
            await this.page.waitForTimeout(3000)
            expect(this.leaveBalance).toHaveText(leaveBalance.toFixed(2) + " Day(s)");

        })
    }

    async validateLeaveBalancePopup(balancePopup: LeaveBalancePopup): Promise<void> {
        return await this.pageStep("Select the leave type from the dropdown", async () => {
            const today = new Date().toISOString().split("T")[0];
            await this.page.waitForTimeout(2000)
            await this.popupQuestion.click();
            await this.leavePopup.waitFor({ state: 'visible' })
            const takenRow = this.leavePopup.getByRole('row', { name: 'Taken' })
            const sheduleRow = this.leavePopup.getByRole('row', { name: 'Scheduled' })
            const pendingRow = this.leavePopup.getByRole('row', { name: 'Pending Approval' })
            expect(this.leavePopup.locator('//h6[text()="Leave Balance Details"]/following::p').nth(0)).toHaveText(`As of Date - ${today}`)
            expect(this.leavePopup.locator('//label[text()="Employee Name"]/following::p').first()).toHaveText(balancePopup.employeeName)
            expect(this.leavePopup.locator('//label[text()="Leave Type"]/following::p').nth(0)).toHaveText(balancePopup.leaveType)
            expect(this.leavePopup.locator('//label[text()="Total Entitlement"]/following::p').nth(0)).toHaveText(`${balancePopup.totalEntitlement.toFixed(2)} Day(s)`)
            expect(this.leavePopup.locator('//label[text()="Balance"]/following::p').nth(0)).toHaveText(`${balancePopup.balance.toFixed(2)} Day(s)`)
            expect(takenRow.getByRole('cell').nth(1)).toHaveText(balancePopup.taken.toFixed(2))
            expect(sheduleRow.getByRole('cell').nth(1)).toHaveText(balancePopup.shedule.toFixed(2))
            expect(pendingRow.getByRole('cell').nth(1)).toHaveText(balancePopup.pendingApproval.toFixed(2))

            await this.leavePopup.getByRole('button', { name: 'Ok' }).click();
        })
    }

    async clickOnApplyBtn(): Promise<void> {
        return await this.pageStep("Click on Apply button", async () => {
            await this.applyBtn.click();
        })
    }
}



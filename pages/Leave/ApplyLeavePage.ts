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
    private readonly partialDays: Locator;
    private readonly startDay: Locator;
    private readonly fromTime: Locator;
    private readonly toTime: Locator;
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
        this.fromTime = page.getByPlaceholder('hh:mm').nth(0)
        this.toTime = page.getByPlaceholder('hh:mm').nth(1)
        this.durationDropdown = page.locator('//label[text()="Duration"]/following::div[1]')
        this.partialDays = page.locator('//label[text()="Partial Days"]/following::div[1]')
        this.startDay = page.locator('//label[text()="Start Day"]/following::div[1]')
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
            if (leaveData.partialDays !== "") {
                await this.selectPartialDay(leaveData.partialDays);
            }
            if (leaveData.duration !== "") {
                await this.selectDuration(leaveData.duration);
            }
            if (leaveData.startDay !== "") {
                await this.selectStartDay(leaveData.duration);
            }
            if (leaveData.fromTime !== "" && leaveData.fromTime !== undefined) {
                await this.selectFromTime(leaveData.fromTime);
            }
            if (leaveData.toTime !== "" && leaveData.toTime !== undefined) {
                await this.selectToTime(leaveData.toTime);
            }

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

            console.log("Testing period" + period)

            if (period === "Past-same date only" || "Specify time for past") {
                const today = new Date();
                const mondayThisWeek = new Date(today);
                mondayThisWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
                const mondayWeekBeforeLast = new Date(mondayThisWeek);
                mondayWeekBeforeLast.setDate(mondayThisWeek.getDate() - 14);
                const formattedFromTODate = mondayWeekBeforeLast.toISOString().split('T')[0];  //get the date in yyyy-mm-dd format exactly two week before date
                await this.pickDateFromDatePicker(formattedFromTODate, this.formDate);
                await this.pickDateFromDatePicker(formattedFromTODate, this.toDate);
            }
            else if (period === "Future-same date only") {
                const today = new Date();
                const mondayThisWeek = new Date(today);
                mondayThisWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
                const mondayWeekAfterNext = new Date(mondayThisWeek);
                mondayWeekAfterNext.setDate(mondayThisWeek.getDate() + 14);
                const formattedFromTODate = mondayWeekAfterNext.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedFromTODate, this.formDate);
                await this.pickDateFromDatePicker(formattedFromTODate, this.toDate);
            }
            else if (period === "Today-only") {
                const today = new Date();
                const formattedTodayDate = today.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedTodayDate, this.formDate);
                await this.pickDateFromDatePicker(formattedTodayDate, this.toDate);
            }
            else if (period === "Past(Morning Half)-same date only") {
                const today = new Date();
                const tuesdayThisWeek = new Date(today);
                tuesdayThisWeek.setDate(today.getDate() - ((today.getDay() + 5) % 7));
                const tuesdayBeforePast = new Date(tuesdayThisWeek);
                tuesdayBeforePast.setDate(tuesdayBeforePast.getDate() - 14);
                const formattedTodayDate = tuesdayBeforePast.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedTodayDate, this.formDate);
                await this.pickDateFromDatePicker(formattedTodayDate, this.toDate);
            }
            else if (period === "Future(Afternoon Half)-same date only") {
                const today = new Date();
                const mondayThisWeek = new Date(today);
                mondayThisWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
                const mondayWeekAfterNext = new Date(mondayThisWeek);
                mondayWeekAfterNext.setDate(mondayThisWeek.getDate() + 7);
                const formattedTodayDate = mondayWeekAfterNext.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedTodayDate, this.formDate);
                await this.pickDateFromDatePicker(formattedTodayDate, this.toDate);
            }
            else if (period === "Past multiple for All") {
                const today = new Date();
                const mondayThisWeek = new Date(today);
                mondayThisWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
                const mondayLastWeek = new Date(mondayThisWeek);
                mondayLastWeek.setDate(mondayThisWeek.getDate() - 7);
                const fridayLastWeek = new Date(mondayLastWeek);
                fridayLastWeek.setDate(mondayLastWeek.getDate() + 4);
                const formattedFromyDate = mondayLastWeek.toISOString().split('T')[0];
                const formattedToyDate = fridayLastWeek.toISOString().split('T')[0];
                await this.pickDateFromDatePicker(formattedFromyDate, this.formDate);
                await this.pickDateFromDatePicker(formattedToyDate, this.toDate);
            }
            else if (period === "Multiple for All (Current)") {
                const today = new Date();
                const monday = new Date(today);
                monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
                const friday = new Date(monday);
                friday.setDate(monday.getDate() + 4);
                const formattedFromyDate = monday.toISOString().split('T')[0];
                const formattedToyDate = friday.toISOString().split('T')[0];
                console.log(formattedFromyDate)
                console.log(formattedToyDate)
                await this.pickDateFromDatePicker(formattedFromyDate, this.formDate);
                await this.pickDateFromDatePicker(formattedToyDate, this.toDate);
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
                await this.durationDropdown.click();
                await this.page.getByRole('option', { name: 'Specify Time' }).click();
            }
        })
    }

    async selectPartialDay(partialDay: string): Promise<void> {
        return await this.pageStep("Select duration from the dropdown", async () => {
            if (partialDay === "All Days") {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'All Days', exact: true }).click();
            }
            else if (partialDay === "Start Day Only") {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'Start Day Only', exact: true }).click();
            }
            else if (partialDay === "End Day Only") {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'End Day Only', exact: true }).click();
            }
            else {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'Specify Time', exact: true }).click();
            }
        })
    }


    async selectStartDay(startDay: string): Promise<void> {
        return await this.pageStep("Select duration from the dropdown", async () => {
            if (startDay === "Half Day - Morning") {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'Half Day - Morning', exact: true }).click();
            }
            else if (startDay === "Start Day Only") {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'Half Day - Afternoon', exact: true }).click();
            }
            else {
                await this.partialDays.click();
                await this.page.getByRole('option', { name: 'Specify Time', exact: true }).click();
            }
        })
    }



    async selectFromTime(fromtime: string): Promise<void> {
        return await this.pageStep("Select from time", async () => {
            await this.fromTime.fill(fromtime);
        })
    }

    async selectToTime(totime: string): Promise<void> {
        return await this.pageStep("Select from time", async () => {
            await this.toTime.fill(totime);
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



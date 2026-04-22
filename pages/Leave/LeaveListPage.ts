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
    private readonly pendingApprovalRemove : Locator;

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
            let values = Array.isArray(validateValues)  ? validateValues : [validateValues];
            for (const val of values) {
                const row = await this.page.getByRole("row")
                .filter({hasText : val.date})
                .filter({hasText : val.name})
                .filter({hasText : val.leaveType})
                .filter({hasText : val.balance})
                .filter({hasText : val.days})
                .filter({hasText : val.validateStatus})
                .filter({hasText : val.comment}).count()
            expect (row).toBe(1);
            }
        })
    }
}
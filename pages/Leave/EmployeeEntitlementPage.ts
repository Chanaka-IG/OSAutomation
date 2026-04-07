import { Page } from "@playwright/test"
import { BasePage } from "../Base/BasePage";
import { Logger, expect, Locator } from '../../Fixtures/logger.fixtures';
import type { FilterWithName,EntitlementData } from "../../data/Leave/employeeEntitlement"


export class EmployeeEntitlementPage extends BasePage {

    private readonly logger: Logger;
    private readonly leaveMenu: Locator;
    private readonly entitlementsMenu: Locator;
    private readonly employeeEntitlements: Locator;
    private readonly nameInput: Locator;
    private readonly leaveTypeDropDown: Locator;
    private readonly leavePeriodDropDown: Locator;
    private readonly searchBtn : Locator;

    constructor(page: Page, logger: any) {
        super(page)
        this.logger = logger;
        this.leaveMenu = page.getByRole("link", { name: 'Leave' })
        this.entitlementsMenu = page.getByLabel('Topbar Menu').getByText('Entitlements')
        this.employeeEntitlements = page.getByRole('menuitem', { name: 'Employee Entitlements' })
        this.nameInput = page.locator("//label[text()='Employee Name']/following::input").nth(0)
        this.leaveTypeDropDown = page.locator("//label[text()='Leave Type']/following::div").nth(0)
        this.leavePeriodDropDown = page.locator("//label[text()='Leave Period']/following::div").nth(0)
        this.searchBtn = page.getByRole('button', {name : "Search"})
    }

    async navigateToLeave(): Promise<void> {
        return await this.pageStep("Navigate to Leave Page", async () => {
            await this.leaveMenu.click();
        })
    }

    async navigateToEmplloyeeEntitlements(): Promise<void> {
        return await this.pageStep("Navigate to Entitlements List", async () => {
            await this.entitlementsMenu.click();
            await this.employeeEntitlements.click();

        })
    }


    async fillFilterValues(filterData: FilterWithName): Promise<void> {
        return await this.pageStep("Navigate to Entitlements List", async () => {
            if (filterData.name !== "") {
                await this.nameInput.fill(filterData.name);
                await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
                await this.page.locator('.oxd-autocomplete-dropdown').getByText(filterData.name).click();
            }

            if (filterData.leaveType !== "") {
                await this.leaveTypeDropDown.click();
                await this.page.getByRole('option', { name: filterData.leaveType }).click();
            }

             if (filterData.leavePeriod !== "") {
                //const currentPeriod = await this.leavePeriodDropDown.textContent();
                await this.leavePeriodDropDown.click();
                await this.page.getByRole('option', { name: filterData.leavePeriod }).click();
            }

        })
    }

    async clickOnSearchBtn(): Promise<void> {
        return await this.pageStep("Click on Search Button", async () => {
           await this.searchBtn.click();
        })
    }

    async validateEntitlementTable(addEntitlementData: EntitlementData): Promise<void> {
        await this.pageStep("Validate Entitlements", async () => {
            const [fromDate, toDate] = addEntitlementData.leavePeriod.split(" - ");
            await this.page.getByRole('table').waitFor({ state: 'visible' });
            const row = this.page.getByRole('row', { name: addEntitlementData.leaveType });
            if (await row.count() === 0) {
                throw new Error("Entitlement record not found for the employee");
            }
            await expect(row.getByRole('cell', { name: addEntitlementData.leaveType, exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: "Added", exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: fromDate, exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: toDate, exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: addEntitlementData.entitlements.toString(), exact: true })).toBeVisible();
        })
    }
}
import { BasePage } from "../Base/BasePage";
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { Locator, Page } from "playwright-core";
import type { AddEmployeeData, addEntitlementData } from '../../data/Leave/addEntitlement';

export class AddEntitlements extends BasePage {

    private logger: Logger;
    private readonly leaveMenu: Locator;
    private readonly entitlementsMenu: Locator;
    private readonly employeeEntitlements: Locator;
    private readonly addEntitlementsMenu: Locator;
    private readonly individualCheck: Locator;
    private readonly multipleCheck: Locator;
    private readonly nameInput: Locator;
    private readonly locationDropdown: Locator;
    private readonly leavePeriodDropdown: Locator;
    private readonly subUnitDropdown: Locator;
    private readonly leavePeriod: Locator;
    private readonly entitlementInput: Locator;
    private readonly saveButton: Locator;
    private readonly searchBtn: Locator;

    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.leaveMenu = page.getByRole("link", { name: 'Leave' })
        this.entitlementsMenu = page.getByLabel('Topbar Menu').getByText('Entitlements')
        this.employeeEntitlements = page.getByRole('menuitem', { name: 'Employee Entitlements' })
        this.addEntitlementsMenu = page.getByRole('menuitem', { name: 'Add Entitlements' })
        this.individualCheck = page.getByText('Individual Employee', {exact :true})
        this.multipleCheck = page.getByText("Multiple Employees", {exact  : true})
        this.nameInput = page.locator("//label[text()='Employee Name']/following::input").nth(0)
        this.locationDropdown = page.locator("//label[text()='Location']/following::div").nth(0)
        this.subUnitDropdown = page.locator("//label[text()='Sub Unit']/following::div").nth(0)
        this.leavePeriodDropdown = page.locator("//label[text()='Leave Type']/following::div").nth(0)
        this.leavePeriod = page.locator("//label[text()='Leave Period']/following::div").nth(0)
        this.entitlementInput = page.locator("//label[text()='Entitlement']/following::input").nth(0)
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.searchBtn = page.getByRole('button', { name: 'Search' })
    }

    async navigateToLeave(): Promise<void> {
        return await this.pageStep("Navigate to Leave Page", async () => {
            await this.leaveMenu.click();
        })
    }

    async navigateToEntitlements(): Promise<void> {
        return await this.pageStep("Navigate to Entitlements Page", async () => {
            await this.entitlementsMenu.click();
            await this.addEntitlementsMenu.click();

        })
    }

    async addEntitlements(addEntitlementData: addEntitlementData[], empData?: AddEmployeeData): Promise<void> {
        return await this.pageStep("Add Entitlements for Employee", async () => {
            for (const data of addEntitlementData) {
                if (empData) {
                    await this.selectAddTo(data, empData);
                }
                else {
                    await this.selectAddTo(data);
                }
                await this.selectLeaveType(data.leaveType);
                await this.selectLeavePeriod(data.leavePeriod);
                await this.entitlementInput.fill(data.entitlements.toString());
                await this.saveButton.click();
            }
        })
    }

    async selectAddTo(data: addEntitlementData, empData?: AddEmployeeData): Promise<void> {
        await this.pageStep(`Select Add To option as ${data.addTo}`, async () => {

            if (data.addTo === "Individual Employee") {
                await this.individualCheck.check();
                if (empData) {
                    await this.nameInput.fill(empData.firstName + " " + empData.middleName + " " + empData.lastName);
                    await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
                    await this.page.locator('.oxd-autocomplete-dropdown').getByText(empData.firstName + " " + empData.middleName + " " + empData.lastName).click();
                }

            } else {
                await this.multipleCheck.click();

                if (data.location !== "") {
                    await this.locationDropdown.click();
                    await this.page.getByRole('option', { name: data.location }).click();
                }
                if (data.subUnit !== "") {
                    await this.subUnitDropdown.click();
                    await this.page.getByRole('option', { name: data.subUnit }).click();
                }



            }
        })
    }

    async selectLeaveType(leaveType: string): Promise<void> {
        await this.pageStep(`Select Leave Type as ${leaveType}`, async () => {
            await this.leavePeriodDropdown.click();
            await this.page.getByRole('option', { name: leaveType }).click();
        })
    }

    async selectLeavePeriod(leavePeriod: string): Promise<void> {
        await this.pageStep(`Select Leave Period as ${leavePeriod}`, async () => {
            await this.leavePeriod.click();
            await this.page.getByRole('option', { name: leavePeriod }).click();

        })
    }

    async validateConfirmationPopup(entitlementValue: number): Promise<void> {
        await this.pageStep("Validate Confirmation Popup", async () => {
            const popup = this.page.locator('.oxd-sheet');
            await expect(popup.getByText('Updating Entitlement')).toBeVisible();
            await expect(popup.getByText(`Existing Entitlement value 0.00 will be updated to ${entitlementValue.toFixed(2)}`)).toBeVisible();
            await popup.getByRole('button', { name: 'Confirm' }).click();
        })
    }

    async validateConfirmationPopupForMultiple(validateData: any): Promise<void> {
        await this.pageStep("Validate Confirmation Popup", async () => {
            const popup = this.page.locator('.oxd-sheet');
            await expect(popup.getByText('Updating Entitlement - Matching Employees')).toBeVisible();
            await expect(popup.getByText("The selected leave entitlement will be applied to the following employees.")).toBeVisible();
            for (const data of validateData) {
                const row = this.page.getByRole('row', { name: data.employeeName });
                if (await row.count() === 0) {
                    throw new Error("Entitlement record not found for the employee : " + data.employeeName);
                }
                await expect(row.getByRole('cell', { name: data.employeeName, exact: true })).toBeVisible();
                await expect(row.getByRole('cell', { name: data.oldEntitlements.toFixed(2), exact: true })).toBeVisible();
                await expect(row.getByRole('cell', { name: data.newEntitlements.toFixed(2), exact: true })).toBeVisible();
            }
            await popup.getByRole('button', { name: 'Confirm' }).click();

        })
    }


    async navigateToEmployeeEntitlements(): Promise<void> {
        await this.pageStep("Navigate to Employee Entitlements", async () => {
            await this.entitlementsMenu.click();
            await this.employeeEntitlements.click();
        })
    }

    async selectSearchCriteria(empData: AddEmployeeData, addEntitlementData: addEntitlementData): Promise<void> {
        await this.pageStep("Select Search Criteria", async () => {
            await this.individualCheck.check();
            await this.nameInput.fill(empData.firstName + " " + empData.middleName + " " + empData.lastName);
            await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
            await this.page.locator('.oxd-autocomplete-dropdown').getByText(empData.firstName + " " + empData.middleName + " " + empData.lastName).click();
            await this.selectLeaveType(addEntitlementData.leaveType);
            await this.selectLeavePeriod(addEntitlementData.leavePeriod);

        })
    }

    async clickOnSearchButton(): Promise<void> {
        await this.pageStep("Click on Search Button", async () => {
            await this.searchBtn.click();
        })
    }


    async validateEntitlementTable(addEntitlementData: addEntitlementData): Promise<void> {
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
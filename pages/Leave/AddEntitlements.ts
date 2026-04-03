import { BasePage } from "../Base/BasePage";
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { Locator, Page } from "playwright-core";
import type { addEntitlementData } from '../../data/Leave/addEntitlement';

export class AddEntitlements extends BasePage {

    private logger: Logger;
    private readonly leaveMenu: Locator;
    private readonly entitlementsMenu: Locator;
    private readonly addEntitlementsMenu: Locator;

    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.leaveMenu = page.getByRole("link", { name: 'Leave' })
        this.entitlementsMenu = page.locator('span:has-text("Entitlements")')
        this.addEntitlementsMenu = page.getByRole('menuitem', { name: 'Add Entitlements' })
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

    async addEntitlements(addEntitlementData: addEntitlementData): Promise<void> {
        return await this.pageStep("Add Entitlements for Employee", async () => {
            await this.page.getByLabel("Add To").selectOption(addEntitlementData.addTo);
            await this.page.getByRole("combobox", { name: "Employee Name" }).fill(addEntitlementData.employeeName);
            await this.page.getByRole("option", { name: addEntitlementData.employeeName }).click();
            await this.page.getByLabel("Leave Type").selectOption(addEntitlementData.leaveType);
            await this.page.getByLabel("Leave Period").fill(addEntitlementData.leavePeriod);
            await this.page.getByLabel("Entitlements").fill(addEntitlementData.entitlements.toString());
            await this.page.getByRole("button", { name: 'Save' }).click();
        })
    }
   

}
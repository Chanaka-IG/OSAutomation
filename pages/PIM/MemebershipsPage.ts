import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import type { AddEmployeeData, MembershipData } from '../../data/PIM/membership'
import { Logger } from '../../Fixtures/logger.fixtures';


export class MembershipsPage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly logger: Logger;
    private readonly pimCard: Locator;
    private readonly membershipsMenu: Locator;
    private readonly addBtn: Locator;
    private readonly membership: Locator;
    private readonly subscription: Locator;
    private readonly subscriptionAmount: Locator;
    private readonly currency: Locator;
    private readonly commenceDate: Locator;
    private readonly renewalDate: Locator;
    private readonly saveBtn: Locator;


    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.membershipsMenu = page.getByRole("link", { name: "Memberships" });
        this.addBtn = page.locator("(//h6[text()='Assigned Memberships']/following::button)[1]")
        this.membership = page.locator("(//label[text()='Membership']/following::div)[1]")
        this.subscription = page.locator("(//label[text()='Subscription Paid By']/following::div)[1]")
        this.subscriptionAmount = page.locator("(//label[text()='Subscription Amount']/following::input)[1]")
        this.currency = page.locator("(//label[text()='Currency']/following::div)[1]")
        this.commenceDate = page.locator("(//label[text()='Subscription Commence Date']/following::div)[1]")
        this.renewalDate = page.locator("(//label[text()='Subscription Renewal Date']/following::div)[1]")
        this.saveBtn = page.getByRole("button", { name: "Save" })
    }

    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async navigateToEMployeeProfile(employeeData: AddEmployeeData): Promise<void> {

        return await this.pageStep("Search and navigate tot the employee profile", async () => {
            await this.pimCard.waitFor({ state: 'visible' });
            const row = this.page.locator(".oxd-table-row").filter({ hasText: employeeData.employeeId });
            console.log(row)
            const empId = row.locator('.oxd-table-cell:nth-child(2) div')
            if (await empId.textContent() !== " ") {
                await empId.click();
            }
        })

    }

    async navigateToMembershipsMenu(): Promise<void> {
        return await this.pageStep("Navigate to the Memberships menu on selected employee", async () => {
            await this.membershipsMenu.click();
        })
    }

    async fillMembershipDetails(membershipData: MembershipData): Promise<void> {

        return await this.pageStep("Fill membership details", async () => {

            const membershipDataList = Array.isArray(membershipData) ? membershipData : [membershipData];

            for (const memebershipData of membershipDataList) {
                await this.addBtn.click();
                await this.membership.click().then(() =>
                    this.page.locator("(//label[text()='Membership']/following::div)[6]").filter({ hasText: memebershipData.memebershipName }).click());

                await this.subscription.click().then(() =>
                    this.page.locator("(//label[text()='Subscription Paid By']/following::div)[6]").filter({ hasText: memebershipData.subscriptionPaidBy }).click());

                await this.subscriptionAmount.fill(memebershipData.subscriptionAmount);

                await this.currency.click().then(() =>
                    this.page.locator("(//label[text()='Currency']/following::div)[6]").filter({ hasText: memebershipData.currency }).click());

                await this.membership.click().then(() =>
                    this.page.locator("(//label[text()='Membership']/following::div)[6]").filter({ hasText: memebershipData.memebershipName }).click());

                await this.pickDateFromDatePicker(memebershipData.subscriptionCommenceDate, this.commenceDate);
                await this.pickDateFromDatePicker(memebershipData.subscriptionExpiryDate, this.renewalDate);
            }
        })

    }
}




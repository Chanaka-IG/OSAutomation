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
    private readonly deleteSelectedBtn: Locator;
    private readonly deleteModalPopup: Locator;
    private readonly yesDeleteBtn: Locator;


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
        this.deleteSelectedBtn = page.getByRole("button", { name: "Delete Selected" })
        this.deleteModalPopup = page.locator(".oxd-sheet")
        this.yesDeleteBtn = page.getByRole("button", { name: ' Yes, Delete ' })


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

    async fillMembershipDetails(membershipData: MembershipData | MembershipData[]): Promise<void> {

        return await this.pageStep("Fill membership details", async () => {

            const membershipDataList = Array.isArray(membershipData) ? membershipData : [membershipData];

            for (const memebershipData of membershipDataList) {

                await this.addBtn.click();
                await this.membership.click().then(() =>
                    this.page.locator("(//label[text()='Membership']/following::div)[6]").getByText(memebershipData.memebershipName, { exact: true }).click());

                await this.subscription.click().then(() =>
                    this.page.locator("(//label[text()='Subscription Paid By']/following::div)[6]").filter({ hasText: memebershipData.subscriptionPaidBy }).click());

                await this.subscriptionAmount.fill(memebershipData.subscriptionAmount);

                await this.currency.click().then(() =>
                    this.page.locator("(//label[text()='Currency']/following::div)[6]").getByText(memebershipData.currency, { exact: true }).click());

                await this.pickDateFromDatePicker(memebershipData.subscriptionCommenceDate, this.commenceDate);
                await this.pickDateFromDatePicker(memebershipData.subscriptionExpiryDate, this.renewalDate);
            }
        })

    }


    async fillMultipleDetailsAndVerify(membershipData: MembershipData | MembershipData[]): Promise<void> {

        return await this.pageStep("Fill membership details", async () => {

            const membershipDataList = Array.isArray(membershipData) ? membershipData : [membershipData];

            for (const memebershipData of membershipDataList) {

                await this.addBtn.waitFor({ state: 'visible', timeout: 2000 });
                if (await this.addBtn.isVisible()) {
                    await this.addBtn.click();
                }

                await this.membership.click().then(() =>
                    this.page.getByRole("option", { name: memebershipData.memebershipName, exact: true }).click());

                await this.subscription.click().then(() =>
                    this.page.getByRole("option", { name: memebershipData.subscriptionPaidBy, exact: true }).click());
                
                await this.subscriptionAmount.fill(memebershipData.subscriptionAmount);

                await this.currency.click().then(() =>
                    this.page.getByRole("option", { name: memebershipData.currency, exact: true }).click());

                await this.pickDateFromDatePicker(memebershipData.subscriptionCommenceDate, this.commenceDate);
                await this.pickDateFromDatePicker(memebershipData.subscriptionExpiryDate, this.renewalDate);

                await this.clickOnSaveBtn();
                await this.verifySuccessToastForSave();
                await this.verifyMembershipDetails(memebershipData);
            }
        })

    }

    async fillUpdateData(membershipData: MembershipData | MembershipData[]): Promise<void> {

        return await this.pageStep("Fill membership details", async () => {

            const membershipDataList = Array.isArray(membershipData) ? membershipData : [membershipData];

            for (const memebershipData of membershipDataList) {

                await this.membership.click().then(() =>
                    this.page.locator("(//label[text()='Membership']/following::div)[6]").getByText(memebershipData.memebershipName, { exact: true }).click());

                await this.subscription.click().then(() =>
                    this.page.locator("(//label[text()='Subscription Paid By']/following::div)[6]").getByText(memebershipData.subscriptionPaidBy, { exact: true }).click());

                await this.subscriptionAmount.fill(memebershipData.subscriptionAmount);

                await this.currency.click().then(() =>
                    this.page.locator("(//label[text()='Currency']/following::div)[6]").getByText(memebershipData.currency, { exact: true }).click());

                await this.pickDateFromDatePicker(memebershipData.subscriptionCommenceDate, this.commenceDate);
                await this.pickDateFromDatePicker(memebershipData.subscriptionExpiryDate, this.renewalDate);

                await this.clickOnSaveBtn();
                await this.verifySuccessToastForUpdate();
                await this.verifyMembershipDetails(memebershipData);
            }
        })

    }

    async clickOnSaveBtn(): Promise<void> {
        return await this.pageStep("Click on the Save button", async () => {
            await this.saveBtn.click();
        })
    }

    async verifyMembershipDetails(membershipData: MembershipData | MembershipData[]): Promise<void> {
        return await this.pageStep("Verify membership details", async () => {
            await this.waitUntilTableLoaderDissapear();
            await this.waitUntilFormLoaderDissapear();
            const membershipDataList = Array.isArray(membershipData) ? membershipData : [membershipData];
            for (const data of membershipDataList) {
                const row = this.page.locator(".oxd-table-row")
                    .filter({ hasText: data.memebershipName })
                    .filter({ hasText: data.subscriptionPaidBy })
                    .filter({ hasText: data.subscriptionAmount })
                    .filter({ hasText: data.currency })
                    .filter({ hasText: data.subscriptionCommenceDate })
                    .filter({ hasText: data.subscriptionExpiryDate });

                await expect(row).toHaveCount(1);
            }
        })
    }

    async selectAndDeleteRecord(membershipData: MembershipData): Promise<void> {
        return await this.pageStep("Verify membership details", async () => {
            const row = this.page.locator(".oxd-table-row")
                .filter({ hasText: membershipData.memebershipName })
                .filter({ hasText: membershipData.subscriptionPaidBy })
                .filter({ hasText: membershipData.subscriptionAmount })
                .filter({ hasText: membershipData.currency })
                .filter({ hasText: membershipData.subscriptionCommenceDate })
                .filter({ hasText: membershipData.subscriptionExpiryDate });

            await row.locator('div').first().click();
            await this.deleteSelectedBtn.click();
            await this.clickDeleteOnPupup();
        })
    }

    async selectAndClickOnEdit(membershipData: MembershipData): Promise<void> {
        return await this.pageStep("Verify membership details", async () => {
            const row = this.page.locator(".oxd-table-row")
                .filter({ hasText: membershipData.memebershipName })
                .filter({ hasText: membershipData.subscriptionPaidBy })
                .filter({ hasText: membershipData.subscriptionAmount })
                .filter({ hasText: membershipData.currency })
                .filter({ hasText: membershipData.subscriptionCommenceDate })
                .filter({ hasText: membershipData.subscriptionExpiryDate });

            await row.locator('.bi-pencil-fill').click();

        })
    }

    async clickDeleteOnPupup(): Promise<void> {
        return await this.pageStep("Click on Delete button in opened popub box", async () => {
            await this.deleteModalPopup.waitFor({ state: 'visible' });
            await this.yesDeleteBtn.click();

        })
    }

    async verifyReadonlyModeForCheckBox(membershipData: MembershipData | MembershipData[]): Promise<void> {
        return await this.pageStep("Verify membership details", async () => {
            await this.waitUntilFormLoaderDissapear();
            const membershipDataList = Array.isArray(membershipData) ? membershipData : [membershipData];
            for (const data of membershipDataList) {
                const row = this.page.locator(".oxd-table-row")
                    .filter({ hasText: data.memebershipName })
                    .filter({ hasText: data.subscriptionPaidBy })
                    .filter({ hasText: data.subscriptionAmount })
                    .filter({ hasText: data.currency })
                    .filter({ hasText: data.subscriptionCommenceDate })
                    .filter({ hasText: data.subscriptionExpiryDate });

                const checkbox = row.locator('.oxd-checkbox-input-icon');
                const editIcon = row.locator('.bi-pencil-fill');
                const deleteIcon = row.locator('.bi-trash');
                await expect(checkbox).toBeDisabled();
                await expect(editIcon).toBeDisabled();
                await expect(deleteIcon).toBeDisabled();
            }
        })
    }
}




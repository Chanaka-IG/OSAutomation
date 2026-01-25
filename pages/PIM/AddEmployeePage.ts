
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import type { Employee } from '../../data/PIM';
import path from 'path/win32';

export class AddEmployeePage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly addBtn: Locator;
    private readonly card: Locator;
    private readonly saveBtn: Locator;
    private readonly firstNameRequired: Locator;
    private readonly lastNameRequired: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly middleNameInput: Locator;
    private readonly employeeIdInput: Locator;
    private readonly createLoginDetailsCheckbox: Locator;
    private readonly usernameInput: Locator;
    private readonly userpasswordInput: Locator
    private readonly userconfirmPasswordInput: Locator;
    private readonly enableToggle: Locator;
    private readonly disableToggle: Locator;



    constructor(page: Page) {
        super(page);
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.addBtn = page.getByRole("link", { name: 'Add' })
        this.card = page.locator(".orangehrm-card-container")
        this.saveBtn = page.getByRole("button", { name: 'Save' })
        this.firstNameRequired = page.locator(`(//div[@class='oxd-input-group oxd-input-field-bottom-space']//span)[1]`)
        this.lastNameRequired = page.locator(`(//div[@class='oxd-input-group oxd-input-field-bottom-space']//span)[2]`)
        this.firstNameInput = page.getByPlaceholder("First Name")
        this.lastNameInput = page.getByPlaceholder("Last Name")
        this.middleNameInput = page.getByPlaceholder("Middle Name")
        this.employeeIdInput = page.locator("(//label[text()='Employee Id']/following::input)[1]")
        this.createLoginDetailsCheckbox = page.getByRole("checkbox", { name: 'Create Login Details' })
        this.usernameInput = page.locator("(//label[normalize-space(text())='Username']/following::input)[1]")
        this.userpasswordInput = page.locator("(//input[@type='password'])[1]")
        this.userconfirmPasswordInput = page.locator("(//input[@type='password'])[2]")
        this.enableToggle = page.getByRole("switch", { name: 'Enabled' })
        this.disableToggle = page.getByRole("switch", { name: 'Disabled' })
    }


    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async clickOnAddButton(): Promise<void> {
        return await this.pageStep("Click on Add button", async () => {
            await this.addBtn.waitFor({ state: 'visible' }).then(async () => {
                await this.addBtn.click();
            })
        })
    }

    async clickonSave(): Promise<void> {
        return await this.pageStep("Click on Save button", async () => {
            await this.saveBtn.click();
        })
    }

    async validateRequireFields(): Promise<void> {

        return await this.pageStep("Validate required fields", async () => {
            await this.card.waitFor({ state: 'visible' }).then(async () => {
                await this.clickonSave();
            })
            await expect(this.firstNameRequired).toHaveText('Required');
            await expect(this.lastNameRequired).toHaveText('Required');
        })

    }

    async addEmployeeViaWizard(empdata: Employee): Promise<void> {
        return await this.pageStep("Add employee via Wizard", async () => {
            await this.card.waitFor({ state: 'visible' }).then(async () => {
                await this.firstNameInput.fill(empdata.firstName);
                await this.middleNameInput.fill(empdata.middleName);
                await this.lastNameInput.fill(empdata.lastName);
                await this.employeeIdInput.fill(empdata.employeeId)
            }
            )
        })
    }
    async addEmployeeViaWizardWithProfilePic(empdata: Employee): Promise<void> {
        return await this.pageStep("Add employee via Wizard", async () => {
            await this.card.waitFor({ state: 'visible' }).then(async () => {
                await this.firstNameInput.fill(empdata.firstName);
                await this.middleNameInput.fill(empdata.middleName);
                await this.lastNameInput.fill(empdata.lastName);
                await this.employeeIdInput.fill(empdata.employeeId)
                await this.setProfilePicture();
            })
        })
    }

    async validateEmployeeIDInput(): Promise<void> {
        return await this.pageStep("Add employee via Wizard", async () => {
            await this.card.waitFor({ state: 'visible' }).then(async () => {
                const empID = await this.employeeIdInput.inputValue();
                //                    console.log("Generated Employee ID is: " + empID);
                expect(empID.length).toBeGreaterThan(0);
            }
            )
        })
    }

     async setProfilePicture(): Promise<void> {
        return await this.pageStep("Set employee profile picture", async () => {
            const [filechooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator('.employee-image').click()

            ])
            const filePath = path.join(__dirname, '../../data/Images/profilepic.jpg').replace(/\\/g, '/');
            await filechooser.setFiles(filePath);
        })
    }

}





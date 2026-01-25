
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage'
import type { Employee, EmployeeWithUser } from '../../data/PIM';
import path from 'path/win32';

export class AddEmployeePage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly addBtn: Locator;
    private readonly card: Locator;
    private readonly saveBtn: Locator;
    private readonly firstNameRequired: Locator;
    private readonly lastNameRequired: Locator;
    private readonly employeeIDUnique: Locator;
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
    private readonly profilePicTypeValidation: Locator;



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
        this.employeeIDUnique = page.getByText('Employee Id already exists')
        this.profilePicTypeValidation = page.getByText('File type not allowed')
        this.createLoginDetailsCheckbox = page.locator("//div[@class='oxd-switch-wrapper']//span")
        this.usernameInput = page.locator("(//label[normalize-space(text())='Username']/following::input)[1]")
        this.userpasswordInput = page.locator("(//input[@type='password'])[1]")
        this.userconfirmPasswordInput = page.locator("(//input[@type='password'])[2]")
        this.enableToggle = page.locator("//label[text()='Enabled']")
        this.disableToggle = page.locator("//label[text()='Disabled']")
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
    async addEmployeeViaWizardWithProfilePic(empdata: Employee,path:String): Promise<void> {
        return await this.pageStep("Add employee via Wizard", async () => {
            await this.card.waitFor({ state: 'visible' }).then(async () => {
                await this.firstNameInput.fill(empdata.firstName);
                await this.middleNameInput.fill(empdata.middleName);
                await this.lastNameInput.fill(empdata.lastName);
                await this.employeeIdInput.fill(empdata.employeeId)
                console.log("Profile pic path is: " + path);
                await this.setProfilePicture(path);
            })
        })
    }

    async createLogin(empdata: EmployeeWithUser): Promise<void> {
        return await this.pageStep("Add employee login", async () => {
            console.log(await this.createLoginDetailsCheckbox.isChecked())
            if (await this.createLoginDetailsCheckbox.isChecked() === false) {
                await this.createLoginDetailsCheckbox.click();
            }
            await this.usernameInput.fill(empdata.username);
            await this.userpasswordInput.fill(empdata.password);
            await this.userconfirmPasswordInput.fill(empdata.confirmPassword);
            if (empdata.status.toLowerCase() === 'enabled') {
                await this.enableToggle.click();
            } else {
                await this.disableToggle.click();
            }
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

    async validateUniqueIdError(): Promise<void> {
        return await this.pageStep("Validate unique ID error", async () => {
            await this.employeeIDUnique.waitFor({ state: 'visible' }).then(async () => {
                expect(this.employeeIDUnique).toBeVisible();
            }
            )

        })
    }

        async validateProfilePicType(): Promise<void> {
        return await this.pageStep("Validate profile picture type", async () => {
            await this.profilePicTypeValidation.waitFor({ state: 'visible' }).then(async () => {
                expect(this.profilePicTypeValidation).toBeVisible();
            }
            )

        })
    }

    async setProfilePicture(imagePath: any): Promise<void> {
        return await this.pageStep("Set employee profile picture", async () => {
            const [filechooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.page.locator('.employee-image').click()

            ])
            const filePath = path.join(__dirname, imagePath).replace(/\\/g, '/');
            await filechooser.setFiles(filePath);
        })
    }

}





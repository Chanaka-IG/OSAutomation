import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "../Base/BasePage";
import { Logger } from '../../Fixtures/logger.fixtures';
import type { contactDetails, addEmployeeData } from '../../data/PIM/contactDetails'
import path from 'path/win32';


export class ContactDetailsPage extends BasePage {

    private readonly logger: Logger;
    private readonly PIMmenu: Locator;
    private readonly pimCard: Locator;
    private readonly contactDetailsMenu: Locator;
    private readonly streetOne: Locator;
    private readonly streetTwo: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zip: Locator;
    private readonly country: Locator;
    private readonly homeT: Locator;
    private readonly mobileT: Locator;
    private readonly workT: Locator;
    private readonly workEmail: Locator;
    private readonly otherEmail: Locator;
    private readonly addBtn: Locator;
    private readonly saveBtnforContact: Locator;
    private readonly saveBtnforAttachment: Locator;
    private readonly uploadBtn: Locator;
    private readonly comment: Locator;
    private readonly streetOneError: Locator;
    private readonly streetTwoError: Locator;
    private readonly cityError: Locator;
    private readonly homeTpError: Locator;
    private readonly mobileTpError: Locator;
    private readonly workTpError: Locator;
    private readonly workEmailError: Locator;
    private readonly otherEmailError: Locator;



    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.contactDetailsMenu = page.getByRole('link', { name: 'Contact Details' })
        this.streetOne = page.locator("(//label[normalize-space(text())='Street 1']/following::input)[1]")
        this.streetTwo = page.locator("(//label[normalize-space(text())='Street 2']/following::input)[1]")
        this.city = page.locator("(//label[normalize-space(text())='City']/following::input)[1]")
        this.state = page.locator("(//label[normalize-space(text())='State/Province']/following::input)[1]")
        this.zip = page.locator("(//label[normalize-space(text())='Zip/Postal Code']/following::input)[1]")
        this.country = page.locator("(//label[normalize-space(text())='Country']/following::div)[1]")
        this.homeT = page.locator("(//label[normalize-space(text())='Home']/following::input)[1]")
        this.mobileT = page.locator("(//label[normalize-space(text())='Mobile']/following::input)[1]")
        this.workT = page.locator("(//label[normalize-space(text())='Work']/following::input)[1]")
        this.workEmail = page.locator("(//label[normalize-space(text())='Work Email']/following::input)[1]")
        this.otherEmail = page.locator("(//label[normalize-space(text())='Other Email']/following::input)[1]")
        this.streetOneError = page.locator("(//label[text()='Street 1']/following::span)[1]")
        this.streetTwoError = page.locator("(//label[text()='Street 2']/following::span)[1]")
        this.cityError = page.locator("(//label[text()='City']/following::span)[1]")
        this.homeTpError = page.locator("(//label[text()='Home']/following::span)[1]")
        this.mobileTpError = page.locator("(//label[text()='Mobile']/following::span)[1]")
        this.workTpError = page.locator("(//label[text()='Work']/following::span)[1]")
        this.workEmailError = page.locator("(//label[text()='Work Email']/following::span)[1]")
        this.otherEmailError = page.locator("(//label[text()='Other Email']/following::span)[1]")
        this.saveBtnforContact = page.getByRole('button', { name: 'Save' }).first();
        this.saveBtnforAttachment = page.getByRole('button', { name: 'Save' }).nth(1);
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.uploadBtn = page.getByText('Browse', { exact: true })
        this.comment = page.getByPlaceholder('Type comment here')


    }


    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async navigateToEMployeeProfile(employeeData: addEmployeeData): Promise<void> {

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

    async navigateToContactDetailsMenu(): Promise<void> {
        return await this.pageStep("Navigate to the Contact details menu on selected emplpoyee", async () => {
            await this.contactDetailsMenu.click();
        })
    }

    async fillContactDetails(contactDetails: contactDetails): Promise<void> {
        return await this.pageStep("Navigate to the Contact details menu on selected emplpoyee", async () => {
            await this.page.waitForTimeout(3000)
            await this.streetOne.waitFor({ state: 'visible' }).then(async () => {
                await this.streetOne.fill(contactDetails.addressOne);
                await this.streetTwo.fill(contactDetails.addressTwo);
                await this.city.fill(contactDetails.city);
                await this.state.fill(contactDetails.state);
                await this.zip.fill(contactDetails.zip);
                await this.selectCountry(contactDetails.country);
                await this.homeT.fill(contactDetails.homeT);
                await this.mobileT.fill(contactDetails.mobileT);
                await this.workT.fill(contactDetails.workT);
                await this.workEmail.fill(contactDetails.workEmail);
                await this.otherEmail.fill(contactDetails.otherEmail);
            })

        })
    }

    async validateAddedDetails(contactDetails: contactDetails): Promise<boolean> {
        return await this.pageStep("Validate added data in Contact details menu", async () => {
            let flag = true;
            await this.page.waitForTimeout(3000)
            await this.streetOne.waitFor({ state: 'visible' }).then(async () => {
                if (contactDetails.addressOne !== await this.streetOne.inputValue()) {
                    flag = false;
                    this.logger.error(`Street1 mismatched. Actual -${await this.streetOne.inputValue()} , Expected - ${contactDetails.addressOne}`)
                }
                if (contactDetails.addressTwo !== await this.streetTwo.inputValue()) {
                    flag = false;
                    this.logger.error(`Street2 mismatched. Actual -${await this.streetTwo.inputValue()} , Expected - ${contactDetails.addressTwo}`)
                }
                if (contactDetails.city !== await this.city.inputValue()) {
                    flag = false;
                    this.logger.error(`City mismatched. Actual -${await this.city.inputValue()} , Expected - ${contactDetails.city}`)
                }
                if (contactDetails.state !== await this.state.inputValue()) {
                    flag = false;
                    this.logger.error(`State mismatched. Actual -${await this.state.inputValue()} , Expected - ${contactDetails.state}`)
                }
                if (contactDetails.zip !== await this.zip.inputValue()) {
                    flag = false;
                    this.logger.error(`zip mismatched. Actual -${await this.zip.inputValue()} , Expected - ${contactDetails.zip}`)
                }
                if (contactDetails.country !== await this.country.textContent()) {
                    flag = false;
                    this.logger.error(`country mismatched. Actual -${await this.streetOne.inputValue()} , Expected - ${contactDetails.addressOne}`)
                }
                if (contactDetails.homeT !== await this.homeT.inputValue()) {
                    flag = false;
                    this.logger.error(`homeT mismatched. Actual -${await this.homeT.inputValue()} , Expected - ${contactDetails.homeT}`)
                }
                if (contactDetails.mobileT !== await this.mobileT.inputValue()) {
                    flag = false;
                    this.logger.error(`mobileT mismatched. Actual -${await this.mobileT.inputValue()} , Expected - ${contactDetails.mobileT}`)
                }
                if (contactDetails.workT !== await this.workT.inputValue()) {
                    flag = false;
                    this.logger.error(`workT mismatched. Actual -${await this.workT.inputValue()} , Expected - ${contactDetails.workT}`)
                }
            })
            return flag;

        })
    }

    async clickOnSaveforContactDetails(): Promise<void> {
        return await this.pageStep("Click On save button for Contact Details section", async () => {
            await this.saveBtnforContact.click();
        })
    }


    async selectCountry(country: string): Promise<void> {
        return await this.pageStep("Select a country from the dropdown", async () => {
            await this.country.click();
            await this.page.getByRole('option', { name: country, exact: true }).click();

        })
    }

    async fillAttachmentSection(contactDetails: contactDetails, attachmentPath: string): Promise<void> {
        return await this.pageStep("Upload attachment and add a comment", async () => {
            await this.addBtn.click();
            const [fileChoose] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.uploadBtn.click()

            ])
            const filePath = path.join(__dirname, attachmentPath).replace(/\\/g, '/');
            await fileChoose.setFiles(filePath)
            await this.comment.fill(contactDetails.comment)

        })
    }
    async clickOnSaveforAttachmentSection(): Promise<void> {
        return await this.pageStep("Click On save button for Contact Details section", async () => {
            await this.saveBtnforAttachment.click();
        })
    }

    async validateLengthyErrors(): Promise<void> {
        return await this.pageStep("Check the validation ", async () => {
            const expectedError = "Should not exceed 70 characters"
            const stretOneError = await this.streetOneError.textContent();
            const stretSecondError = await this.streetTwoError.textContent();
            const cityError = await this.cityError.textContent();
            expect(stretOneError).toEqual(expectedError);
            expect(stretSecondError).toEqual(expectedError);
            expect(cityError).toEqual(expectedError);
        })
    }

    async validateTpNumbers(): Promise<void> {
        return await this.pageStep("Validate telephone number fields with invalid characters", async () => {
            const expectedError = "Allows numbers and only + - / ( )"
            const homeTP = await this.homeTpError.textContent();
            const mobileTP = await this.mobileTpError.textContent();
            const workTP = await this.workTpError.textContent();
            expect(homeTP).toEqual(expectedError);
            expect(mobileTP).toEqual(expectedError);
            expect(workTP).toEqual(expectedError);
        })
    }

    async validateEmailErrors(): Promise<void> {
        return await this.pageStep("Validate telephone number fields with invalid characters", async () => {
            const expectedError = "Expected format: admin@example.com"
            const workEmailError = await this.workEmailError.textContent();
            const otherEmailError = await this.otherEmailError.textContent();
            expect(workEmailError).toEqual(expectedError);
            expect(otherEmailError).toEqual(expectedError);
        })
    }
}


import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import type { PersonalDetails, AddEmployee } from '../../data/PIM/personalDetails'
import path from 'path/win32';
import { Logger } from '../../Fixtures/logger.fixtures';

export class PersonalDetailsPage extends BasePage {

    private readonly PIMmenu: Locator;
    private readonly pimCard: Locator;
    private readonly personalDetailsCard: Locator;
    private readonly firstName: Locator;
    private readonly middleName: Locator;
    private readonly lastName: Locator;
    private readonly empID: Locator;
    private readonly otherID: Locator;
    private readonly licenseNumber: Locator;
    private readonly licenseExpiryDate: Locator;
    private readonly national: Locator;
    private readonly maritalStatus: Locator;
    private readonly dob: Locator;
    private readonly maleCheckBox: Locator;
    private readonly femaleCheckBox: Locator;
    private readonly addAttachment: Locator;
    private readonly fileSelectText: Locator;
    private readonly comment: Locator;
    private readonly uploadBtn: Locator;
    private readonly saveBtnforPersonal: Locator;
    private readonly saveBtnforAttchment: Locator;
    private readonly licenseNumberAfterFill: Locator;
    private readonly maleLabel: Locator;
    private readonly femaleLabel: Locator;
    private readonly invalidDateErrorforLicenseExpiry: Locator;
    private readonly invalidDateErrorforDOB: Locator;
    private readonly dateFieldlicense: Locator;
    private readonly dateFielddob: Locator;
    private readonly tableContainer: Locator;
    protected readonly logger: Logger;


    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.personalDetailsCard = page.locator(".orangehrm-edit-employee-content")
        this.firstName = page.locator("//input[@name='firstName']")
        this.middleName = page.getByPlaceholder('Middle Name')
        this.lastName = page.getByPlaceholder('Last Name')
        this.empID = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]")
        this.otherID = page.getByRole('textbox').nth(5);
        this.licenseNumber = page.locator("(//input[@class='oxd-input oxd-input--active'])[3]")
        this.licenseNumberAfterFill = page.locator("(//input[@class='oxd-input oxd-input--active'])[4]")
        this.licenseExpiryDate = page.getByRole('textbox', { name: 'yyyy-mm-dd' }).first()
        this.national = page.locator("(//div[@class='oxd-select-text-input'])[1]")
        this.maritalStatus = page.locator("(//div[@class='oxd-select-text-input'])[2]")
        this.dob = page.getByRole('textbox', { name: 'yyyy-mm-dd' }).nth(1)
        this.maleCheckBox = page.getByText('Male', { exact: true })
        this.femaleCheckBox = page.getByText('Female', { exact: true })
        this.addAttachment = page.getByRole('button', { name: 'Add' })
        this.fileSelectText = page.locator("//div[text()='Browse']/following-sibling::div")
        this.comment = page.getByPlaceholder('Type comment here')
        this.uploadBtn = page.getByText('Browse', { exact: true })
        this.saveBtnforPersonal = page.getByRole('button', { name: 'Save' }).first();
        this.saveBtnforAttchment = page.getByRole('button', { name: 'Save' }).nth(1);
        this.maleLabel = page.getByLabel('Male', { exact: true })
        this.femaleLabel = page.getByLabel('Female', { exact: true })
        this.invalidDateErrorforLicenseExpiry = page.getByText('Should be a valid date in yyyy-mm-dd format', { exact: true }).first();
        this.invalidDateErrorforDOB = page.getByText('Should be a valid date in yyyy-mm-dd format', { exact: true }).first();
        this.dateFieldlicense = page.locator(".oxd-date-wrapper").first();
        this.dateFielddob = page.locator(".oxd-date-wrapper").nth(1);
        this.tableContainer = page.locator(".orangehrm-container")

    }

    async navigateToPim(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.PIMmenu.click();
        })

    }

    async navigateToEMployeeProfile(employeeData: AddEmployee): Promise<void> {

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

    async clickOnSaveforPersonal(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.saveBtnforPersonal.click();
        })

    }

    async clickOnSaveforAttachments(): Promise<void> {

        return await this.pageStep("Navigate to PIM section", async () => {
            await this.saveBtnforAttchment.click();
        })

    }

    async fillPersonalDetails(personaleDetails: PersonalDetails, attachmentPath: string): Promise<void> {
        return await this.pageStep("Fill personal details on selected employee", async () => {
            await this.personalDetailsCard.waitFor({ state: 'visible' });
            await this.waitUntilLoaderDissapear();
            await this.firstName.fill(personaleDetails.firstName);
            await this.middleName.fill(personaleDetails.middleName);
            await this.lastName.fill(personaleDetails.lastName);
            await this.empID.fill(personaleDetails.EmployeeId);
            await this.otherID.fill(personaleDetails.otherID);
            await this.licenseNumber.fill(personaleDetails.licenseNumber);
            await this.licenseExpiryDate.fill(personaleDetails.licenseExpiryDate);
            await this.selectNational(personaleDetails.nationality);
            await this.selectMaritalStatus(personaleDetails.maritalStatus);
            await this.dob.fill(personaleDetails.dob);
            await this.selectGender(personaleDetails.gender);
            await this.uploadAttachment(attachmentPath);
            await this.comment.fill(personaleDetails.comment)
        })

    }

    async fillPersonalDetailsWithDatePicker(personaleDetails: PersonalDetails, attachmentPath: string): Promise<void> {
        return await this.pageStep("Fill personal details on selected employee", async () => {
            await this.personalDetailsCard.waitFor({ state: 'visible' });
            await this.waitUntilLoaderDissapear();
            await this.firstName.fill(personaleDetails.firstName);
            await this.middleName.fill(personaleDetails.middleName);
            await this.lastName.fill(personaleDetails.lastName);
            await this.empID.fill(personaleDetails.EmployeeId);
            await this.otherID.fill(personaleDetails.otherID);
            await this.licenseNumber.fill(personaleDetails.licenseNumber);
            await this.pickLicenseExpiryDate(personaleDetails.licenseExpiryDate);
            await this.selectNational(personaleDetails.nationality);
            await this.selectMaritalStatus(personaleDetails.maritalStatus);
            await this.pickDOB(personaleDetails.dob);
            await this.selectGender(personaleDetails.gender);
            await this.uploadAttachment(attachmentPath);
            await this.comment.fill(personaleDetails.comment)
        })

    }

    async selectNational(national: string): Promise<void> {
        return await this.pageStep("Select national from the dropdown", async () => {
            await this.national.click();
            await this.page.getByRole('option', { name: national }).click();
        })
    }

    async selectMaritalStatus(maritalStatus: string): Promise<void> {
        return await this.pageStep("Select marital status from the dropdown", async () => {
            await this.maritalStatus.click();
            await this.page.getByRole('option', { name: maritalStatus }).click();
        })

    }

    async selectGender(gender: string): Promise<void> {
        return await this.pageStep("Select gender from the dropdown", async () => {
            if (gender === "Male") {
                await this.maleCheckBox.click();
            }
            else {
                await this.femaleCheckBox.click();
            }

        })

    }

    async pickLicenseExpiryDate(expiryDate: string): Promise<void> {
        return await this.pageStep("Select gender from the dropdown", async () => {
            await this.pickDateFromDatePicker(expiryDate, this.dateFieldlicense)

        })

    }

    async pickDOB(dob: string): Promise<void> {
        return await this.pageStep("Select gender from the dropdown", async () => {
            await this.pickDateFromDatePicker(dob, this.dateFielddob)


        })

    }


    async uploadAttachment(attachmentPath: string): Promise<void> {
        return await this.pageStep("Select gender from the dropdown", async () => {
            await this.addAttachment.click()
            const [fileChoose] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.uploadBtn.click()

            ])
            const filePath = path.join(__dirname, attachmentPath).replace(/\\/g, '/');
            await fileChoose.setFiles(filePath)
        })

    }

    async validatePersonalDetails(personaleDetails: PersonalDetails): Promise<boolean> {
        return await this.pageStep("Validate filled data in personal details tab", async () => {
            let flag = true;
            await this.personalDetailsCard.waitFor({ state: 'visible' })
            if (personaleDetails.firstName !== await this.firstName.inputValue()) {
                flag = false;
                this.logger.log(`First Name mismatched. Actual - ${await this.firstName.inputValue()}. Expected - ${personaleDetails.firstName}`)
            }


            if (personaleDetails.middleName !== await this.middleName.inputValue()) {
                flag = false;
                this.logger.log(`Middle Name mismatched. Actual - ${await this.middleName.inputValue()}. Expected - ${personaleDetails.middleName}`)
            }


            if (personaleDetails.lastName !== await this.lastName.inputValue()) {
                flag = false;
                this.logger.log(`Last Name mismatched. Actual - ${await this.lastName.inputValue()}. Expected - ${personaleDetails.lastName}`)
            }


            if (personaleDetails.EmployeeId !== await this.empID.inputValue()) {
                flag = false;
                this.logger.log(`Employee ID mismatched. Actual - ${await this.empID.inputValue()}. Expected - ${personaleDetails.EmployeeId}`)
            }


            if (personaleDetails.otherID !== await this.otherID.inputValue()) {
                flag = false;
                this.logger.log(`Other ID mismatched. Actual - ${await this.otherID.inputValue()}. Expected - ${personaleDetails.otherID}`)
            }


            if (personaleDetails.licenseNumber !== await this.licenseNumberAfterFill.inputValue()) {
                flag = false;
                this.logger.log(`License Number mismatched. Actual - ${await this.licenseNumberAfterFill.inputValue()}. Expected - ${personaleDetails.licenseNumber}`)
            }


            if (personaleDetails.licenseExpiryDate !== await this.licenseExpiryDate.inputValue()) {
                flag = false;
                this.logger.log(`License expiry date mismatched. Actual - ${await this.licenseExpiryDate.inputValue()}. Expected - ${personaleDetails.licenseExpiryDate}`)
            }

            if (personaleDetails.nationality !== await this.national.textContent()) {
                flag = false;
                this.logger.log(`Nationality mismatched. Actual - ${await this.national.textContent()}. Expected - ${personaleDetails.nationality}`)
            }

            if (personaleDetails.maritalStatus !== await this.maritalStatus.textContent()) {
                flag = false;
                this.logger.log(`License expiry date mismatched. Actual - ${await this.maritalStatus.textContent()}. Expected - ${personaleDetails.maritalStatus}`)
            }

            if (personaleDetails.dob !== await this.dob.inputValue()) {
                flag = false;
                this.logger.log(`DOB date mismatched. Actual - ${await this.dob.inputValue()}. Expected - ${personaleDetails.dob}`)
            }
            if (personaleDetails.gender == "Male") {
                const checked = await this.maleCheckBox.isChecked()
                if (!checked) {
                    this.logger.log(`Gender date mismatched. Actual -  ${await this.femaleLabel.textContent()}. Expected - ${personaleDetails.gender}`)

                }
            }

            if (personaleDetails.gender == "Female") {
                const checked = await this.femaleCheckBox.isChecked()
                if (!checked) {
                    this.logger.log(`Gender date mismatched. Actual -  ${await this.maleLabel.textContent()}. Expected - ${personaleDetails.gender}`)

                }
            }
            return flag
        })
    }

    async validateAttachmentDetails(personaleDetails: PersonalDetails): Promise<boolean> {
        let flag = false;
        const fileName = "test-upload-attachment.pdf";
        await this.tableContainer.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(3000)
        const rowVisibility = await this.page.locator(".oxd-table-card").filter({ hasText: fileName }).isVisible();
        if (rowVisibility) {
            const row = this.page.locator(".oxd-table-card").filter({ hasText: fileName })
            let attachmentName = await row.locator("(//div[@role='cell']//div)[3]").textContent();
            let comment = await row.locator("(//div[@role='cell']//div)[4]").textContent();
            if (attachmentName === "test-upload-attachment.pdf" && comment === personaleDetails.comment) {
                flag = true;
            }
            else {
                flag = false;
                this.logger.error("Attachment name or Comment mismatched")
                this.logger.error(`Expected Attachment Name : test-upload-attachment.pdf. Actual Attachment Name : ${attachmentName}`)
                this.logger.error(`Expected comment : ${personaleDetails.comment}. Actual Attachment Name : ${comment}`)

            }

        }


        return flag;
    }

    async validateInvalidDateError(): Promise<void> {
        return await this.pageStep("Validate error messgae for Invalid Date", async () => {
            expect(this.invalidDateErrorforLicenseExpiry).toBeVisible();
            expect(this.invalidDateErrorforDOB).toBeVisible();
        })

    }
}
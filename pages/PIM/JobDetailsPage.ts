import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "../Base/BasePage";
import { Logger } from '../../Fixtures/logger.fixtures';
import type { AddEmployee, JobData, TerminationData } from '../../data/PIM/jobDetails'
import path from 'path/win32';


export class JobDetailsPage extends BasePage {

    protected readonly logger: Logger;
    private readonly PIMmenu: Locator;
    private readonly pimCard: Locator;
    private readonly jobDetailsCard: Locator;
    private readonly joinDate: Locator;
    private readonly jobTitle: Locator;
    private readonly jobCategory: Locator;
    private readonly subUnit: Locator;
    private readonly location: Locator;
    private readonly empStatus: Locator;
    private readonly jobDetailsMenu: Locator;
    private readonly saveBtn: Locator;
    private readonly terminateBtn: Locator;
    private readonly contactStartDate: Locator;
    private readonly contactEndDate: Locator;
    private readonly browseBtn: Locator;
    private readonly contractDetailsToggle: Locator;
    private readonly keepCurrent: Locator;
    private readonly deleteCurrent: Locator;
    private readonly replaceCurrent: Locator;
    private readonly attachmentName: Locator;
    private readonly terminateText: Locator;


    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.jobDetailsMenu = page.getByRole('link', { name: 'Job' })
        this.pimCard = page.locator(".orangehrm-paper-container")
        this.jobDetailsCard = page.locator(".orangehrm-edit-employee-content")
        this.joinDate = page.locator("(//label[normalize-space(text())='Joined Date']/following::input)[1]")
        this.jobTitle = page.locator("(//label[text()='Job Title']/following::div)[1]")
        this.jobCategory = page.locator("(//label[text()='Job Category']/following::div)[1]")
        this.subUnit = page.locator("(//label[text()='Sub Unit']/following::div)[1]")
        this.location = page.locator("(//label[text()='Location']/following::div)[1]")
        this.empStatus = page.locator("(//label[text()='Employment Status']/following::div)[1]")
        this.saveBtn = page.getByRole('button', { name: 'Save' })
        this.terminateBtn = page.getByRole('button', { name: 'Terminate Employment' })
        this.contractDetailsToggle = page.locator("(//input[@type='checkbox']/following-sibling::span)[1]")
        this.contactStartDate = page.locator("(//label[normalize-space(text())='Contract Start Date']/following::input)[1]")
        this.contactEndDate = page.locator("(//label[normalize-space(text())='Contract End Date']/following::input)[1]")
        this.browseBtn = page.getByText('Browse', { exact: true })
        this.keepCurrent = page.getByLabel('Keep Current')
        this.deleteCurrent = page.getByText('Delete Current')
        this.replaceCurrent = page.getByText('Replace Current')
        this.attachmentName = page.locator(".orangehrm-file-current p")
        this.terminateText = page.locator("//h6[text()='Employee Termination / Activiation ']/child::p")
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
            const empId = row.locator('.oxd-table-cell:nth-child(2) div')
            if (await empId.textContent() !== " ") {
                await empId.click();
            }
        })

    }

    async navigateToJobMenu(): Promise<void> {
        return await this.pageStep("Navigate to the Job details menu on selected emplpoyee", async () => {
            await this.jobDetailsMenu.click();
        })
    }

    async fillJobDetails(jobData: JobData, attachmentPath?: any): Promise<void> {

        return await this.pageStep("Navigate to the job tab and fill data", async () => {
            await this.jobDetailsCard.waitFor({ state: 'visible' });
            await this.waitUntilLoaderDissapear();
            await this.page.waitForTimeout(3000)
            await this.pickDateFromDatePicker(jobData.JoinedDate, this.joinDate);
            await this.jobTitle.click().then(async () => {
                await this.page.locator("(//label[text()='Job Title']/following::div)[6]").getByText(jobData.jobTItle, { exact: true }).click();
            })
            await this.jobCategory.click().then(async () => {
                await this.page.locator("(//label[text()='Job Category']/following::div)[6]").getByText(jobData.jobCategory, { exact: true }).click();
            })
            await this.subUnit.click().then(async () => {
                await this.page.locator("(//label[text()='Sub Unit']/following::div)[6]").getByText(jobData.subUnit, { exact: true }).click();
            })
            await this.location.click().then(async () => {
                await this.page.locator("(//label[text()='Location']/following::div)[6]").getByText(jobData.location, { exact: true }).click();
            })
            await this.empStatus.click().then(async () => {
                await this.page.locator("(//label[text()='Employment Status']/following::div)[6]").getByText(jobData.employementStatus, { exact: true }).click();
            })

            if (jobData.includeContractDetails) {
                await this.contractDetailsToggle.click()
                await this.pickDateFromDatePicker(jobData.contractStartDate, this.contactStartDate);
                await this.page.waitForTimeout(2000)
                await this.pickDateFromDatePicker(jobData.contractEndDate, this.contactEndDate);
                const [fileChoose] = await Promise.all([
                    this.page.waitForEvent('filechooser'),
                    this.browseBtn.click()

                ])
                const filePath = path.join(__dirname, attachmentPath).replace(/\\/g, '/');
                await fileChoose.setFiles(filePath)
            }


        })

    }

    async clickOnSave(): Promise<void> {
        return await this.pageStep("Click on Save after filling job data", async () => {
            await this.saveBtn.click();
        })
    }


    async attachmentCOnfig(action: string, attachmentPath?: string): Promise<void> {
        return await this.pageStep("Attachment functionalities and validate", async () => {
            if (action === "Keep Current") {
                const checkKeep = await this.keepCurrent.isChecked()
                if (!checkKeep) {
                    await this.keepCurrent.click();
                }

            }
            if (action === "Delete Current") {
                const checkDelete = await this.deleteCurrent.isChecked()
                if (!checkDelete) {
                    await this.deleteCurrent.click();
                }

            }
            if (action === "Replace Current") {
                const checkReplace = await this.replaceCurrent.isChecked()
                if (!checkReplace) {
                    await this.replaceCurrent.click();
                    const [fileChoose] = await Promise.all([
                        this.page.waitForEvent('filechooser'),
                        this.browseBtn.click()

                    ])
                    if (attachmentPath) {
                        const filePath = path.join(__dirname, attachmentPath).replace(/\\/g, '/');
                        await fileChoose.setFiles(filePath)
                    }
                }
            }
        })
    }

    async validateAttachmentArea(action: string): Promise<void> {
        return await this.pageStep("Attachment area validation", async () => {
            const fileName = "test-upload-attachment.pdf"
            const replaceFileName = "test-replace-attachment.pdf"
            if (action === "Keep Current") {
                expect(await this.attachmentName.textContent()).toContain(fileName);
            }
            if (action === "Delete Current") {
                await expect(this.attachmentName).not.toBeVisible();
            }
            if (action === "Replace Current") {
                console.log(await this.attachmentName.textContent())
                expect(await this.attachmentName.textContent()).toContain(replaceFileName);
            }
        })
    }

    async clickOnTerminateButton(): Promise<void> {
        return await this.pageStep("Click on Terminate employee button", async () => {
            await this.terminateBtn.click();
        })
    }

    async fillAndTerminate(terminatedata: TerminationData): Promise<void> {
        return await this.pageStep("Click on Terminate employee button", async () => {
            const modal = this.page.locator('.orangehrm-dialog-modal');
            await expect(modal).toBeVisible();
            const terminateD = modal.locator("(//label[text()='Termination Date']/following::div)[1]")
            const terminateR = modal.locator("(//label[text()='Termination Reason']/following::div)[1]")
            const terminateList = modal.locator(".oxd-select-dropdown")
            const notes = modal.getByPlaceholder("Type here")
            const saveBtn = modal.getByRole('button', { name: 'Save' })
            await this.pickDateFromDatePicker(terminatedata.date, terminateD);
            await terminateR.click();
            await terminateList.waitFor({ state: 'visible' })
            await terminateList.getByText(terminatedata.terminationReason).click();
            await notes.fill(terminatedata.note)
            await saveBtn.click();

        })
    }

    async verifySuccessTermination(terminatedata: TerminationData): Promise<void> {
        return await this.pageStep("Click on Terminate employee button", async () => {
            const terminateDate = terminatedata.date;
            expect(await this.terminateText.textContent()).toContain(`Terminated on: ${terminatedata.date}`);

        })
    }

}
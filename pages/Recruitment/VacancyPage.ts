import { BasePage } from "../Base/BasePage";
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { Locator, Page } from "playwright-core";
import type { VacancyData } from '../../data/Recruitment/vacancy';

export class VacancyPage extends BasePage {

    private logger: Logger;
    private readonly recruitmentMenu: Locator;
    private readonly vacanciesTab: Locator;
    private readonly addButton: Locator;
    private readonly addVacancyHeading: Locator;
    private readonly editVacancyHeading: Locator;
    private readonly vacancyNameInput: Locator;
    private readonly jobTitleDropdown: Locator;
    private readonly descriptionInput: Locator;
    private readonly hiringManagerInput: Locator;
    private readonly positionsInput: Locator;
    private readonly activeToggle: Locator;
    private readonly publishToggle: Locator;
    private readonly rssFeedUrlLink: Locator;
    private readonly webPageUrlLink: Locator;
    private readonly saveButton: Locator;
    private readonly cancelButton: Locator;
    private readonly searchButton: Locator;
    private readonly resetButton: Locator;
    private readonly filterJobTitleDropdown: Locator;
    private readonly filterVacancyDropdown: Locator;
    private readonly filterHiringManagerDropdown: Locator;
    private readonly filterStatusDropdown: Locator;
    private readonly noRecordsFoundLabel: Locator;
    private readonly deleteDialog: Locator;
    private readonly deleteSelectedButton: Locator;

    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.recruitmentMenu = page.getByRole("link", { name: 'Recruitment' })
        this.vacanciesTab = page.getByRole("link", { name: 'Vacancies' })
        this.addButton = page.getByRole('button', { name: 'Add' })
        this.addVacancyHeading = page.getByRole('heading', { name: 'Add Vacancy' })
        this.editVacancyHeading = page.getByRole('heading', { name: 'Edit Vacancy' })
        this.vacancyNameInput = page.locator("//label[text()='Vacancy Name']/following::input").nth(0)
        this.jobTitleDropdown = page.locator("//label[text()='Job Title']/following::div[contains(@class,'oxd-select-text')]").nth(0)
        this.descriptionInput = page.getByPlaceholder('Type description here')
        this.hiringManagerInput = page.getByPlaceholder('Type for hints...')
        this.positionsInput = page.locator("//label[text()='Number of Positions']/following::input").nth(0)
        this.activeToggle = page.locator('.oxd-switch-input').nth(0)
        this.publishToggle = page.locator('.oxd-switch-input').nth(1)
        this.rssFeedUrlLink = page.getByRole('link', { name: /jobs\.rss/ })
        this.webPageUrlLink = page.getByRole('link', { name: /jobs\.html/ })
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.searchButton = page.getByRole('button', { name: 'Search' })
        this.resetButton = page.getByRole('button', { name: 'Reset' })
        this.filterJobTitleDropdown = page.locator("//label[text()='Job Title']/following::div[contains(@class,'oxd-select-text')]").nth(0)
        this.filterVacancyDropdown = page.locator("//label[text()='Vacancy']/following::div[contains(@class,'oxd-select-text')]").nth(0)
        this.filterHiringManagerDropdown = page.locator("//label[text()='Hiring Manager']/following::div[contains(@class,'oxd-select-text')]").nth(0)
        this.filterStatusDropdown = page.locator("//label[text()='Status']/following::div[contains(@class,'oxd-select-text')]").nth(0)
        this.noRecordsFoundLabel = page.getByText('No Records Found', { exact: true })
        this.deleteDialog = page.getByRole('dialog')
        this.deleteSelectedButton = page.getByRole('button', { name: 'Delete Selected' })
    }

    async navigateToRecruitment(): Promise<void> {
        return await this.pageStep("Navigate to Recruitment Module", async () => {
            await this.recruitmentMenu.click();
        })
    }

    async navigateToVacancies(): Promise<void> {
        return await this.pageStep("Navigate to Vacancies Tab", async () => {
            await this.vacanciesTab.click();
            await this.waitUntilTableLoaderDissapear();
        })
    }

    async clickAddVacancy(): Promise<void> {
        return await this.pageStep("Click on Add Vacancy Button", async () => {
            await this.addButton.click();
            await expect(this.addVacancyHeading).toBeVisible();
        })
    }

    async fillVacancyForm(data: VacancyData): Promise<void> {
        return await this.pageStep(`Fill Vacancy Form for ${data.vacancyName}`, async () => {
            await this.vacancyNameInput.fill(data.vacancyName);
            if (data.jobTitle !== "") {
                await this.selectJobTitle(data.jobTitle);
            }
            if (data.description !== "") {
                await this.descriptionInput.fill(data.description);
            }
            if (data.hiringManager !== "") {
                await this.selectHiringManager(data.hiringManager);
            }
            if (data.numberOfPositions !== "") {
                await this.positionsInput.fill(data.numberOfPositions);
            }
            if (!data.active) {
                await this.setActiveToggle(false);
            }
            if (!data.publish) {
                await this.setPublishToggle(false);
            }
        })
    }

    async selectJobTitle(jobTitle: string): Promise<void> {
        return await this.pageStep(`Select Job Title as ${jobTitle}`, async () => {
            await this.jobTitleDropdown.click();
            await this.page.getByRole('option', { name: jobTitle, exact: true }).click();
        })
    }

    async selectHiringManager(managerName: string): Promise<void> {
        return await this.pageStep(`Select Hiring Manager as ${managerName}`, async () => {
            await this.hiringManagerInput.fill(managerName);
            await this.page.locator('.oxd-autocomplete-dropdown').waitFor({ state: 'visible' });
            await this.page.locator('.oxd-autocomplete-dropdown').getByText(managerName).click();
        })
    }

    async fillHiringManagerWithoutSelecting(managerName: string): Promise<void> {
        return await this.pageStep(`Fill Hiring Manager as ${managerName} without selecting a suggestion`, async () => {
            await this.hiringManagerInput.fill(managerName);
        })
    }

    async fillVacancyName(name: string): Promise<void> {
        return await this.pageStep("Fill Vacancy Name", async () => {
            await this.vacancyNameInput.fill(name);
        })
    }

    async fillNumberOfPositions(positions: string): Promise<void> {
        return await this.pageStep(`Fill Number of Positions as ${positions}`, async () => {
            await this.positionsInput.fill(positions);
        })
    }

    async setActiveToggle(state: boolean): Promise<void> {
        return await this.pageStep(`Set Active toggle to ${state}`, async () => {
            const checkbox = this.page.locator("//p[text()='Active']/following::input[@type='checkbox']").nth(0);
            if (await checkbox.isChecked() !== state) {
                await this.activeToggle.click();
            }
        })
    }

    async setPublishToggle(state: boolean): Promise<void> {
        return await this.pageStep(`Set Publish toggle to ${state}`, async () => {
            const checkbox = this.page.locator("//p[text()='Publish in RSS Feed and Web Page']/following::input[@type='checkbox']").nth(0);
            if (await checkbox.isChecked() !== state) {
                await this.publishToggle.click();
            }
        })
    }

    async clickOnSaveButton(): Promise<void> {
        return await this.pageStep("Click on Save Button", async () => {
            await this.saveButton.click();
        })
    }

    async clickOnCancelButton(): Promise<void> {
        return await this.pageStep("Click on Cancel Button", async () => {
            await this.cancelButton.click();
        })
    }

    async validateDefaultToggleStates(): Promise<void> {
        return await this.pageStep("Validate Active and Publish toggles are ON by default", async () => {
            const activeCheckbox = this.page.locator("//p[text()='Active']/following::input[@type='checkbox']").nth(0);
            const publishCheckbox = this.page.locator("//p[text()='Publish in RSS Feed and Web Page']/following::input[@type='checkbox']").nth(0);
            expect(await activeCheckbox.isChecked()).toBe(true);
            expect(await publishCheckbox.isChecked()).toBe(true);
        })
    }

    async validateRedirectionToEditVacancy(): Promise<void> {
        return await this.pageStep("Validate redirection to Edit Vacancy page", async () => {
            await expect(this.page).toHaveURL(/addJobVacancy\/\d+/);
            await expect(this.editVacancyHeading).toBeVisible();
        })
    }

    async validateFormValues(data: VacancyData): Promise<void> {
        return await this.pageStep("Validate retained form values", async () => {
            await expect(this.vacancyNameInput).toHaveValue(data.vacancyName);
            await expect(this.jobTitleDropdown).toHaveText(data.jobTitle);
            await expect(this.hiringManagerInput).toHaveValue(data.hiringManager);
            if (data.description !== "") {
                await expect(this.descriptionInput).toHaveValue(data.description);
            }
            if (data.numberOfPositions !== "") {
                await expect(this.positionsInput).toHaveValue(data.numberOfPositions);
            }
        })
    }

    async validatePublishUrlsVisible(): Promise<void> {
        return await this.pageStep("Validate RSS and Web Page URLs are visible", async () => {
            await expect(this.rssFeedUrlLink).toBeVisible();
            await expect(this.webPageUrlLink).toBeVisible();
        })
    }

    async validatePublishUrlsStillVisible(): Promise<void> {
        return await this.pageStep("Validate RSS and Web Page URLs remain visible", async () => {
            await expect(this.rssFeedUrlLink).toBeVisible();
            await expect(this.webPageUrlLink).toBeVisible();
        })
    }

    private fieldErrorLocator(label: string): Locator {
        return this.page.locator(`//label[text()='${label}']/ancestor::div[contains(@class,'oxd-input-group')]//span[contains(@class,'oxd-input-field-error-message')]`);
    }

    async validateFieldError(label: string, message: string): Promise<void> {
        return await this.pageStep(`Validate error '${message}' under ${label}`, async () => {
            await expect(this.fieldErrorLocator(label)).toHaveText(message);
        })
    }

    async validateNoFieldError(label: string): Promise<void> {
        return await this.pageStep(`Validate no error under ${label}`, async () => {
            await expect(this.fieldErrorLocator(label)).toBeHidden();
        })
    }

    async selectFilterJobTitle(jobTitle: string): Promise<void> {
        return await this.pageStep(`Select Job Title filter as ${jobTitle}`, async () => {
            await this.filterJobTitleDropdown.click();
            await this.page.getByRole('option', { name: jobTitle, exact: true }).click();
        })
    }

    async selectFilterVacancy(vacancyName: string): Promise<void> {
        return await this.pageStep(`Select Vacancy filter as ${vacancyName}`, async () => {
            await this.filterVacancyDropdown.click();
            await this.page.getByRole('option', { name: vacancyName, exact: true }).click();
        })
    }

    async selectFilterHiringManager(managerName: string): Promise<void> {
        return await this.pageStep(`Select Hiring Manager filter as ${managerName}`, async () => {
            await this.filterHiringManagerDropdown.click();
            await this.page.getByRole('option', { name: managerName, exact: true }).click();
        })
    }

    async selectFilterStatus(status: string): Promise<void> {
        return await this.pageStep(`Select Status filter as ${status}`, async () => {
            await this.filterStatusDropdown.click();
            await this.page.getByRole('option', { name: status, exact: true }).click();
        })
    }

    async clickOnSearchButton(): Promise<void> {
        return await this.pageStep("Click on Search Button", async () => {
            await this.searchButton.click();
            await this.waitUntilTableLoaderDissapear();
        })
    }

    async clickOnResetButton(): Promise<void> {
        return await this.pageStep("Click on Reset Button", async () => {
            await this.resetButton.click();
            await this.waitUntilTableLoaderDissapear();
        })
    }

    async validateRecordCount(count: number): Promise<void> {
        return await this.pageStep(`Validate record count is ${count}`, async () => {
            await expect(this.page.getByText(`(${count}) Record${count === 1 ? '' : 's'} Found`)).toBeVisible();
        })
    }

    async validateNoRecordsFoundInTable(): Promise<void> {
        return await this.pageStep("Validate No Records Found is shown in the table area", async () => {
            await expect(this.noRecordsFoundLabel.first()).toBeVisible();
        })
    }

    async validateFiltersAreReset(): Promise<void> {
        return await this.pageStep("Validate all filter dropdowns show -- Select --", async () => {
            await expect(this.filterJobTitleDropdown).toHaveText('-- Select --');
            await expect(this.filterVacancyDropdown).toHaveText('-- Select --');
            await expect(this.filterHiringManagerDropdown).toHaveText('-- Select --');
            await expect(this.filterStatusDropdown).toHaveText('-- Select --');
        })
    }

    async validateVacancyRow(vacancyName: string, jobTitle: string, hiringManager: string, status: string): Promise<void> {
        return await this.pageStep(`Validate list row for ${vacancyName}`, async () => {
            const row = this.page.getByRole('row', { name: vacancyName });
            await expect(row.getByRole('cell', { name: vacancyName, exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: jobTitle, exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: hiringManager, exact: true })).toBeVisible();
            await expect(row.getByRole('cell', { name: status, exact: true })).toBeVisible();
        })
    }

    async validateVacancyRowVisible(vacancyName: string): Promise<void> {
        return await this.pageStep(`Validate row for ${vacancyName} is visible`, async () => {
            await expect(this.page.getByRole('cell', { name: vacancyName, exact: true })).toBeVisible();
        })
    }

    async validateVacancyRowAbsent(vacancyName: string): Promise<void> {
        return await this.pageStep(`Validate row for ${vacancyName} is absent`, async () => {
            await expect(this.page.getByRole('cell', { name: vacancyName, exact: true })).toBeHidden();
        })
    }

    async clickEditOnRow(vacancyName: string): Promise<void> {
        return await this.pageStep(`Click Edit icon on row ${vacancyName}`, async () => {
            await this.page.getByRole('row', { name: vacancyName }).locator('.bi-pencil-fill').click();
            await expect(this.editVacancyHeading).toBeVisible();
            await this.waitUntilFormLoaderDissapear();
            // The edit form populates its values asynchronously after the heading renders;
            // interacting before that resets any filled value or toggle state on load
            await expect(this.vacancyNameInput).not.toHaveValue('');
        })
    }

    async clickDeleteOnRow(vacancyName: string): Promise<void> {
        return await this.pageStep(`Click Delete icon on row ${vacancyName}`, async () => {
            await this.page.getByRole('row', { name: vacancyName }).locator('.bi-trash').click();
        })
    }

    async validateDeleteConfirmationDialog(): Promise<void> {
        return await this.pageStep("Validate delete confirmation dialog", async () => {
            await expect(this.deleteDialog.getByText('Are you Sure?')).toBeVisible();
            await expect(this.deleteDialog.getByText('The selected record will be permanently deleted. Are you sure you want to continue?')).toBeVisible();
        })
    }

    async confirmDelete(): Promise<void> {
        return await this.pageStep("Confirm deletion", async () => {
            await this.deleteDialog.getByRole('button', { name: 'Yes, Delete' }).click();
        })
    }

    async cancelDelete(): Promise<void> {
        return await this.pageStep("Cancel deletion", async () => {
            await this.deleteDialog.getByRole('button', { name: 'No, Cancel' }).click();
            await expect(this.deleteDialog).toBeHidden();
        })
    }

    async selectAllRows(): Promise<void> {
        return await this.pageStep("Select all rows via header checkbox", async () => {
            await this.page.locator('.oxd-table-header .oxd-checkbox-input').click();
        })
    }

    async clickDeleteSelected(): Promise<void> {
        return await this.pageStep("Click Delete Selected button", async () => {
            await this.deleteSelectedButton.click();
        })
    }

}

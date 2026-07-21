// spec: specs/vacancy.plan.md
import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee'
import { VacancyPage } from '../../pages/Recruitment/VacancyPage';
import { vacancyData } from '../../data/Recruitment/vacancy';

test.describe("Recruitment Vacancy - add, validate, filter, edit and delete", () => {
    let logAsAdmin: LogAsAdmin;
    let addEmployee: AddEmployee;
    let vacancyPage: VacancyPage;

    test.beforeAll(async ({ }) => {
        const requestContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(requestContext);
        addEmployee = new AddEmployee(requestContext);
        await logAsAdmin.loginAsAdmin();
        const employeeSet = await addEmployee.getEmployees();
        const exists = employeeSet.data.some((emp: any) => emp.employeeId === vacancyData.hiringManagerEmployee.employeeId);
        if (!exists) {
            try {
                await addEmployee.addEmployees([vacancyData.hiringManagerEmployee]);
            } catch (error) {
                console.log("Hiring manager employee could not be added (may already exist): " + error);
            }
        }
    })

    test.beforeEach(async ({ page, logger }) => {
        vacancyPage = new VacancyPage(page, logger);
        await page.goto("/");
        await vacancyPage.loginasAdmin();
        await vacancyPage.navigateToRecruitment();
        await vacancyPage.navigateToVacancies();
    })

    // 1. Add Vacancy - Positive

    test("1. Add vacancy with all fields and validate values are retained", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.validateDefaultToggleStates();
        await vacancyPage.fillVacancyForm(vacancyData.vacancyWithAllFields);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateRedirectionToEditVacancy();
        await vacancyPage.validateFormValues(vacancyData.vacancyWithAllFields);
    })

    test("2. Add vacancy with only mandatory fields", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyForm(vacancyData.vacancyWithMandatoryFields);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateRedirectionToEditVacancy();
    })

    test("3. Validate added vacancies are listed with correct details", async () => {
        await vacancyPage.validateVacancyRow(
            vacancyData.vacancyWithAllFields.vacancyName,
            vacancyData.vacancyWithAllFields.jobTitle,
            vacancyData.hiringManagerDisplayName,
            "Active");
        await vacancyPage.validateVacancyRow(
            vacancyData.vacancyWithMandatoryFields.vacancyName,
            vacancyData.vacancyWithMandatoryFields.jobTitle,
            vacancyData.hiringManagerDisplayName,
            "Active");
    })

    test("4. Add vacancy with Active toggle off and validate Closed status in list", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyForm(vacancyData.vacancyInactive);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateRedirectionToEditVacancy();
        await vacancyPage.navigateToVacancies();
        await vacancyPage.validateVacancyRow(
            vacancyData.vacancyInactive.vacancyName,
            vacancyData.vacancyInactive.jobTitle,
            vacancyData.hiringManagerDisplayName,
            "Closed");
    })

    test("5. Validate publish URLs are shown by default and remain visible when publish toggle is off", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.validatePublishUrlsVisible();
        await vacancyPage.setPublishToggle(false);
        await vacancyPage.validatePublishUrlsStillVisible();
    })

    // 2. Add Vacancy - Negative / Validation

    test("6. Validate required field errors when saving an empty form", async ({ page }) => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Vacancy Name", vacancyData.errorMessages.required);
        await vacancyPage.validateFieldError("Job Title", vacancyData.errorMessages.required);
        await vacancyPage.validateFieldError("Hiring Manager", vacancyData.errorMessages.required);
        await vacancyPage.validateNoFieldError("Number of Positions");
        await expect(page).toHaveURL(/addJobVacancy$/);
    })

    test("7. Validate error for duplicate vacancy name", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyName(vacancyData.vacancyWithAllFields.vacancyName);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Vacancy Name", vacancyData.errorMessages.alreadyExists);
    })

    test("8. Validate error for hiring manager not selected from suggestions", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillHiringManagerWithoutSelecting(vacancyData.invalidHiringManager);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Hiring Manager", vacancyData.errorMessages.invalid);
    })

    test("9. Validate error for non numeric number of positions", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillNumberOfPositions(vacancyData.nonNumericPositions);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Number of Positions", vacancyData.errorMessages.numeric);
    })

    test("10. Validate error when vacancy name exceeds 50 characters", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyName(vacancyData.overlengthVacancyName);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Vacancy Name", vacancyData.errorMessages.exceed50);
    })

    // 3. Add Vacancy - Edge Cases

    test("11. Add vacancy with a name of exactly 50 characters", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyForm(vacancyData.vacancyWithBoundaryName);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateRedirectionToEditVacancy();
    })

    test("12. Validate whitespace only vacancy name is not accepted", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyName(vacancyData.whitespaceOnlyVacancyName);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Vacancy Name", vacancyData.errorMessages.required);
    })

    test("13. Add vacancy with special characters in the name", async () => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyForm(vacancyData.vacancyWithSpecialCharacters);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateRedirectionToEditVacancy();
        await vacancyPage.validateFormValues(vacancyData.vacancyWithSpecialCharacters);
    })

    test("14. Validate vacancy is not saved when cancel is clicked", async ({ page }) => {
        await vacancyPage.clickAddVacancy();
        await vacancyPage.fillVacancyForm(vacancyData.vacancyForCancel);
        await vacancyPage.clickOnCancelButton();
        await expect(page).toHaveURL(/viewJobVacancy/);
        await vacancyPage.validateVacancyRowAbsent(vacancyData.vacancyForCancel.vacancyName);
    })

    // 4. Vacancy List - Search, Filter, Reset

    test("15. Filter vacancies by job title", async () => {
        await vacancyPage.selectFilterJobTitle(vacancyData.vacancyWithMandatoryFields.jobTitle);
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateRecordCount(1);
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithMandatoryFields.vacancyName);
    })

    test("16. Filter vacancies by status", async () => {
        await vacancyPage.selectFilterStatus("Active");
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithAllFields.vacancyName);
        await vacancyPage.validateVacancyRowAbsent(vacancyData.vacancyInactive.vacancyName);
        await vacancyPage.selectFilterStatus("Closed");
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyInactive.vacancyName);
        await vacancyPage.validateVacancyRowAbsent(vacancyData.vacancyWithAllFields.vacancyName);
    })

    test("17. Filter vacancies by vacancy name", async () => {
        await vacancyPage.selectFilterVacancy(vacancyData.vacancyWithAllFields.vacancyName);
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateRecordCount(1);
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithAllFields.vacancyName);
    })

    test("18. Filter vacancies by hiring manager", async () => {
        await vacancyPage.selectFilterHiringManager(vacancyData.hiringManagerDisplayName);
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithAllFields.vacancyName);
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithMandatoryFields.vacancyName);
    })

    test("19. Validate no records found for unmatched filter criteria", async () => {
        await vacancyPage.selectFilterJobTitle(vacancyData.jobTitleWithoutVacancies);
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateNoRecordsFoundInTable();
        await vacancyPage.VerifyNoRecords();
    })

    test("20. Reset filters and validate full list is restored", async () => {
        await vacancyPage.selectFilterJobTitle(vacancyData.jobTitleWithoutVacancies);
        await vacancyPage.clickOnSearchButton();
        await vacancyPage.validateNoRecordsFoundInTable();
        await vacancyPage.clickOnResetButton();
        await vacancyPage.validateFiltersAreReset();
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithAllFields.vacancyName);
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyInactive.vacancyName);
    })

    // 5. Edit Vacancy

    test("21. Validate existing values are loaded in the edit form", async () => {
        await vacancyPage.clickEditOnRow(vacancyData.vacancyWithMandatoryFields.vacancyName);
        await vacancyPage.validateFormValues(vacancyData.vacancyWithMandatoryFields);
    })

    test("22. Update vacancy name and number of positions", async () => {
        await vacancyPage.clickEditOnRow(vacancyData.vacancyWithMandatoryFields.vacancyName);
        await vacancyPage.fillVacancyName(vacancyData.updatedVacancyName);
        await vacancyPage.fillNumberOfPositions(vacancyData.updatedNumberOfPositions);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.verifySuccessToastForSave();
        await vacancyPage.navigateToVacancies();
        await vacancyPage.validateVacancyRowVisible(vacancyData.updatedVacancyName);
        await vacancyPage.validateVacancyRowAbsent(vacancyData.vacancyWithMandatoryFields.vacancyName);
    })

    test("23. Deactivate a vacancy and validate Closed status in the list", async () => {
        await vacancyPage.clickEditOnRow(vacancyData.vacancyWithBoundaryName.vacancyName);
        await vacancyPage.setActiveToggle(false);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.verifySuccessToastForSave();
        await vacancyPage.navigateToVacancies();
        await vacancyPage.validateVacancyRow(
            vacancyData.vacancyWithBoundaryName.vacancyName,
            vacancyData.vacancyWithBoundaryName.jobTitle,
            vacancyData.hiringManagerDisplayName,
            "Closed");
    })

    test("24. Validate duplicate error when renaming a vacancy to an existing name", async () => {
        await vacancyPage.clickEditOnRow(vacancyData.vacancyWithSpecialCharacters.vacancyName);
        await vacancyPage.fillVacancyName(vacancyData.vacancyWithAllFields.vacancyName);
        await vacancyPage.clickOnSaveButton();
        await vacancyPage.validateFieldError("Vacancy Name", vacancyData.errorMessages.alreadyExists);
    })

    // 6. Delete Vacancy

    test("25. Validate vacancy remains when deletion is cancelled", async () => {
        await vacancyPage.clickDeleteOnRow(vacancyData.vacancyWithSpecialCharacters.vacancyName);
        await vacancyPage.validateDeleteConfirmationDialog();
        await vacancyPage.cancelDelete();
        await vacancyPage.validateVacancyRowVisible(vacancyData.vacancyWithSpecialCharacters.vacancyName);
    })

    test("26. Delete a vacancy from the row action", async () => {
        await vacancyPage.clickDeleteOnRow(vacancyData.vacancyWithSpecialCharacters.vacancyName);
        await vacancyPage.validateDeleteConfirmationDialog();
        await vacancyPage.confirmDelete();
        await vacancyPage.verifySuccessToastforDeletion();
        await vacancyPage.waitUntilTableLoaderDissapear();
        await vacancyPage.validateVacancyRowAbsent(vacancyData.vacancyWithSpecialCharacters.vacancyName);
    })

    test("27. Bulk delete all remaining vacancies", async () => {
        await vacancyPage.selectAllRows();
        await vacancyPage.clickDeleteSelected();
        await vacancyPage.validateDeleteConfirmationDialog();
        await vacancyPage.confirmDelete();
        await vacancyPage.verifySuccessToastforDeletion();
        await vacancyPage.waitUntilTableLoaderDissapear();
        await vacancyPage.validateNoRecordsFoundInTable();
    })

})

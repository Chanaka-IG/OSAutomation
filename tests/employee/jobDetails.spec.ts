import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { JobDetailsPage } from '../../pages/PIM/JobDetailsPage';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { TerminateEmployee } from '../../api/Employee/TerminateEmployee';
import { jobData } from '../../data/PIM/jobDetails'
import { FilterAndSearchPage } from '../../pages/PIM/FilterAndSearchPage';

test.describe("Test cases for Job details updates", () => {

    let jobDetailsPage: JobDetailsPage;
    let addEmployee: AddEmployee;
    let logAsAdmin: LogAsAdmin;
    let terminateEmployee: TerminateEmployee;
    let filterAndSearchPage: FilterAndSearchPage;
    const attachmentPath = '../../data/Attachments/test-upload-attachment.pdf'
    const replaceAttachmentPath = '../../data/Attachments/test-replace-attachment.pdf'


    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(apiContext)
        addEmployee = new AddEmployee(apiContext)
        terminateEmployee = new TerminateEmployee(apiContext)
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(jobData.AddEmployee)
        await addEmployee.addEmployees(jobData.ApiAddEmployee)
    })

    test.beforeEach(async ({ page, logger }) => {
        jobDetailsPage = new JobDetailsPage(page, logger)
        await page.goto("/")
        await jobDetailsPage.loginasAdmin();
        await jobDetailsPage.navigateToPim();
    })

    test.skip("1. Update job related data and verify", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[0]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[0]);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
    })

    test.skip("2. Update job related data with Include Employment Contract Details", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[1]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[1], attachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
    })

    test.skip("3. Keep the already added attachment from the job tab", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[2]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[2], attachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
        await jobDetailsPage.attachmentCOnfig("Keep Current");
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.validateAttachmentArea("Keep Current");

    })

    test.skip("4. Delete the already added attachment from the job tab", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[3]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[2], attachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
        await jobDetailsPage.attachmentCOnfig("Delete Current");
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.validateAttachmentArea("Delete Current");

    })

    test.skip("5. Replace the already added attachment from the job tab", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[4]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[2], attachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
        await jobDetailsPage.attachmentCOnfig("Replace Current", replaceAttachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.waitUntilFormLoaderDissapear();
        await jobDetailsPage.validateAttachmentArea("Replace Current");

    })

    test.skip("6. Terminate an employee", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[5]);
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.clickOnTerminateButton();
        await jobDetailsPage.fillAndTerminate(jobData.terminationData[0]);
        await jobDetailsPage.verifySuccessToastForUpdate();
        await jobDetailsPage.verifySuccessTermination(jobData.terminationData[0]);

    })

    test.only("7. Rehire an employee", async ({ page, logger }) => {
        filterAndSearchPage = new FilterAndSearchPage(page, logger)
        await jobDetailsPage.navigateToPim();
        await jobDetailsPage.navigateToEMployeeProfile(jobData.ApiAddEmployee[0]);
        const url = page.url();
        const empNumber = Number(url.split('/').pop());
        await terminateEmployee.terminateEMployee(empNumber, jobData.apiDataTermination[0]);
        await jobDetailsPage.navigateToPim();
        await filterAndSearchPage.fillFilterValues(jobData.EmployeeFilter[0]);
        await jobDetailsPage.clickOnSearchBtn();
        await jobDetailsPage.navigateToEMployeeProfile(jobData.ApiAddEmployee[0]);
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.clickOnActivateButton();
        await jobDetailsPage.verifySuccessToastForUpdate();
        await jobDetailsPage.verifySuccessRehire();
    })

})


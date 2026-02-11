import { test, expect, request } from '../../Fixtures/logger.fixtures';
import { JobDetailsPage } from '../../pages/PIM/JobDetailsPage';
import { LogAsAdmin } from '../../api/logAsAdmin'
import { AddEmployee } from '../../api/Employee/AddEmployee';
import { jobData } from '../../data/PIM/jobDetails'

test.describe("Test cases for Job details updates", () => {

    let jobDetailsPage: JobDetailsPage;
    let addEmployee: AddEmployee;
    let logAsAdmin: LogAsAdmin;
    const attachmentPath = '../../data/Attachments/test-upload-attachment.pdf'


    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        logAsAdmin = new LogAsAdmin(apiContext)
        addEmployee = new AddEmployee(apiContext)
        await logAsAdmin.loginAsAdmin();
        await addEmployee.addEmployees(jobData.AddEmployee)
    })

    test.beforeEach(async ({ page, logger }) => {
        jobDetailsPage = new JobDetailsPage(page, logger)
        await page.goto("/")
        await jobDetailsPage.loginasAdmin();
        await jobDetailsPage.navigateToPim();
    })

    test("1. Update job related data and verify", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[0]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[0]);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
    })

    test("2. Update job related data with Include Employment Contract Details", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[1]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[1],attachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
    })

    test.only("3. Keep the akready added attachment from the job tab", async () => {
        await jobDetailsPage.navigateToEMployeeProfile(jobData.AddEmployee[2]);
        await jobDetailsPage.waitUntilLoaderDissapear();
        await jobDetailsPage.navigateToJobMenu();
        await jobDetailsPage.fillJobDetails(jobData.JobData[2],attachmentPath);
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.verifySuccessToastForUpdate();
        await jobDetailsPage.attachmentCOnfig("Keep Current");
        await jobDetailsPage.clickOnSave();
        await jobDetailsPage.validateAttachmentArea("Keep Current");

    })


})


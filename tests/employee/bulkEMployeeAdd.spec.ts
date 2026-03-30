import { test, expect } from '../../Fixtures/logger.fixtures';
import { BulkEmployeeAddPage } from '../../pages/PIM/BulkEmployeeAddPage';
import { BulkEmployeeAddData, BulkEmployeeAddDataForValidation, validateEMployee } from '../../data/PIM/bulkEmployeeAdd';


test.describe("Bulk Employee Add Test", () => {
    let bulkEmployeeAddPage: BulkEmployeeAddPage;

    test.beforeEach(async ({ page, logger }) => {
        bulkEmployeeAddPage = new BulkEmployeeAddPage(page, logger);
        await page.goto("/")
        await bulkEmployeeAddPage.loginasAdmin();
        await bulkEmployeeAddPage.navigateToPim();
        await bulkEmployeeAddPage.navigateToDataImportMenu();
    })

    test('1. Download XLS file for bulk employee add', async () => {
        await bulkEmployeeAddPage.downloadXlsFile();
        await bulkEmployeeAddPage.editCSVFile(BulkEmployeeAddData);
        await bulkEmployeeAddPage.uploadCSVFile();
        await bulkEmployeeAddPage.clickOnUploadBtn();
        await bulkEmployeeAddPage.waitUntilFormLoaderDissapear();
        await bulkEmployeeAddPage.validatePopup("Successfully Imported");
        await bulkEmployeeAddPage.navigateToEmployeeList();
        await bulkEmployeeAddPage.validateAddedEMployeeInList(validateEMployee);
    })

    test('2. Download XLS file for bulk employee add with an error', async ({ page }) => {
        await bulkEmployeeAddPage.downloadXlsFile();
        await bulkEmployeeAddPage.editCSVFile(BulkEmployeeAddDataForValidation);
        await bulkEmployeeAddPage.uploadCSVFile();
        await bulkEmployeeAddPage.clickOnUploadBtn();
        await bulkEmployeeAddPage.waitUntilFormLoaderDissapear();
        await bulkEmployeeAddPage.validatePopup("Successfully Imported");
        await page.reload();
        await bulkEmployeeAddPage.uploadCSVFile();
        await bulkEmployeeAddPage.clickOnUploadBtn();
        await bulkEmployeeAddPage.waitUntilFormLoaderDissapear();
        await bulkEmployeeAddPage.validatePopup("Records Failed to Import");


    })
}
)
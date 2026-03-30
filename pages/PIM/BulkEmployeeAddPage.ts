import { Page, Locator } from '@playwright/test';
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { BasePage } from '../Base/BasePage'
import type { EmployeeData } from '../../data/PIM/bulkEmployeeAdd';


export class BulkEmployeeAddPage extends BasePage {

    private logger: Logger;
    private readonly PIMmenu: Locator;
    private readonly configureMenu: Locator
    private readonly dataImportMenu: Locator
    private readonly dowloadBtn: Locator
    private readonly browseBtn: Locator;
    private readonly uploadBtn: Locator;
    private readonly popupContainer: Locator;
    private readonly popupOkBtn: Locator;
    private readonly tableCOntainer: Locator;
    private readonly employeeList: Locator;


    constructor(page: Page, logger: Logger) {
        super(page);
        this.logger = logger;
        this.PIMmenu = page.getByRole("link", { name: 'PIM' })
        this.configureMenu = page.getByText('Configuration ', { exact: true })
        this.dataImportMenu = page.getByRole("menuitem", { name: 'Data Import' })
        this.dowloadBtn = page.getByRole("link", { name: 'Download' })
        this.browseBtn = page.getByText("Browse", { exact: true })
        this.uploadBtn = page.getByRole("button", { name: 'Upload' })
        this.popupContainer = page.locator('.orangehrm-dialog-popup');
        this.popupOkBtn = this.popupContainer.getByRole('button', { name: 'OK' });
        this.tableCOntainer = page.locator(".orangehrm-container")
        this.employeeList = page.getByRole("link", { name: 'Employee List' })
    }

    async navigateToPim(): Promise<void> {
        return await this.pageStep("Navigate to PIM menu", async () => {
            await this.PIMmenu.click();
        })
    }

    async navigateToDataImportMenu(): Promise<void> {
        return await this.pageStep("Navigate to Data Import section", async () => {
            await this.configureMenu.click();
            await this.dataImportMenu.click();
        })
    }

    async downloadXlsFile(): Promise<void> {
        return await this.pageStep("Download XLS File", async () => {
            const fileName = "importData.csv";
            const [download] = await Promise.all([
                this.page.waitForEvent('download', { timeout: 10000 }),
                this.dowloadBtn.click()
            ]);

            await download.saveAs(fileName);
        });
    }

    async editCSVFile(updateData: any): Promise<void> {
        return await this.pageStep("Edit CSV file and add employee data", async () => {

            const fs = require('fs');

            const filePath = "importData.csv";

            const content = await fs.promises.readFile(filePath, 'utf-8');
            const lines = content.split(/\r?\n/);
            const header = lines[0];

            const newData = updateData;
                

            const updatedContent = header + '\n' + newData;

            await fs.promises.writeFile(filePath, updatedContent, 'utf-8');

            this.logger.log('CSV file updated correctly.');
        });
    }

    async uploadCSVFile(): Promise<void> {
        return await this.pageStep("Upload edited CSV file and add employee data", async () => {
            const [fileChoose] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.browseBtn.click()

            ])
            const downloadPath = "importData.csv";
            await fileChoose.setFiles(downloadPath)
        });
    }


    async clickOnUploadBtn(): Promise<void> {
        return await this.pageStep("Click on upload button", async () => {
            await this.uploadBtn.click();
        });
    }

    async validatePopup(msg: string): Promise<void> {
        return await this.pageStep("Validate success popup", async () => {
            await this.popupContainer.waitFor({ state: 'visible', timeout: 5000 });
            const popupText = await this.popupContainer.textContent();
            expect(popupText).toContain(msg);
            await this.popupOkBtn.click() ;
        });
    }

    async navigateToEmployeeList(): Promise<void> {
        return await this.pageStep("Navigate to Employee List", async () => {
           await this.employeeList.click();
           await this.waitUntilTableLoaderDissapear();
        });
    }

    async validateAddedEMployeeInList(empData: EmployeeData[]): Promise<void> {
        return await this.pageStep("Validate added employee in list", async () => {
        for (const emp of empData) {
            console.log(`Validating employee with ID: ${emp.employeeId}`);
            const employeeRow = await this.page.locator(".oxd-table-row")
            .filter({ hasText: emp.employeeId })
            .filter({ hasText: emp.firstName + " " + emp.middleName })
            .filter({ hasText: emp.lastName }).count();

            if (employeeRow !== 1){
                this.logger.log(`Employee with ID ${emp.employeeId} not found in the list.`);
            }
            expect(employeeRow).toBe(1);
           }
        });
    }

}
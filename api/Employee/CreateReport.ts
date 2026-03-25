import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import type { JobDetails } from '../../data/PIM/updateJob';
import type { updateEmployeeWithId } from '../../data/PIM/report'


export class CreateReport {

    private readonly apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }


    async createEmployeeReport(reportData: any): Promise<void> {

        try {
            const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/pim/reports/defined`, {
                data: reportData
            })

            console.log(response)

            if (response.ok()) {
                console.log("Report creation success")
            }
            else {
                console.log("Report creation failed")
            }

        }
        catch (error) {
            console.log(error)
        }
    }

}
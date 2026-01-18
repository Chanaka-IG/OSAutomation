import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class JobTitleMaster {
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addJobTitles(jobTitles: any) {

        for (const job of jobTitles) {

            const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/job-titles`,
                {
                    data: {
                        title: job.title,
                        description: job.description,
                        note: job.note,
                    },
                }
            )

            const apiResponse = await response.json();

            if (response.ok()) {
                console.log("Job title has added with the name of : " + job.title)
            }
            else {
                console.log("Job title adding failed - " + await response.text())
            }
        }
    }

}


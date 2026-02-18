import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import type { payGrades } from '../../data/masterdata/payGrade'
import { Logger } from '../../Fixtures/logger.fixtures';



export class PayGradeMaster {
    private readonly apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addPayGrade(payGrade: any) {

        
        try {
            for (const val of payGrade) {
                const response = await this.createPayGrades(val);

                if (response.ok()){
                    console.log ("Pay grade has Successfully added with the name of : " + val.name)
                }
                else {
                    console.log ("Pay grade adding failes " + response.text())
                }

            }
        }
        catch (error) {
            console.log ("" + error)
        }

    }

    async createPayGrades(payGrades: any): Promise<APIResponse> {

        const apiResponse = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/pay-grades`,
            {
                data: {
                    name: payGrades.name
                }
            }

        )

        return apiResponse;
    }

}


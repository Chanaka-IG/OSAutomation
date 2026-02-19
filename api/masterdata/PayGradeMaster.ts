import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import type { payGrades, currency } from '../../data/masterdata/payGrade'
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

                if (response.ok()) {
                    console.log("Pay grade has Successfully added with the name of : " + val.name)
                }
                else {
                    console.log("Pay grade adding failes " + response.text())
                }

            }
        }
        catch (error) {
            console.log("" + error)
        }

    }

    async updatePayGradeCurrency(payGrades: any, currency: any) {


        try {
            for (const val of payGrades) {
                const response = await this.updateCurrency(val, currency);

                if (response.ok()) {
                    console.log("Pay grade has Successfully Updated with the currency for : " + val.name)
                }
                else {
                    console.log("Pay Grade cyrrency add got failed " + response.text())
                }

            }
        }
        catch (error) {
            console.log("" + error)
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

    async updateCurrency(payGrades: any, currency: any): Promise<APIResponse> {

        const apiResponse = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/pay-grades/${payGrades.id}/currencies`,
            {
                data: {
                    currencyId:currency.currencyID,
                    maxSalary: currency.maxSalary,
                    minSalary:currency.minSalary
                }
            }

        )

        return apiResponse;
    }

}


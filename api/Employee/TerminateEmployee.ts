import { APIRequestContext, APIResponse } from '@playwright/test';
import { apiDataTermination } from '../../data/PIM/jobDetails'
import { ENV } from '../../config/env';


export class TerminateEmployee {


    private readonly apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async terminateEMployee(empNumber: number, terminationData: apiDataTermination): Promise<void> {
        try {

            const apiResonse = await this.terminateEmployee(empNumber, terminationData);

            if (apiResonse.ok()) {
                console.log("Employee termination success for employee Number :" + empNumber)
            }
            else {
                console.log("Employee termination failed" + await apiResonse.text())
            }

        }
        catch (error) {
            console.log(error)
        }


    }

    async terminateEmployee(empNumber: number, terminationData: apiDataTermination) {
        console.log(empNumber)
        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${empNumber}/terminations`, {
            data: {
                terminationReasonId: 1,
                date: terminationData.date,
                note: terminationData.note
            }
        })
        return response;

    }

}


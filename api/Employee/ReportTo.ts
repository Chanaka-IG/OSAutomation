import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import { reportToData } from '../../data/PIM/reportTo';

export class ReportTo {
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async assignSupervisor(supervisorFullData: any, subordinateData: any, supervisorData: any): Promise<void> {

        for (let i = 0; i < supervisorData.length; i++) {
            try {

                const apiResponse = await this.assignOneSupervisor(supervisorFullData[i], subordinateData, supervisorData[i]);

                if (apiResponse.ok()) {
                    console.log("Supervisor assigned successfully for employee :" + subordinateData.firstName + " " + subordinateData.lastName+ "." + " Supervisor: " + supervisorData[i].firstName + " " + supervisorData[i].lastName)
                }
                else {
                    console.log("Failed to assign supervisor for employee Number :" + subordinateData.empNumber + " Error: " + await apiResponse.text())
                }

            }
            catch (error) {
                console.log(error)
            }

        }
    }


    async assignOneSupervisor(supervisorFullData: any, subordinateData: any, supervisorData: any) {
        const response = await this.apiContext.post(
            `${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${subordinateData.empNumber}/supervisors`,
            {
                data: {
                    "empNumber": supervisorData.empNumber,
                    "reportingMethodId": supervisorFullData.reportMethod
                }
            }
        );
        return response;
    }
}

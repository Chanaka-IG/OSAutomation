import { APIRequestContext,APIResponse } from "playwright";
import { ENV } from '../../config/env';


export class EmpStatusMaster {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async addEmployementStatus(employStatus: any) {

        for (const val of employStatus) {

            try {
                const response = await this.createEmployementStatus(val);

                const apiReponse = await response.json();

                if (response.ok()) {
                    console.log("Employement status has added with the name of :" + val.name)
                }
                else {
                    console.log("Employement Status adding failed" + await response.text())
                }
            }
            catch (error) {
                console.log(error)
            }

        }


    }


    async createEmployementStatus(val: any): Promise<APIResponse> {
        const response = await this.request.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/employment-statuses`,
            {
                data: {
                    name: val.name,

                },
            }
        )
        return response;
    }

}
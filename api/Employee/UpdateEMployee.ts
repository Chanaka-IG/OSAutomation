import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import type { JobDetails } from '../../data/PIM/updateJob';

export class UpdateEmployee {

    private readonly apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }


    async updateEmployeeDetails(EmployeeNumber: number, employeeDetails: JobDetails): Promise<void> {

        try {

            const apiResonse = await this.updateJob(EmployeeNumber, employeeDetails);

            const response = await apiResonse.json();
            if (apiResonse.ok()) {
                console.log("Employee details updated successfully for Employee Number :" + EmployeeNumber)
            }
            else {
                console.log("Employee details updation failed" + await apiResonse.text())
            }

        }
        catch (error) {
            console.log(error)
        }

    }


    async updateJob(EmployeeNumber: number, employeeDetails: any): Promise<APIResponse> {
        console.log(employeeDetails)
        const response = await this.apiContext.put(`${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${EmployeeNumber}/job-details`, {
            data: {
                jobTitleId: employeeDetails.jobTitleId,
                empStatusId: employeeDetails.empStatusId,
                subunitId: employeeDetails.subunitId,
            }
        })
        return response;
    }

}
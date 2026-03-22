import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import type { JobDetails } from '../../data/PIM/updateJob';
import type { updateEmployeeWithId } from '../../data/PIM/report'


export class UpdateEmployee {

    private readonly apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }


    async updateEmployeeJobDetails(EmployeeNumber: number, employeeDetails: any | updateEmployeeWithId): Promise<void> {

        try {
            const response = await this.apiContext.put(`${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${EmployeeNumber}/job-details`, {
                data: {
                    jobTitleId: employeeDetails.jobTitleId,
                    empStatusId: employeeDetails.empStatusId,
                    subunitId: employeeDetails.subunitId,
                    locationId : employeeDetails.locationId
                }
            })

            if (response.ok()) {
                console.log("Employee job details updated successfully for Employee Number :" + EmployeeNumber)
            }
            else {
                console.log("Employee job details updation failed" + await response.text())
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    async updateEmployeePersonalDetails(EmployeeNumber: number, employeeDetails: JobDetails | any): Promise<void> {

        try {
            const response = await this.apiContext.put(`${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${EmployeeNumber}/personal-details`, {
                data: {
                    employeeId: employeeDetails.employeeId,
                    firstName: employeeDetails.firstName,
                    lastName : employeeDetails.lastName,
                    birthday: employeeDetails.birthday,
                    maritalStatus: employeeDetails.maritalStatus,
                    gender: employeeDetails.gender,
                }
            })
            if (response.ok()) {
                console.log("Employee personal details updated successfully for Employee Number :" + EmployeeNumber)
            }
            else {
                console.log("Employee personal details updation failed" + await response.text())
            }

        }
        catch (error) {
            console.log(error)
        }

    }


    async updatePersonal(EmployeeNumber: number, employeeDetails: any): Promise<APIResponse> {
        const response = await this.apiContext.put(`${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${EmployeeNumber}/personal-details`, {
            data: {
                birthday: employeeDetails.birthday,
                maritalStatus: employeeDetails.maritalStatus,
                gender: employeeDetails.gender,
            }
        })
        return response;
    }


}
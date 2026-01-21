import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';

export class UsesMaster {

    private readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addUsers(user: any): Promise<void> {

        for (const userdata of user) {
            try {
                const response = await this.createUsers(userdata)

                if (response.ok()) {
                    console.log("User role created for : " + userdata.username)
                }
                else {
                    console.log("User role creation failed - " + await response.text())
                }
            }
            catch (error) {
                console.log(error)
            }
        }


    }


    async createUsers(userdata: any): Promise<APIResponse> {

        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/users`, {
            data: {
                username: userdata.username,
                password: userdata.password,
                status: userdata.status,
                userRoleId: userdata.userRoleId,
                empNumber: userdata.empNumber
            }
        })
        return response;
    }

}
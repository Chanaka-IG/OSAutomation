import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';

export class CustomUsers {

    private readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addUsers(user: any, customUser : any): Promise<void> {

        const users = user.isArray ? user : [user];

        for (const userdata of users) {
            try {
                const response = await this.createUsers(userdata,customUser)

                if (response.ok()) {
                    console.log("User role created for : " + userdata.firstName + " " + userdata.lastName)
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


    async createUsers(userdata: any, customUser: any): Promise<APIResponse> {

        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/users`, {
            data: {
                username: customUser.username,
                password: customUser.password,
                status: customUser.status,
                userRoleId: customUser.userRoleId,
                empNumber: userdata.empNumber
            }
        })
        return response;
    }

}
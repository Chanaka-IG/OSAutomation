import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';

export class AddUsers {

    private readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

        async addUsersasSingle(empNumber : number, user: any): Promise<void> {
            try {
                const response = await this.createUsers(empNumber,user)

                if (response.ok()) {
                    console.log("User role created for : " + user.username)
                }
                else {
                    console.log("User role creation failed - " + await response.text())
                }
            }
            catch (error) {
                console.log(error)
            }
    }

    async addUsersasBulk(empNumber : number, user: any): Promise<void> {

        for (const userdata of user) {
            try {
                const response = await this.createUsers(empNumber,userdata)

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


    async createUsers(empNumber : number, userdata: any): Promise<APIResponse> {

        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/users`, {
            data: {
                username: userdata.username,
                password: userdata.password,
                status: userdata.status,
                userRoleId: userdata.userRoleId,
                empNumber: empNumber
            }
        })
        return response;
    }

}
import { APIRequestContext, APIResponse } from "@playwright/test";
import { ENV  } from "../../config/env";

export class Members {

    private apiContext: APIRequestContext;


    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addMembers(membersData: any): Promise<void> {

        for (const members of membersData) {
            try {
                const response = await this.createMembership(members);
                if (response.ok()){
                    console.log(`Membership created Successfully : ${members.memebershipName}`)
                }
                else {
                    console.log(`Failed to create Membership : ${members.memebershipName} with status ${response.status()}`)
                }

            }
            catch (error) {
                console.log(error)
            }
        }

    }

    async createMembership(members: any): Promise<APIResponse> {
     
        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/memberships`, {
            data: {
                name: members.memebershipName,
            }
        })
        return response;
    }

}

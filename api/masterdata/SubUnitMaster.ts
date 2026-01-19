import { APIRequestContext,APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';

export class SubUnitMaster {

    private readonly apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addSubUnit(subUnit: any) {

        for (const sub of subUnit) {

            try {
                const response = await this.createSubUnit(sub)

                if (response.ok()) {
                    console.log("New sub unit has added with the name of :" + sub.name)
                }
                else {
                    console.log("Sub unit adding failed" + await response.text())
                }

            }
            catch (error) {
                console.log(error)
            }

        }

    }


    async createSubUnit(sub: any): Promise<APIResponse> {
        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/subunits`, {
            data: {
                parentId: sub.parentId,
                unitId: sub.unitId,
                name: sub.name,
                description: sub.description
            }
        })

        return response;
    }
}
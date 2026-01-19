import { APIRequestContext,APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';

export class LocationMaster {

    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addLocation(location: any) {

        for (const loc of location) {
            try {
                const response = await this.createLocation(loc)

                const apiResponse = await response.json();

                if (response.ok()) {
                    console.log("New location has added with the name of : " + loc.name)
                }
                else {
                    console.log("Location adding failed for : "+ loc.name +"\n Reason : " +await response.text())
                }

            }
            catch (error) {
                console.log(error)
            }

        }

    }

    async createLocation(loc: any): Promise<APIResponse> {
        const response = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/admin/locations`,
            {
                data: {
                    name: loc.name,
                    countryCode: loc.countryCode,
                    province: loc.province,
                    city: loc.city,
                    address: loc.address,
                    zipCode: loc.zipCode,
                    phone: loc.phone,
                    fax: loc.fax,
                    note: loc.note
                }
            }
        )

        return response;
    }
}
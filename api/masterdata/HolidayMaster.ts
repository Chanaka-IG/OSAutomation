import { APIResponse, APIRequestContext } from "playwright";
import { ENV } from '../../config/env';



export class HolidayMaster {

    private readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;

    }

    async addHoliday(holidayData: any[]): Promise<void> {

        for (const val of holidayData) {
            try {
                const response = await this.createHoliday(val);
                if (response.ok()) {
                    console.log('Holiday added successfully :' + val.name);
                } else {
                    console.error('Failed to add holiday : ' + val.name);
                }
            }
            catch (error) {
                console.error('Error adding holiday :', error);
            }
        }
    }

    async createHoliday(holidayData: any): Promise<APIResponse> {

        const res = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/leave/holidays`, {
            data: holidayData
        });
        return res;
    }


}





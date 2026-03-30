import { APIRequestContext, APIResponse } from "playwright";
import { ENV } from '../../config/env';

export class WorkWeekMaster {

    private apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addWorkWeek (workWeek:  any[]): Promise<void> {
        try {
            for (const data of workWeek) {
                const response = await this.createWorkWeek(data);
                if (response.ok()) {
                    console.log('Work week added successfully');
                } else {
                    console.error('Failed to add work week');
                }
            } 
        } catch (error) {
            console.error('Error adding work weeks :', error);
        }
    }

    async createWorkWeek(workWeek: any): Promise<APIResponse> {
        const res = await this.apiContext.put(`${ENV.baseUrl}/web/index.php/api/v2/leave/workweek`, {
            data: workWeek
        });
        return res;
    }
}
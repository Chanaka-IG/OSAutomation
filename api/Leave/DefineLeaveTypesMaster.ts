import { APIRequestContext, APIResponse } from "playwright";
import { ENV } from '../../config/env';
import type { LeaveType } from "../../data/Leave/API/leaveTypes";

export class DefineLeaveTypesMaster {

    private apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addLeaveTypes(leaveTypes: LeaveType[]): Promise<void> {
        try {
            for (const data of leaveTypes) {
                const response = await this.createLeaveType(data);
                if (response.ok()) {
                    console.log('Leave type added successfully :' + data.name);
                } else {
                    console.error('Failed to add leave type:', data.name);
                }
            }
        } catch (error) {
            console.error('Error adding leave types:', error);
        }
    }

    async createLeaveType(leaveType: LeaveType): Promise<APIResponse> {
        const res = await this.apiContext.post(`${ENV.baseUrl}/web/index.php/api/v2/leave/leave-types`, {
            data: leaveType
        });
        return res;
    }
}
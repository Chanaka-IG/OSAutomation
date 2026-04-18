import { APIResponse, APIRequestContext } from "playwright";
import { expect } from "playwright/test";

export class LeaveList {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async submitLeaveRequest(leaveData: any) {
        const response = await this.request.post('/web/index.php/api/v2/leave/leave-requests', {
            data: {
                "leaveTypeId": leaveData.leaveTypeId,
                "fromDate": leaveData.fromDate,
                "toDate": leaveData.toDate,
                "comment": leaveData.comment,
                "duration": leaveData.duration
            }
        });

        if (response.ok()) {
            console.log("Leave successfully applied for employee ID : " + leaveData.employeeId);
        } else {
            console.log(await response.text())
            throw new Error("Leave request failed");
           
        }

        return response;
    }
}





import { APIRequestContext } from "playwright";
import { ENV } from '../../config/env';


export class AssignLeave {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async assignLeave(empNumber: number, leaveData: any) {
        const response = await this.request.post(`${ENV.baseUrl}/web/index.php/api/v2/leave/employees/leave-requests`, {
            data: {
                leaveTypeId: leaveData.leaveTypeId,
                fromDate: leaveData.fromDate,
                toDate: leaveData.toDate,
                comment: leaveData.comment,
                empNumber: empNumber,
                duration: leaveData.duration

            }
        });

        if (response.ok()) {
            console.log("Leave successfully assign for employee ID : " + leaveData.employeeId);
        } else {
            console.log(await response.text())
            throw new Error(`Leave request failed for employee ID : ${leaveData.employeeId}`);

        }

        return response;
    }
}





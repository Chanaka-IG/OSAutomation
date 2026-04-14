import { APIResponse, APIRequestContext } from "playwright";
import { ENV } from '../../config/env';
import { entitlementData } from "../../data/Leave/employeeEntitlement";

export class AddEntitlements {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }


    async addEntitlements(empNumber: number, entitlementData: any): Promise<void> {

        try {
            const response = await this.createEntitlement(empNumber, entitlementData);
            if (response.ok()) {
                console.log('Entitlement added successfully for employee number :' + empNumber);
            } else {
                console.error('Failed to add entitlement : ' + empNumber);
            }
        }
        catch (error) {
            console.error('Error adding entitlement :', error);
        }
    }

    async createEntitlement(empNumber: number, entitlementData: any): Promise<APIResponse> {

        const res = await this.request.post(`${ENV.baseUrl}/web/index.php/api/v2/leave/leave-entitlements`, {
            data: {
                empNumber: empNumber,
                leaveTypeId: entitlementData.leaveTypeId,
                fromDate: entitlementData.fromDate,
                toDate: entitlementData.toDate,
                entitlement: entitlementData.entitlement
            }
        });
        return res;
    }
}





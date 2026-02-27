import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import {reportToData} from '../../data/PIM/reportTo';

export class ReportTo {
    private apiContext : APIRequestContext;

    constructor(apiContext : APIRequestContext){
        this.apiContext = apiContext;
    }

    async assiGnSupervisor(employeeId: string, supervisorData: any): Promise<APIResponse> {
        const response = await this.apiContext.post(
            `${ENV.baseUrl}/web/index.php/api/v2/pim/employees/${employeeId}/report-to`,
            {
                data: supervisorData
            }
        );
        if (!response.ok()) {
            throw new Error(`Failed to assign supervisor: ${response.status()}`);
        }
        return response;
    }
}

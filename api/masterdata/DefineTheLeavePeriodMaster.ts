import { APIRequestContext,APIResponse }  from "playwright";
import { LeavePeriodData} from '../../data/masterdata/leavePeriod';
import { ENV } from '../../config/env';


export class DefineTheLeavePeriodMaster {

    private apiContext : APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async addLeavePeriod(leavePeriodData: LeavePeriodData) {
        try{
            const response = await this.createLeavePeriod(leavePeriodData);
            if(response.ok()){
                console.log('Leave period added successfully');
            } else {
                console.error('Failed to add leave period:', response.statusText());
            }
        }
        catch(error){
            console.error('Error adding leave period:', error);
        }
    }

    async createLeavePeriod(leavePeriodData: LeavePeriodData): Promise<APIResponse> {
        const res = await this.apiContext.put(`${ENV.baseUrl}/web/index.php/api/v2/leave/leave-period`, {
            data: leavePeriodData
        });
        return res;
    }
}

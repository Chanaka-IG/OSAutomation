import { Logger } from '../../Fixtures/logger.fixtures';

import { FullConfig, request } from '@playwright/test';
import { EmployeeMaster } from '../../api/masterdata/EmployeeMaster';
import { JobTitleMaster } from '../../api/masterdata/JobTitleMaster';
import { EmpStatusMaster } from '../../api/masterdata/EmpStatusMaster';
import { LocationMaster } from '../../api/masterdata/LocationMaster';
import { SubUnitMaster } from '../../api/masterdata/SubUnitMaster';
import { UsesMaster } from '../../api/masterdata/UsesMaster';
import { PayGradeMaster } from '../../api/masterdata/PayGradeMaster';
import { MembersMaster } from '../../api/Admin/Members';
import { DefineTheLeavePeriodMaster } from '../../api/masterdata/DefineTheLeavePeriodMaster';
import { DefineLeaveTypesMaster } from '../../api/masterdata/DefineLeaveTypesMaster';
import { WorkWeekMaster } from '../../api/masterdata/WorkWeekMaster';
import { HolidayMaster } from '../../api/masterdata/HolidayMaster';


import { employees } from '../../data/masterdata/employee';
import { jobTitles } from '../../data/masterdata/jobTitle';
import { employStatus } from '../../data/masterdata/employementStatus';
import { location } from '../../data/masterdata/location';
import { subUnits } from '../../data/masterdata/subUnit';
import { user } from '../../data/masterdata/users';
import { payGrades,currency } from '../../data/masterdata/payGrade';
import { MembershipDataList } from '../../data/masterdata/membership';
import { leavePeriodData } from '../../data/masterdata/leavePeriod';
import { leaveTypesData } from '../../data/masterdata/leaveTypes';
import { workWeekData } from '../../data/masterdata/workWeek';
import { holdayData } from '../../data/masterdata/holiday';

const runMasterData = process.env.RUN_MASTER_DATA === 'true';

async function globalSetup(config: FullConfig) {

    if (runMasterData) {
        console.log('Running master data setup');
        const apiContext = await request.newContext();
        const employee = new EmployeeMaster(apiContext);
        const jobTitle = new JobTitleMaster(apiContext);
        const empStatus = new EmpStatusMaster(apiContext);
        const locaiton = new LocationMaster(apiContext);
        const subUnit = new SubUnitMaster(apiContext);
        const users = new UsesMaster(apiContext);
        const payGrade = new PayGradeMaster(apiContext);
        const members = new MembersMaster(apiContext);
        const defineLeavePeriod = new DefineTheLeavePeriodMaster(apiContext);
        const defineLeaveTypes = new DefineLeaveTypesMaster(apiContext);
        const workWeek = new WorkWeekMaster(apiContext);
        const holiday = new HolidayMaster(apiContext);

         await employee.loginAsAdmin();
        await employee.addEmployees(employees);
        await jobTitle.addJobTitles(jobTitles);
        await empStatus.addEmployementStatus(employStatus);
        await locaiton.addLocation(location);
        await subUnit.addSubUnit(subUnits);
        await users.addUsers(user);
        await payGrade.addPayGrade(payGrades);
        await payGrade.updatePayGradeCurrency(payGrades,currency[0]);
        await members.addMembers(MembershipDataList);
        await defineLeavePeriod.addLeavePeriod(leavePeriodData);
        await defineLeaveTypes.addLeaveTypes(leaveTypesData);
        await workWeek.addWorkWeek(workWeekData);
        await holiday.addHoliday(holdayData);    
    }
    else {
        console.log('Skipping master data setup');
        return;
    }
}
export default globalSetup;


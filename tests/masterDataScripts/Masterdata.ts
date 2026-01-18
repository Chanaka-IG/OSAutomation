import { FullConfig, request } from '@playwright/test';
import { EmployeeMaster } from '../../api/masterdata/EmployeeMaster';
import { JobTitleMaster } from '../../api/masterdata/JobTitleMaster';
import { EmpStatusMaster } from '../../api/masterdata/EmpStatusMaster';
import { LocationMaster } from '../../api/masterdata/LocationMaster';
import { SubUnitMaster } from '../../api/masterdata/SubUnitMaster';



import { employees } from '../../data/masterdata/employee';
import { jobTitles } from '../../data/masterdata/jobTitle';
import { employStatus } from '../../data/masterdata/employementStatus';
import { location } from '../../data/masterdata/location';
import { subUnits } from '../../data/masterdata/subUnit';




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
        await employee.loginAsAdmin();
        await employee.addEmployees(employees);
        await jobTitle.addJobTitles(jobTitles);
        await empStatus.addEmployementStatus(employStatus);
        await locaiton.addLocation(location);
        await subUnit.addSubUnit(subUnits);
    
    }
    else {
        console.log('Skipping master data setup');
        return;

    }



}

export default globalSetup;


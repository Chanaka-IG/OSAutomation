
export interface AddReport {
    reportName: string;
    criteria: {
        criteriaName: string;
        values: string;
    }[];
    include: string;
    displayFields: {
        group: string;
        field: string[];
        includeHeader: boolean;
    }[];
}

export interface UpdateEmployeeData {
    employeeId: string,
    jobTitle: number,
    empStatus: number,
    subUnit: number
    birthday: string,
    gender: number,
    maritalStatus: string
}

export interface updateEmployeeWithId {
    employeeId: string,
    jobTitle: number,
    empStatus: number,
    subUnit: number
}

export interface validateReportforJobTitle {
    employeeId: string,
    firstName: string,
    lastName: string,
    empStatusId: string,
    subunitId: string,
}

export interface validateReportforEmpStatus {
    firstName: string,
    dob: string,
    gender: string,
    jobtitle: string,
    subUnit: string,
    Location: string,
}


export const ReportData = {
    AddEmployee: [{
        employeeId: "2100",
        firstName: "Ross",
        lastName: "Taylor",
        middleName: "Macdona"
    },
    {
        employeeId: "2101",
        firstName: "Gramhem",
        lastName: "Smith",
        middleName: "Edward"
    },
    {
        employeeId: "2102",
        firstName: "Rick",
        lastName: "Ponting",
        middleName: "David"
    },
    {
        employeeId: "2103",
        firstName: "David",
        lastName: "Malas",
        middleName: "Kosan"
    },
    {
        employeeId: "2104",
        firstName: "Alex",
        lastName: "ander",
        middleName: "Bell"
    },
    ],

    AddReport: [
        {
            reportName: "Report for Job title",
            criteria: [
                {
                    criteriaName: "Job Title",
                    values: "UI Engineer"
                }
            ],
            include: "Current Employees Only",
            displayFields: [
                {
                    group: "Personal",
                    field: ["Employee ID", "Employee First Name", "Employee Last Name"],
                    includeHeader: true
                },
                {
                    group: "Job",
                    field: ["Employment Status", "Sub Unit"],
                    includeHeader: true
                }
            ],
        },
        {
            reportName: "Report for Job title Emp Status",
            criteria: [
                {
                    criteriaName: "Employment Status",
                    values: "Intern"
                }
            ],
            include: "Current and Past Employees",
            displayFields: [
                {
                    group: "Personal",
                    field: ["Employee First Name", "Date of Birth", "Gender"],
                    includeHeader: true
                },
                {
                    group: "Job",
                    field: ["Job Title", "Location", "Sub Unit"],
                    includeHeader: true
                }
            ],
        },
        {
            reportName: "Report for Terminated employees only",
            criteria: [
                {
                    criteriaName: "Employment Status",
                    values: "Intern"
                }
            ],
            include: "Past Employees Only",
            displayFields: [
                {
                    group: "Personal",
                    field: ["Employee First Name", "Date of Birth", "Gender"],
                    includeHeader: true
                },
                {
                    group: "Job",
                    field: ["Job Title", "Location", "Sub Unit"],
                    includeHeader: true
                }
            ],
        },
        {
            reportName: "Report for update test",
            criteria: [
                {
                    criteriaName: "Employee Name",
                    values: "alex washington Carey"
                },
                 {
                    criteriaName: "Gender",
                    values: "Male"
                },
                 {
                    criteriaName: "Location",
                    values: "Sydney"
                },
                 {
                    criteriaName: "Pay Grade",
                    values: "Grade 1"
                }
            ],
            include: "Current Employees Only",
            displayFields: [
                {
                    group: "Personal",
                    field: ["Employee First Name", "Date of Birth", "Gender"],
                    includeHeader: true
                },
                {
                    group: "Job",
                    field: ["Job Title", "Location", "Sub Unit"],
                    includeHeader: true
                },
                {
                    group: "Contact Details",
                    field: ["Mobile", "Work Email"],
                    includeHeader: true
                },
                {
                    group: "Salary",
                    field: ["Pay Grade", "Amount"],
                    includeHeader: true
                }
            ],
        }
    ],
    UpdateEmployeeData: [{
        employeeId: "2100",
        firstName: "Ross",
        lastName: "Taylor",
        jobTitleId: 3,
        empStatusId: 1,
        subunitId: 1,
        locationId: 2,
        birthday: "2026-03-04",
        gender: 1,
        maritalStatus: "Single"

    },
    {
        employeeId: "2101",
        firstName: "Gramhem",
        lastName: "Smith",
        jobTitleId: 3,
        empStatusId: 3,
        subunitId: 1,
        locationId: 2,
        birthday: "2020-12-04",
        gender: 2,
        maritalStatus: "Single"
    },
    {
        employeeId: "2102",
        firstName: "Rick",
        lastName: "Ponting",
        jobTitleId: 3,
        empStatusId: 3,
        subunitId: 1,
        locationId: 1,
        birthday: "2026-03-04",
        gender: 1,
        maritalStatus: "Other"
    },
    {
        employeeId: "2103",
        firstName: "David",
        lastName: "Malas",
        jobTitleId: 3,
        empStatusId: 3,
        subunitId: 1,
        locationId: 1,
        birthday: "1997-02-04",
        gender: 2,
        maritalStatus: "Married"
    },
    {
        employeeId: "2104",
        firstName: "Alex",
        lastName: "ander",
        jobTitleId: 3,
        empStatusId: 3,
        subunitId: 1,
        locationId: 2,
        birthday: "2000-03-04",
        gender: 1,
        maritalStatus: "Single"
    },
    ],
    validateReportForJobTitle: [{
        employeeId: "2100",
        firstName: "Ross",
        lastName: "Taylor",
        empStatusId: "Permanent",
        subunitId: "Automation",
    },
    {
        employeeId: "2101",
        firstName: "Gramhem",
        lastName: "Smith",
        empStatusId: "Permanent",
        subunitId: "Automation",
    },
    {
        employeeId: "2102",
        firstName: "Rick",
        lastName: "Ponting",
        empStatusId: "Permanent",
        subunitId: "Automation",
    },
    ],
    validateReportForEmpStatus: [{
        firstName: "Gramhem",
        dob: "2020-12-04",
        gender: "Female",
        jobtitle: "UI Engineer",
        subUnit: "Automation",
        Location: "Sydney",
    },
    {
        firstName: "Rick",
        dob: "2026-03-04",
        gender: "Male",
        jobtitle: "UI Engineer",
        subUnit: "Automation",
        Location: "Washington",
    },],
    validateReportForTerminateEmp: [{
        firstName: "David",
        dob: "1997-02-04",
        gender: "Female",
        jobtitle: "UI Engineer",
        subUnit: "Automation",
        Location: "Washington",
    },
    {
        firstName: "Alex",
        dob: "2000-03-04",
        gender: "Male",
        jobtitle: "UI Engineer",
        subUnit: "Automation",
        Location: "Sydney",
    },],
    terminationData: [
        {
            employeeId: "2103",
            terminationReason: 1,
            date: "2026-02-23",
            note: "This is a test Note"
        },
        {
            employeeId: "2104",
            terminationReason: 1,
            date: "2026-02-23",
            note: "This is a test Note"
        }
    ],
    UpdateReportData: [{
            oldReportName : "Report for update test",
            updateReportName : "Report for updated",
            criteriaDeleteList : ["Employee Name","Gender"],
            deleteDisplayFields : ["Personal","Job"],
            deletedisplayFields : ["Mobile", "Amount"]
        },
    ],


}
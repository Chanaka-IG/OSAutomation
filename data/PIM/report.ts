
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
                // {
                //     group: "Contact Details",
                //     field: ["Address", "Mobile", "Work Email"],
                //     includeHeader: false
                // },
                {
                    group: "Job",
                    field: ["Job Title", "Location", "Sub Unit"],
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
    },]

}
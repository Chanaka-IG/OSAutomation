
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

export interface updateEmployeeWithId {
    employeeId: string,
    jobTitle: number,
    empStatus: number,
    subUnit: number
}

export interface validateReport {
    employeeId: string,
        firstName: string,
        lastName: string,
        empStatusId: string,
        subunitId: string,
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
            reportName: "Test Report 1",
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
            reportName: "ELC Report",
            criteria: [
                {
                    criteriaName: "Pay Grade",
                    values: "Grade 2"
                },
                {
                    criteriaName: "Job Title",
                    values: "HR"
                },
                {
                    criteriaName: "Employment Status",
                    values: "Permanent"
                }
            ],
            include: "Current and Past Employees",
            displayFields: [
                {
                    group: "Personal",
                    field: ["Employee ID", "Employee First Name", "Date of Birth"],
                    includeHeader: true
                },
                {
                    group: "Contact Details",
                    field: ["Address", "Mobile", "Work Email"],
                    includeHeader: false
                },
                {
                    group: "Job",
                    field: ["Job Title", "Location", "Sub Unit"],
                    includeHeader: true
                }
            ],
        }
    ],
    UpdateEmployee: [{
        employeeId: "2100",
        jobTitleId: 3,
        empStatusId: 1,
        subunitId: 1,
    },
    {
        employeeId: "2101",
        jobTitleId: 3,
        empStatusId: 1,
        subunitId: 1,
    },
    {
        employeeId: "2102",
        jobTitleId: 3,
        empStatusId: 1,
        subunitId: 1,
    },
    ],
    validateReport: [{
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

}
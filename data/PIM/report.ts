
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
            reportName: "Test Report",
            criteria: [
                {
                    criteriaName: "Pay Grade",
                    values: "Grade 1"
                },
                {
                    criteriaName: "Job Title",
                    values: "BA"
                },
                {
                    criteriaName: "Employment Status",
                    values: "Intern"
                }
            ],
            include: "Current Employees Only",
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
    ]

}
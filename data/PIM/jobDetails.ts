
export interface AddEmployee {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface JobData {
    JoinedDate: string;
    jobTItle: string;
    jobCategory: string;
    subUnit: string;
    location: string;
    employementStatus: string;
    includeContractDetails: boolean;
    contractStartDate: string;
    contractEndDate: string;
}

export interface TerminationData {
    terminationReason: string,
    date: string,
    note: string
}

export interface apiDataTermination {
    terminationReason: number,
    date: string,
    note: string
}

export interface EmployeeFilter {
    employeeName: string
    employeeId: string,
    employeeStatus: string,
    include: string,
    supervisorName: string,
    jobTitle: string,
    subUnit: string
}



export const jobData = {
    AddEmployee: [{
        employeeId: "1700",
        firstName: "William",
        lastName: "Gomes",
        middleName: "Russel"
    },
    {
        employeeId: "1701",
        firstName: "Johanas",
        lastName: "Lesa",
        middleName: "Macdona"
    },
    {
        employeeId: "1703",
        firstName: "Kevin",
        lastName: "Peterson",
        middleName: "Madona"
    },
    {
        employeeId: "1704",
        firstName: "Johan",
        lastName: "Blake",
        middleName: "Gran"
    },
    {
        employeeId: "1705",
        firstName: "Jeffry",
        lastName: "Bawa",
        middleName: "Masano"
    },
    {
        employeeId: "1706",
        firstName: "Margret",
        lastName: "Buhansa",
        middleName: "Chikago"
    },
    {
        employeeId: "1707",
        firstName: "James",
        lastName: "Packer",
        middleName: "Mugabe"
    },
    {
        employeeId: "1708",
        firstName: "Peter",
        lastName: "Patigo",
        middleName: "Mosad"
    }
    ],
    ApiAddEmployee: [{
        employeeId: "1709",
        firstName: "Wilson",
        lastName: "Martin",
        middleName: "Mosad"
    },
    ],
    JobData: [{
        JoinedDate: "2020-10-02",
        jobTItle: "BA",
        jobCategory: "Sales Workers",
        subUnit: "Laid-off",
        location: "Sydney",
        employementStatus: "Intern",
        includeContractDetails: false,
        contractStartDate: "2022-10-02",
        contractEndDate: "2027-10-02"
    },
    {
        JoinedDate: "2025-10-02",
        jobTItle: "QA Engineer",
        jobCategory: "Sales Workers",
        subUnit: "Dept 1",
        location: "Sydney",
        employementStatus: "Intern",
        includeContractDetails: true,
        contractStartDate: "2022-10-02",
        contractEndDate: "2024-10-02"
    },
    {
        JoinedDate: "2025-10-02",
        jobTItle: "QA Engineer",
        jobCategory: "Sales Workers",
        subUnit: "Dept 1",
        location: "Sydney",
        employementStatus: "Intern",
        includeContractDetails: true,
        contractStartDate: "2022-10-02",
        contractEndDate: "2024-10-02"
    },
    ],
    terminationData: [
        {
            terminationReason: "Laid-off",
            date: "2026-02-23",
            note: "This is a test Note"
        }
    ],
    apiDataTermination: [
        {
            terminationReason: 1,
            date: "2026-02-23",
            note: "This is a test Note"
        }
    ],
    EmployeeFilter: [{
        employeeName: "",
        employeeId: "",
        employeeStatus: "",
        include: "Past Employees Only",
        supervisorName: "",
        jobTitle: "",
        subUnit: ""
    },
    ]
}
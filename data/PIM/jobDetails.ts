
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
    }
    ],
    JobData: [{
        JoinedDate: "2020-10-02",
        jobTItle: "BA",
        jobCategory: "Sales Workers",
        subUnit: "Dept 1",
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
    ]


}
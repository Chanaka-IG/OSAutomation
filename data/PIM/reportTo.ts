
export interface AddEmployee {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}


export interface Supervisor {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    reportMethod: string;
}


export const reportToData = {
    AddEmployee: [
        {
            employeeId: "1200",
            firstName: "Breat",
            lastName: "Lee",
            middleName: "Bruce"
        },
        {
            employeeId: "1201",
            firstName: "Jonothon",
            lastName: "Trott",
            middleName: "David"
        },
        {
            employeeId: "1202",
            firstName: "Joe",
            lastName: "Root",
            middleName: "Steven"
        },
        {
            employeeId: "1203",
            firstName: "Mohomad",
            lastName: "Anony",
            middleName: "Yusuf"
        },
        {
            employeeId: "1204",
            firstName: "Michael",
            lastName: "Anderson",
            middleName: "James"
        },
        {
            employeeId: "1205",
            firstName: "Emily",
            lastName: "Thompson",
            middleName: "Grace"
        },
        {
            employeeId: "1206",
            firstName: "William",
            lastName: "Harris",
            middleName: "Oliver"
        },
        {
            employeeId: "1207",
            firstName: "Sophia",
            lastName: "Walker",
            middleName: "Marie"
        },
        {
            employeeId: "1208",
            firstName: "Daniel",
            lastName: "Clark",
            middleName: "Henry"
        }

    ],
    SelectEmployee: [
        {
            employeeId: "1200",
            firstName: "Breat",
            lastName: "Lee",
            middleName: "Bruce"
        },
        {
            employeeId: "1202",
            firstName: "Joe",
            lastName: "Root",
            middleName: "Steven"
        },
    ],
    Supervisor: [
        {
            employeeId: "1201",
            firstName: "Jonothon",
            lastName: "Trott",
            middleName: "David",
            reportMethod: "Direct"
        },
    ],
    Subordinate: [
        {
            employeeId: "1201",
            firstName: "Jonothon",
            lastName: "Trott",
            middleName: "David",
            reportMethod: "Direct"
        },
    ],
    apiSupervisor: [
        {
            employeeId: "1206",
            firstName: "William",
            lastName: "Harris",
            middleName: "Oliver",
            reportMethod: 1
        },
    ],
    apiSubordinate: [
        {
             employeeId: "1207",
            firstName: "Sophia",
            lastName: "Walker",
            middleName: "Marie",
            reportMethod: 2
        },
    ],
    MultipleSupervisors: [
        {
            employeeId: "1203",
            firstName: "Mohomad",
            lastName: "Anony",
            middleName: "Yusuf",
            reportMethod: "Direct"
        },
        {
            employeeId: "1204",
            firstName: "Michael",
            lastName: "Anderson",
            middleName: "James",
            reportMethod: "Indirect"
        },
        {
            employeeId: "1205",
            firstName: "Emily",
            lastName: "Thompson",
            middleName: "Grace",
            reportMethod: "Direct"
        },
    ],
}


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

export interface userList {

    username: string,
    password: string,
    status: boolean,
    userRoleId: number,
    empNumber: number

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
        },
        {
            employeeId: "1209",
            firstName: "Oliver",
            lastName: "Smith",
            middleName: "James",
        }

    ],
    SelectEmployee: [
        {
            employeeId: "1207",
            firstName: "Sophia",
            lastName: "Walker",
            middleName: "Marie",
        },
        {
            employeeId: "1202",
            firstName: "Joe",
            lastName: "Root",
            middleName: "Steven"
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
    apiSupervisors: [
        {
            employeeId: "1206",
            firstName: "William",
            lastName: "Harris",
            middleName: "Oliver",
            reportMethod: 1,
        },
        {
            employeeId: "1208",
            firstName: "Daniel",
            lastName: "Clark",
            middleName: "Henry",
            reportMethod: 1,
        },
        {
            employeeId: "1209",
            firstName: "Oliver",
            lastName: "Smith",
            middleName: "James",
            reportMethod: 1
        },
    ],
    apiSupervisorsValidate: [
        {
            firstName: "William",
            lastName: "Harris",
            middleName: "Oliver",
            reportMethodInWord: "Direct",
        }
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
    userList: [
        {
            username: "William",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
        },
        {
            username: "Sophia",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,

        },
    ],
}

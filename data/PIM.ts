import { stat } from "node:fs";

export interface Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface EmployeeWithUser {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    username: string;
    password: string;
    status: string;
    confirmPassword: string;
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

export const PIM_DATA = {

    API_DATA: {
        Employee: [{
            employeeId: "1200",
            firstName: "Alesa",
            lastName: "Healy",
            middleName: "Madona"
        },
        {
            employeeId: "1201",
            firstName: "Perry",
            lastName: "johan",
            middleName: "Diana"
        },
        ],
        EmployeeforFilter: [{
            employeeId: "1300",
            firstName: "James",
            lastName: "Packer",
            middleName: "William"
        },
        {
            employeeId: "1301",
            firstName: "James",
            lastName: "Vince",
            middleName: "Madona"
        },
        ],
        User: [{
            username: "Alesa",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 1,
            empNumber: 9,
        },
        {
            username: "Perry",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            empNumber: 10,
        }],

    },
    UI_DATA: {
        Employee: [{
            employeeId: "",
            firstName: "Julia",
            lastName: "Sharapowa",
            middleName: ""
        },
        {
            employeeId: "",
            firstName: "Robi",
            lastName: "wilson",
            middleName: ""
        },
        {
            employeeId: "1204",
            firstName: "Mark",
            lastName: "Robet",
            middleName: "Thomas"
        },
        {
            employeeId: "1205",
            firstName: "Allen",
            lastName: "Meera",
            middleName: "Moose"
        },
        {
            employeeId: "1200",
            firstName: "Margret",
            lastName: "Henry",
            middleName: "Louise"
        },
        {
            employeeId: "1206",
            firstName: "Franklin",
            lastName: "ROoswelt",
            middleName: "Marado"
        },
        ],
        EmployeeWithUser: [{
            employeeId: "1206",
            firstName: "Alviro",
            lastName: "Peterson",
            middleName: "Carey",
            username: "Alvero",
            password: "admin@OHRM123",
            confirmPassword: "admin@OHRM123",
            status: "enabled",
        },
        {
            employeeId: "1207",
            firstName: "Nic",
            lastName: "Pothas",
            middleName: "Widney",
            username: "Nicas",
            password: "admin@OHRM123",
            confirmPassword: "admin@OHRM123",
            status: "enabled",
        }],
        EmployeeFilter: [{
            employeeName: "James William Packer",
            employeeId: "1300",
            employeeStatus: "",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        {
            employeeName: "",
            employeeId: "Julia",
            employeeStatus: "Sharapowa",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        {
            employeeName: "",
            employeeId: "Julia",
            employeeStatus: "Sharapowa",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        ],
          EmployeeFilterValidation: [{
            employeeName: "James William Packer",
            employeeId: "1300",
            employeeStatus: "",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        {
            employeeName: "",
            employeeId: "Julia",
            employeeStatus: "Sharapowa",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        {
            employeeName: "",
            employeeId: "Julia",
            employeeStatus: "Sharapowa",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        ]

    },

}


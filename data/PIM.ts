export interface Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface User {
    username: string;
    password: string;
    status: boolean;
    userRoleId: number;
    empNumber: number;
}   







export const PIM_DATA = {

    API_date: {
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
        ],
    },
}


export interface AddEmployeeData {
    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}

export const leaveListData = {
    AddEmployeeData: [
        {
            employeeId: "MYL030",
            firstName: "Wills",
            lastName: "Carey",
            middleName: "Mugabe"
        },
        {
            employeeId: "MYL031",
            firstName: "Kevin",
            lastName: "Pertoson",
            middleName: "ALien"
        },
        {
            employeeId: "MYL032",
            firstName: "Ionsa",
            lastName: "Bell",
            middleName: "Moshad"
        },
        {
            employeeId: "MYL033",
            firstName: "Hoshs",
            lastName: "Englosh",
            middleName: "Losana"
        },
    ],

    AddUserData: [
        {
            username: "Wills",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "MYL030",
        },
        {
            username: "Kevin",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "MYL031",
        },
        {
            username: "Ionsa",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "MYL032",
        },
        {
            username: "Hoshs",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "MYL033",
        },
    ],
    AddEntitlements: [
        {
            employeeId: "MYL030",
            leaveTypeId: 2,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 12
        },
        {
            employeeId: "MYL030",
            leaveTypeId: 1,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 8
        },
        {
            employeeId: "MYL030",
            leaveTypeId: 3,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 21
        },
        {
            employeeId: "MYL031",
            leaveTypeId: 3,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 14
        },
        {
            employeeId: "MYL031",
            leaveTypeId: 1,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 25
        },
        {
            employeeId: "MYL032",
            leaveTypeId: 2,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 15
        },
        {
            employeeId: "MYL033",
            leaveTypeId: 3,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 15
        },
        {
            employeeId: "MYL033",
            leaveTypeId: 1,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 10
        }
    ],
    applyLeave: [
        {
            employeeId: "MYL030",
            leaveTypeId: 2,
            fromDate: "2026-04-06",
            toDate: "2026-04-08",
            comment: "Test comment",
            partialOption: "",
            duration: {
                type: "full_day"
            }
        },
        {
            employeeId: "MYL030",
            leaveTypeId: 1,
            fromDate: "2026-03-02",
            toDate: "2026-03-04",
            comment: "Test comment",
            partialOption: "",
            duration: {
                type: "half_day_morning"
            }
        },
        {
            employeeId: "MYL030",
            leaveTypeId: 3,
            fromDate: "2026-05-11",
            toDate: "2026-05-14",
            comment: "Test comment",
            partialOption: "",
            duration: {
                type: "specify_time",
                fromTime: "12:00",
                toTime: "13:00"
            }
        },
        {
            employeeId: "MYL031",
            leaveTypeId: 3,
            fromDate: "2026-05-25",
            toDate: "2026-05-28",
            comment: "Test comment",
            partialOption: "all",
            duration: {
                type: "specify_time",
                fromTime: "12:00",
                toTime: "13:00"
            }
        },
        {
            employeeId: "MYL031",
            leaveTypeId: 1,
            fromDate: "2026-04-03",
            toDate: "2026-04-05",
            comment: "Test comment",
            partialOption: "start",
            duration: {
                type: "specify_time",
                fromTime: "12:00",
                toTime: "13:00"
            }
        },
        {
            employeeId: "MYL032",
            leaveTypeId: 2,
            fromDate: "2026-06-11",
            toDate: "2026-06-12",
            comment: "Test comment",
            partialOption: "end",
            duration: {
                type: "specify_time",
                fromTime: "12:00",
                toTime: "13:00"
            }
        },
        {
            employeeId: "MYL033",
            leaveTypeId: 3,
            fromDate: "2026-02-06",
            toDate: "2026-02-06",
            comment: "Test comment",
            duration: {
                type: "half_day_afternoon"
            }
        },
        {
            employeeId: "MYL033",
            leaveTypeId: 1,
            fromDate: "2026-02-19",
            toDate: "2026-02-20",
            comment: "Test comment",
            duration: {
                type: "full_day"
            }
        },
    ]
}
export interface AddEmployeeData {
    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}

type LeaveStatus =
    | "Taken"
    | "Pending Approval"
    | "Scheduled"
    | "Rejected"
    | "Cancelled";

export interface FilterData {
    fromDate: string,
    toDate: string,
    status: string[],
    leaveType: string,
    employeeName: string,
    subUnit: string,
    includePastEmployee: boolean
}

export interface ValidateData {
    date: string,
    name: string,
    leaveType: string,
    balance: string,
    days: string,
    validateStatus: string,
    comment: string
}

export const leaveListData = {
    apiData: {
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
            {
                employeeId: "MYL034",
                firstName: "Jonothon",
                lastName: "Carter",
                middleName: "James"
            },
            {
                employeeId: "MYL035",
                firstName: "Emily",
                lastName: "Watson",
                middleName: "Grace"
            },
            {
                employeeId: "MYL036",
                firstName: "Sophia",
                lastName: "Turner",
                middleName: "Rose"
            },
            {
                employeeId: "MYL037",
                firstName: "Michael",
                lastName: "Anderson",
                middleName: "Lee"
            },
            {
                employeeId: "MYL038",
                firstName: "Ava",
                lastName: "Mitchell",
                middleName: "Claire"
            },
            {
                employeeId: "MYL039",
                firstName: "Ethan",
                lastName: "Walker",
                middleName: "Ryan"
            }
        ],

        updatetJobData: [
            {
                employeeId: "MYL032",
                subunitId: 2,
                jobTitleId: 1,
                empStatusId: 1,
                locationId: 1


            }
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
            {
                username: "Jonothon",
                password: "admin@OHRM123",
                status: true,
                userRoleId: 2,
                employeeId: "MYL034",
            },
            {
                username: "Emily",
                password: "admin@OHRM123",
                status: true,
                userRoleId: 2,
                employeeId: "MYL035",
            },
            {
                username: "Sophia",
                password: "admin@OHRM123",
                status: true,
                userRoleId: 2,
                employeeId: "MYL036",
            },
            {
                username: "Michael",
                password: "admin@OHRM123",
                status: true,
                userRoleId: 2,
                employeeId: "MYL037",
            },
            {
                username: "Claire",
                password: "admin@OHRM123",
                status: true,
                userRoleId: 2,
                employeeId: "MYL038",
            },
            {
                username: "Ethan",
                password: "admin@OHRM123",
                status: true,
                userRoleId: 2,
                employeeId: "MYL039",
            },
        ],
        TerminateEmployeeData: [
            {
                employeeId: "MYL030",
                terminationReason: 1,
                date: "2026-02-23",
                note: "This is a test Note"
            }
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
            },
            {
                employeeId: "MYL034",
                leaveTypeId: 1,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 20
            },
            {
                employeeId: "MYL034",
                leaveTypeId: 2,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 20
            },
            {
                employeeId: "MYL035",
                leaveTypeId: 2,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 15
            },
            {
                employeeId: "MYL035",
                leaveTypeId: 1,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 14
            },
            {
                employeeId: "MYL035",
                leaveTypeId: 3,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 10
            },
            {
                employeeId: "MYL036",
                leaveTypeId: 3,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 21
            },
            {
                employeeId: "MYL037",
                leaveTypeId: 2,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 20
            },
            {
                employeeId: "MYL038",
                leaveTypeId: 2,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 15
            },
            {
                employeeId: "MYL038",
                leaveTypeId: 1,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 14
            },
            {
                employeeId: "MYL038",
                leaveTypeId: 3,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 10
            },
            {
                employeeId: "MYL039",
                leaveTypeId: 2,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 15
            },
            {
                employeeId: "MYL039",
                leaveTypeId: 1,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 14
            },
            {
                employeeId: "MYL039",
                leaveTypeId: 3,
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                entitlement: 10
            },

        ],
        applyLeave: [
            // {
            //     employeeId: "MYL030",
            //     leaveTypeId: 2,
            //     fromDate: "2026-04-06",
            //     toDate: "2026-04-08",
            //     comment: "Test comment",
            //     partialOption: "",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            // {
            //     employeeId: "MYL030",
            //     leaveTypeId: 1,
            //     fromDate: "2026-03-02",
            //     toDate: "2026-03-04",
            //     comment: "Test comment",
            //     partialOption: "",
            //     duration: {
            //         type: "half_day_morning"
            //     }
            // },
            // {
            //     employeeId: "MYL030",
            //     leaveTypeId: 3,
            //     fromDate: "2026-05-11",
            //     toDate: "2026-05-14",
            //     comment: "Test comment",
            //     partialOption: "",
            //     duration: {
            //         type: "specify_time",
            //         fromTime: "12:00",
            //         toTime: "13:00"
            //     }
            // },
            // {
            //     employeeId: "MYL031",
            //     leaveTypeId: 3,
            //     fromDate: "2026-05-25",
            //     toDate: "2026-05-28",
            //     comment: "Test comment",
            //     partialOption: "all",
            //     duration: {
            //         type: "specify_time",
            //         fromTime: "12:00",
            //         toTime: "13:00"
            //     }
            // },
            // {
            //     employeeId: "MYL031",
            //     leaveTypeId: 1,
            //     fromDate: "2026-04-03",
            //     toDate: "2026-04-05",
            //     comment: "Test comment",
            //     partialOption: "start",
            //     duration: {
            //         type: "specify_time",
            //         fromTime: "12:00",
            //         toTime: "13:00"
            //     }
            // },
            // {
            //     employeeId: "MYL032",
            //     leaveTypeId: 2,
            //     fromDate: "2026-06-11",
            //     toDate: "2026-06-12",
            //     comment: "Test comment",
            //     partialOption: "end",
            //     duration: {
            //         type: "specify_time",
            //         fromTime: "12:00",
            //         toTime: "13:00"
            //     }
            // },
            // {
            //     employeeId: "MYL033",
            //     leaveTypeId: 3,
            //     fromDate: "2026-02-06",
            //     toDate: "2026-02-06",
            //     comment: "Test comment",
            //     duration: {
            //         type: "half_day_afternoon"
            //     }
            // },
            // {
            //     employeeId: "MYL033",
            //     leaveTypeId: 1,
            //     fromDate: "2026-02-19",
            //     toDate: "2026-02-20",
            //     comment: "Test comment",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            // {
            //     employeeId: "MYL034",
            //     leaveTypeId: 1,
            //     fromDate: "2026-02-19",
            //     toDate: "2026-02-19",
            //     comment: "Test comment",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            // {
            //     employeeId: "MYL034",
            //     leaveTypeId: 2,
            //     fromDate: "2026-12-19",
            //     toDate: "2026-12-23",
            //     comment: "Test comment",
            //     duration: {
            //         type: "half_day_afternoon"
            //     }
            // },
            // {
            //     employeeId: "MYL035",
            //     leaveTypeId: 2,
            //     fromDate: "2026-02-19",
            //     toDate: "2026-02-20",
            //     comment: "Test comment",
            //     partialOption: "end",
            //     duration: {
            //         type: "specify_time",
            //         fromTime: "12:00",
            //         toTime: "13:00"
            //     }
            // },
            // {
            //     employeeId: "MYL035",
            //     leaveTypeId: 1,
            //     fromDate: "2026-04-28",
            //     toDate: "2026-04-30",
            //     comment: "Test comment",
            //     partialOption: "end",
            //     duration: {
            //         type: "half_day_afternoon"
            //     }
            // },
            // {
            //     employeeId: "MYL035",
            //     leaveTypeId: 3,
            //     fromDate: "2026-08-03",
            //     toDate: "2026-08-05",
            //     comment: "Test comment",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            // {
            //     employeeId: "MYL036",
            //     leaveTypeId: 3,
            //     fromDate: "2026-02-19",
            //     toDate: "2026-02-20",
            //     comment: "Test comment",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            // {
            //     employeeId: "MYL037",
            //     leaveTypeId: 2,
            //     fromDate: "2026-02-19",
            //     toDate: "2026-02-20",
            //     comment: "Test comment",
            //     partialOption: "end",
            //     duration: {
            //         type: "specify_time",
            //         fromTime: "12:00",
            //         toTime: "13:00"
            //     }
            // },
            // {
            //     employeeId: "MYL038",
            //     leaveTypeId: 1,
            //     fromDate: "2026-04-28",
            //     toDate: "2026-04-30",
            //     comment: "Test comment",
            //     partialOption: "end",
            //     duration: {
            //         type: "half_day_afternoon"
            //     }
            // },
            // {
            //     employeeId: "MYL038",
            //     leaveTypeId: 3,
            //     fromDate: "2026-08-03",
            //     toDate: "2026-08-05",
            //     comment: "Test comment",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            // {
            //     employeeId: "MYL038",
            //     leaveTypeId: 3,
            //     fromDate: "2026-02-19",
            //     toDate: "2026-02-20",
            //     comment: "Test comment",
            //     duration: {
            //         type: "full_day"
            //     }
            // },
            {
                employeeId: "MYL039",
                leaveTypeId: 3,
                fromDate: "2026-02-19",
                toDate: "2026-02-20",
                comment: "Test comment",
                duration: {
                    type: "full_day"
                }
            },
            {
                employeeId: "MYL039",
                leaveTypeId: 2,
                fromDate: "2026-10-19",
                toDate: "2026-10-24",
                comment: "Test comment",
                partialOption: "end",
                duration: {
                    type: "specify_time",
                    fromTime: "12:00",
                    toTime: "13:00"
                }
            },
            {
                employeeId: "MYL039",
                leaveTypeId: 1,
                fromDate: "2026-04-28",
                toDate: "2026-04-30",
                comment: "Test comment",
                partialOption: "end",
                duration: {
                    type: "half_day_afternoon"
                }
            },
        ],
        assignLeave: [
            {
                employeeId: "MYL030",
                leaveTypeId: 1,
                fromDate: "2026-03-09",
                toDate: "2026-03-11",
                comment: "Test comment",
                partialOption: "",
                duration: {
                    type: "full_day"
                }
            },
            {
                employeeId: "MYL030",
                leaveTypeId: 1,
                fromDate: "2026-03-26",
                toDate: "2026-03-27",
                comment: "Test comment",
                partialOption: "",
                duration: {
                    type: "half_day_morning"
                }
            },
            {
                employeeId: "MYL030",
                leaveTypeId: 3,
                fromDate: "2026-05-27",
                toDate: "2026-05-27",
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
                fromDate: "2026-04-25",
                toDate: "2026-04-27",
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
                fromDate: "2026-04-09",
                toDate: "2026-04-13",
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
                fromDate: "2026-06-10",
                toDate: "2026-06-10",
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
                fromDate: "2026-02-13",
                toDate: "2026-02-16",
                comment: "Test comment",
                duration: {
                    type: "half_day_afternoon"
                }
            },
            {
                employeeId: "MYL033",
                leaveTypeId: 1,
                fromDate: "2026-04-19",
                toDate: "2026-04-24",
                comment: "Test comment",
                duration: {
                    type: "full_day"
                }
            },
        ]
    },
    uiData: {
        filterData: [
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "Annual Leave",
                employeeName: "Ionsa Moshad Bell",
                subUnit: "",
                includePastEmployee: false
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Scheduled "],
                leaveType: "Annual Leave",
                employeeName: "Ionsa Moshad Bell",
                subUnit: "",
                includePastEmployee: false
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Taken"],
                leaveType: "Cassual Leave",
                employeeName: "Hoshs Losana Englosh",
                subUnit: "",
                includePastEmployee: false
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "",
                employeeName: "Ionsa Moshad Bell",
                subUnit: "Dept 1",
                includePastEmployee: false
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "",
                employeeName: "Hoshs Losana Englosh",
                subUnit: "Dept 1",
                includePastEmployee: false
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Scheduled"],
                leaveType: "",
                employeeName: "Wills Mugabe Carey",
                subUnit: "",
                includePastEmployee: true
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "Sick Leave",
                employeeName: "Jonothon James Carter",
                subUnit: "",
                includePastEmployee: true
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "",
                employeeName: "Emily Grace Watson",
                subUnit: "",
                includePastEmployee: false
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "Annual Leave",
                employeeName: "Michael Lee Anderson",
                subUnit: "",
                includePastEmployee: true
            },
            {
                fromDate: "2026-01-01",
                toDate: "2026-12-31",
                status: ["Pending Approval"],
                leaveType: "",
                employeeName: "Ava Claire Mitchell",
                subUnit: "",
                includePastEmployee: false
            },
        ],
        selectData: [
            {
                date: "2026-04-28 to 2026-04-30",
                name: "Ethan Ryan Walker",
                leaveType: "Sick Leave",
                balance: "11.50",
                days: "2.50",
                validateStatus: "Pending Approval (2.50)",
                comment: "Test comment",
                updateComment: "Test comment Updated"
            },
             {
                date: "2026-10-19 to 2026-10-24",
                name: "Ethan Ryan Walker",
                leaveType: "Annual Leave",
                balance: "10.00",
                days: "5.00",
                validateStatus: "Pending Approval (5.00)",
                comment: "Test comment",
                updateComment: "Test comment Updated"
            },
            {
                date: "2026-02-19 to 2026-02-20",
                name: "Ethan Ryan Walker",
                leaveType: "Cassual Leave",
                balance: "8.00",
                days: "2.00",
                validateStatus: "Pending Approval (2.00)",
                comment: "Test comment",
                updateComment: "Test comment Updated"
            },
        ],
        validateData: [
            {
                date: "2026-06-11 to 2026-06-12",
                name: "Ionsa Moshad Bell",
                leaveType: "Annual Leave",
                balance: "13.75",
                days: "1.13",
                validateStatus: "Pending Approval (1.13)",
                comment: "Test comment"
            },
            {
                date: "2026-06-10 (12:00 - 13:00)",
                name: "Ionsa Moshad Bell",
                leaveType: "Annual Leave",
                balance: "13.75",
                days: "0.13",
                validateStatus: "Scheduled (0.13)",
                comment: "Test comment"
            },
            {
                date: "2026-02-13 to 2026-02-16",
                name: "Hoshs Losana Englosh",
                leaveType: "Cassual Leave",
                balance: "12.50",
                days: "2.00",
                validateStatus: "Taken (2.00)",
                comment: "Test comment"
            },
            {
                date: "2026-02-06 (13:00 - 17:00) Half Day",
                name: "Hoshs Losana Englosh",
                leaveType: "Cassual Leave",
                balance: "12.50",
                days: "0.50",
                validateStatus: "Pending Approval (0.50)",
                comment: "Test comment"
            },
            {
                date: "2026-05-27 (12:00 - 13:00)",
                name: "Wills Mugabe Carey",
                leaveType: "Cassual Leave",
                balance: "16.88",
                days: "0.13",
                validateStatus: "Scheduled (0.13)",
                comment: "Test comment"
            },
            {
                date: "2026-02-19",
                name: "Jonothon James Carter",
                leaveType: "Sick Leave",
                balance: "19.00",
                days: "1.00",
                validateStatus: "Pending Approval (1.00)",
                comment: "Test comment"
            },
            {
                date: "2026-08-03 to 2026-08-05",
                name: "Emily Grace Watson",
                leaveType: "Cassual Leave",
                balance: "7.00",
                days: "3.00",
                validateStatus: "Pending Approval (3.00)",
                comment: "Test comment"
            },
            {
                date: "2026-04-28 to 2026-04-30",
                name: "Emily Grace Watson",
                leaveType: "Sick Leave",
                balance: "11.50",
                days: "2.50",
                validateStatus: "Pending Approval (2.50)",
                comment: "Test comment"
            },
            {
                date: "2026-02-19 to 2026-02-20",
                name: "Emily Grace Watson",
                leaveType: "Annual Leave",
                balance: "13.88",
                days: "1.13",
                validateStatus: "Pending Approval (1.13)",
                comment: "Test comment"
            },
            {
                date: "2026-02-19 to 2026-02-20",
                name: "Michael Lee Anderson",
                leaveType: "Annual Leave",
                balance: "18.88",
                days: "1.13",
                validateStatus: "Pending Approval (1.13)",
                comment: "Test comment"
            },
            {
                date: "2026-08-03 to 2026-08-05",
                name: "Ava Claire Mitchell",
                leaveType: "Cassual Leave",
                balance: "5.00",
                days: "3.00",
                validateStatus: "Pending Approval (3.00)",
                comment: "Test comment"
            },
            {
                date: "2026-04-28 to 2026-04-30",
                name: "Ava Claire Mitchell",
                leaveType: "Sick Leave",
                balance: "11.50",
                days: "2.50",
                validateStatus: "Pending Approval (2.50)",
                comment: "Test comment"
            },
            {
                date: "2026-02-19 to 2026-02-20",
                name: "Ava Claire Mitchell",
                leaveType: "Cassual Leave",
                balance: "5.00",
                days: "2.00",
                validateStatus: "Pending Approval (1.13)",
                comment: "Test comment"
            },
            {
                date: "2026-04-28 to 2026-04-30",
                name: "Ethan Ryan Walker",
                leaveType: "Sick Leave",
                balance: "11.50",
                days: "2.50",
                validateStatus: "Pending Approval (2.50)",
                comment: "Test comment Updated"
            },
            {
                leaveRequest : "2026-10-19 - 2026-10-24",
                date: "2026-10-19",
                name: "Ethan Ryan Walker",
                leaveType: "Annual Leave",
                balance: "10.00",
                duration: "8.00",
                validateStatus: "Pending Approval",
                comment: ""
            },
        ]
    }

}
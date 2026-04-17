export interface AddEmployeeData {
    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}
export interface LeaveBalancePopup {
    employeeName: string,
    leaveType: string,
    totalEntitlement: number,
    balance: number,
    taken: number,
    shedule: number,
    pendingApproval: number
}

export interface ApplyLeave {
    leaveType: string,
    period: string,
    duration: string,
    partialDays: string,
    startDay: string,
    fromTime?: string,
    toTime?: string,
    comment: string
}

export const ApplyLeaveData = {
    AddEmployeeData: [
        {
            employeeId: "APP020",
            firstName: "Yasara",
            lastName: "Mahen",
            middleName: "Kumar"
        },
        {
            employeeId: "APP021",
            firstName: "Adams",
            lastName: "Gil",
            middleName: "Christ"
        },
        {
            employeeId: "APP022",
            firstName: "Taylor",
            lastName: "Hasan",
            middleName: "Ferreira"
        },
        {
            employeeId: "APP023",
            firstName: "Mark",
            lastName: "Hendry",
            middleName: "Pedis"
        },
    ],

    AddUserData: [
        {
            username: "Yasara",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "APP020",
        },
        {
            username: "Adams",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "APP021",
        },
        {
            username: "Taylor",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "APP022",
        },
        {
            username: "Marks",
            password: "admin@OHRM123",
            status: true,
            userRoleId: 2,
            employeeId: "APP023",
        },
    ],
    AddEntitlements: [
        {
            employeeId: "APP020",
            leaveTypeId: 2,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 12
        },
        {
            employeeId: "APP021",
            leaveTypeId: 1,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 8
        },
        {
            employeeId: "APP022",
            leaveTypeId: 3,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 21
        },
        {
            employeeId: "APP023",
            leaveTypeId: 2,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 5
        }
    ],
    applyLeave: [{
        pastFullday: {
            leaveType: "Annual Leave",
            period: "Past-same date only",
            duration: "Full Day",
            partialDays: "",
            startDay: "",
            comment: "Applying full day leave for a past date",
        },
        futureFullday: {
            leaveType: "Annual Leave",
            period: "Future-same date only",
            duration: "Full Day",
            partialDays: "",
            startDay: "",
            comment: "Applying full day leave for a future date",
        },
        todayFullday: {
            leaveType: "Annual Leave",
            period: "Today-only",
            duration: "Full Day",
            partialDays: "",
            startDay: "",
            comment: "Applying full day leave for today",
        },
        pastHalfdayMorning: {
            leaveType: "Annual Leave",
            period: "Past(Morning Half)-same date only",
            duration: "Half Day - Morning",
            partialDays: "",
            startDay: "",
            comment: "Applying half day morning leave for a past date",
        },
        futureHalfdayAfternoon: {
            leaveType: "Annual Leave",
            period: "Future(Afternoon Half)-same date only",
            duration: "Half Day - Afternoon",
            partialDays: "",
            startDay: "",
            comment: "Applying half day afternoon leave for future date",
        },
        todayHalfdayAfternoon: {
            leaveType: "Sick Leave",
            period: "Today(Afternoon Half)-same date only",
            duration: "Half Day - Afternoon",
            partialDays: "",
            startDay: "",
            comment: "Applying half day afternoon leave for today",
        },
        pastMultipledaysForAllDays: {
            leaveType: "Sick Leave",
            period: "Past multiple for All",
            duration: "",
            partialDays: "",
            startDay: "",
            comment: "Applying multiple days for past week",
        },
        currentMultipledaysForStartDay: {
            leaveType: "Cassual Leave",
            period: "Multiple for All (Current)",
            duration: "",
            partialDays: "Start Day Only",
            startDay: "Half Day - Morining",
            comment: "Applying multiple days for past week",
        },
        pasttSpecify: {
            leaveType: "Cassual Leave",
            period: "Specify time for past",
            duration: "Specify Time",
            partialDays: "",
            startDay: "",
            fromTime: "09:00 AM",
            toTime: "01:00 PM",
            comment: "Applying multiple days for past week",
        },
        Weekend: {
            leaveType: "Cassual Leave",
            period: "Weekend",
            duration: "",
            partialDays: "",
            startDay: "",
            comment: "Applying full day leave for weekend",
        },
        Holiday: {
            leaveType: "Cassual Leave",
            period: "Holiday",
            duration: "Full Day",
            partialDays: "",
            startDay: "",
            comment: "Applying full day leave for holiday",
        },
        OverBalance: {
            leaveType: "Annual Leave",
            period: "OverBalance",
            duration: "",
            partialDays: "",
            startDay: "",
            comment: "Applying leave more than balance",
        },

    }
    ],
    ValidateData: [{
        leaveBalance: {
            leaveType: "Annual Leave",
            leaveBalance: 12
        },
        leaveBalancePopup: {
            employeeName: "Yasara Mahen",
            leaveType: "Annual Leave",
            totalEntitlement: 12,
            balance: 12,
            taken: 0,
            shedule: 0,
            pendingApproval: 0
        },
        leaveBalancePopupAfterApply: {
            employeeName: "Mark Hendry",
            leaveType: "Annual Leave",
            totalEntitlement: 5,
            balance: 4,
            taken: 0,
            shedule: 0,
            pendingApproval: 1
        },
    }
    ],
}
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
        }
    ],
    applyLeave: [{
        pastFullday: {
            leaveType: "Annual Leave",
            period: "Past-same date only",
            duration: "Full Day",
            comment: "Applying full day leave for a past date",
        },
        futureFullday: {
            leaveType: "Annual Leave",
            period: "Future-same date only",
            duration: "Full Day",
            comment: "Applying full day leave for a future date",
        },
        todayFullday: {
            leaveType: "Annual Leave",
            period: "Today-only",
            duration: "Full Day",
            comment: "Applying full day leave for today",
        },
        pastHalfdayMorning: {
            leaveType: "Annual Leave",
            period: "Past(Morning Half)-same date only",
            duration: "Half Day - Morning",
            comment: "Applying half day morning leave for a past date",
        },
        todayHalfdayAfternoon: {
            leaveType: "Annual Leave",
            period: "Future(Afternoon Half)-same date only",
            duration: "Half Day - Afternoon",
            comment: "Applying half day afternoon leave for today",
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
        }
    }
    ],
}
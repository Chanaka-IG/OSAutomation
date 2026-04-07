export interface AddEmployeeData {
    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}[]

export interface FilterWithName {
    name: string,
    leaveType: string,
    leavePeriod: string
}[]

export interface EntitlementData {
    leaveType: string,
    leavePeriod: string,
    entitlements: number
}[]


export const entitlementData = {

    addEmployeeData: [
        {
            employeeId: "ENT010",
            firstName: "Bilal",
            lastName: "Waseem",
            middleName: "Qadeer"
        },
        {
            employeeId: "ENT011",
            firstName: "Pesad",
            lastName: "Nazir",
            middleName: "usan"
        },
        {
            employeeId: "ENT012",
            firstName: "Kristina",
            lastName: "Smith",
            middleName: "Maria"
        }
    ],

    addEntitlements: [
        {
            employeeId: "ENT010",
            leaveTypeId: 2,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 12
        },
        {
            employeeId: "ENT011",
            leaveTypeId: 1,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 8
        },
        {
            employeeId: "ENT012",
            leaveTypeId: 3,
            fromDate: "2026-01-01",
            toDate: "2026-12-31",
            entitlement: 21
        }
    ],
    filterWithName: [
        {
            name: "Bilal Qadeer Waseem",
            leaveType: "",
            leavePeriod: "2026-01-01 - 2026-12-31"
        }
    ],
    filterWithNameAndLeavetype: [
        {
            name: "Pesad Nazir usan",
            leaveType: "1",
            leavePeriod: "2026-01-01 - 2026-12-31"
        }
    ],
    EntitlementData: [
        {
            leaveType: "Annual Leave",
            leavePeriod: "2026-01-01 - 2026-12-31",
            entitlements: 12
        },
         {
            leaveType: "Sick Leave",
            leavePeriod: "2026-01-01 - 2026-12-31",
            entitlements: 8
        }
    ]

}
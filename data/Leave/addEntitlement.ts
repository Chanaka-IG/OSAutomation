export interface addEntitlementData {
    addTo: string,
    employeeName: string,
    location: string,
    subUnit: string,
    leaveType: string,
    leavePeriod: string,
    entitlements: number
}[]


export interface AddEmployeeData {
    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}[]

export const entitlementData = {
    AddEmployeeData: [
        {
            employeeId: "ENT001",
            firstName: "Abdul",
            lastName: "Kader",
            middleName: "Hakeem"
        },
        {
            employeeId: "ENT002",
            firstName: "Jim",
            lastName: "Halpert",
            middleName: "Alexander"
        },
        {
            employeeId: "ENT003",
            firstName: "Mike",
            lastName: "Ross",
            middleName: "Johnson"
        },
        {
            employeeId: "ENT004",
            firstName: "Michael",
            lastName: "Kent",
            middleName: "Patrick"
        },
        {
            employeeId: "ENT005",
            firstName: "Gabriel",
            lastName: "Esteban",
            middleName: "Martinez"
        },
    ],
    addEntitlementDataforIndividual: [{
        addTo: "Individual Employee",
        employeeName: "Test",
        location: "",
        subUnit: "",
        leaveType: "Sick Leave",
        leavePeriod: "2026-01-01 - 2026-12-31",
        entitlements: 20
    }],
    addEntitlementDataforMultipleForLocation: [{
        addTo: "Multiple Employees",
        employeeName: "",
        location: "Location for Leave",
        subUnit: "",
        leaveType: "Sick Leave",
        leavePeriod: "2026-01-01 - 2026-12-31",
        entitlements: 15
    }],
        addEntitlementDataforMultipleForSubunit: [{
        addTo: "Multiple Employees",
        employeeName: "",
        location: "",
        subUnit: "Dept for Leave",
        leaveType: "Annual Leave",
        leavePeriod: "2026-01-01 - 2026-12-31",
        entitlements: 12
    }],

    apiUpdateEmployeeData : [{
    employeeId: "ENT001",
    subunitId: 1,
    locationId: 1,
},
{
    employeeId: "ENT002",
    subunitId: 4,
    locationId: 1,
},
{
    employeeId: "ENT003",
    subunitId: 2,
    locationId: 3,
},
{
    employeeId: "ENT004",
    subunitId: 4,
    locationId: 1,
},
{
    employeeId: "ENT005",
    subunitId: 1,
    locationId: 3,
},
],
validateMultiplePopupforJobTItle : [{
    employeeName: "Gabriel Esteban",
    oldEntitlements: 0,
    newEntitlements: 15
},
{
    employeeName: "Mike Ross",
    oldEntitlements: 0,
    newEntitlements: 15
},
],
validateMultiplePopupforSubUnit : [{
    employeeName: "Jim Halpert",
    oldEntitlements: 0,
    newEntitlements: 12
},
{
    employeeName: "Michael Kent",
    oldEntitlements: 0,
    newEntitlements: 12
},
],

}

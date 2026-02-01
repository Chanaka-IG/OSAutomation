export interface PersonalDetails {
    firstName: string,
    middleName: string,
    lastName: string,
    EmployeeId: string,
    otherID: string,
    licenseNumber: string,
    licenseExpiryDate: string,
    nationality: string,
    maritalStatus: string,
    dob: string,
    gender: string,
    comment: string
}

export interface AddEmployee {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}


export const personalData = {
    AddEmployee: [{
        employeeId: "1500",
        firstName: "christi",
        lastName: "ano",
        middleName: "Ronald"
    },
    {
        employeeId: "1501",
        firstName: "Lionel",
        lastName: "Messy",
        middleName: "Arge"
    },
    ],
    PersonalDetails: [{
        firstName: "christina",
        middleName: 'anos',
        lastName: "Ronaldo",
        EmployeeId: "1510",
        otherID: "2659",
        licenseNumber: "2569875665",
        licenseExpiryDate: "2025-02-08",
        nationality: "French",
        maritalStatus: "Single",
        dob: "1995-02-08",
        gender: "Male",
        comment: "This is a test comment",
    },
    {
        firstName: "Lio",
        middleName: 'Mes',
        lastName: "Argeneti",
        EmployeeId: "1511",
        otherID: "2654",
        licenseNumber: "25698757265",
        licenseExpiryDate: "2025-02-06",
        nationality: "Thai",
        maritalStatus: "Married",
        dob: "1995-02-08",
        gender: "Female",
        comment: "This is a test comment",
    },
    ],
}
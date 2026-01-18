export interface Employee {
    employeeId: number;
    firstName: string,
    lastName: string,
    middleName: string
}


const employeeDetails: any[] = [
    {
        employeeId: "0002",
        firstName: "Daniel",
        lastName: "Vittori",
        middleName: "Harber"
    },
     {
        employeeId: "0003",
        firstName: "glenn",
        lastName: "Maxewll",
        middleName: "Peter"
    },
     {
        employeeId: "0004",
        firstName: "alex",
        lastName: "Carey",
        middleName: "washington"
    },
     {
        employeeId: "0005",
        firstName: "David",
        lastName: "Warner",
        middleName: "dustin"
    },
     {
        employeeId: "0006",
        firstName: "Brett",
        lastName: "Lee",
        middleName: "Mosoon"
    },
     {
        employeeId: "0007",
        firstName: "Michel",
        lastName: "Clarke",
        middleName: "Roson"
    },
     {
        employeeId: "0008",
        firstName: "Andrew",
        lastName: "Symond",
        middleName: "John"
    }

]

export const employees: Employee[] = employeeDetails.map(val => ({
    employeeId : val.employeeId,
    firstName: val.firstName,
    lastName: val.lastName,
    middleName: val.middleName
}))

export interface Employee {
    employeeId: string;
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
    }

]

export const employees: Employee[] = employeeDetails.map(val => ({
    employeeId : val.employeeId,
    firstName: val.firstName,
    lastName: val.lastName,
    middleName: val.middleName
}))

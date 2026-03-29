export interface EmployeeData {
    firstName: string;
    lastName: string;
    middleName: string;
    employeeId: string;
}

export const BulkEmployeeAddData: string = 
`John,Doe,Smith,EMP001,ID123,DL999,2025-12-31,M,Single,USA,1990-01-01,123 Main St,,New York,NY,10001,USA,555-1234,555-5678,555-510,john@example.com,johnother@example.com
Jane,Smith,Johnson,EMP002,ID456,DL888,2026-01-15,F,Married,USA,1985-05-20,456 Oak Ave,Apt 2,Boston,MA,02101,USA,555-9876,555-4321,555-511,jane@example.com,janeother@example.com`;


export const BulkEmployeeAddDataForValidation: string = 
`Mark,Doe,Smith,EMP003,ID123,DL999,2025-12-31,M,Single,USA,1990-01-01,123 Main St,,New York,NY,10001,USA,555-1234,555-5678,555-510,mark@example.com,markoth@example.com
Suckerbeerg,Smith,Johnson,EMP004,ID456,DL888,2026-01-15,F,Married,USA,1985-05-20,456 Oak Ave,Apt 2,Boston,MA,02101,USA,555-9876,555-4321,555-511,suck@example.com,suckother@example.com`;

export const validateEMployee = [{
    firstName: "John",
    lastName: "Smith",
    middleName: "Doe",
    employeeId: "EMP001"
},
{
    firstName: "Jane",
    lastName: "Johnson",
    middleName: "Smith",
    employeeId: "EMP002"
}
]
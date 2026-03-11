export interface MembershipData {
    memebershipName: string;
    subscriptionPaidBy: string;
    subscriptionAmount: string;
    currency: string;
    subscriptionCommenceDate: string;
    subscriptionExpiryDate: string;

}

export interface AddEmployeeData {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}



export const MembershipData = [
    {
        memebershipName: "Test Membership",
        subscriptionPaidBy: "Company",
        subscriptionAmount: "1000",
        currency: "United States Dollar",
        subscriptionCommenceDate: "2024-01-01",
        subscriptionExpiryDate: "2024-12-31"
    },
    {
        memebershipName: "Sports Club Membership",
        subscriptionPaidBy: "Individual",
        subscriptionAmount: "2500",
        currency: "Iceland Krona",
        subscriptionCommenceDate: "2022-04-24",
        subscriptionExpiryDate: "2023-10-28"
    },
    {
        memebershipName: "Health Club Membership",
        subscriptionPaidBy: "Company",
        subscriptionAmount: "4100",
        currency: "Mexican Peso",
        subscriptionCommenceDate: "2023-08-05",
        subscriptionExpiryDate: "2024-12-31"
    }
]

export const MembershipDataAfterDelete = [
    {
        memebershipName: "Test Membership",
        subscriptionPaidBy: "Company",
        subscriptionAmount: "1000",
        currency: "United States Dollar",
        subscriptionCommenceDate: "2024-01-01",
        subscriptionExpiryDate: "2024-12-31"
    },
    {
        memebershipName: "Health Club Membership",
        subscriptionPaidBy: "Company",
        subscriptionAmount: "4100",
        currency: "Mexican Peso",
        subscriptionCommenceDate: "2023-08-05",
        subscriptionExpiryDate: "2024-12-31"
    }
]

export const MembershipUpdateData = [
    {
        memebershipName: "Chess Club Membership",
        subscriptionPaidBy: "Individual",
        subscriptionAmount: "1390",
        currency: "Sri Lanka Rupee",
        subscriptionCommenceDate: "2025-04-30",
        subscriptionExpiryDate: "2026-11-02"
    },
]

export const AddEmployeeData = [
    {
        employeeId: "2000",
        firstName: "Rehan",
        lastName: "Shaik",
        middleName: "Abdul"
    },
     {
        employeeId: "2001",
        firstName: "Nisham",
        lastName: "Sandul",
        middleName: "Jim"
    },
     {
        employeeId: "2002",
        firstName: "Alesa",
        lastName: "Perry",
        middleName: "Helani"
    },
     {
        employeeId: "2003",
        firstName: "Riza",
        lastName: "Hart",
        middleName: "Hendricks"
    },
     {
        employeeId: "2004",
        firstName: "Yara",
        lastName: "Smith",
        middleName: "Lynn"
    },
   
]
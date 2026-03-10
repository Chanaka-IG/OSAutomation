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
        subscriptionAmount: "100",
        currency: "USD",
        subscriptionCommenceDate: "2024-01-01",
        subscriptionExpiryDate: "2024-12-31"
    },
    {
        memebershipName: "Sports Club Membership",
        subscriptionPaidBy: "Employee",
        subscriptionAmount: "100",
        currency: "USD",
        subscriptionCommenceDate: "2024-01-01",
        subscriptionExpiryDate: "2024-12-31"
    },
    {
        memebershipName: "Health Club Membership",
        subscriptionPaidBy: "Company",
        subscriptionAmount: "100",
        currency: "USD",
        subscriptionCommenceDate: "2024-01-01",
        subscriptionExpiryDate: "2024-12-31"
    }
]

export const AddEmployeeData = [
    {
        employeeId: "2000",
        firstName: "Rehan",
        lastName: "Shaik",
        middleName: "Abdul"
    },
   
]
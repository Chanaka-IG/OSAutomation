export interface employee {

    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}

export interface salaryComponent {

    component: string,
    payGrade: string,
    payFrequency: string,
    Currency: string,
    amount: string,
    comment: string,
    directDeposit: boolean,
    accountNumber: string,
    accountType: string
    routingNumber: string,
    amountVal: string
}



export const salarydata = {
    employee: [
        {
            employeeId: "1100",
            firstName: "xavier",
            lastName: "Doherty",
            middleName: "Sando"
        },
         {
            employeeId: "1101",
            firstName: "Mack",
            lastName: "Pennis",
            middleName: "Fazeen"
        }
    ],
    salaryComponent: [
        {
            component: "Car allowance",
            payGrade: "Grade 1",
            payFrequency: "Hourly",
            Currency: "Utd. Arab Emir. Dirham",
            amount: '5500',
            comment: "This is a test comment",
            directDeposit: false,
            accountNumber: "",
            accountType: "",
            routingNumber: "",
            amountVal: ""
        },
        {
            component: "Tax deduction",
            payGrade: "Grade 2",
            payFrequency: "Monthly",
            Currency: "Utd. Arab Emir. Dirham",
            amount: '5240',
            comment: "This is a test comment",
            directDeposit: true,
            accountNumber: "256200126",
            accountType: "Savings",
            routingNumber: "26894587",
            amountVal: "45501"
        }
    ],
}


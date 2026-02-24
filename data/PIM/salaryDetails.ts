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
        },
        {
            employeeId: "1102",
            firstName: "Peter",
            lastName: "Siddle",
            middleName: "Zahoot"
        },
        {
            employeeId: "1103",
            firstName: "John",
            lastName: "Kenedy",
            middleName: "Sikago"
        },
        {
            employeeId: "1104",
            firstName: "Barack",
            lastName: "Obama",
            middleName: "Siddle"
        },
        {
            employeeId: "1105",
            firstName: "Hillsry",
            lastName: "Clinton",
            middleName: "Sodasa"
        },
          {
            employeeId: "1106",
            firstName: "Roosan",
            lastName: "Macmillan",
            middleName: "Johas"
        },
          {
            employeeId: "1107",
            firstName: "Harry",
            lastName: "Brook",
            middleName: "Root"
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
        },
        {
            component: "Tax deduction",
            payGrade: "Grade 2",
            payFrequency: "Monthly",
            Currency: "Utd. Arab Emir. Dirham",
            amount: '10000',
            comment: "This is a test comment",
            directDeposit: false,
            accountNumber: "",
            accountType: "",
            routingNumber: "",
            amountVal: ""
        },
        {
            component: "",
            payGrade: "",
            payFrequency: "",
            Currency: "",
            amount: '',
            comment: "",
            directDeposit: true,
            accountNumber: "",
            accountType: "",
            routingNumber: "",
            amountVal: ""
        }
    ],
    multiplesalaryComponent: [
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
        },
        {
            component: "Housing Loan",
            payGrade: "Grade 2",
            payFrequency: "Monthly",
            Currency: "Utd. Arab Emir. Dirham",
            amount: '4000',
            comment: "This is a test comment",
            directDeposit: true,
            accountNumber: "369875",
            accountType: "Checking",
            routingNumber: "4849885",
            amountVal: "25000"
        },
    ],

    deletesalaryComponent: [
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
        },
        {
            component: "Housing Loan",
            payGrade: "Grade 2",
            payFrequency: "Monthly",
            Currency: "Utd. Arab Emir. Dirham",
            amount: '4000',
            comment: "This is a test comment",
            directDeposit: true,
            accountNumber: "369875",
            accountType: "Checking",
            routingNumber: "4849885",
            amountVal: "25000"
        },

    ],
    updateSalaryComponent: [
        {
            component: "Housing loan",
            payGrade: "Grade 1",
            payFrequency: "Hourly",
            Currency: "Utd. Arab Emir. Dirham",
            amount: '4800',
            comment: "This is a test comment",
            directDeposit: true,
            accountNumber: "5515155",
            accountType: "Savings",
            routingNumber: "8491858",
            amountVal: "2500"
        },
    ],


}


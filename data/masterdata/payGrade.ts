
export interface payGrades {
    id: number;
    payName: string;
}

export interface currency {

    currencyID: string,
    maxSalary: string,
    minSalary: string

}


export const payGrades = [
    {
        id: 1,
        name: "Grade 1"
    },
    {
        id: 2,
        name: "Grade 2"
    },
    {
        id: 3,
        name: "Grade 3"
    },
]

export const currency = [
    {
        currencyID: "AED",
        maxSalary: "6500",
        minSalary: "2453"
    },
    {
        currencyID: "CHF",
        maxSalary: "6500",
        minSalary: "2453"
    },
    {
        currencyID: "DJF",
        maxSalary: "6500",
        minSalary: "2453"
    },
]


export interface addEmployeeData {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface contactDetails {
    addressOne: string;
    addressTwo: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    homeT: string;
    mobileT: string;
    workT: string;
    workEmail: string;
    otherEmail: string;
    comment: string;

}


export const addEmployeeData = [
    {
        employeeId: "7500",
        firstName: "Pelling",
        lastName: "Sarah",
        middleName: "Mudas"
    },
    {
        employeeId: "7501",
        firstName: "Andrew",
        lastName: "Symonds",
        middleName: "Pothas"
    }
    

]

export const contactDetails = [{
    addressOne: "No 20/34,",
    addressTwo: "Peter seddile road",
    city: "Berling",
    state: "Coraldao",
    zip: "56987",
    country: "United States",
    homeT: "98522458",
    mobileT: "23355888",
    workT: "48978635656",
    workEmail: "pelllings@gmail.com",
    otherEmail: "sarahs@moose.com",
    comment: "This is a test comment"
},
{
    addressOne: "No 20/34,",
    addressTwo: "Peter seddile road",
    city: "Berling",
    state: "Coraldao",
    zip: "56987",
    country: "United States",
    homeT: "98522458",
    mobileT: "23355888",
    workT: "48978635656",
    workEmail: "pellling@gmail.com",
    otherEmail: "sarah@moose.com",
    comment: "This is a test comment"
}]




export interface VacancyEmployeeData {
    employeeId: string,
    firstName: string,
    lastName: string,
    middleName: string
}

export interface VacancyData {
    vacancyName: string,
    jobTitle: string,
    description: string,
    hiringManager: string,
    numberOfPositions: string,
    active: boolean,
    publish: boolean
}

const hiringManagerEmployee: VacancyEmployeeData = {
    employeeId: "REC001",
    firstName: "Rachel",
    lastName: "Green",
    middleName: "Karen"
};

const hiringManagerFullName = `${hiringManagerEmployee.firstName} ${hiringManagerEmployee.middleName} ${hiringManagerEmployee.lastName}`;
// The vacancy list and its Hiring Manager filter show the manager without the middle name
const hiringManagerDisplayName = `${hiringManagerEmployee.firstName} ${hiringManagerEmployee.lastName}`;

export const vacancyData = {
    hiringManagerEmployee,
    hiringManagerFullName,
    hiringManagerDisplayName,

    vacancyWithAllFields: {
        vacancyName: "Automation Vacancy Full",
        jobTitle: "Software Engineer",
        description: "Vacancy created by automation with all fields filled",
        hiringManager: hiringManagerFullName,
        numberOfPositions: "3",
        active: true,
        publish: true
    } as VacancyData,

    vacancyWithMandatoryFields: {
        vacancyName: "Automation Vacancy Mandatory",
        jobTitle: "Senior Software Engineer",
        description: "",
        hiringManager: hiringManagerFullName,
        numberOfPositions: "",
        active: true,
        publish: true
    } as VacancyData,

    vacancyInactive: {
        vacancyName: "Automation Vacancy Inactive",
        jobTitle: "Software Engineer",
        description: "",
        hiringManager: hiringManagerFullName,
        numberOfPositions: "",
        active: false,
        publish: true
    } as VacancyData,

    vacancyWithBoundaryName: {
        vacancyName: "B".repeat(50),
        jobTitle: "Software Engineer",
        description: "",
        hiringManager: hiringManagerFullName,
        numberOfPositions: "",
        active: true,
        publish: true
    } as VacancyData,

    vacancyWithSpecialCharacters: {
        vacancyName: "C++/C# Engineer (Sr.) - 2026!",
        jobTitle: "Software Engineer",
        description: "",
        hiringManager: hiringManagerFullName,
        numberOfPositions: "",
        active: true,
        publish: true
    } as VacancyData,

    vacancyForCancel: {
        vacancyName: "Automation Vacancy Cancelled",
        jobTitle: "Software Engineer",
        description: "",
        hiringManager: hiringManagerFullName,
        numberOfPositions: "",
        active: true,
        publish: true
    } as VacancyData,

    updatedVacancyName: "Automation Vacancy Mandatory Updated",
    updatedNumberOfPositions: "5",

    overlengthVacancyName: "A".repeat(51),
    whitespaceOnlyVacancyName: "     ",
    invalidHiringManager: "Nonexistent Manager XYZ",
    nonNumericPositions: "abc",
    jobTitleWithoutVacancies: "Business Analyst",

    errorMessages: {
        required: "Required",
        invalid: "Invalid",
        alreadyExists: "Already exists",
        exceed50: "Should not exceed 50 characters",
        numeric: "Should be a numeric value"
    }
}

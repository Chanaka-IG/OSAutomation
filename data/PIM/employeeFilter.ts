export interface EmployeeFilter {
    employeeName: string
    employeeId: string,
    employeeStatus: string,
    include: string,
    supervisorName: string,
    jobTitle: string,
    subUnit: string
}


export const PIM_FILTER_DATA = {
     EmployeeFilter: [{
            employeeName: "James William Packer",
            employeeId: "",
            employeeStatus: "",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        {
            employeeName: "",
            employeeId: "1300",
            employeeStatus: "",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        {
            employeeName: "",
            employeeId: "",
            employeeStatus: "Permanent",
            include: "",
            supervisorName: "",
            jobTitle: "UI Engineer",
            subUnit: "Automation"
        },
        {
            employeeName: "James William Packer",
            employeeId: "1300",
            employeeStatus: "Permanent",
            include: "",
            supervisorName: "",
            jobTitle: "UI Engineer",
            subUnit: "Automation"
        },
        ],
          EmployeeFilterValidation: [{
            employeeName: "James William Packer",
            employeeId: "1300",
            employeeStatus: "Permanent",
            include: "",
            supervisorName: "",
            jobTitle: "UI Engineer",
            subUnit: "Automation"
        },
        {
            employeeName: "",
            employeeId: "Julia",
            employeeStatus: "Sharapowa",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
        },
        ]
}
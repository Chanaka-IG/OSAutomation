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
            employeeId: "Julia",
            employeeStatus: "Sharapowa",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
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
        ],
          EmployeeFilterValidation: [{
            employeeName: "James William Packer",
            employeeId: "1300",
            employeeStatus: "",
            include: "",
            supervisorName: "",
            jobTitle: "",
            subUnit: ""
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
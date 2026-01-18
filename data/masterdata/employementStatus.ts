export interface empStatus{
    name : string;
}

const employmenstStatus: any[] = [

    {
        name: "Permanent",
    
    },
    {
        name: "Probation",
    
    },
    {
        name: "Intern",
    
    },
    {
        name: "Terminated",
    
    },

]
export const employStatus: empStatus[] = employmenstStatus.map (val => ({
    name: val.name
}))


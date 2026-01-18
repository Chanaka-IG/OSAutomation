export interface JobTitles {
        title: string,
        description: string,
        note: string
}


const JobTitlesDetails: any[] = [
    {
        title: "Software Engineer",
        description: "Software Engineer",
        note: "Software Engineer position"
    },
    {
        title: "QA Engineer",
        description: "QA Enginee",
        note: "QA Enginee position"
    }, 
    {
        title: "UI Engineer",
        description: "UI Engineer",
        note: "UI Engineer position"
    }, 
    {
        title: "BA",
        description: "BA",
        note: "BA position"
    }, 
    {
        title: "HR",
        description: "HR",
        note: "HR position"
    },
    {
        title: "Senior Software Engineer",
        description: "Senior Software Engineer",
        note: "Senior Software Engineer position"
    },

]

export const jobTitles: JobTitles[] = JobTitlesDetails.map(val => ({
    title: val.title,
    description: val.description,
    note: val.note
}))

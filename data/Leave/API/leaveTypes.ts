export interface LeaveType {
    name: string;
    situational: boolean;
}



export const leaveTypesData = [
    {
        name: "Sick Leave",
        situational: true
    },
    {
        name: "Annual Leave",
        situational: false
    },
    {
        name: "Cassual Leave",
        situational: true
    },
    {
        name: "Lieu Leave",
        situational: false
    }]
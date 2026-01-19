export interface userList {
    
    username:string,
    password:string,
    status: boolean,
    userRoleId: number,
    empNumber:  number

}

const users : any[] = [
    {
    username:"daniel",
    password:"admin@OHRM123",
    status: true,
    userRoleId: 2,
    empNumber:  2,
    },

]


export const user : userList[] = users.map(val => ({
    username:val.username,
    password:val.password,
    status: val.status,
    userRoleId: val.userRoleId,
    empNumber:  val.empNumber
}))




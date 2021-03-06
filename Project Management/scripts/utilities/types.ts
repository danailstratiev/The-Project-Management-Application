export type LoggedUser = {
    id:string,
    isAdmin:boolean
}

export type UserItem = {
    id:string,
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    isAdmin:boolean
}

export type TeamItem = {
    id:string,
    title:string,
    createDate:string, 
    updateDate:string
}

export type Listener = {
    targetId: string,
    eventType: string,
    callback(): void
}
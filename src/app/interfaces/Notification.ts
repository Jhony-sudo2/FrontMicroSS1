import { User } from "./User";

export interface NotificationDTO{
    id:number,
    user:User,
    content:string
}

export interface Insignias{
    id:number,
    user:User,
    name:string,
    date:Date
}
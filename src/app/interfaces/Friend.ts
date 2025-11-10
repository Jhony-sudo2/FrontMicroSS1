import { User } from "./User";

export interface Friend{
    user:User,
    friend:User,
    state:boolean,
    date:Date
}
import { Blog } from "./Blog";
import { User } from "./User";

export interface Comment{
    id?:number,
    publication:Blog,
    user:User,
    content:String
}

export interface CommentDTO{
    publicationId:number,
    userId:number,
    comment:String
}

export interface Like{
    id:number,
    publication:Blog,
    user:User,
    date:Date
}

export interface LikeDto{
    userId:number,
    publicationId:number
}
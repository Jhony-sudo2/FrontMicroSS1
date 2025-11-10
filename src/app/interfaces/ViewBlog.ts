import { Blog } from "./Blog";
import { Comment, Like } from "./Comment";

export interface viewBlog{
    blog:Blog,
    comments:Comment[],
    likes:Like[],
    view:boolean 
}
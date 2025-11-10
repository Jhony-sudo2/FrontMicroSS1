import { Injectable } from '@angular/core';
import { environment } from '../../../environment/Environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/User';
import { Blog } from '../../interfaces/Blog';
import { Observable } from 'rxjs';
import { Comment, CommentDTO, Like, LikeDto } from '../../interfaces/Comment';
import { viewBlog } from '../../interfaces/ViewBlog';

@Injectable({
  providedIn: 'root'
})
export class ServiceBlogService {

  private baseUrl = environment.baseUrl + '/blog'
  constructor(private http:HttpClient) { }
  
  saveBlog(blog:Blog){
    return this.http.post(this.baseUrl,blog)
  }

  getBlogs():Observable<Blog[]>{
    return this.http.get<Blog[]>(this.baseUrl)
  }

  getBlogsByUserId(id:number):Observable<viewBlog[]>{
    return this.http.get<viewBlog[]>(`${this.baseUrl}/user/view/${id}`)
  }

  getBlogsDataByUserId(id:number):Observable<Blog[]>{
    return this.http.get<Blog[]>(`${this.baseUrl}/user/view2/${id}`)
  }

  getBlogsView():Observable<viewBlog[]>{
    return this.http.get<viewBlog[]>(this.baseUrl+'/view')
  }

  saveLike(like:LikeDto){
    return this.http.post(this.baseUrl+'/like',like)
  }
  
  saveComment(comment:CommentDTO){
    return this.http.post(this.baseUrl+'/comment',comment)
  }

  getById(id:number):Observable<Blog[]>{
    return this.http.get<Blog[]>(`${this.baseUrl}/${id}`)
  }

  share(userId:number,publicationId:number){
    const data = {userId,publicationId}
    return this.http.post(this.baseUrl+'/share',data)
  }

   

}

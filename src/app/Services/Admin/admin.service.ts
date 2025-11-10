import { Injectable } from '@angular/core';
import { environment } from '../../../environment/Environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../interfaces/Blog';
import { PoliticalPosition } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.baseUrl + '/admin'
  constructor(private http:HttpClient) { }


  getBlogsToApproved():Observable<Blog[]>{
    return this.http.get<Blog[]>(this.baseUrl+'/blogs')
  }

  changeStateUser(userId:number,state:boolean){
    const data = {userId,state}
    return this.http.post(this.baseUrl+'/updateUser',data)
  }

  approvedBlog(id:number,state:boolean,politicalPosition:PoliticalPosition){
    const data = {id,state,politicalPosition}
    return this.http.post(this.baseUrl+'/approved',data)
  }


  


}

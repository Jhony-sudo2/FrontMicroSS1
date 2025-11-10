import { Injectable } from '@angular/core';
import { environment } from '../../../environment/Environment';
import { HttpClient } from '@angular/common/http';
import { TypeUser, User } from '../../interfaces/User';
import { Observable } from 'rxjs';
import { Friend } from '../../interfaces/Friend';
import { Blog } from '../../interfaces/Blog';
import { viewBlog } from '../../interfaces/ViewBlog';
import { Insignias, NotificationDTO } from '../../interfaces/Notification';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private baseUrl = environment.baseUrl + '/user'
  constructor(private http: HttpClient) { }

  saveUser(user: User) {
    return this.http.post(this.baseUrl, user)
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  getFriendRequest(id:number):Observable<Friend[]>{
    return this.http.get<Friend[]>(`${this.baseUrl}/myRequest/${id}`)
  }

  friendRequest(userId:number,friendId:number,state:boolean){
    const data = {userId,friendId,state}
    console.log(data);
    return this.http.post(this.baseUrl+'/friendRequest',data)
  }

  updateRequest(userId:number,friendId:number,state:boolean){
    const data = {userId,friendId,state}

    return this.http.post(this.baseUrl+'/updateRequest',data)
  }

  getFriends(id:number):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/friends/${id}`)
  }

  findByType(type:TypeUser):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/type/${type}`)
  }

  getMyShared(id:number):Observable<viewBlog[]>{
    return this.http.get<viewBlog[]>(`${this.baseUrl}/shared/${id}`)
  }

  getInsignias(id:number):Observable<Insignias[]>{
    return this.http.get<Insignias[]>(`${this.baseUrl}/insignia/${id}`)
  }

  getNotifications(id:number):Observable<NotificationDTO[]>{
    return this.http.get<NotificationDTO[]>(`${this.baseUrl}/notifications/${id}`)
  }

  deleteNotifications(id:number){
    const data = {id}
    return this.http.post(this.baseUrl+'/notification',data)
  }

  updatePassword(current:string,newPassword:string,id:number){
    const data = {id,newPassword,current}
    return this.http.post(this.baseUrl+'/updatePassword2',data)
  }


}

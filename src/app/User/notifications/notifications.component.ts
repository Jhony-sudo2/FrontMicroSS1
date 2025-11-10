import { Component } from '@angular/core';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { AuthService } from '../../Services/Auth/auth.service';
import Swal from 'sweetalert2';
import {NotificationDTO } from '../../interfaces/Notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule,FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  Notifications:NotificationDTO[] = []

  constructor(private service:ServiceUserService,private auth:AuthService){}

  
  ngOnInit(){
    const user = this.auth.getUser()
    if(user?.id)
    this.service.getNotifications(user.id).subscribe({
      next:(response)=>{this.Notifications = response},
      error:(err)=>{Swal.fire({title:'error',text:err.error.message,icon:'error'})}
    })
  }

  onDelete(id:number){
    this.service.deleteNotifications(id).subscribe({
      next:(response)=>{Swal.fire({title:'ok',text:'notificaion eliminada correctament',icon:'error'})},
      error:(err)=>{Swal.fire({title:'error',text:err.error.message,icon:'error'})}
    })
  }

}

import { Component } from '@angular/core';
import { User } from '../../interfaces/User';
import { AuthService } from '../../Services/Auth/auth.service';
import { ServiceUserService } from '../../Services/User/service-user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  imports: [FormsModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  user:User = {id:0} as User
  current:string = ""
  newPassword:string = ""
  constructor(private authService:AuthService,private service:ServiceUserService){}

  ngOnInit(){
    const user = this.authService.getUser()
    if(user)
      this.user = user
  }

  updatePassword(){
    if(this.user.id)
    this.service.updatePassword(this.current,this.newPassword,this.user.id).subscribe({
      next:(response)=>{Swal.fire({title:'OK',text:'CONTRASE;A ACTUALIZADA',icon:'success'})},
      error:(err)=>{Swal.fire({title:'error',text:err.error.message,icon:'error'})}
    })
  }

}

import { Component } from '@angular/core';
import { Blog } from '../../interfaces/Blog';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '../../Blog/view/view.component';
import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../interfaces/User';
import Swal from 'sweetalert2';
import { viewBlog } from '../../interfaces/ViewBlog';

@Component({
  selector: 'app-shared',
  imports: [CommonModule,FormsModule,ViewComponent],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {
  blog:viewBlog[] = [] 
  
  constructor(private service:ServiceUserService,private userService:AuthService){}
  ngOnInit(){
    const user = this.userService.getUser()
    if(user){
      if(user.id)
      this.service.getMyShared(user.id).subscribe({
        next:(response)=>{
          this.blog = response
        },
        error:(err)=>{
          Swal.fire({title:'Error',text:err.error.message,icon:'error'})
        }
      })
    }
  }

}

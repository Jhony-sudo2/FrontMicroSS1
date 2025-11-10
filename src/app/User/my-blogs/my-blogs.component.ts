import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Blog } from '../../interfaces/Blog';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { ServiceBlogService } from '../../Services/Blog/service-blog.service';
import { AuthService } from '../../Services/Auth/auth.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.css'
})
export class MyBlogsComponent {
  blog:Blog[] = []

  constructor(private service:ServiceBlogService,private auth:AuthService){}

  ngOnInit(){
    const user = this.auth.getUser()
    if(user?.id)
    this.service.getBlogsDataByUserId(user.id).subscribe({
      next:(response)=>{this.blog = response},
      error:(err)=>{Swal.fire({title:'Error',text:err.error.message,icon:'error'})}
    })
  }

}

import { Component } from '@angular/core';
import { Blog } from '../../interfaces/Blog';
import { AdminService } from '../../Services/Admin/admin.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoliticalPosition } from '../../interfaces/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accept',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './accept.component.html',
  styleUrl: './accept.component.css'
})
export class AcceptComponent {
  blogs:Blog[] = []

  constructor(private service:AdminService){}
  politicalPosition = Object.values(PoliticalPosition);
  
  ngOnInit(){
    this.getBlogs()
  }

  getBlogs(){
    this.service.getBlogsToApproved().subscribe({
      next:(response)=>{
        this.blogs = response
      },
      error:(err)=>{
        this.error(err.error.message)
      }
    })
  }

  error(message:any){
    Swal.fire({title:'error',text:message,icon:'error'})
  }

  accept(blog:Blog){
    if(blog.politicalPosition == undefined)
      this.error("La posicion politica no pueder ser undefinida")
    else if(blog.id)
      this.service.approvedBlog(blog.id,true,blog.politicalPosition).subscribe({
        next:(response)=>{Swal.fire({title:'OK',text:'Blog aprovado',icon:'success'})},
        error:(err)=>{{Swal.fire({title:'ERROR',text:err.error.message,icon:'error'})}
      }
    })
  }

  reject(blog:Blog){
    

  }

}

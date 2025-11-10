import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Blog } from '../../interfaces/Blog';
import { ServiceBlogService } from '../../Services/Blog/service-blog.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent {
  blog:Blog   = {id:0} as Blog
  id:number = 0
  constructor(private service:ServiceBlogService,private router:ActivatedRoute){}

  ngOnInit(){
    this.router.paramMap.subscribe(param=>{
      this.id = param.get("id") ? Number(param.get("id")):0
      if(this.id != 0)
        this.getBlog()
    })
  }

  getBlog(){
    console.log('obteniendo blog');
    
    this.service.getById(this.id).subscribe({
      next:(response=>{
        console.log(response);
        this.blog = response[0]
      }),
      error:(err)=>{
        Swal.fire({title:'Error',text:err.error.message,icon:'error'})
      }
    })
  }

}

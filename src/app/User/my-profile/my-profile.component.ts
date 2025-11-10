import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { ViewComponent } from '../../Blog/view/view.component';
import { AuthService } from '../../Services/Auth/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { viewBlog } from '../../interfaces/ViewBlog';
import { ServiceBlogService } from '../../Services/Blog/service-blog.service';
import { Insignias } from '../../interfaces/Notification';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, FormsModule, ViewComponent,RouterLink],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  id: number = 0;
  user?: User;
  blogs: viewBlog[] = [];
  viewBotton = true
  viewEdit = false
  Insignias:Insignias[] = []
  constructor(
    private service: ServiceUserService,
    private auth: AuthService,
    private router: ActivatedRoute,
    private blogservice: ServiceBlogService,
    private userService: ServiceUserService
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? Number(idParam) : 0;
      const storedUser = this.auth.getUser();
      if (this.id === 0) {        
        if (storedUser) {
          this.viewEdit = true
          this.user = storedUser;
          this.getBlogs(); // ✅ ya tengo el user, obtengo blogs
          this.getInsignias()
          this.viewBotton = false
        } else {
          console.warn('No hay usuario logueado en AuthService');
        }
      } else {
        this.service.getUserById(this.id).subscribe({
          next: (response) => {
            this.user = response[0];
            if(storedUser?.id)
            this.service.getFriends(storedUser?.id).subscribe({
              next:(response)=>{
                response.forEach(element => {
                  if(element.id == this.user?.id){
                    this.getBlogs()
                    this.getInsignias()
                    this.viewBotton = false
                  }
                });
              }
            })
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error'
            });
          }
        });
      }
    });

  }

  getInsignias(){
    if(this.user?.id)
    this.service.getInsignias(this.user.id).subscribe({
      next:(response)=>{this.Insignias = response},
      error:(err)=>{Swal.fire({ title: 'Error', text: err.error.message, icon: 'error' })}
    })
  }

  getBlogs() {
    if (!this.user?.id) return;

    this.blogservice.getBlogsByUserId(this.user.id).subscribe({
      next: (response) => {
        this.blogs = response;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error'
        });
      }
    });
  }

  addFriend(userR: User | undefined) {
    const user = this.auth.getUser()
    if (user?.id && userR?.id) {
      this.userService.friendRequest(user.id, userR?.id, false).subscribe({
        next: (response) => {
          Swal.fire({ title: 'OK', text: 'Request send', icon: 'success' })
        },
        error: (err) => {
          console.log(err);
          Swal.fire({ title: 'Error', text: err.error.message, icon: 'error' })
        }
      })
    }
    else
      console.log('error');

  }
}

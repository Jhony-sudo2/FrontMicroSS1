import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Blog, PublicationType } from '../../interfaces/Blog';
import { PoliticalPosition, TypeUser, User } from '../../interfaces/User';
import { Comment, CommentDTO, Like, LikeDto } from '../../interfaces/Comment';
import { ServiceBlogService } from '../../Services/Blog/service-blog.service';
import { viewBlog } from '../../interfaces/ViewBlog';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input() blogs: viewBlog[] = []; // tus publicaciones
  newComment: Record<number, string> = {};
  user: User = { id: 0 } as User;

  constructor(private service: ServiceBlogService, private auth: AuthService, private router: Router) {
    const storedUser = this.auth.getUser();
    if (storedUser) {
      this.user = storedUser;
    } else {
      console.warn('No hay usuario logueado en AuthService');
    }
  }

  ngOnInit() {
    console.log('cargando blogs');
    console.log(this.router.url);

    if (this.router.url == "/blog/view" || this.router.url == "/")
      this.loadBlogs()
  }

  private loadBlogs() {
    this.service.getBlogsView().subscribe({
      next: (response) => {
        this.blogs = response.map(b => ({ ...b, view: false }));
      },
      error: (err) => console.error('Error cargando blogs:', err)
    });
  }


  toggleComments(Blog: viewBlog): void {
    if (!Blog.comments) return;
    Blog.view = !Blog.view
  }

  getLikesCount(tmp: Like[]): number {
    return tmp.length
  }

  addLike(Blog: viewBlog) {
    if (Blog.blog.id) {
      const Like: LikeDto = {
        userId: this.user.id || 0,
        publicationId: Blog.blog.id
      }
      this.service.saveLike(Like).subscribe({
        next: (response) => {
          this.ngOnInit()
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  shared(blog: Blog) {
    if (this.user.id && blog.id)
      this.service.share(this.user.id, blog.id).subscribe({
        next: (response) => {
          this.succes('publicacion compartida correctamente')
        },
        error: (err) => {
          this.error(err.error.messsage)
        }
      })
  }



  addComment(blogId?: number): void {
    if (!blogId || !this.newComment[blogId]) return;

    const comment: CommentDTO = {
      publicationId: blogId,
      userId: this.user.id || 0,
      comment: this.newComment[blogId],
    };
    this.newComment[blogId] = '';
    console.log(comment);

    this.service.saveComment(comment).subscribe({
      next: (response) => {
        this.succes('Comentario guardado correctamente')
      },
      error: (err) => {
        this.error(err.error.mesage)
      }
    })
  }

  error(mensaje: any) {
    Swal.fire({ title: 'Error', text: mensaje, icon: 'error' })
  }
  succes(mensaje: any) {
    Swal.fire({ title: 'OK', text: mensaje, icon: 'success' })
  }

  isLiked(item: viewBlog): boolean {
    const uid = this.user.id;
    if (!uid) return false;
    return (item.likes ?? []).some(like => like.user.id === uid);
  }

  toggleLike(item: viewBlog) {
    if (!item.blog?.id || !this.user?.id) return;

    const already = this.isLiked(item);

    // ---- Actualización optimista en UI ----
    if (already) {
      // quitar mi like
      item.likes = (item.likes ?? []).filter(like => like.user.id !== this.user.id);
    } else {
      // agregar un like temporal (id negativo para identificarlo si quieres)
      const tempLike: Like = {
        id: -1,
        publication: { id: item.blog.id } as Blog,
        user: { id: this.user.id } as User,
        date: new Date()
      };
      item.likes = [...(item.likes ?? []), tempLike];
    }

    // ---- Llamada real (tu endpoint hace toggle) ----
    const payload: LikeDto = { userId: this.user.id, publicationId: item.blog.id };
    this.service.saveLike(payload).subscribe({
      next: () => { /* nada: ya reflejado */ },
      error: () => {
        // revertir optimismo si falla
        if (already) {
          // debí quitarlo, así que vuelvo a agregarlo
          const rollback: Like = {
            id: -1,
            publication: { id: item.blog.id } as Blog,
            user: { id: this.user.id } as User,
            date: new Date()
          };
          item.likes = [...(item.likes ?? []), rollback];
        } else {
          // debí agregarlo, así que lo quito
          item.likes = (item.likes ?? []).filter(like => like.user.id !== this.user.id);
        }
        this.error('No se pudo actualizar tu like.');
      }
    });
  }
}

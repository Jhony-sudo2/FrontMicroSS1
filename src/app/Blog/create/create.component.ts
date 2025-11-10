import { Component } from '@angular/core';
import { Blog, PublicationType } from '../../interfaces/Blog';
import { PoliticalPosition, User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceBlogService } from '../../Services/Blog/service-blog.service';
import { AuthService } from '../../Services/Auth/auth.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create',
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  blog: Blog = {
    name: '',
    content: '',
    type: PublicationType.NOTICIAS,
    state: true,
    date: new Date().toISOString(),
    author: { id: 1 } as User,
    image: ""
  };
  author: User = { id: 0 } as User
  preview: string | null = null; // dataURL para mostrar imagen

  publicationTypes = Object.values(PublicationType);

  constructor(private service: ServiceBlogService, private auth: AuthService) {
    const data = auth.getUser()
    if (data) {
      this.author = data
    }
  }

  quillModules = {
    toolbar: [
      [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ header: 1 }, { header: 2 }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ]
  };


  onSubmit() {
    this.blog.author.id = this.author.id
    this.blog.politicalPosition = PoliticalPosition.COMUNISMO
    this.service.saveBlog(this.blog).subscribe({
      next: (response) => {
        Swal.fire({ title: 'OK', text: 'OK', icon: 'success' })
      },
      error: (err) => {
        Swal.fire({ title: 'Error', text: err.error.message, icon: 'error' })

      }
    })
  }
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) { return; }

    // Validaciones simples
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      Swal.fire({ icon: 'error', title: 'Formato no permitido', text: 'Usa JPG, PNG, WebP o GIF.' });
      input.value = '';
      return;
    }
    const maxBytes = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxBytes) {
      Swal.fire({ icon: 'error', title: 'Archivo muy grande', text: 'Máximo 2 MB.' });
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string; // "data:image/png;base64,AAAA..."
      this.preview = dataUrl;

      // Guardar SOLO el payload Base64 en blog.image (sin el prefijo data URL)
      const commaIdx = dataUrl.indexOf(',');
      this.blog.image = commaIdx >= 0 ? dataUrl.substring(commaIdx + 1) : dataUrl;
    };
    reader.readAsDataURL(file);
  }

  clearImage() {
    this.preview = null;
    this.blog.image = '';
  }
}

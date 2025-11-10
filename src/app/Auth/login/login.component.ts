import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  view = false

  constructor(private service: AuthService,private router:Router) { }

  ngOnInit(){
    
  }

  login() {
    this.service.login(this.email, this.password).subscribe({
      next: (response) => {
        const user = response[0];
        Swal.fire('Bienvenido', `Hola ${user.name}`, 'success');
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Credenciales inválidas', 'error');
      }
    })
  }

}

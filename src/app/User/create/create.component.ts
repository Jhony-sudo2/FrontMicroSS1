import { Component } from '@angular/core';
import { PoliticalPosition, TypeUser, User } from '../../interfaces/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { AuthService } from '../../Services/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class UserCreate {
  user: User = {
    name: '',
    email: '',
    profession: '',
    address: '',
    gender: true,
    type: TypeUser.COMUN,
    password: '',
    politicalPosition: PoliticalPosition.LIBERAL,
    state: true
  };
  typeUserValues = Object.values(TypeUser);
  politicalPositions = Object.values(PoliticalPosition);
  view = false
  constructor(private service: ServiceUserService, private auth: AuthService) {

  }

  ngOnInit() {
    const user = this.auth.getUser()
    if (user)
      this.view = true
  }


  onSubmit() {
    this.service.saveUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({title:'OK',text:'USUARIO CREADO CORRECTAMENTE',icon:'success'})
        this.ngOnInit()
      },
      error: (err) => {
        Swal.fire({title:'Error',text:err.error.message,icon:'error'})
      }
    })
  }
}

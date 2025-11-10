import { Component, Type } from '@angular/core';
import { AdminService } from '../../Services/Admin/admin.service';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { TypeUser, User } from '../../interfaces/User';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ban-user',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ban-user.component.html',
  styleUrl: './ban-user.component.css'
})
export class BanUserComponent {
  constructor(private service: AdminService, private userService: ServiceUserService) { }
  typeUser = Object.values(TypeUser)
  users: User[] = []
  selectedType: TypeUser = TypeUser.COMUN
  ngOnInit() {
    this.getUser(TypeUser.COMUN)
  }

  getUser(type: TypeUser) {
    this.userService.findByType(type).subscribe({
      next: (response) => {
        console.log(response);
        this.users = response
      },
      error: (err) => {
        Swal.fire({ title: 'Error', text: err.error.message, icon: 'error' })
      }
    })
  }

  ban(u: User) {
    if (u.id)
      this.service.changeStateUser(u.id, !u.state).subscribe({
        next: (response) => {
          u.state = !u.state
          Swal.fire({ title: 'OK', text: 'OK', icon: 'success' })
        },
        error: (err) => {
          Swal.fire({ title: 'Error', text: err.error.message, icon: 'error' })
        }
      })
  }


}

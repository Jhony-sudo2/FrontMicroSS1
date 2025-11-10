import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../interfaces/Friend';
import { ServiceUserService } from '../../Services/User/service-user.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friend-request',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.css'
})
export class FriendRequestComponent {
  request: Friend[] = []

  constructor(private service: ServiceUserService, private auth: AuthService) { }

  ngOnInit() {
    const user = this.auth.getUser()
    if (user?.id) {
      this.service.getFriendRequest(user.id).subscribe({
        next: (response) => {
          this.request = response
        }
      })
    }
  }
  acceptRequest(req: Friend) {
    if (req.user.id && req.friend.id)
      this.service.updateRequest(req.user.id, req.friend.id, true).subscribe({
        next: (reponse) => {
          Swal.fire({ title: 'OK', text: 'Solicitud Aceptada', icon: 'success' })
        },
        error: (err) => {
          this.error(err)
        }
      })
  }
  rejectRequest(req: Friend) {
    if (req.user.id && req.friend.id)
      this.service.updateRequest(req.user.id, req.friend.id, false).subscribe({
        next: (response) => {
          Swal.fire({ title: 'OK', text: 'Solicitud rechazada', icon: 'success' })
        },
        error: (err) => {
          this.error(err)
        }
      })
  }

  error(err: any) {
    Swal.fire({ title: 'Error', text: err.error.mensaje, icon: 'error' })
  }


}

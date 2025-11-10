import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeUser } from '../interfaces/User';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  TypeUser =TypeUser
  constructor(public auth:AuthService,private router:Router){}
  isOpen = false;
  logout(){
    this.auth.logout()
    this.router.navigate(['/'])
  } 
  get isLoggedIn() { return this.auth.isLoggedIn();} 

  
}

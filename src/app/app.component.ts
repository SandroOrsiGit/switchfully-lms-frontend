import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { KeycloakService } from './services/keycloak.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'switchfully-lms-frontend';
   keycloakService: KeycloakService = inject(KeycloakService);
   userService: UserService = inject(UserService);

  constructor() {
    console.log("constructor here")
    console.log(this.userService.getCurrentUser());

    if (!this.keycloakService.isLoggedIn()) {
      this.keycloakService.logout();
    }
  }

  ngOnInit() {
    console.log('NgOnInit here');
    console.log(this.userService.getCurrentUser());
   
    
  }
}

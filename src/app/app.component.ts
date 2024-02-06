import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./pages/register/register.component";
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
export class AppComponent {
  title = 'switchfully-lms-frontend';
  // retrieve token from local storage
  token = localStorage.getItem('keycloak-token');
  keycloakService: KeycloakService = inject(KeycloakService);
  userService: UserService = inject(UserService);

  constructor() {
    this.checkToken();
  }
  
  async checkToken() {
    if (this.token) {
      const isTokenValid = await this.keycloakService.isTokenValid();
      if (!isTokenValid) this.keycloakService.logout();
    }
  }
}

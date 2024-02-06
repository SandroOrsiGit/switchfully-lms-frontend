import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent /* implements OnInit */{
  title = 'switchfully-lms-frontend';
  keycloakService: KeycloakService = Inject(KeycloakService )

  /* ngOnInit() {
    const isValid = this.keycloakService.isLoggedIn();
       
      if (!isValid) {
        
           this.keycloakService.logout();
       }
  } */

  // check if token is valid
  // if not, than remove it from local storage
}

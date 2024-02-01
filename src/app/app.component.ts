import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
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
export class AppComponent implements OnInit {
  title = 'switchfully-lms-frontend';

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  ngOnInit(): void {
    if(this.keycloakService.isLoggedIn()){
      this.router.navigate(['/profile']);
    }
  }
}
